import { LightTheme } from "@esko/cloud-ui-components/dist/esm/themes";
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { ThemeProvider } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import images from "../../Icons/images";
import FilterSubmenu from "../components/FilterSubmenu";
import { StatusFilterButtonInterface } from "../components/StatusFilterButton";
import { INNOVATION_BG_LOCATION, INNOVATION_SITE_LOCATION } from "../constant/InnovationAPI";
import { InnovationStatus } from "../constant/InnovationEnums";
import { InnovationAppContext } from "../context/InnovationAppContext";
import { NodeEventContext } from "../context/NodeEventContext";
import { MPLViewContext } from "../context/MPLViewContext";
import { BGCoreTeam, BusinessGoalTableType, HealthModel, MilestoneModel, ReleaseTimelineModel, RunwayModel, SlidesModel } from "../interfaces/InnovationInterface";
import SearchService from "../services/SearchService";
import BusinessGoalService from "../services/service/BusinessGoalService";
import RunwayService from "../services/service/RunwayService";
import { businessGoalTableSorter, defaultBusinessGoalInitializer } from "../utils/MPLViewUtils";
import { BusinessGoalComponent } from "./businessGoal/BusinessGoalComponent";
import BusinessCaseModel from "./chapters/BusinessCaseChapter/BusinessCaseModel";
import { BusinessGoalTable } from "./tables/BusinessGoalTable";
import { SearchBarTheme } from "./theme";
import { businessUnits } from "../constant/BusinessGoalDropdownValues";

/**Interface class to define the Type for the businessGoalData */
//TODO: To move the interface declaration to InnovationInterface file
export interface BusinessGoalType {
    nodeId: string;
    MPLPriority: string;
    PPLPriority: string;
    businessGoalName: string;
    problemDefinition: string;
    briefDescription: string;
    goalType: string;
    owner: string;
    thumbnail: any;
    businessUnit: string;
    status: string;
    businessCaseData: BusinessCaseModel;
    runwaysList: string[];
    productsList: string[];
    targetMarketScore: number;
    channelPartnerScore: number;
    positioningScore: number;
    ideaTypeScore: number;
    riskScore: number;
    freedomToOperate: boolean;
    potentialIp: boolean;
    potentialIpDescription: string;
    milestones: MilestoneModel[];
    releaseTimelineData: ReleaseTimelineModel[];
    slides: SlidesModel[];
    coreTeam: BGCoreTeam
    healthData: HealthModel;
}

/**Interface class to define the type of response from innovation server */
export interface ResponseFromServer {
    status: string;
    result: any;
    message: string;
}

export function calculateNPV(inBusinessCaseData: BusinessCaseModel): number {
    let lNPVValue: number = 0 - inBusinessCaseData.investmentPreLaunch;
    for (let index = 1; index <= 5; index++) {
        const year: string = "Y" + index;
        const eBitForYear: number =
            inBusinessCaseData.totalRevenueProjections[year] -
            inBusinessCaseData.costOfSales[year] -
            inBusinessCaseData.opex[year];
        lNPVValue += eBitForYear / Math.pow(1.099, index);
    } 
    return Math.round(lNPVValue);
}

