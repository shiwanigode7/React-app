/**TSX file with the table component to display business goal */
import { Avatar, CircularProgress, Snackbar, Tooltip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { StatusMenuButton } from "../../components/StatusMenuButton";
import ThumbnailWithName from "../../components/utils/ThumbnailWithName/ThumbnailWithName";
import { businessUnits } from "../../constant/BusinessGoalDropdownValues";
import { BG_ORDERING_DISABLED_TOOLTIP, BG_ORDERING_NO_PERMISSION } from "../../constant/BusinessGoalTexts";
import { ALERT_SEVERITY } from "../../constant/InnovationEnums";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { MPLViewContext } from "../../context/MPLViewContext";
import { BusinessGoalTableType, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import UserService from "../../services/UserService";
import { RiskScoreAvatarTheme } from "../../themes/TableTheme";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../utils/UserAvatarColorFunction";
import { ColumnFieldData, TableWrapper } from "./TableWrapper";

/**Interface for the inputProps */
declare interface BusinessGoalTableProps {
    /**the callback function to be passed
     * Note: Must have only one parameter
     */
    callBackFunction: any;
    /**Search parameter */
    searchParameter: string;
    /**to set the count of Ideation Business Goal Count */
    setIdeationBGCount: React.Dispatch<React.SetStateAction<number>>;
    /**to set the count of Scheduled Business Goal Count */
    setScheduledBGCount: React.Dispatch<React.SetStateAction<number>>;
    /**State with the list of all the business goal */
    businessGoalCompleteList: BusinessGoalTableType[];
    /**State and setState to manage the loading animation of the table */
    loadingIcon: boolean;
    setLoadingIcon: React.Dispatch<React.SetStateAction<boolean>>;
    selectedStatusValues?: string[];
    isAllRunwaysSelected: boolean;
}

/**Table component for business goal table list view.
 * Excepts a single callback function props, the callback function 
 * has a single parameter 
 */
export function BusinessGoalTable(inputProps: BusinessGoalTableProps) {

    /**Importing the context data */
    const lInnovationData = useContext(InnovationAppContext);
    const lMPLViewData = useContext(MPLViewContext);
    /**Array to hold the list of all the business goal data */
    const [businessGoals, setBusinessGoals] = useState<any[]>([]);
    /**Alert based images */
    const ALERT_DURATION: number = 3000;
    /**State to manage Alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [isDragDisabled, setIsDragDisabled] = useState(false);
    const [alertContent, setAlertContent] = useState<string>("");
    const [alertSeverity, setAlertSeverity] = useState<any>(ALERT_SEVERITY.SUCCESS.trim());
    const isPriorityChangeable: boolean = lInnovationData.userPermission.businessGoal.isPriorityChangeable;

    /**Importing the theme for Risk Score Avatar */
    const RiskScoreTheme = RiskScoreAvatarTheme();

    const businessUnitField: string = "businessUnit";

    const [usersListWithName, setUsersListWithName] = useState<UserListWithEmailModel[]>([]);

    /**List of column to be displayed */
    const columnData: ColumnFieldData[] = [
        { dataKey: "dragIndicatorIcon", label: "", isSortable: false, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "3%" },
        { dataKey: "priorityNumber", label: "Priority", isSortable: true, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "businessGoalName", label: "Name", isSortable: true, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "47%" },
        { dataKey: "owner", label: "Owner", isSortable: true, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "runwaysCount", label: "Runway(s)", isSortable: true, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "businessUnit", label: "Business Unit", isSortable: true, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "riskScore", label: "Risk #", isSortable: true, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "10%" }
    ];

    useEffect(() => {
        UserService.getAdminAndProjectManagerUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersListWithName(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID]);

    /**To update the  table when the business goal list is updated */
    useEffect(() => {
        /**Set the total length of the data currently present  */
        lMPLViewData.setTotalBusinessGoals(inputProps.businessGoalCompleteList.length);
        /**To build the UI components for ideation and scheduled. Also making a deep copy to make sure that the changes
         * made in the tableComponentBuilder doesn't affect the actual business goal list.
        */
        tableComponentsBuilder(JSON.parse(JSON.stringify(inputProps.businessGoalCompleteList)));
        /**When the data has been split and set to the respective state variable
         * stop the loading animation
         */
        inputProps.setLoadingIcon(false);
    }, [inputProps.businessGoalCompleteList, lMPLViewData.selectedStatusValues, lMPLViewData.selectedRunwaysList, lMPLViewData.selectedBusinessUnitsList, isDragDisabled, usersListWithName, inputProps.isAllRunwaysSelected]);

    const statusChange = (inNodePath: string, inBusinessGoalName: string, inStatusValue: string, inPrevStatusValue: string) => {
        inputProps.setLoadingIcon(true);
        /**Call the repo to update the status */
        BusinessGoalService.innovationBusinessGoalStatusUpdate(
            lInnovationData.eskoAccountDetail.repoid,
            inBusinessGoalName,
            inPrevStatusValue,
            inStatusValue
        )
            .then((_statusUpdateResponse: any) => {
                lMPLViewData.setBusinessGoalOperation("STATUS_UPDATE");
                lMPLViewData.setModifiedBusinessGoal({
                    ...lMPLViewData.modifiedBusinessGoal,
                    businessGoalName: inNodePath,
                    status: inStatusValue.trim()
                });
                lInnovationData.renderVarUpdateFunction();
                inputProps.setLoadingIcon(false);
            })
            .catch((statusUpdateError: any) => {
                console.log(statusUpdateError);
                inputProps.setLoadingIcon(false);
            });
    };

    const priorityChange = (inBusinessGoalName: string, inPrevPriority: string, inNextPriority: string) => {
        inputProps.setLoadingIcon(true);
        BusinessGoalService.innovationChangePriority(lInnovationData.eskoAccountDetail.repoid, inBusinessGoalName, inPrevPriority, inNextPriority, "MPL")
            .then((priorityChangeResponse: any) => {
                lMPLViewData.setBusinessGoalOperation("PRIORITY_UPDATE");
                lMPLViewData.setModifiedBusinessGoal({
                    ...lMPLViewData.modifiedBusinessGoal,
                    businessGoalName: inBusinessGoalName,
                    MPLPriority: priorityChangeResponse.result.MPLPriority
                });
                lInnovationData.renderVarUpdateFunction();
                inputProps.setLoadingIcon(false);
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(priorityChangeResponse.message);
            })
            .catch((priorityChangeError: any) => {
                console.log(priorityChangeError);
                inputProps.setLoadingIcon(false);
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent("The updation of Business Goal Priority was unsuccessfull");
            });
    }

    const reOrderTopicList = (dataList: any[], startIndex: number, endIndex: number) => {
        let componentValue: string = businessGoals[startIndex - 1].businessGoalName.componentValue ? businessGoals[startIndex - 1].businessGoalName.componentValue : "";
        let prevPriority: string = "";
        let nextPriority: string = "";
        if (1 === endIndex) {
            nextPriority = businessGoals[endIndex - 1].MPLPriority;
        } else if (dataList.length === endIndex) {
            prevPriority = businessGoals[endIndex - 1].MPLPriority;
        } else if (startIndex < endIndex) {
            prevPriority = businessGoals[endIndex - 1].MPLPriority;
            nextPriority = businessGoals[endIndex].MPLPriority;
        } else if (startIndex > endIndex) {
            prevPriority = businessGoals[endIndex - 2].MPLPriority;
            nextPriority = businessGoals[endIndex - 1].MPLPriority;
        }
        if (undefined !== priorityChange) {
            priorityChange(componentValue, prevPriority, nextPriority);
        }
    };

    const handleTopicDragEvent = (businessGoalDragEndEvent: any) => {
        if (!businessGoalDragEndEvent.destination) {
            return;
        }
        /**Store the resultant array */
        reOrderTopicList(
            businessGoals,
            businessGoalDragEndEvent.source.index,
            businessGoalDragEndEvent.destination.index
        );
    }

    /**Function to create component for owner and status, and to separate the 
     * data based on status value (Ideation or Scheduled)
     */
    const tableComponentsBuilder = (businessGoalList: any[]) => {
        /**variables for auto numbering */
        let lRowNumbering = 1;
        let lIdeationCount = 0;
        let lScheduledCount = 0;
        /**array for businessGoals*/
        const lBusinessGoalTableData: any[] = [];
        /**Iterate over each business goal data */
        businessGoalList.forEach((businessGoalData: any, index: number) => {

            let lBusinessGoal: any = JSON.parse(JSON.stringify(businessGoalData));

            lBusinessGoal.dragIndicatorIcon = <DragIndicatorIcon
                color={!isPriorityChangeable || isDragDisabled ? "disabled" : "inherit"}
                style={{ cursor: isPriorityChangeable ? "default" : "not-allowed" }}
                titleAccess={!isPriorityChangeable ? BG_ORDERING_NO_PERMISSION : (isDragDisabled ? BG_ORDERING_DISABLED_TOOLTIP : "")}
            />;

            // Business goal name component
            /**Can be removed in the future as every BG will have thumbnail property */
            let lThumbnailImage: any = images.EskoStarPng;
            if (undefined !== businessGoalData["thumbnail"]) {
                lThumbnailImage = businessGoalData["thumbnail"];
            }

            const lthumbnail = <ThumbnailWithName
                thumbnailAltText="Business Goal Thumbnail"
                src={lThumbnailImage}
                name={businessGoalData["businessGoalName"]}
                isNameBold={false}
                tooltipText={businessGoalData["businessGoalName"]}
                tooltipPlacement="bottom"
                nameGridItemMaxWidth="160px" />;

            const lBusinessGoalNameDetail = {
                "displayComponent": lthumbnail,
                "componentValue": businessGoalData["businessGoalName"]
            }
            lBusinessGoal["businessGoalName"] = lBusinessGoalNameDetail


            /**Creating owner badge component */
            if (businessGoalData["owner"] !== undefined) {
                /**Saving the name of business goal owner
                 * Note: Reason for the ternary operation is to avoid 
                 * the holdOwnerDetail being assigned to componentvalue
                 * Reason for the holdOwnerDetail is because the rendering occurs twice
                 * due to strict mode (Strict mode not seem to be activated, must understand more)
                 * and also due to the value getting assigned by reference
                 */
                const lOwnerEmail: string = typeof (businessGoalData["owner"]) === "string" ?
                    businessGoalData["owner"] :
                    businessGoalData["owner"].componentValue;
                const userDetail: any = usersListWithName.find(o => o.email === lOwnerEmail);
                const lOwnerName: string = userDetail != undefined ? userDetail.displayName : lOwnerEmail;
                /**Defining the user badge */
                const lOwnerBadge = <Tooltip
                    title={lOwnerName}
                    placement="bottom"
                    arrow>
                    <Avatar
                        style={{
                            height: "40px",
                            width: "40px",
                            marginTop: "-1px",
                            fontSize: "16px",
                            color: userAvatarTextColor(lOwnerName),
                            backgroundColor: userAvatarBackgroundColor(lOwnerName)
                        }}
                    >
                        {
                            (
                                lOwnerName.split(", ")[1] !== undefined ?
                                    lOwnerName.split(", ")[1].charAt(0) :
                                    ""
                            ) +
                            (
                                lOwnerName.split(", ")[0] !== undefined ?
                                    lOwnerName.split(", ")[0].charAt(0) :
                                    ""
                            )
                        }
                    </Avatar>
                </Tooltip>
                /**Create an object to hold both the component and the value */
                const holdOwnerDetail = {
                    /**The react component to be displayed */
                    "displayComponent": lOwnerBadge,
                    /**the value of the string/numerical value of the component */
                    "componentValue": lOwnerEmail
                }
                /**Update the owner field */
                lBusinessGoal["owner"] = holdOwnerDetail;
            }

            /**Creating Risk Score component */
            if (businessGoalData["riskScore"] !== undefined) {
                /**Saving the Risk Score of the Business Goal*/
                const lRiskScore: number = typeof (businessGoalData["riskScore"]) === "number" ?
                    businessGoalData["riskScore"] :
                    businessGoalData["riskScore"].componentValue;

                /**Variable to hold the color of the Avatar */
                let avatarColor: any = "#7C9E24";

                /**Changing the color of the Avatar by checking the Risk Score */
                if (lRiskScore >= 7 && lRiskScore <= 9)
                    avatarColor = "#FF4713"
                else if (lRiskScore >= 10 && lRiskScore <= 12)
                    avatarColor = "#DB2436"

                /**Defining the Risk Score Avatar */
                const lRiskScoreAvatar = <Avatar
                    style={{ backgroundColor: avatarColor }}
                    className={RiskScoreTheme.riskScoreClass}
                >
                    {lRiskScore}
                </Avatar>
                /**Create an object to hold both the component and the value */
                const riskScoreDetail = {
                    /**The react component to be displayed */
                    "displayComponent": lRiskScoreAvatar,
                    /**the value of the string/numerical value of the component */
                    "componentValue": lRiskScore
                }
                /**Update the riskScore field */
                lBusinessGoal["riskScore"] = riskScoreDetail;
            }

            /**Creating Status menu 
             * Note: the reason for the string check is to make sure
             * that the status is still a string value and is not replaced by 
             * the component value because of useEffect running twice.
            */
            if ((typeof (businessGoalData["status"]) === "string" && businessGoalData["status"].toLowerCase() === "ideation")
                || (typeof (businessGoalData["status"]) !== "string" && businessGoalData["status"].componentValue.toLowerCase() === "ideation")) {
                lIdeationCount++;
                /**Assigning the component by setting the default selected value as ideation */
                lBusinessGoal["status"] = {
                    displayComponent: <StatusMenuButton defaultValue={"Ideation"} businessGoalName={businessGoalData["businessGoalName"].toString()} nodePath={decodeURIComponent(businessGoalData["nodePath"])} callBack={statusChange} />,
                    componentValue: "Ideation"
                };
                lBusinessGoal["id"] = lRowNumbering;
                lBusinessGoal["priorityNumber"] = index + 1;
                /**If the status of the MPL view is present the list of selected status then display it */
                if (lMPLViewData.selectedStatusValues.indexOf("Ideation") != -1 && lMPLViewData.selectedBusinessUnitsList.indexOf(businessGoalData[businessUnitField]) != -1) {
                    if ((lMPLViewData.selectedRunwaysList.indexOf("no_runways") != -1 && businessGoalData["runwaysList"].length === 0) || inputProps.isAllRunwaysSelected) {
                        ++lRowNumbering;
                        lBusinessGoalTableData.push(lBusinessGoal);
                    }
                    else {
                        lMPLViewData.selectedRunwaysList.every((runwayNodeId) => {
                            if (businessGoalData["runwaysList"].indexOf(runwayNodeId) != -1) {
                                ++lRowNumbering;
                                lBusinessGoalTableData.push(lBusinessGoal);
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                    }
                }
            }
            if ((typeof (businessGoalData["status"]) === "string" && businessGoalData["status"].toLowerCase() === "scheduled")
                || (typeof (businessGoalData["status"]) !== "string" && businessGoalData["status"].componentValue.toLowerCase() === "scheduled")) {
                lScheduledCount++;
                /**Assigning the component by setting the default selected value as ideation */
                lBusinessGoal["status"] = {
                    displayComponent: <StatusMenuButton defaultValue={"Scheduled"} businessGoalName={businessGoalData["businessGoalName"].toString()} nodePath={decodeURIComponent(businessGoalData["nodePath"])} callBack={statusChange} />,
                    componentValue: "Scheduled"
                };
                lBusinessGoal["id"] = lRowNumbering;
                lBusinessGoal["priorityNumber"] = index + 1;
                /**If the status of the MPL view is present the list of selected status then display it */
                if (lMPLViewData.selectedStatusValues.indexOf("Scheduled") != -1 && lMPLViewData.selectedBusinessUnitsList.indexOf(businessGoalData[businessUnitField]) != -1) {
                    if ((lMPLViewData.selectedRunwaysList.indexOf("no_runways") != -1 && businessGoalData["runwaysList"].length === 0) || inputProps.isAllRunwaysSelected) {
                        ++lRowNumbering;
                        lBusinessGoalTableData.push(lBusinessGoal);
                    }
                    else {
                        lMPLViewData.selectedRunwaysList.every((runwayNodeId) => {
                            if (businessGoalData["runwaysList"].indexOf(runwayNodeId) != -1) {
                                ++lRowNumbering;
                                lBusinessGoalTableData.push(lBusinessGoal);
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                    }
                }
            }
        });
        setBusinessGoals(lBusinessGoalTableData);
        inputProps.setIdeationBGCount(lIdeationCount);
        inputProps.setScheduledBGCount(lScheduledCount);
    }

    /**Callback function to return the data */
    const returnDataCallback = (data: any) => {
        /**To deep clone the data
         * Note: When the value was changed in holdData it was being reflected in 
         * data that was passed. This was because the value was passed as
         * reference.
         */
        let holdData = JSON.parse(JSON.stringify(data));
        holdData["businessGoalName"] = holdData["businessGoalName"].componentValue;
        holdData["owner"] = holdData["owner"].componentValue;
        holdData["status"] = data["status"].componentValue;
        holdData["riskScore"] = data["riskScore"].componentValue;
        inputProps.callBackFunction(holdData);
    }

    /**creating other callback functions that are required */
    return (
        <div>
            <div
                style={{
                    height: "100vh",
                    opacity: inputProps.loadingIcon ? 0.5 : 1,
                    pointerEvents: inputProps.loadingIcon ? "none" : "all"
                }}
            >
                {/**Ideation Table */}
                <TableWrapper
                    borderedRow={false}
                    tableHeight={"80%"}
                    zIndexValue={1}
                    onRowClickCallBack={returnDataCallback}
                    inputData={businessGoals}
                    inputColumn={columnData}
                    customMessageOnEmpty={"No Business Goals added yet"}
                    inputSearchData={inputProps.searchParameter}
                    inputSearchableField={["businessGoalName", "owner", "runwaysCount", businessUnitField, "riskScore"]}
                    tableWidth={"auto"}
                    isDragDisabled={!isPriorityChangeable ? true : isDragDisabled}
                    setIsDragDisabled={setIsDragDisabled}
                    handleTopicDragEvent={handleTopicDragEvent}
                    isNoFilterApplied={inputProps.selectedStatusValues?.length === 2 && inputProps.isAllRunwaysSelected && businessUnits.length === lMPLViewData.selectedBusinessUnitsList.length}
                />
            </div>
            {
                /**Display the loading animation only when loadingIcon is true */
                inputProps.loadingIcon ?
                    <CircularProgress style={{
                        color: "black",
                        position: "absolute",
                        left: "45%",
                        top: "40%",
                        zIndex: 1
                    }} /> :
                    null
            }
            <Snackbar
                open={openAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                key={'top' + 'center'}
                autoHideDuration={ALERT_DURATION}
                onClose={() => setOpenAlert(false)}>
                <Alert
                    icon={
                        ALERT_SEVERITY.SUCCESS === alertSeverity ?
                            <CheckCircleOutlineIcon fontSize="medium" /> :
                            <ErrorOutlineIcon fontSize="medium" />
                    }
                    severity={alertSeverity}
                    style={{ width: "500px" }}
                >
                    {alertContent}
                </Alert>
            </Snackbar>
        </div>
    );
}