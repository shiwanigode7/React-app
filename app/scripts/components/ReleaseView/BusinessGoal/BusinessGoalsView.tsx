/**TSX file for displaying view for Release - Business Goals */
import { Box, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getRunwayNodePath } from "../../../constant/InnovationAPI";
import { BG_RELEASE_TYPE } from "../../../constant/InnovationEnums";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { BusinessGoalTableType, RunwayModel, UserListWithEmailModel } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import ReleaseService from "../../../services/service/ReleaseService";
import RunwayService from "../../../services/service/RunwayService";
import UserService from "../../../services/UserService";
import FilterSubmenu from "../../FilterSubmenu";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import Header from "../../utils/Header/Header";
import selectMenuModel from "../../utils/Header/SelectMenu/SelectMenuModel";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import { BusinessGoalViewStyle } from "./BusinessGoalsViewStyle";
import { RunwayModel as ReleaseViewRunwayModel } from "./BusinessGoalViewModel";
import { ReleaseViewCard } from "./ReleaseViewCard/ReleaseCardView";

export function BusinessGoalView() {

    const lInnovationData = useContext(InnovationAppContext);


    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    const BusinessGoalsViewStylesClass = BusinessGoalViewStyle();

    const releaseTypeArray: string[] = [BG_RELEASE_TYPE.LAUNCH_RELEASE, BG_RELEASE_TYPE.OPEN_RELEASE, BG_RELEASE_TYPE.CONTROLLED_RELEASE];

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)

    /**State to hold the array of Selected Runway nodeid"s while filtering */
    const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);

    const [selectedReleaseId, setSelectedReleaseId] = useState<string>("");
    const [selectedRelease, setSelectedRelease] = useState<string>("");
    const [selectedReleaseObject, setSelectedReleaseObject] = useState<ReleaseModel>();
    const [activeBusinessGoalList, setActiveBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [releaseList, setReleaseList] = useState<ReleaseModel[]>([]);
    const [runwaysList, setRunwaysList] = useState<RunwayModel[]>([]);
    const [filteredBusinessGoalList, setFilteredBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [isOnlyLaunchRelease, setIsOnlyLaunchRelease] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserListWithEmailModel[]>([]);

    const selectMenuData: selectMenuModel = {
        items: releaseList,
        selectedValue: selectedReleaseId,
        setSelectedValue: setSelectedReleaseId
    }

    const toggleButtonData: ToggleButtonModel = {
        label: "Show only Launch Releases",
        handleChange: (changeEvent: any) => {
            setIsOnlyLaunchRelease(changeEvent.target.checked);
        }
    };
    const sortBusinessGoal = ((businessGoalList: BusinessGoalTableType[]) => {
        return (
            businessGoalList.sort((businessGoal1: BusinessGoalTableType, businessGoal2: BusinessGoalTableType) => {
                let bg1Priority = businessGoal1.PPLPriority.toLowerCase();
                let bg2Priority = businessGoal2.PPLPriority.toLowerCase();

                if (bg1Priority < bg2Priority) {
                    return -1;
                }
                if (bg1Priority > bg2Priority) {
                    return 1;
                }
                return 0;
            })
        )
    });

    const createRunwayThumbnailList = (inRunwaysList: string[]) => {
        let lRunwayList: ReleaseViewRunwayModel[] = [];
        const lUrl = window.location.origin;
        inRunwaysList.forEach((inRunway) => {
            runwaysList.forEach((runway: RunwayModel) => {
                if (inRunway === runway.nodeId) {
                    let lNodePathRunway = getRunwayNodePath(lInnovationData.eskoAccountDetail.repoid, runway.runwayName);
                    let lThumbnail = `${lUrl.replace("innovation", "repo")}/CONTENT/v0/${lNodePathRunway}?contentid=thumbnail`;
                    let lRunway: ReleaseViewRunwayModel = {
                        runwayName: runway.runwayName,
                        runwayThumbnail: lThumbnail
                    }
                    lRunwayList.push(lRunway);
                }
            })
        })
        return (lRunwayList);
    }

    useEffect(() => {

        //Call to get the List of active business goals
        BusinessGoalService.innovationGetBusinessGoalListofStatus(lInnovationData.eskoAccountDetail.repoid, "Active")
            .then((businessGoalListofStatusResponse: BusinessGoalTableType[]) => {
                setActiveBusinessGoalList(businessGoalListofStatusResponse);
            })
            .catch((error: any) => {
                console.log(error);
            });

        //Release Call to get all the Unarchived Releases
        ReleaseService.getReleases(lInnovationData.eskoAccountDetail.repoid, 999, false)
            .then((releaseResponse: ReleaseModel[]) => {
                setReleaseList(releaseResponse);
                setSelectedReleaseObject(releaseResponse[0]);
                setSelectedReleaseId(releaseResponse[0].nodeId ? releaseResponse[0].nodeId : "");
            })
            .catch((error: any) => {
                console.log(error);
            });

        //Runway call
        RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
            .then((runwaysListResponse: RunwayModel[]) => {
                let tempCheckedRunwaysList: string[] = []
                tempCheckedRunwaysList = tempCheckedRunwaysList.concat("no_runways");
                runwaysListResponse.forEach((runway: RunwayModel) => {
                    tempCheckedRunwaysList = tempCheckedRunwaysList.concat(runway.nodeId);
                });
                setSelectedRunwaysList(tempCheckedRunwaysList);
                setRunwaysList(runwaysListResponse);
            })
            .catch((error: any) => {
                console.log(error);
            });

        let lholdRunways = window.sessionStorage.getItem("releaseViewRunwaysFilter");
        if (lholdRunways !== null && lholdRunways.split(",") !== undefined) {
            setSelectedRunwaysList(lholdRunways.split(","));
        }

        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID)
            .then((getAllUsersResponse: UserListWithEmailModel[]) => {
                setUserList(getAllUsersResponse);
            })

    }, [lInnovationData.eskoAccountDetail]);

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth);
        }
        else {
            setMarginContentView(leftNavWidth);
        }
    }, [openFilterMenu]);

    useEffect(() => {
        window.sessionStorage.setItem("releaseViewRunwaysFilter", selectedRunwaysList.toString());
    }, [selectedRunwaysList]);

    useEffect(() => {
        let lRunwayFilteredBusinessGoalList: BusinessGoalTableType[] = [];
        let lFilteredBusinessGoalList: BusinessGoalTableType[] = [];
        let lFilteredBusinessGoalListForLaunchReleases: BusinessGoalTableType[] = [];
        selectedRunwaysList.forEach((runway: string) => {
            if ("no_runways" === runway) {
                activeBusinessGoalList.forEach((businessGoal: BusinessGoalTableType) => {
                    if (0 == businessGoal.runwaysList.length) {
                        lRunwayFilteredBusinessGoalList.push(businessGoal);
                    }
                })
            }
            activeBusinessGoalList.forEach((businessGoal) => {
                if (businessGoal.runwaysList.indexOf(runway) > -1) {
                    lRunwayFilteredBusinessGoalList.push(businessGoal);
                }
            })
        });
        lRunwayFilteredBusinessGoalList.forEach((businessGoal: BusinessGoalTableType) => {
            businessGoal.releaseTimelineData.forEach((releaseTimelineData) => {
                if ((selectedReleaseId === releaseTimelineData.releaseNodeId) && (0 === releaseTypeArray.indexOf(releaseTimelineData.releaseType))) {
                    lFilteredBusinessGoalListForLaunchReleases.push(businessGoal);
                    lFilteredBusinessGoalList.push(businessGoal);
                } else if ((selectedReleaseId === releaseTimelineData.releaseNodeId) && (-1 != releaseTypeArray.indexOf(releaseTimelineData.releaseType)) && (releaseTypeArray.indexOf(releaseTimelineData.releaseType) != 0)) {
                    lFilteredBusinessGoalList.push(businessGoal);
                }
            })
        })

        if (isOnlyLaunchRelease) {
            lFilteredBusinessGoalListForLaunchReleases = sortBusinessGoal([... new Set(lFilteredBusinessGoalListForLaunchReleases)]);
            setFilteredBusinessGoalList(lFilteredBusinessGoalListForLaunchReleases);
        }
        else {
            lFilteredBusinessGoalList = sortBusinessGoal([...new Set(lFilteredBusinessGoalList)]);
            setFilteredBusinessGoalList(lFilteredBusinessGoalList);
        }
    }, [selectedReleaseId, selectedRunwaysList, activeBusinessGoalList, isOnlyLaunchRelease]);

    useEffect(() => {
        releaseList.forEach((release: ReleaseModel) => {
            if (selectedReleaseId === release.nodeId) {
                setSelectedReleaseObject(release);
                setSelectedRelease(release.name);
            }
        })
    }, [selectedReleaseId]);

    return (
        <Grid container className={BusinessGoalsViewStylesClass.rootContainer}>
            <Grid item className={BusinessGoalsViewStylesClass.filterMenu}>
                <FilterSubmenu
                    view="Release"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    selectedRunwaysList={selectedRunwaysList}
                    setSelectedRunwaysList={setSelectedRunwaysList}
                    selectedReleaseObject={selectedReleaseObject}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView }} className={BusinessGoalsViewStylesClass.goalsGrid} >
                <Box className={BusinessGoalsViewStylesClass.rootBox}>
                    <Header
                        currentPageHeading="Release Overview"
                        currentPageSubHeading="for"
                        selectMenu={selectMenuData}
                        toggleButton={toggleButtonData}
                    />
                    <Grid container spacing={4} className={BusinessGoalsViewStylesClass.businessGoals}>
                        {(0 === filteredBusinessGoalList.length) &&
                            <Grid item>
                                No Releases
                            </Grid>
                        }
                        {filteredBusinessGoalList.map((businessGoal) => {
                            let lrunwaysList: ReleaseViewRunwayModel[] = createRunwayThumbnailList(businessGoal.runwaysList);
                            return (
                                <Grid item xs={12} sm={6} md={6} className={BusinessGoalsViewStylesClass.releaseViewCardGrid} >
                                    <ReleaseViewCard
                                        key={businessGoal.nodeId}
                                        businessGoal={businessGoal}
                                        selectedReleaseId={selectedReleaseId}
                                        selectedRelease={selectedRelease}
                                        userList={userList}
                                        runwayList={lrunwaysList}
                                        openFilterMenu={openFilterMenu}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}