export default function MPLView() {
    /**Getting the Cloud account data and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    /**Defining all the context related variables */
    const [modifiedBusinessGoal, setModifiedBusinessGoal] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    const [businessGoalOperation, setBusinessGoalOperation] = useState<string>("NONE");
    const [totalBusinessGoals, setTotalBusinessGoals] = useState<number>(0);
    const [runwayList, setRunwayList] = useState<RunwayModel[]>([]);
    const [isAllRunwaysSelected, setIsAllRunwaysSelected] = useState<boolean>(true);
    const [totalBusinessNotes, setTotalBusinessNotes] = useState<number>(0);
    const [previousBGName, setPreviousBGName] = useState<string>("");
    const BUSINESS_GOAL_LOCATION = INNOVATION_SITE_LOCATION + INNOVATION_BG_LOCATION + "/";

    /** function to modify the search response of business goal based on the operation performed  */
    const handleBGDataChange = (inTableData: BusinessGoalTableType[]) => {
        switch (businessGoalOperation) {
            case "ADD":
                /**If the count of the previous business goals and the list of business goals fetched by the 
                 * search is the same then append the newly added data to the business goal list.
                 */
                if (totalBusinessGoals === inTableData.length && "" !== modifiedBusinessGoal.businessGoalName) {
                    inTableData.push({
                        ...modifiedBusinessGoal,
                        runwaysCount: modifiedBusinessGoal.runwaysList.length,
                        nodePath: lInnovationData.eskoAccountDetail.repoid + BUSINESS_GOAL_LOCATION + modifiedBusinessGoal.businessGoalName.toLowerCase()
                    })
                    /**Sort the data based on the business goal name */
                }
                /**Increase the count of total ideation business goal by one, since new business goal's status is alway Ideation   */
                setIdeationBGCount(ideationBGCount + 1);
                break;
            case "UPDATE":
                /**To save Index location of the updated business goal */
                let uIndex = -1;
                /**Find the index of the data to be updated */
                for (let businessGoalIndex = 0; businessGoalIndex < inTableData.length; ++businessGoalIndex) {
                    /**Two if conditions are added just to make sure the updated data is displayed even
                 * when the search the newly added data immediately.
                 */
                    if (inTableData[businessGoalIndex].businessGoalName === modifiedBusinessGoal.businessGoalName) {
                        uIndex = businessGoalIndex;
                        break;
                    }
                    /**To check for the old business goal name index */
                    if (inTableData[businessGoalIndex].businessGoalName === previousBGName) {
                        uIndex = businessGoalIndex;
                        break;
                    }
                }
                /**Update the modified business goal with the new data */
                inTableData.splice(uIndex, 1, {
                    ...modifiedBusinessGoal,
                    runwaysCount: modifiedBusinessGoal.runwaysList.length,
                    nodePath: lInnovationData.eskoAccountDetail.repoid + BUSINESS_GOAL_LOCATION + modifiedBusinessGoal.businessGoalName.toLowerCase()
                });
                setBusinessGoalSelected(modifiedBusinessGoal);
                break;
            case "STATUS_UPDATE":
                /**Iterating over the data to search for business goal status that got updated*/
                for (let tableRowData of inTableData) {
                    /**Comparing nodepath since for status update we saved the nodepath of the business goal 
                     * that had to be updated rather than the business goal name in the modifiedBusinessGoal
                    */
                    if (decodeURI(tableRowData.nodePath.toString()) === modifiedBusinessGoal.businessGoalName) {
                        tableRowData.status = modifiedBusinessGoal.status;
                        /**Updating the value in the object object view */
                        setBusinessGoalSelected({
                            ...businessGoalSelected,
                            status: modifiedBusinessGoal.status
                        });
                        break;
                    }
                }
                break;
            case "DELETE":
                /**If the count of the previous business goals and the list of business goals fetched by the 
                 * search is the same then remove the deleted data from the business goal list.
                 */
                if (totalBusinessGoals === inTableData.length && "" !== modifiedBusinessGoal.businessGoalName) {
                    let dIndex = -1;
                    /**Find the index of the data to be deleted */
                    for (let businessGoalIndex = 0; businessGoalIndex < totalBusinessGoals; ++businessGoalIndex) {
                        if (inTableData[businessGoalIndex].businessGoalName === modifiedBusinessGoal.businessGoalName) {
                            dIndex = businessGoalIndex;
                            break;
                        }
                    }
                    /**Remove the deleted data from the list */
                    inTableData.splice(dIndex, 1);
                }
                break;
            case "PRIORITY_UPDATE":
                for (let tableRowData of inTableData) {
                    /**Comparing nodepath since for MPLPriority update we saved the nodepath of the business goal 
                     * that had to be updated rather than the business goal name in the modifiedBusinessGoal
                    */
                    if (tableRowData.businessGoalName === modifiedBusinessGoal.businessGoalName) {
                        tableRowData.MPLPriority = modifiedBusinessGoal.MPLPriority;
                        /**Updating the value in the object object view */
                        setBusinessGoalSelected({
                            ...businessGoalSelected,
                            MPLPriority: modifiedBusinessGoal.MPLPriority
                        });
                        break;
                    }
                }
                break;
        }
        /**Reset the value */
        inTableData = businessGoalTableSorter(inTableData);
        setModifiedBusinessGoal(defaultBusinessGoalInitializer());
        setBusinessGoalOperation("NONE");
        return inTableData;
    };

    /**Defining variables to handle the toggle of the status filters */
    const [ideationBGCount, setIdeationBGCount] = useState<number>(0);
    const [scheduledBGCount, setScheduledBGCount] = useState<number>(0);
    const [selectedStatusValues, setSelectedStatusValues] = useState<string[]>([InnovationStatus.IDEATION.trim(), InnovationStatus.SCHEDULED.trim()]);
    /**State to hold list of all the business goal */
    const [mplBusinessGoalList, setMplBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    /**To set the loading animation when waiting for search response */
    const [loadingIcon, setLoadingIcon] = useState<boolean>(false);

    const statusList: StatusFilterButtonInterface[] = [
        {
            BGCount: ideationBGCount,
            buttonTitle: InnovationStatus.IDEATION.trim()
        },
        {
            BGCount: scheduledBGCount,
            buttonTitle: InnovationStatus.SCHEDULED.trim()
        },
    ];

    /**Function to update the status count */
    const statusCountUpdateFunction = () => {
        /**get the status counts of Ideation*/
        SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, "Ideation")
            .then((ideationResponse: number) => {
                setIdeationBGCount(ideationResponse);
            })
            .catch((ideationError: number) => {
                setIdeationBGCount(ideationError);
            });
        /**get the status counts of Ideation*/
        SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, "Scheduled")
            .then((scheduledResponse: number) => {
                setScheduledBGCount(scheduledResponse);
            })
            .catch((scheduledError: number) => {
                setScheduledBGCount(scheduledError);
            });
    };

    /**State to hold the array of Selected Runway nodeid's while filtering */
    const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);

    /**State to hold the array of Selected Business Unit nodeid's while filtering */
    const [selectedBusinessUnitsList, setSelectedBusinessUnitsList] = useState<string[]>([]);

    /**Initializing the context variable */
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
        "setSelectedBusinessUnitsList": setSelectedBusinessUnitsList
    };

    // State to open Add dialog
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    // State to save the business goal selected from the business goal list
    const [businessGoalSelected, setBusinessGoalSelected] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    // State to manage opening and closing of the object view.
    const [openObjectView, setOpenObjectView] = React.useState<boolean>(false);
    /**State to hold user entered text value */
    const [searchValue, setSearchValue] = useState<string>("");
    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)

    // Function to open the add dialog
    const onAddIconClick = () => {
        setOpenAddDialog(true);
    };
    // Function to save the business goal selected from the business goal list in the state variable and to open the object view
    const onBusinessGoalSelect = (data: BusinessGoalTableType) => {
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

    /**When the component is rendered set toggle the value */
    useEffect(() => {
        /**Get the filter data */
        let holdStatusValue = window.sessionStorage.getItem("mplViewStatus");
        if (holdStatusValue !== null && holdStatusValue.split(",") !== undefined) {
            setSelectedStatusValues(holdStatusValue.split(","));
        }
        /**set the count of the business goal status */
        statusCountUpdateFunction();
        let holdRunwaysValue = window.sessionStorage.getItem("mplViewRunwaysFilter");
        
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
        let holdBusinessUnitsValue = window.sessionStorage.getItem("mplViewBusinessUnitsFilter");
        if (holdBusinessUnitsValue !== null && holdBusinessUnitsValue.split(",") !== undefined) {
            setSelectedBusinessUnitsList(holdBusinessUnitsValue.split(","));
        } else {
            setSelectedBusinessUnitsList(businessUnits);
        }
        /**Get the existing search data */
        let holdSearchValue = window.sessionStorage.getItem("searchMPLBusinessGoal");
        if (holdSearchValue !== null) {
            setSearchValue(holdSearchValue);
        }
    }, [lInnovationData.eskoAccountDetail]);

    /* use effect to set the updated values for runways filter if runway node event is updated */

    useEffect(() => {
        let holdRunwaysValue = window.sessionStorage.getItem("mplViewRunwaysFilter");
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
    }, [lNodeEventData.runwaysUpdated]);

    /**Calling the search service the first time and also when there is changes in context values  */
    useEffect(() => {
        /**When there is a change in context start the loading animation */
        setLoadingIcon(true);
        BusinessGoalService.innovationGetBusinessGoalList(lInnovationData.eskoAccountDetail.repoid)
            .then((response: any) => {
                const lHoldResponse: BusinessGoalTableType[] = response;
                /**save the new data based on whether any operation was performed earlier or not. */
                setMplBusinessGoalList(handleBGDataChange(lHoldResponse));
                response.forEach((bgData: BusinessGoalTableType) => {
                    if(bgData.nodeId === businessGoalSelected.nodeId) {
                        setBusinessGoalSelected(bgData);
                    }
                })
            })
            .catch((error: any) => {
                console.log(error);
                setLoadingIcon(false);
            });
    }, [lInnovationData, lNodeEventData.businessGoalsUpdated]);

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth)
        }
        else {
            setMarginContentView(leftNavWidth)
        }
    }, [openFilterMenu]);

    /**When user enters search string update the same in the sessionStorage */
    useEffect(() => {
        window.sessionStorage.setItem("searchMPLBusinessGoal", searchValue.toString());
    }, [searchValue]);


    /**To update the filter value as the status filter buttons are clicked.*/
    useEffect(() => {
        window.sessionStorage.setItem("mplViewStatus", selectedStatusValues.toString());
    }, [selectedStatusValues]);

    /**To update the status count if the repo id/organization is changed */
    useEffect(() => {
        statusCountUpdateFunction();
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        if (selectedRunwaysList.length === runwayList.length + 1) {
            setIsAllRunwaysSelected(true);
        } else {
            setIsAllRunwaysSelected(false);
        }
    }, [selectedRunwaysList, runwayList]);

    /**To update the filter value as the status filter buttons are clicked.*/
    useEffect(() => {
        if ("" === selectedRunwaysList[0]) {
            selectedRunwaysList.splice(0, 1);
        }
        window.sessionStorage.setItem("mplViewRunwaysFilter", selectedRunwaysList.toString());
    }, [selectedRunwaysList]);

    useEffect(() => {
        if ("" === selectedBusinessUnitsList[0]) {
            selectedBusinessUnitsList.splice(0, 1);
        }
        window.sessionStorage.setItem("mplViewBusinessUnitsFilter", selectedBusinessUnitsList.toString());
    }, [selectedBusinessUnitsList]);

    return (
        <Grid container >
            {/**Settings sub panel */}
            <Grid item style={{ position: 'absolute' }}>
                <FilterSubmenu
                    view="MPL"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    listOfButtons={statusList}
                    selectedStatusValues={selectedStatusValues}
                    setSelectedStatusValues={setSelectedStatusValues}
                    selectedRunwaysList={selectedRunwaysList}
                    setSelectedRunwaysList={setSelectedRunwaysList}
                    selectedBusinessUnitsList={selectedBusinessUnitsList}
                    setSelectedBusinessUnitsList={setSelectedBusinessUnitsList}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView, transition: "150ms", marginTop: "12px", width: openFilterMenu ? "78vw" : "92vw", position: "fixed" }}>
                <MPLViewContext.Provider value={contextSettings}>
                    <Box ml={3} mt={3}>
                        <ThemeProvider theme={LightTheme}>
                            {/* Grid for the title and the add button */}
                            <Grid container
                                spacing={2}
                                alignContent="center"
                                style={{ marginRight: "2px", marginLeft: "0px", flexWrap: "nowrap", width: "auto" }}
                            >
                                {/**Title Text */}
                                <Grid item>
                                    <Typography style={{ fontSize: '24px', fontWeight: 'bold', color: "#22262A" }}> MPL </Typography>
                                </Grid>
                                {/**The Add dialog icon */}
                                {
                                    lInnovationData.userPermission.businessGoal.isBGCreatable &&
                                    (
                                        <Grid item>
                                            <IconButton onClick={onAddIconClick} style={{ padding: '0px' }}>
                                                <Typography>
                                                    <Tooltip
                                                        title="Add Business Goal"
                                                        placement="right"
                                                        arrow
                                                    >
                                                        <img src={images.AddButton}></img>
                                                    </Tooltip>
                                                </Typography>
                                            </IconButton>
                                        </Grid>
                                    )
                                }

                                {/**The search bar/field */}
                                <Grid item style={{ marginLeft: "auto" }}>
                                    <ThemeProvider theme={SearchBarTheme}>
                                        <TextField
                                            variant="outlined"
                                            value={searchValue}
                                            placeholder={"Search"}
                                            onChange={(event: any) => {
                                                setSearchValue(event.target.value);
                                            }}
                                            InputProps={{
                                                startAdornment: <SearchRoundedIcon style={{ color: "#444B53", fontSize: "24px", marginRight: "4px" }} />,
                                                endAdornment: searchValue !== "" ?
                                                    <IconButton onClick={() => { setSearchValue("") }} style={{ padding: "0px" }}>
                                                        <CloseRoundedIcon style={{ color: "#444B53", fontSize: "24px" }} />
                                                    </IconButton>
                                                    : <CloseRoundedIcon style={{ color: "transparent", fontSize: "24px" }} />
                                            }}
                                        />
                                    </ThemeProvider>
                                </Grid>
                            </Grid>
                            {/* Table/List view related grid */}
                            <BusinessGoalTable
                                callBackFunction={(data: any) => { onBusinessGoalSelect(data) }}
                                searchParameter={searchValue}
                                setIdeationBGCount={setIdeationBGCount}
                                setScheduledBGCount={setScheduledBGCount}
                                businessGoalCompleteList={mplBusinessGoalList}
                                loadingIcon={loadingIcon}
                                setLoadingIcon={setLoadingIcon}
                                selectedStatusValues={selectedStatusValues}
                                isAllRunwaysSelected={isAllRunwaysSelected}
                            />
                            {/* Component with the Add and Edit dialog and the Flyout view for business goal  */}
                            <BusinessGoalComponent
                                openAddDialog={openAddDialog}
                                lastBusinessGoal={mplBusinessGoalList[mplBusinessGoalList.length - 1]}
                                setOpenAddDialog={setOpenAddDialog}
                                businessGoalSelected={businessGoalSelected}
                                openObjectView={openObjectView}
                                setOpenObjectView={setOpenObjectView}
                                listOfBusinessGoals={mplBusinessGoalList}
                                setBusinessGoalSelected={setBusinessGoalSelected}
                            />
                        </ThemeProvider>
                    </Box>
                </MPLViewContext.Provider>
            </Grid>
        </Grid >
    )
}
