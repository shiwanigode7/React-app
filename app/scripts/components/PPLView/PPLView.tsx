import { LightTheme } from "@esko/cloud-ui-components/dist/esm/themes";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { BG_ORDERING_DISABLED_TOOLTIP_PPL_VIEW, BG_ORDERING_NO_PERMISSION } from "../../constant/BusinessGoalTexts";
import { INNOVATION_BG_LOCATION, INNOVATION_SITE_LOCATION } from "../../constant/InnovationAPI";
import { InnovationStatus } from "../../constant/InnovationEnums";
import { INTERNAL_SERVER_ERROR } from "../../constant/InnovationMessages";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { MPLViewContext } from "../../context/MPLViewContext";
import { BusinessGoalTableType, RunwayModel, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import RunwayService from "../../services/service/RunwayService";
import { defaultBusinessGoalInitializer, getBGThumbnailAndName } from "../../utils/MPLViewUtils";
import { BusinessGoalComponent } from "../../view/businessGoal/BusinessGoalComponent";
import { BusinessGoalType } from "../../view/MPLView";
import { ColumnFieldData, TableWrapper } from "../../view/tables/TableWrapper";
import FilterSubmenu from "../FilterSubmenu";
import ReleaseModel from "../settings/InnovationCadenceView/ReleaseModel";
import { StatusFilterButtonInterface } from "../StatusFilterButton";
import { StatusMenuButton } from "../StatusMenuButton";
import AlertPopup from "../utils/AlertPopup/AlertPopup";
import AlertPopupModel from "../utils/AlertPopup/AlertPopupModel";
import Header from "../utils/Header/Header";
import SearchBarModel from "../utils/Header/SearchBar/SearchBarModel";
import ToggleSelectFieldModel from "../utils/Header/ToggleSelectField/ToggleSelectFieldModel";
import LoadingIcon from "../utils/LoadingIcon/LoadingIcon";
import { UserAvatar } from "../utils/UserAvatar/UserAvatar";
import HealthContainer from "./HealthContainer/HealthContainer";
import { PPLViewStyles } from "./PPLViewStyles";
import ReleaseTimelineBar from "./ReleaseTimelineBar/ReleaseTimelineBar";
import ReleaseTimelineHead from "./ReleaseTimelineHead/ReleaseTimelineHead";
import UserService from "../../services/UserService";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import { NodeEventContext } from "../../context/NodeEventContext";
import ReleaseService from "../../services/service/ReleaseService";
import { prepareAndSetFiveUnarchivedReleases } from "../../utils/ReleaseUtils";
import { businessUnits } from "../../constant/BusinessGoalDropdownValues";

export default function PPLView() {
    const pplViewStyleClasses = PPLViewStyles();

    const columnsAlignmentCenter = "center";
    const columnsAlignmentLeft = "left"
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const defaultColumnData: ColumnFieldData[] = [
        { dataKey: "dragIndicatorIcon", label: "", isSortable: false, isComponentColumn: false, alignment: columnsAlignmentCenter, returnsRowData: false, cellWidth: "3%" },
        { dataKey: "priorityNumber", label: "Priority", isSortable: true, isComponentColumn: false, alignment: columnsAlignmentCenter, returnsRowData: false, cellWidth: "5%" },
        { dataKey: "businessGoalName", label: "Name", isSortable: true, isComponentColumn: true, alignment: columnsAlignmentLeft, returnsRowData: true, cellWidth: "25%" },
        { dataKey: "owner", label: "Owner", isSortable: true, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "businessUnit", label: "Business Unit", isSortable: true, isComponentColumn: false, alignment: columnsAlignmentCenter, returnsRowData: false, cellWidth: "8%" },
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: columnsAlignmentCenter, returnsRowData: false, cellWidth: "10%" },
        { dataKey: "runwaysCount", label: "Runway(s)", isSortable: true, isComponentColumn: false, alignment: columnsAlignmentCenter, returnsRowData: false, cellWidth: "8%" },
        { dataKey: "health", label: "Health", isSortable: false, isComponentColumn: true, alignment: columnsAlignmentLeft, returnsRowData: false, cellWidth: "15%" }
    ];

    const businessUnitField: string = "businessUnit";

    const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
    const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
    const [businessGoalList, setBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [scheduledBGsCount, setScheduledBGsCount] = useState<number>(0);
    const [activeBGsCount, setActiveBGsCount] = useState<number>(0);
    const [completedBGsCount, setCompletedBGsCount] = useState<number>(0);
    const [selectedStatusValues, setSelectedStatusValues] = useState<string[]>([InnovationStatus.ACTIVE]);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>();
    const [columnData, setColumnData] = useState<ColumnFieldData[]>(defaultColumnData);
    const [businessGoalOperation, setBusinessGoalOperation] = useState<string>("NONE");
    const [modifiedBusinessGoal, setModifiedBusinessGoal] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    const [fiveReleasesList, setFiveReleasesList] = useState<ReleaseModel[]>([]);
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);
    const [searchedValue, setSearchedValue] = useState<string>("");
    const [businessGoalSelected, setBusinessGoalSelected] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    const [isDragDisabled, setIsDragDisabled] = useState<boolean>(false);
    const [openObjectView, setOpenObjectView] = React.useState<boolean>(false);
    const [businessGoals, setBusinessGoals] = useState<any[]>([]);
    const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);
    const [totalBusinessGoals, setTotalBusinessGoals] = useState<number>(0);
    const [triggerTable, setTriggerTable] = useState<boolean>(false);
    const [totalBusinessNotes, setTotalBusinessNotes] = useState<number>(0);
    const [previousBGName, setPreviousBGName] = useState<string>("");
    const isPriorityChangeable: boolean = lInnovationData.userPermission.businessGoal.isPriorityChangeable;
    const [usersListWithName, setUsersListWithName] = useState<UserListWithEmailModel[]>([]);
    const [runwayList, setRunwayList] = useState<RunwayModel[]>([]);
    const [isAllRunwaysSelected, setIsAllRunwaysSelected] = useState<boolean>(true);

    /**State to hold the array of Selected Business Unit value while filtering */
    const [selectedBusinessUnitsList, setSelectedBusinessUnitsList] = useState<string[]>([]);

    const BUSINESS_GOAL_LOCATION = INNOVATION_SITE_LOCATION + INNOVATION_BG_LOCATION + "/";

    useEffect(() => {
        UserService.getAdminAndProjectManagerUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersListWithName(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID]);

    const handleBGDataChange = (inTableData: BusinessGoalTableType[]) => {
        switch (businessGoalOperation) {
            case "UPDATE":
                let uIndex = -1;
                for (let businessGoalIndex = 0; businessGoalIndex < inTableData.length; ++businessGoalIndex) {
                    if (inTableData[businessGoalIndex].businessGoalName === modifiedBusinessGoal.businessGoalName) {
                        uIndex = businessGoalIndex;
                        break;
                    }
                    if (inTableData[businessGoalIndex].businessGoalName === previousBGName) {
                        uIndex = businessGoalIndex;
                        break;
                    }
                }
                inTableData.splice(uIndex, 1, {
                    ...modifiedBusinessGoal,
                    runwaysCount: modifiedBusinessGoal.runwaysList.length,
                    nodePath: lInnovationData.eskoAccountDetail.repoid + BUSINESS_GOAL_LOCATION + modifiedBusinessGoal.businessGoalName.toLowerCase()
                });
                setBusinessGoalSelected(modifiedBusinessGoal);
                break;
            case "STATUS_UPDATE":
                for (let tableRowData of inTableData) {
                    if (decodeURI(tableRowData.nodePath.toString()) === modifiedBusinessGoal.businessGoalName) {
                        tableRowData.status = modifiedBusinessGoal.status;
                        setBusinessGoalSelected({
                            ...businessGoalSelected,
                            status: modifiedBusinessGoal.status
                        });
                        break;
                    }
                }
                break;
            case "DELETE":
                if (totalBusinessGoals === inTableData.length && "" !== modifiedBusinessGoal.businessGoalName) {
                    let dIndex = -1;
                    for (let businessGoalIndex = 0; businessGoalIndex < totalBusinessGoals; ++businessGoalIndex) {
                        if (inTableData[businessGoalIndex].businessGoalName === modifiedBusinessGoal.businessGoalName) {
                            dIndex = businessGoalIndex;
                            break;
                        }
                    }
                    inTableData.splice(dIndex, 1);
                }
                break;
            case "PRIORITY_UPDATE":
                for (let tableRowData of inTableData) {
                    if (tableRowData.businessGoalName === modifiedBusinessGoal.businessGoalName) {
                        tableRowData.PPLPriority = modifiedBusinessGoal.PPLPriority;
                        setBusinessGoalSelected({
                            ...businessGoalSelected,
                            PPLPriority: modifiedBusinessGoal.PPLPriority
                        });
                        break;
                    }
                }
                break;
        }
        inTableData = businessGoalTableSorter(inTableData);
        setModifiedBusinessGoal(defaultBusinessGoalInitializer());
        setBusinessGoalOperation("NONE");
        return inTableData;
    };

    function businessGoalTableSorter(tableData: BusinessGoalTableType[]) {

        const lCompletedBusinessGoalList: BusinessGoalTableType[] = [];
        const lScheduledandActiveBusinessGoalList: BusinessGoalTableType[] = [];
        let lAllBusinessGoalList: BusinessGoalTableType[] = [];

        tableData.forEach((businessGoal: BusinessGoalTableType) => {
            if ("Completed" === businessGoal.status) {
                lCompletedBusinessGoalList.push(businessGoal);
            } else {
                lScheduledandActiveBusinessGoalList.push(businessGoal);
            }
        })

        lScheduledandActiveBusinessGoalList.sort((lFirstElementValue: any, lSecondElementValue: any) => {
            let lReturnValue: number = 0;
            if (lFirstElementValue["PPLPriority"].toLowerCase() < lSecondElementValue["PPLPriority"].toLowerCase()) {
                lReturnValue = -1;
            }
            if (lFirstElementValue["PPLPriority"].toLowerCase() > lSecondElementValue["PPLPriority"].toLowerCase()) {
                lReturnValue = 1;
            }
            if (lFirstElementValue["PPLPriority"].toLowerCase() === lSecondElementValue["PPLPriority"].toLowerCase()) {
                lReturnValue = 0;
            }
            return lReturnValue;
        });
        lAllBusinessGoalList = lScheduledandActiveBusinessGoalList.concat(lCompletedBusinessGoalList);

        return lAllBusinessGoalList;
    }

    useEffect(() => {
        setMainPageLoading(true);
        BusinessGoalService.getBusinessGoalListForPPLView(lInnovationData.eskoAccountDetail.repoid)
            .then((response: any) => {
                const bgList: BusinessGoalTableType[] = response;
                setBusinessGoalList(handleBGDataChange(bgList));
                response.forEach((bgData: BusinessGoalTableType) => {
                    if(bgData.nodeId === businessGoalSelected.nodeId) {
                        setBusinessGoalSelected(bgData);
                    }
                })
                setMainPageLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setMainPageLoading(false);
            });
    }, [lInnovationData, lNodeEventData.businessGoalsUpdated]);

    useEffect(() => {
        filterAndSetActiveBgsCount();
    }, [businessGoalList]);

    function filterAndSetScheduledBgsCount() {
        const count: number = businessGoalList.filter((bGData: BusinessGoalTableType) => {
            return InnovationStatus.SCHEDULED === bGData.status;
        }).length;
        setScheduledBGsCount(count);
    }

    function filterAndSetActiveBgsCount() {
        const count: number = businessGoalList.filter((bGData: BusinessGoalTableType) => {
            return InnovationStatus.ACTIVE === bGData.status;
        }).length;
        setActiveBGsCount(count);
    }

    function filterAndSetCompletedBgsCount() {
        const count: number = businessGoalList.filter((bGData: BusinessGoalTableType) => {
            return InnovationStatus.COMPLETED === bGData.status;
        }).length;
        setCompletedBGsCount(count);
    }

    const statusFilterButtonsList: StatusFilterButtonInterface[] = [
        { BGCount: scheduledBGsCount, buttonTitle: InnovationStatus.SCHEDULED },
        { BGCount: activeBGsCount, buttonTitle: InnovationStatus.ACTIVE },
        { BGCount: completedBGsCount, buttonTitle: InnovationStatus.COMPLETED }
    ];

    useEffect(() => {
        undefined === selectedStatusValues.find(() => { "Scheduled" }) ? setScheduledBGsCount(0) : filterAndSetScheduledBgsCount();
        undefined === selectedStatusValues.find(() => { "Active" }) ? setActiveBGsCount(0) : filterAndSetActiveBgsCount();
        undefined === selectedStatusValues.find(() => { "Completed" }) ? setCompletedBGsCount(0) : filterAndSetCompletedBgsCount();
    }, [selectedStatusValues]);

    useEffect(() => {
        const cashedSelectedStatusValues = window.sessionStorage.getItem("pplViewStatus");
        if (cashedSelectedStatusValues !== null && cashedSelectedStatusValues.split(",") !== undefined) {
            setSelectedStatusValues(cashedSelectedStatusValues.split(","));
        }
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("pplViewStatus", selectedStatusValues.toString());
    }, [selectedStatusValues]);

    const handleBGRowClick = (data: any) => {
        let clickedBGData = JSON.parse(JSON.stringify(data));
        clickedBGData["businessGoalName"] = clickedBGData["businessGoalName"].componentValue;
        clickedBGData["owner"] = clickedBGData["owner"].componentValue;
        clickedBGData["status"] = data["status"].componentValue;
        setValuesOnBGSelect(clickedBGData);
    };

    useEffect(() => {
        setMainPageLoading(true);
        ReleaseService.getReleases(lInnovationData.eskoAccountDetail.repoid, 99, false)
            .then((releasesResponse: ReleaseModel[]) => {
                setFiveReleasesList(prepareAndSetFiveUnarchivedReleases(releasesResponse));
                setMainPageLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setMainPageLoading(false);
            });
    }, [lNodeEventData.releasesUpdated]);

    useEffect(() => {
        setTriggerTable(!triggerTable);
        let holdStatusValue = window.sessionStorage.getItem("pplViewStatus");
        if (holdStatusValue !== null && holdStatusValue.split(",") !== undefined) {
            setSelectedStatusValues(holdStatusValue.split(","));
        }

        let holdRunwaysValue = window.sessionStorage.getItem("pplViewRunwaysFilter");
        RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
            .then((response: RunwayModel[]) => {
                setRunwayList(response);
                /**Set the nodeIds of every Active Runways Checked */
                let tempCheckedRunwaysList: string[] = []
                tempCheckedRunwaysList = tempCheckedRunwaysList.concat("no_runways");
                response.forEach((runway: RunwayModel) => {
                    tempCheckedRunwaysList = tempCheckedRunwaysList.concat(runway.nodeId);
                })
                if (holdRunwaysValue == null || holdRunwaysValue.split(",") == undefined) {
                    setSelectedRunwaysList(tempCheckedRunwaysList);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
        if (holdRunwaysValue !== null && holdRunwaysValue.split(",") !== undefined) {
            setSelectedRunwaysList(holdRunwaysValue.split(","));
        }
        let holdBusinessUnitsValue = window.sessionStorage.getItem("pplViewBusinessUnitsFilter");
        if (holdBusinessUnitsValue !== null && holdBusinessUnitsValue.split(",") !== undefined) {
            setSelectedBusinessUnitsList(holdBusinessUnitsValue.split(","));
        } else {
            setSelectedBusinessUnitsList(businessUnits);
        }
        /**Get the existing search data */
        let holdSearchValue = window.sessionStorage.getItem("searchPPLBusinessGoal");
        if (holdSearchValue !== null) {
            setSearchedValue(holdSearchValue);
        }
    }, [lNodeEventData.runwaysUpdated]);

    useEffect(() => {
        setTotalBusinessGoals(businessGoalList.length);
        tableComponentsBuilder(JSON.parse(JSON.stringify(businessGoalList)));
        setMainPageLoading(false);
    }, [businessGoalList, selectedStatusValues, selectedRunwaysList, isDragDisabled, modifiedBusinessGoal, usersListWithName, selectedBusinessUnitsList]);

    useEffect(() => {
        if (selectedRunwaysList.length - 1 === runwayList.length) {
            setIsAllRunwaysSelected(true);
        } else {
            setIsAllRunwaysSelected(false);
        }
    }, [selectedRunwaysList, runwayList]);

    useEffect(() => {
        setMainPageLoading(true);
        RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
            .then((runwaysResponse: RunwayModel[]) => {
                setCheckedRunways(runwaysResponse);
                setMainPageLoading(false);
            })
            .catch(() => {
                showError(INTERNAL_SERVER_ERROR);
            });
    }, [lNodeEventData.runwaysUpdated]);

    /**When user enters search string update the same in the sessionStorage */
    useEffect(() => {
        window.sessionStorage.setItem("searchPPLBusinessGoal", searchedValue.toString());
    }, [searchedValue]);

    function setCheckedRunways(runwaysResponse: RunwayModel[]) {
        const cashedCheckedRunways = window.sessionStorage.getItem("pplViewRunwaysFilter");
        if (cashedCheckedRunways !== null && cashedCheckedRunways.split(",") !== undefined && "" !== cashedCheckedRunways) {
            setSelectedRunwaysList(cashedCheckedRunways.split(","));
        } else {
            const checkedRunwaysArray: string[] = [];
            checkedRunwaysArray.push("no_runways");
            runwaysResponse.forEach((runway) => {
                if (undefined !== runway.nodeId) {
                    checkedRunwaysArray.push(runway.nodeId);
                }
            });
            setSelectedRunwaysList([...checkedRunwaysArray]);
        }
    }

    useEffect(() => {
        if ("" === selectedRunwaysList[0]) {
            selectedRunwaysList.splice(0, 1);
        }
        window.sessionStorage.setItem("pplViewRunwaysFilter", selectedRunwaysList.toString());
    }, [selectedRunwaysList]);

    useEffect(() => {
        if ("" === selectedBusinessUnitsList[0]) {
            selectedBusinessUnitsList.splice(0, 1);
        }
        window.sessionStorage.setItem("pplViewBusinessUnitsFilter", selectedBusinessUnitsList.toString());
    }, [selectedBusinessUnitsList]);

    function showError(message: string) {
        setMainPageLoading(false);
        setTimeout(function () {
            setAlertPopupData({
                isOpen: true,
                content: message,
                severity: "error",
                handleCloseButtonClick: () => {
                    setAlertPopupData({ isOpen: false });
                }
            });
        }, 100);
    }

    const searchBarData: SearchBarModel = {
        value: searchedValue,
        handleChange: (evt: any) => {
            evt.preventDefault();
            setSearchedValue(evt.target.value);
        },
        handleCloseIconClick: () => {
            setSearchedValue("");
        }
    };

    const toggleSelectFieldData: ToggleSelectFieldModel = {
        defaultValue: "Health",
        menuOptions: [
            { value: "Health", option: <SupervisorAccountIcon fontSize="medium" /> },
            { value: "Timeline", option: <DateRangeIcon fontSize="medium" /> }
        ],
        handleChange: (evt: any) => {
            evt.preventDefault();
            setSelectedDropdownValue(evt.target.value);
        }
    };

    const priorityChange = (inBusinessGoalName: string, inPrevPriority: string, inNextPriority: string) => {
        setMainPageLoading(true);
        BusinessGoalService.innovationChangePriority(lInnovationData.eskoAccountDetail.repoid, inBusinessGoalName, inPrevPriority, inNextPriority, "PPL")
            .then((priorityChangeResponse: any) => {
                setBusinessGoalOperation("PRIORITY_UPDATE");
                setModifiedBusinessGoal({
                    ...modifiedBusinessGoal,
                    businessGoalName: inBusinessGoalName,
                    PPLPriority: priorityChangeResponse.result.PPLPriority
                });
                lInnovationData.renderVarUpdateFunction();
                setMainPageLoading(false);
                setAlertPopupData({
                    isOpen: true,
                    content: priorityChangeResponse.message,
                    severity: "success",
                    handleCloseButtonClick: () => {
                        setAlertPopupData({ isOpen: false });
                    }
                });
            })
            .catch(() => {
                showError(INTERNAL_SERVER_ERROR);
            });
    }

    const setValuesOnBGSelect = (data: BusinessGoalTableType) => {
        setBusinessGoalSelected({
            nodeId: data.nodeId,
            MPLPriority: data.MPLPriority,
            PPLPriority: data.PPLPriority,
            businessGoalName: data.businessGoalName,
            problemDefinition: data.problemDefinition,
            briefDescription: data.briefDescription,
            owner: data.owner,
            goalType: data.goalType,
            businessUnit: data.businessUnit,
            status: data.status,
            businessCaseData: data.businessCaseData,
            runwaysList: data.runwaysList,
            productsList: data.productsList,
            targetMarketScore: data.targetMarketScore,
            channelPartnerScore: data.channelPartnerScore,
            positioningScore: data.positioningScore,
            ideaTypeScore: data.ideaTypeScore,
            riskScore: data.riskScore,
            thumbnail: data.thumbnail,
            freedomToOperate: data.freedomToOperate,
            potentialIp: data.potentialIp,
            potentialIpDescription: data.potentialIpDescription,
            milestones: data.milestones,
            releaseTimelineData: data.releaseTimelineData,
            slides: data.slides,
            coreTeam: data.coreTeam,
            healthData: data.healthData
        });
        setOpenObjectView(true);
    };

    useEffect(() => {
        if ("Timeline" === selectedDropdownValue) {
            const releaseTimelineHead: JSX.Element = <ReleaseTimelineHead fiveUnarchivedReleases={fiveReleasesList} />;
            setColumnData([
                { dataKey: "dragIndicatorIcon", label: "", isSortable: false, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "1%" },
                { dataKey: "priorityNumber", label: "Priority", isSortable: true, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "3%" },
                { dataKey: "businessGoalName", label: "Name", isSortable: true, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "33%" },
                { dataKey: "owner", label: "Owner", isSortable: true, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "3%" },
                { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "8%" },
                { dataKey: "releaseTimeline", label: releaseTimelineHead, isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "50%" }
            ]);
        } else if ("Health" === selectedDropdownValue) {
            setColumnData(defaultColumnData);
        }
    }, [lInnovationData.eskoAccountDetail, selectedDropdownValue, fiveReleasesList]);

    function getDragIndicatorIcon(disableForStatus: boolean) {
        return <DragIndicatorIcon
            color={!isPriorityChangeable || isDragDisabled ? "disabled" : "inherit"}
            style={{ cursor: isPriorityChangeable ? "default" : "not-allowed" }}
            titleAccess={!isPriorityChangeable ? BG_ORDERING_NO_PERMISSION : (isDragDisabled ? BG_ORDERING_DISABLED_TOOLTIP_PPL_VIEW : "")}
        />;
    }

    const tableComponentsBuilder = (bgList: any[]) => {
        let lpriorityNumber = 1;
        let lRowNumbering = 1;
        let lActiveCount = 0;
        let lScheduledCount = 0;
        let lCompletedCount = 0;

        const lBusinessGoalTableData: any[] = [];

        bgList.forEach((businessGoalData: any) => {

            // businessGoalName
            let lthumbnailImage: any = images.EskoStarPng;
            if (undefined !== businessGoalData["thumbnail"]) {
                lthumbnailImage = businessGoalData["thumbnail"];
            }
            const bgName: string = businessGoalData["businessGoalName"];
            if ("string" === typeof (businessGoalData["businessGoalName"])) {
                const lthumbnail = getBGThumbnailAndName(lthumbnailImage, bgName);
                const lBusinessGoalNameDetail = {
                    "displayComponent": lthumbnail,
                    "componentValue": bgName
                };
                businessGoalData["businessGoalName"] = lBusinessGoalNameDetail;
            }

            //owner
            if (undefined !== businessGoalData["owner"]) {
                const lOwnerEmail: string = "string" === typeof (businessGoalData["owner"]) ?
                    businessGoalData["owner"] : businessGoalData["owner"].componentValue;
                const userDetail: any = usersListWithName.find(o => o.email === lOwnerEmail);
                const lOwnerName: string = userDetail != undefined ? userDetail.displayName : lOwnerEmail;

                const lOwnerBadge = <UserAvatar
                    avatarSize="40px"
                    displayText={false}
                    userName={lOwnerName} />;
                const holdOwnerDetail = {
                    "displayComponent": lOwnerBadge,
                    "componentValue": lOwnerEmail
                };
                businessGoalData["owner"] = holdOwnerDetail;
            }

            //status
            if (("string" === typeof (businessGoalData["status"]) && InnovationStatus.ACTIVE.toLowerCase() === businessGoalData["status"].toLowerCase())
                || ("string" !== typeof (businessGoalData["status"]) && InnovationStatus.ACTIVE.toLowerCase() === businessGoalData["status"].componentValue.toLowerCase())) {

                // dragIndicatorIcon
                businessGoalData.dragIndicatorIcon = getDragIndicatorIcon(false);

                businessGoalData["id"] = lRowNumbering;
                businessGoalData["priorityNumber"] = lpriorityNumber;

                lpriorityNumber++;
                lActiveCount++;

                //do not disable dragAndDrop for active bg
                businessGoalData["isDragAndDropDisabledForStatus"] = false;

                businessGoalData["status"] = {
                    displayComponent: <StatusMenuButton
                        businessGoalName={bgName}
                        defaultValue={InnovationStatus.ACTIVE}
                        nodePath={decodeURIComponent(businessGoalData["nodePath"])}
                        callBack={statusChange} />,
                    componentValue: InnovationStatus.ACTIVE
                };
                if (-1 != selectedStatusValues.indexOf(InnovationStatus.ACTIVE) && -1 != selectedBusinessUnitsList.indexOf(businessGoalData[businessUnitField])) {
                    if ((-1 != selectedRunwaysList.indexOf("no_runways") && 0 === businessGoalData["runwaysList"].length)) {
                        ++lRowNumbering;
                        lBusinessGoalTableData.push(businessGoalData);
                    }
                    else {
                        selectedRunwaysList.every((runwayNodeId) => {
                            if (-1 != businessGoalData["runwaysList"].indexOf(runwayNodeId)) {
                                ++lRowNumbering;
                                lBusinessGoalTableData.push(businessGoalData);
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                    }
                }
            }
            if (("string" === typeof (businessGoalData["status"]) && InnovationStatus.SCHEDULED.toLowerCase() === businessGoalData["status"].toLowerCase())
                || ("string" !== typeof (businessGoalData["status"]) && InnovationStatus.SCHEDULED.toLowerCase() === businessGoalData["status"].componentValue.toLowerCase())) {

                // dragIndicatorIcon
                businessGoalData.dragIndicatorIcon = getDragIndicatorIcon(false);

                businessGoalData["id"] = lRowNumbering;
                businessGoalData["priorityNumber"] = lpriorityNumber;

                lpriorityNumber++;
                lScheduledCount++;

                //do not disable dragAndDrop for scheduled bg
                businessGoalData["isDragAndDropDisabledForStatus"] = false;

                businessGoalData["status"] = {
                    displayComponent: <StatusMenuButton
                        businessGoalName={bgName}
                        defaultValue={InnovationStatus.SCHEDULED}
                        nodePath={decodeURIComponent(businessGoalData["nodePath"])}
                        callBack={statusChange} />,
                    componentValue: InnovationStatus.SCHEDULED
                };
                if (-1 != selectedStatusValues.indexOf(InnovationStatus.SCHEDULED) && -1 != selectedBusinessUnitsList.indexOf(businessGoalData[businessUnitField])) {
                    if ((-1 != selectedRunwaysList.indexOf("no_runways") && 0 === businessGoalData["runwaysList"].length)) {
                        ++lRowNumbering;
                        lBusinessGoalTableData.push(businessGoalData);
                    }
                    else {
                        selectedRunwaysList.every((runwayNodeId) => {
                            if (-1 != businessGoalData["runwaysList"].indexOf(runwayNodeId)) {
                                ++lRowNumbering;
                                lBusinessGoalTableData.push(businessGoalData);
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                    }
                }
            }
            if (("string" === typeof (businessGoalData["status"]) && InnovationStatus.COMPLETED.toLowerCase() === businessGoalData["status"].toLowerCase())
                || ("string" !== typeof (businessGoalData["status"]) && InnovationStatus.COMPLETED.toLowerCase() === businessGoalData["status"].componentValue.toLowerCase())) {

                // dragIndicatorIcon
                businessGoalData.dragIndicatorIcon = getDragIndicatorIcon(true);

                businessGoalData["id"] = lRowNumbering;

                lCompletedCount++;

                //do disable dragAndDrop for completed bg
                businessGoalData["isDragAndDropDisabledForStatus"] = true;

                businessGoalData["status"] = {
                    displayComponent: <StatusMenuButton
                        businessGoalName={bgName}
                        defaultValue={InnovationStatus.COMPLETED}
                        nodePath={decodeURIComponent(businessGoalData["nodePath"])}
                        callBack={statusChange} />,
                    componentValue: InnovationStatus.COMPLETED
                };
                if (-1 != selectedStatusValues.indexOf(InnovationStatus.COMPLETED) && -1 != selectedBusinessUnitsList.indexOf(businessGoalData[businessUnitField])) {
                    if ((-1 != selectedRunwaysList.indexOf("no_runways") && 0 === businessGoalData["runwaysList"].length)) {
                        ++lRowNumbering;
                        lBusinessGoalTableData.push(businessGoalData);
                    }
                    else {
                        selectedRunwaysList.every((runwayNodeId) => {
                            if (-1 != businessGoalData["runwaysList"].indexOf(runwayNodeId)) {
                                ++lRowNumbering;
                                lBusinessGoalTableData.push(businessGoalData);
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                    }
                }
            }

            //health
            const lhealth = <HealthContainer bgHealth={businessGoalData["healthData"]} />;
            const lHealthDetail = {
                "displayComponent": lhealth,
                "componentValue": businessGoalData["healthData"]
            };
            businessGoalData.health = lHealthDetail;

            //releaseTimeline
            const releaseTimelineRow = <ReleaseTimelineBar
                fiveUnarchivedReleases={fiveReleasesList}
                releaseTimelineData={businessGoalData["releaseTimelineData"]} />;
            const lReleaseTimeline = {
                "displayComponent": releaseTimelineRow,
                "componentValue": businessGoalData["releaseTimelineData"]
            };
            businessGoalData.releaseTimeline = lReleaseTimeline;
        });
        setBusinessGoals(lBusinessGoalTableData);
        setScheduledBGsCount(lScheduledCount);
        setActiveBGsCount(lActiveCount);
        setCompletedBGsCount(lCompletedCount);
    };

    const statusChange = (inNodePath: string, inBusinessGoalName: string, inStatusValue: string, inPrevStatusValue: string) => {
        setMainPageLoading(true);
        BusinessGoalService.innovationBusinessGoalStatusUpdate(
            lInnovationData.eskoAccountDetail.repoid,
            inBusinessGoalName,
            inPrevStatusValue,
            inStatusValue
        )
            .then(() => {
                setBusinessGoalOperation("STATUS_UPDATE");
                setModifiedBusinessGoal({
                    ...modifiedBusinessGoal,
                    businessGoalName: inNodePath,
                    status: inStatusValue.trim()
                });
                lInnovationData.renderVarUpdateFunction();
                setMainPageLoading(false);
            })
            .catch(() => {
                showError(INTERNAL_SERVER_ERROR);
            });
    };

    const reOrderTopicList = (dataList: any[], startIndex: number, endIndex: number) => {
        let componentValue: string = businessGoals[startIndex - 1].businessGoalName.componentValue ? businessGoals[startIndex - 1].businessGoalName.componentValue : "";
        let prevPriority: string = "";
        let nextPriority: string = "";
        if (1 === endIndex) {
            nextPriority = businessGoals[endIndex - 1].PPLPriority;
        } else if (dataList.length === endIndex) {
            prevPriority = businessGoals[endIndex - 1].PPLPriority;
        } else if (startIndex < endIndex) {
            prevPriority = businessGoals[endIndex - 1].PPLPriority;
            nextPriority = businessGoals[endIndex].PPLPriority;
        } else if (startIndex > endIndex) {
            prevPriority = businessGoals[endIndex - 2].PPLPriority;
            nextPriority = businessGoals[endIndex - 1].PPLPriority;
        }
        if (undefined !== priorityChange) {
            priorityChange(componentValue, prevPriority, nextPriority);
        }
    };

    const handleTopicDragEvent = (businessGoalDragEndEvent: any) => {
        if (!businessGoalDragEndEvent.destination) {
            return;
        }
        reOrderTopicList(
            businessGoals,
            businessGoalDragEndEvent.source.index,
            businessGoalDragEndEvent.destination.index
        );
    };

    const contextSettings = {
        "modifiedBusinessGoal": modifiedBusinessGoal,
        "setModifiedBusinessGoal": setModifiedBusinessGoal,
        "businessGoalOperation": businessGoalOperation,
        "setBusinessGoalOperation": setBusinessGoalOperation,
        "handleBGDataChange": handleBGDataChange,
        "totalBusinessGoals": totalBusinessGoals,
        "totalBusinessNotes": totalBusinessNotes,
        "setTotalBusinessGoals": setTotalBusinessGoals,
        "setTotalBusinessNotes": setTotalBusinessNotes,
        "previousBGName": previousBGName,
        "setPreviousBGName": setPreviousBGName,
        "selectedStatusValues": selectedStatusValues,
        "setSelectedStatusValues": setSelectedStatusValues,
        "selectedRunwaysList": selectedRunwaysList,
        "setSelectedRunwaysList": setSelectedRunwaysList,
        "selectedBusinessUnitsList": selectedBusinessUnitsList,
        "setSelectedBusinessUnitsList": setSelectedBusinessUnitsList,
    };

    return (
        <Grid container>
            <Grid item className={pplViewStyleClasses.filterMenu}>
                <FilterSubmenu
                    view="PPL"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    listOfButtons={statusFilterButtonsList}
                    selectedStatusValues={selectedStatusValues}
                    setSelectedStatusValues={setSelectedStatusValues}
                    selectedRunwaysList={selectedRunwaysList}
                    setSelectedRunwaysList={setSelectedRunwaysList}
                    selectedBusinessUnitsList={selectedBusinessUnitsList}
                    setSelectedBusinessUnitsList={setSelectedBusinessUnitsList} />
            </Grid>
            <Grid item className={pplViewStyleClasses.pplGridRoot} style={{ marginLeft: openFilterMenu ? "315px" : "80px" }}>
                <Grid item
                    className={pplViewStyleClasses.pplGridItem} >
                    <MPLViewContext.Provider value={contextSettings}>
                        <Box ml={3} mt={3} className={pplViewStyleClasses.pplViewBox}>
                            <ThemeProvider theme={LightTheme}>
                                <Grid container
                                    spacing={2}
                                    alignContent="center"
                                    className={pplViewStyleClasses.pplBodyContainer}>

                                    <Header
                                        currentPageHeading="PPL"
                                        searchBar={searchBarData}
                                        toggleSelectField={toggleSelectFieldData} />
                                </Grid>
                                <Grid item className={pplViewStyleClasses.tableWrapperContainer} style={{
                                    opacity: mainPageLoading ? 0.5 : 1,
                                    pointerEvents: mainPageLoading ? "none" : "all"
                                }}>
                                    <TableWrapper
                                        borderedRow={false}
                                        tableHeight={"80%"}
                                        zIndexValue={1}
                                        onRowClickCallBack={handleBGRowClick}
                                        inputData={businessGoals}
                                        inputColumn={columnData}
                                        customMessageOnEmpty={"No Business Goals added yet"}
                                        inputSearchData={searchedValue}
                                        inputSearchableField={["businessGoalName", "owner", businessUnitField]}
                                        tableWidth={"auto"}
                                        isDragDisabled={!isPriorityChangeable ? true : isDragDisabled}
                                        setIsDragDisabled={setIsDragDisabled}
                                        handleTopicDragEvent={handleTopicDragEvent}
                                        isNoFilterApplied={selectedStatusValues.indexOf("Scheduled") > -1
                                            && selectedStatusValues.indexOf("Active") > -1 && selectedStatusValues.indexOf("Completed") < 0 && isAllRunwaysSelected
                                            && businessUnits.length === selectedBusinessUnitsList.length} />
                                </Grid>
                                <BusinessGoalComponent
                                    openAddDialog={openAddDialog}
                                    setOpenAddDialog={setOpenAddDialog}
                                    lastBusinessGoal={businessGoalList[businessGoalList.length - 1]}
                                    businessGoalSelected={businessGoalSelected}
                                    openObjectView={openObjectView}
                                    setOpenObjectView={setOpenObjectView}
                                    listOfBusinessGoals={businessGoalList}
                                    setBusinessGoalSelected={setBusinessGoalSelected} />
                            </ThemeProvider>
                        </Box>
                    </MPLViewContext.Provider>
                </Grid>
            </Grid>
            {
                alertPopupData.isOpen &&
                <AlertPopup
                    isOpen={alertPopupData.isOpen}
                    severity={alertPopupData.severity}
                    content={alertPopupData.content}
                    handleCloseButtonClick={alertPopupData.handleCloseButtonClick} />
            }

            {mainPageLoading && <LoadingIcon />}
        </Grid >
    )
}
