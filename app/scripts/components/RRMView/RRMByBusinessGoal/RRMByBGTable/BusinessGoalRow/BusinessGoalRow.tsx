import { Grid, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import { BG_RELEASE_TYPE } from "../../../../../constant/InnovationEnums";
import { ReleaseTimelineModel, RunwayModel } from "../../../../../interfaces/InnovationInterface";
import ReleaseTypeIcon from "../../../../PPLView/ReleaseTypeIcon/ReleaseTypeIcon";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import CollapsibleViewArrowIcon from "../../../../utils/CollapsibleViewArrowIcon/CollapsibleViewArrowIcon";
import Thumbnail from "../../../../utils/Thumbnail/Thumbnail";
import TextWithTooltip from "../../../../utils/TextWithTooltip/TextWithTooltip";
import RunwayRow from "../RunwayRow/RunwayRow";
import BusinessGoalRowModel from "./BusinessGoalRowModel";
import { BusinessGoalRowStyles } from "./BusinessGoalRowStyles";

export default function BusinessGoalRow(businessGoalRowProps: BusinessGoalRowModel) {

    const businessGoalRowStyleClasses = BusinessGoalRowStyles();
    const [showRunways, setShowRunways] = useState<boolean>(false);

    const defaultRelease: ReleaseTimelineModel = {
        comment: "",
        milestones: [],
        releaseNodeId: "",
        releaseType: BG_RELEASE_TYPE.NO_RELEASE
    };

    const defaultRunway: RunwayModel = {
        isActive: true,
        managerName: "",
        nodeId: "",
        thumbnail: "",
        runwayName: ""
    };

    const handleArrowIconClick = (() => {
        setShowRunways(!showRunways);
    });

    function getStyleClass(index: number) {
        let styleClass = businessGoalRowStyleClasses.otherReleaseCell;
        if (0 === index) {
            styleClass = businessGoalRowStyleClasses.firstReleaseCell;
        } else if (1 === index) {
            styleClass = businessGoalRowStyleClasses.currentReleaseCell;
        } else if (4 === index) {
            styleClass = businessGoalRowStyleClasses.lastReleaseCell;
        }
        return styleClass;
    }

    function getRunway(inRunwayNodeId: string): RunwayModel {
        let lRunway: RunwayModel = defaultRunway;
        businessGoalRowProps.runwayList.forEach((runway: RunwayModel) => {
            if (inRunwayNodeId === runway.nodeId) {
                lRunway = runway;
            }
        })
        return lRunway;
    }

    function getBGCells() {
        const tableCell: JSX.Element[] = [];
        businessGoalRowProps.releases.forEach((release: ReleaseModel, index: number) => {
            // Variable is true is ReleaseTimeData in BG is present for the release
            let isReleasePresent: boolean = false;
            businessGoalRowProps.businessGoal.releaseTimelineData.forEach((releaseTimeLineData: ReleaseTimelineModel) => {
                if (release.nodeId === releaseTimeLineData.releaseNodeId) {
                    isReleasePresent = true;
                    tableCell.push(
                        <TableCell className={(4 === index) ? businessGoalRowStyleClasses.lastreleaseTableCell : businessGoalRowStyleClasses.releaseTableCell}>
                            <div className={getStyleClass(index)}>
                                <ReleaseTypeIcon
                                    releaseTimelineData={releaseTimeLineData}
                                    isActiveRelease={(1 === index)}
                                    isEditable={false}
                                />
                            </div>
                        </TableCell>
                    )
                }
            })
            if (!isReleasePresent) {
                tableCell.push(
                    <TableCell className={(4 === index) ? businessGoalRowStyleClasses.lastreleaseTableCell : businessGoalRowStyleClasses.releaseTableCell}>
                        <div className={getStyleClass(index)}>
                            <ReleaseTypeIcon
                                releaseTimelineData={defaultRelease}
                                isActiveRelease={(1 === index)}
                                isEditable={false}
                            />
                        </div>
                    </TableCell>
                )
            }
        });
        return tableCell;
    }

    return (
        <>
            <TableRow>
                <TableCell className={businessGoalRowStyleClasses.bgCell}>
                    <Grid
                        container
                        direction="row"
                        spacing={1}
                        className={businessGoalRowStyleClasses.bgCellGrid}
                    >
                        <Grid
                            item
                            onClick={handleArrowIconClick}
                            className={businessGoalRowStyleClasses.iconGrid}
                        >
                            {
                                0 !== businessGoalRowProps.businessGoal.runwaysList.length ?
                                    <CollapsibleViewArrowIcon
                                        isOpen={showRunways}
                                        handleClick={businessGoalRowProps.handleClick}
                                        nodeId={
                                            businessGoalRowProps.businessGoal.nodeId ?
                                                businessGoalRowProps.businessGoal.nodeId : ""
                                        }
                                    /> : null
                            }
                        </Grid>
                        <Grid item>
                            <Thumbnail
                                altText="Business Goal Thumbnail"
                                src={businessGoalRowProps.businessGoal.thumbnail?.toString()}
                            />
                        </Grid>
                        <Grid item className={businessGoalRowStyleClasses.bgNameGrid}>
                            <TextWithTooltip
                                text={businessGoalRowProps.businessGoal.businessGoalName.toString()}
                                tooltipText={businessGoalRowProps.businessGoal.businessGoalName.toString()}
                                isTextBold={false}
                                tooltipPlacement="bottom"
                            />
                        </Grid>
                    </Grid>
                </TableCell>
                {getBGCells()}
            </TableRow>
            {
                showRunways &&
                businessGoalRowProps.businessGoal.runwaysList.map((runway: string) => {
                    let lRunway: RunwayModel = getRunway(runway);
                    if ("" !== lRunway.runwayName) {
                        return (
                            <RunwayRow
                                businessGoalNodeId={businessGoalRowProps.businessGoal.nodeId ? businessGoalRowProps.businessGoal.nodeId : ""}
                                fteList={businessGoalRowProps.fteList}
                                runway={lRunway}
                                releases={businessGoalRowProps.releases}
                                isPercentageView={businessGoalRowProps.isPercentageView} />
                        )
                    }
                })
            }
        </>
    )
}