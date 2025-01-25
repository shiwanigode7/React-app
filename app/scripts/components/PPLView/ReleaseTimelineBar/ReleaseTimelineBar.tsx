import { Grid } from "@material-ui/core";
import React from "react";
import { BG_RELEASE_TYPE } from "../../../constant/InnovationEnums";
import { ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import ReleaseTypeIcon from "../ReleaseTypeIcon/ReleaseTypeIcon";
import ReleaseTimelineBarModel from "./ReleaseTimelineBarModel";
import { ReleaseTimelineBarStyles } from "./ReleaseTimelineBarStyles";

export default function ReleaseTimelineBar(releaseTimelineBarProps: ReleaseTimelineBarModel) {
    const releaseTimelineBarStyleClasses = ReleaseTimelineBarStyles();

    function getReleaseTimelineData(releaseNodeId: string) {
        let releaseTimelineData: ReleaseTimelineModel = {
            comment: "",
            milestones: [],
            releaseNodeId: "",
            releaseType: BG_RELEASE_TYPE.NO_RELEASE
        };
        if (releaseNodeId) {
            const releaseTimelineDataArray: ReleaseTimelineModel[] = releaseTimelineBarProps.releaseTimelineData.filter(
                (releaseTimeline: ReleaseTimelineModel) => (
                    releaseNodeId === releaseTimeline.releaseNodeId
                ));
            if (releaseTimelineDataArray.length > 0) {
                releaseTimelineData = releaseTimelineDataArray[0];
            }
        }
        return releaseTimelineData;
    }

    function getStyleClass(index: number) {
        let styleClass = releaseTimelineBarStyleClasses.otherReleaseCell;
        if (0 === index) {
            styleClass = releaseTimelineBarStyleClasses.firstReleaseCell;
        } else if (1 === index) {
            styleClass = releaseTimelineBarStyleClasses.currentReleaseCell;
        } else if (4 === index) {
            styleClass = releaseTimelineBarStyleClasses.lastReleaseCell;
        }
        return styleClass;
    }

    function isActiveRelease(index: number) {
        let isActive: boolean = false;
        if (1 === index) {
            isActive = true;
        }
        return isActive;
    }

    return (
        <Grid container direction="row" className={releaseTimelineBarStyleClasses.releaseContainer}>
            {
                releaseTimelineBarProps.fiveUnarchivedReleases.map((release: ReleaseModel, index: number) => (
                    <Grid item className={getStyleClass(index)}>
                        <ReleaseTypeIcon isEditable={false} isActiveRelease={isActiveRelease(index)} releaseTimelineData={getReleaseTimelineData(release.nodeId)} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
