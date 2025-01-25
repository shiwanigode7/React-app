import { Card, CardContent, CardHeader, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useContext, useEffect, useState } from "react";
import ReleaseModel from "../../../components/settings/InnovationCadenceView/ReleaseModel";
import { BG_RELEASE_TYPE } from "../../../constant/InnovationEnums";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { DropDownInterface, MilestoneModel, ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";
import ReleaseService from "../../../services/service/ReleaseService";
import { MilestoneList } from "./MilestonesList/MilestoneList";
import { ReleaseTimelineComponentModel } from "./ReleaseTimeLineComponentModel";
import { ReleaseTimelineComponentStyles } from "./ReleaseTimeLineComponentStyle";
import { ReleaseTypeIcon } from "./ReleaseTypeIcon/ReleaseTypeIcon";

export function ReleaseTimelineComponent(releaseTimelineComponentProps: ReleaseTimelineComponentModel) {

    const releaseTimelineStyleClasses = ReleaseTimelineComponentStyles();

    const lInnovationData = useContext(InnovationAppContext);

    const [allReleases, setAllReleases] = useState<ReleaseModel[]>([]);
    //usestate to to store release in order (Archived first and UnArchived next)
    const [orderedReleases, setOrderedReleases] = useState<ReleaseModel[]>([]);
    const [selectedFiveReleases, setSelectedFiveReleases] = useState<ReleaseModel[]>([]);

    const [disableLeftArrowIcon, setDisableLeftArrowIcon] = useState<boolean>(false);
    const [disableRightArrowIcon, setDisableRightArrowIcon] = useState<boolean>(false);


    const [dataList, setDataList] = useState<DropDownInterface[]>([]);

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
    }, [lInnovationData.eskoAccountDetail, releaseTimelineComponentProps.businessGoal.releaseTimelineData]);

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
        releaseTimelineComponentProps.businessGoal.milestones.forEach((milestone: MilestoneModel) => {
            lDataList.push({
                dataKey: milestone.milestoneId,
                displayName: milestone.milestoneName
            })
        })
        setDataList(lDataList);
    }, [releaseTimelineComponentProps.businessGoal.milestones]);

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
        <Card className={0 == selectedFiveReleases.length ? releaseTimelineStyleClasses.emptyReleaseGrid : releaseTimelineStyleClasses.releaseCard}>
            <CardHeader
                title={"Releases & Milestones"}
                classes={{ title: releaseTimelineStyleClasses.cardHeaderStyles }}
            />
            <CardContent>
                {
                    0 != selectedFiveReleases.length ?
                        <Grid container direction="column" className={releaseTimelineStyleClasses.rootGridContainer}>
                            {/* Release Name Grid*/}
                            <Grid item className={releaseTimelineStyleClasses.releaseNameGrid}>
                                <Grid item className={releaseTimelineStyleClasses.leftArrowicon}>
                                    {!disableLeftArrowIcon &&
                                        <IconButton
                                            classes={{ root: releaseTimelineStyleClasses.iconButton }}
                                            onClick={handleLeftArrowClick}
                                        >
                                            <ArrowBackIosIcon fontSize="medium" className={releaseTimelineStyleClasses.icon} />
                                        </IconButton>
                                    }
                                </Grid>
                                <Grid item className={releaseTimelineStyleClasses.releaseTypeBarGrid}>
                                    {
                                        selectedFiveReleases.map((releaseData: ReleaseModel) => {
                                            return (<Grid item className={releaseTimelineStyleClasses.horizontalGridItem}>
                                                <Tooltip
                                                    arrow
                                                    title={releaseData.name}
                                                    placement={"right"}
                                                    classes={{
                                                        tooltipPlacementLeft: releaseTimelineStyleClasses.tooltip,
                                                        tooltipPlacementRight: releaseTimelineStyleClasses.tooltip
                                                    }}
                                                >
                                                    <Typography className={releaseTimelineStyleClasses.releaseNameText}>
                                                        {releaseData.name}
                                                    </Typography>
                                                </Tooltip>
                                            </Grid>)
                                        })
                                    }
                                </Grid>
                                <Grid item className={releaseTimelineStyleClasses.rightArrowicon}>
                                    {!disableRightArrowIcon &&
                                        <IconButton
                                            classes={{ root: releaseTimelineStyleClasses.iconButton }}
                                            onClick={handleRightArrowClick}
                                        >
                                            <ArrowForwardIosIcon fontSize="medium" className={releaseTimelineStyleClasses.icon} />
                                        </IconButton>}
                                </Grid>
                            </Grid>
                            {/* Release Bar */}
                            <Grid item className={releaseTimelineStyleClasses.releaseTypeBar}>
                                <Grid item className={releaseTimelineStyleClasses.releaseTypeBarGrid}>
                                    {
                                        selectedFiveReleases.map((releaseData: ReleaseModel) => {
                                            let lIsReleasePresent: boolean = false;
                                            let lIndex: number = 0;
                                            releaseTimelineComponentProps.businessGoal.releaseTimelineData.forEach((bgReleaseData: ReleaseTimelineModel, bgReleaseIndex: number) => {
                                                const lReleaseNodeId: string = undefined !== releaseData.nodeId ? releaseData.nodeId : "";
                                                if (bgReleaseData.releaseNodeId === lReleaseNodeId) {
                                                    lIsReleasePresent = true;
                                                    lIndex = bgReleaseIndex;
                                                }
                                            })
                                            if (lIsReleasePresent) {
                                                return (
                                                    <Grid item className={releaseTimelineStyleClasses.horizontalGridItem}>
                                                        <ReleaseTypeIcon
                                                            comment={releaseTimelineComponentProps.businessGoal.releaseTimelineData[lIndex].comment}
                                                            releaseType={releaseTimelineComponentProps.businessGoal.releaseTimelineData[lIndex].releaseType}
                                                        />
                                                    </Grid>
                                                )
                                            } else {
                                                return (
                                                    <Grid item className={releaseTimelineStyleClasses.horizontalGridItem}>
                                                        <ReleaseTypeIcon
                                                            comment={""}
                                                            releaseType={BG_RELEASE_TYPE.NO_RELEASE}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        })
                                    }
                                </Grid>
                            </Grid>
                            {/* Milestones grid */}
                            <Grid item className={releaseTimelineStyleClasses.milestoneGrid}>
                                {
                                    selectedFiveReleases.map((releaseData: ReleaseModel) => {
                                        let lIsReleasePresent: boolean = false;
                                        let lIndex: number = 0;
                                        releaseTimelineComponentProps.businessGoal.releaseTimelineData.forEach((bgReleaseData: ReleaseTimelineModel, bgReleaseIndex: number) => {
                                            const lReleaseNodeId: string = undefined !== releaseData.nodeId ? releaseData.nodeId : "";
                                            if (bgReleaseData.releaseNodeId === lReleaseNodeId) {
                                                if (bgReleaseData.releaseNodeId === lReleaseNodeId) {
                                                    lIsReleasePresent = true;
                                                    lIndex = bgReleaseIndex;
                                                }
                                            }
                                        })
                                        if (lIsReleasePresent) {
                                            return (
                                                <Grid item className={releaseTimelineStyleClasses.horizontalGridItem}>
                                                    <MilestoneList
                                                        dataList={dataList}
                                                        defaultValues={releaseTimelineComponentProps.businessGoal.releaseTimelineData[lIndex].milestones}
                                                    />
                                                </Grid>
                                            )
                                        } else {
                                            return (
                                                <Grid item className={releaseTimelineStyleClasses.horizontalGridItem}>
                                                    <MilestoneList
                                                        dataList={dataList}
                                                        defaultValues={[]}
                                                    />
                                                </Grid>
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        </Grid>
                        :
                        <Grid >
                            No Releases added..
                        </Grid>
                }
            </CardContent>
        </Card >
    );
}