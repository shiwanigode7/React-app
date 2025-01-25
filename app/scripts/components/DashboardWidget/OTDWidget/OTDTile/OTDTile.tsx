import { Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { OTDMonthData } from "../OTDWidgetModel";
import { OTDMilestoneModel } from "./OTDTileInputModel";
import { OTDTileStyle } from "./OTDTileStyles";

export default function OTDTile(inputProps: OTDMonthData) {

    const OTDTileStyleClasses = OTDTileStyle();
    return (
        <Grid container className={OTDTileStyleClasses.gridRoot} direction="column">
            {/* Title */}
            <Grid item>
                <Typography className={OTDTileStyleClasses.monthText}>
                    {inputProps.month}
                </Typography>
            </Grid>
            {/* OTD */}
            <Grid item>
                <Typography className={inputProps.otdPercentage >= 80 ? OTDTileStyleClasses.completeOTDText : OTDTileStyleClasses.incompleteOTDText}>
                    {`${99.50 < inputProps.otdPercentage && 100 > inputProps.otdPercentage ?
                        Math.floor(inputProps.otdPercentage) : Math.round(inputProps.otdPercentage)}%`}
                </Typography>
            </Grid>
            {/* Incomplete Milestones  */}
            <Grid item className={OTDTileStyleClasses.incompleteMilestonesGrid}>
                {
                    inputProps.incompleteMilestones.map((milestone: OTDMilestoneModel) => (
                        <div className={OTDTileStyleClasses.incompleteMilestonesDiv}>
                            <Typography className={OTDTileStyleClasses.incompleteMilestoneText} title={milestone.milestoneName}>
                                {milestone.milestoneName}
                            </Typography>
                            <div className={OTDTileStyleClasses.inCompleteMilestoneChipDivStyle}>
                                <Chip size="small" className={OTDTileStyleClasses.inCompleteMilestoneChip} label={`${milestone.completedHeroFeatures.toString()}/${(milestone.totalHeroFeatures).toString()}`} />
                            </div>
                        </div>
                    ))
                }
            </Grid>
        </Grid >
    );
}