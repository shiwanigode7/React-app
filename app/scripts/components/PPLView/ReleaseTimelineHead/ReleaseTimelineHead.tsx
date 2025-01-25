import { Grid } from "@material-ui/core";
import React from "react";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import ReleaseTimelineHeadModel from "./ReleaseTimelineHeadModel";
import { ReleaseTimelineHeadStyles } from "./ReleaseTimelineHeadStyles";
import ActiveReleaseTableCellContent from "../../utils/ActiveReleaseTableCellContent/ActiveReleaseTableCellContent";
import TextWithTooltip from "../../utils/TextWithTooltip/TextWithTooltip";

export default function ReleaseTimelineHead(releaseTimelineHeadProps: ReleaseTimelineHeadModel) {
    const releaseTimelineHeadStyleClasses = ReleaseTimelineHeadStyles();

    return (
        <Grid container direction="row" className={releaseTimelineHeadStyleClasses.releaseTimelineHeadContainer}>
            {
                releaseTimelineHeadProps.fiveUnarchivedReleases.map((release: ReleaseModel, index: number) => (
                    1 === index ?
                        <Grid container item direction="row" className={releaseTimelineHeadStyleClasses.currentRelease}>
                            <ActiveReleaseTableCellContent
                                text={release.name.substring(0, 5)}
                                tooltipText={release.name}
                                isTextBold={true}
                                tooltipPlacement="bottom" />
                        </Grid> :
                        <Grid item className={releaseTimelineHeadStyleClasses.nextRelease}>
                            <TextWithTooltip
                                text={release.name.substring(0, 7)}
                                tooltipText={release.name}
                                isTextBold={true}
                                textAlign={"center"}
                                tooltipPlacement="bottom" />
                        </Grid>
                ))
            }
        </Grid>
    )
}