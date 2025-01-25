import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useContext, useEffect, useState } from "react";
import { ReleaseTypeIcon } from "../../../components/presentationComponents/ReleaseTimelineComponent/ReleaseTypeIcon/ReleaseTypeIcon";
import ReleaseModel from "../../../components/settings/InnovationCadenceView/ReleaseModel";
import { MultiSelect } from "../../../components/utils/MultiSelect/MultiSelect";
import { BG_RELEASE_TYPE } from "../../../constant/InnovationEnums";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { DropDownInterface, MilestoneModel, ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";
import ReleaseService from "../../../services/service/ReleaseService";
import { BusinessGoalType } from "../../MPLView";
import { ReleaseTimelineChapterModel } from "./ReleaseTimelineChapterModel";
import { ReleaseTimelineStyles } from "./ReleaseTimelineChapterStyles";
import { ReleaseTypeSelect } from "./ReleaseTypeSelect/ReleaseTypeSelect";
import { NodeEventContext } from "../../../context/NodeEventContext";
export function ReleaseTimelineChapter(ReleaseTimelineChapterProps: ReleaseTimelineChapterModel) {
    const ReleaseTimelineClasses = ReleaseTimelineStyles();

    const lInnovationData = useContext(InnovationAppContext);

    const [allReleases, setAllReleases] = useState<ReleaseModel[]>([]);
    //usestate to to store release in order (Archived first and UnArchived next)
    const [orderedReleases, setOrderedReleases] = useState<ReleaseModel[]>([]);
    const [selectedFiveReleases, setSelectedFiveReleases] = useState<ReleaseModel[]>([]);

    const [disableLeftArrowIcon, setDisableLeftArrowIcon] = useState<boolean>(false);
    const [disableRightArrowIcon, setDisableRightArrowIcon] = useState<boolean>(false);


    const [dataList, setDataList] = useState<DropDownInterface[]>([]);
    const lNodeEventData = useContext(NodeEventContext);
    /**Function to update milestone selected to the business goal */
    const handleMilestoneSelect = (inSelectedMilestone: string[], inReleaseIndex: number) => {
        const lBusinessGoal: BusinessGoalType = JSON.parse(JSON.stringify(ReleaseTimelineChapterProps.businessGoal));
        lBusinessGoal.releaseTimelineData[inReleaseIndex].milestones = inSelectedMilestone;
        ReleaseTimelineChapterProps.setBusinessGoal(lBusinessGoal);
    };

    const handleLeftArrowClick = () => {
        let lEndIndex: number = orderedReleases.indexOf(selectedFiveReleases[0]);
        let lStartIndex: number = (lEndIndex - 5) < 0 ? 0 : lEndIndex - 5;

        setSelectedFiveReleases(orderedReleases.slice(lStartIndex, lEndIndex));
    }

    const handleRightArrowClick = () => {

        let lStartIndex: number = orderedReleases.indexOf(selectedFiveReleases[selectedFiveReleases.length - 1]) + 1;
        let lEndIndex: number = lStartIndex + 5;

        setSelectedFiveReleases(orderedReleases.slice(lStartIndex, lEndIndex));
    }

    useEffect(() => {
        ReleaseService.getAllReleases(lInnovationData.eskoAccountDetail.repoid)
            .then((getReleasesResponse: ReleaseModel[]) => {
                setAllReleases(getReleasesResponse);
            })
            .catch(() => {
                setAllReleases([]);
            });
        // Get the latest release data when the Organization changes and when the business goal (nodepath/nodeId) changes 
    }, [lInnovationData.eskoAccountDetail, ReleaseTimelineChapterProps.bgNodePath, lNodeEventData.releasesUpdated]);

    useEffect(() => {
        const lArchivedReleases: ReleaseModel[] = [];
        const lUnArchivedReleases: ReleaseModel[] = [];
        allReleases.forEach((release: ReleaseModel) => {
            if (release.isArchived) {
                lArchivedReleases.push(release);
            } else {
                lUnArchivedReleases.push(release);
            }
        });
        setOrderedReleases([...lArchivedReleases, ...lUnArchivedReleases]);
    }, [allReleases]);

    useEffect(() => {
        const lFirstFiveReleases: ReleaseModel[] = [];
        let count: number = 0;
        orderedReleases.forEach((release: ReleaseModel) => {
            if (!release.isArchived && count < 5) {
                lFirstFiveReleases.push(release);
                count++;
            }
        });
        setSelectedFiveReleases([...lFirstFiveReleases]);
    }, [orderedReleases]);

    useEffect(() => {
        const lDataList: DropDownInterface[] = [];
        ReleaseTimelineChapterProps.businessGoal.milestones.forEach((milestone: MilestoneModel) => {
            lDataList.push({
                dataKey: milestone.milestoneId,
                displayName: milestone.milestoneName
            })
        })
        setDataList(lDataList);
    }, [ReleaseTimelineChapterProps.businessGoal.milestones]);

    useEffect(() => {
        /**NOTE: Here when pushing release data, the prevData in the BusinessGoalComponent is getting updated 
         * because of shallow copy of businessGoal to prevData, hence all the changes made without shallow copy
         * or without value being set by function, will be reflected in the prevData.
         * This is made use for checking whether user has edited data without making use of additional props, because always when new release is added/displayed
         * the BG will be updated accordingly for the latest release, now if user opens edit dialog and just reads the data and 
         * tries to closes there will be message telling there are unsaved changes which might confuse the user.
         * Alternative to this 
         */
        selectedFiveReleases.forEach((releaseData: ReleaseModel) => {
            const lReleaseNodeId: string = undefined !== releaseData.nodeId ? releaseData.nodeId : "";
            if (0 === ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.length) {
                ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.push({
                    comment: "",
                    milestones: [],
                    releaseNodeId: lReleaseNodeId,
                    releaseType: BG_RELEASE_TYPE.NO_RELEASE
                });
            }
            else {
                for (let bgReleaseIndex = 0; bgReleaseIndex < ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.length; ++bgReleaseIndex) {
                    if (ReleaseTimelineChapterProps.businessGoal.releaseTimelineData[bgReleaseIndex].releaseNodeId === lReleaseNodeId) {
                        break;
                    }
                    else if (bgReleaseIndex === ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.length - 1) {
                        ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.push({
                            comment: "",
                            milestones: [],
                            releaseNodeId: lReleaseNodeId,
                            releaseType: BG_RELEASE_TYPE.NO_RELEASE
                        });
                    }
                }
            }

        });
        ReleaseTimelineChapterProps.setBusinessGoal({ ...ReleaseTimelineChapterProps.businessGoal });
    }, [selectedFiveReleases]);

    //Seperated to reduce complexity
    useEffect(() => {
        if (0 === orderedReleases.indexOf(selectedFiveReleases[0]) || 0 === selectedFiveReleases.length) {
            setDisableLeftArrowIcon(true);
        } else {
            setDisableLeftArrowIcon(false);
        }

        if (orderedReleases.length - 1 === orderedReleases.indexOf(selectedFiveReleases[selectedFiveReleases.length - 1]) || 0 === selectedFiveReleases.length) {
            setDisableRightArrowIcon(true);
        } else {
            setDisableRightArrowIcon(false);
        }
    }, [selectedFiveReleases]);

    return (
        <Grid container direction="column" className={ReleaseTimelineClasses.rootGridContainer}>
            {/* Release Name Grid*/}
            <Grid item className={ReleaseTimelineClasses.releaseNameGrid}>
                <Grid item className={ReleaseTimelineClasses.leftArrowicon}>
                    {!disableLeftArrowIcon &&
                        <IconButton
                            classes={{ root: ReleaseTimelineClasses.iconButton }}
                            onClick={handleLeftArrowClick}
                        >
                            <ArrowBackIosIcon fontSize="medium" className={ReleaseTimelineClasses.icon} />
                        </IconButton>
                    }
                </Grid>
                <Grid item className={ReleaseTimelineClasses.releaseTypeBarGrid}>
                    {
                        selectedFiveReleases.map((releaseData: ReleaseModel) => {
                            return (<Grid item className={ReleaseTimelineClasses.horizontalGridItem}>
                                <Tooltip
                                    arrow
                                    title={releaseData.name}
                                    placement={"right"}
                                    classes={{
                                        tooltipPlacementLeft: ReleaseTimelineClasses.tooltip,
                                        tooltipPlacementRight: ReleaseTimelineClasses.tooltip
                                    }}
                                >
                                    <Typography className={ReleaseTimelineClasses.releaseNameText}>
                                        {releaseData.name}
                                    </Typography>
                                </Tooltip>
                            </Grid>)
                        })
                    }
                </Grid>
                <Grid item className={ReleaseTimelineClasses.rightArrowicon}>
                    {!disableRightArrowIcon &&
                        <IconButton
                            classes={{ root: ReleaseTimelineClasses.iconButton }}
                            onClick={handleRightArrowClick}
                        >
                            <ArrowForwardIosIcon fontSize="medium" className={ReleaseTimelineClasses.icon} />
                        </IconButton>}
                </Grid>
            </Grid>
            {/* Release Bar */}
            <Grid item className={ReleaseTimelineClasses.releaseTypeBar}>
                <Grid item className={ReleaseTimelineClasses.releaseTypeBarGrid}>
                    {
                        selectedFiveReleases.map((releaseData: ReleaseModel) => {
                            return (ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.map((bgReleaseData: ReleaseTimelineModel, bgReleaseIndex: number) => {
                                const lReleaseNodeId: string = undefined !== releaseData.nodeId ? releaseData.nodeId : "";
                                if (bgReleaseData.releaseNodeId === lReleaseNodeId) {
                                    if (releaseData.isArchived) {
                                        return (
                                            <Grid item className={ReleaseTimelineClasses.horizontalGridItem}>
                                                <ReleaseTypeIcon
                                                    comment={bgReleaseData.comment}
                                                    releaseType={bgReleaseData.releaseType}
                                                />
                                            </Grid>
                                        );
                                    } else {
                                        return (<Grid item className={ReleaseTimelineClasses.horizontalGridItem}>
                                            <ReleaseTypeSelect
                                                businessGoalData={ReleaseTimelineChapterProps.businessGoal}
                                                releaseIndex={bgReleaseIndex}
                                                setBusinessGoalData={ReleaseTimelineChapterProps.setBusinessGoal}
                                            />
                                        </Grid>);
                                    }
                                }
                            }));
                        })
                    }
                </Grid>
            </Grid>
            {/* Milestones grid */}
            <Grid item className={ReleaseTimelineClasses.milestoneGrid}>
                {
                    selectedFiveReleases.map((releaseData: ReleaseModel) => {
                        return (ReleaseTimelineChapterProps.businessGoal.releaseTimelineData.map((bgReleaseData: ReleaseTimelineModel, bgReleaseIndex: number) => {
                            const lReleaseNodeId: string = undefined !== releaseData.nodeId ? releaseData.nodeId : "";
                            if (bgReleaseData.releaseNodeId === lReleaseNodeId) {
                                return (<Grid item className={ReleaseTimelineClasses.horizontalGridItem}>
                                    <MultiSelect
                                        dataList={dataList}
                                        defaultValues={ReleaseTimelineChapterProps.businessGoal.releaseTimelineData[bgReleaseIndex].milestones}
                                        onSelectCallBack={(inSelectedValues: string[]) => { handleMilestoneSelect(inSelectedValues, bgReleaseIndex) }}
                                        tooltipTitle={"Add Milestone"}
                                        key={ReleaseTimelineChapterProps.businessGoal.businessGoalName.toString()}
                                        disableEdit={!releaseData.isArchived}
                                    />
                                </Grid>);
                            }
                        }));
                    })
                }
            </Grid>
        </Grid>
    );
}