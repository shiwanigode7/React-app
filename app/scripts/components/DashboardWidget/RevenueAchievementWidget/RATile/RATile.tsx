import { Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { RABusinessLine } from "../RevenueAchievementWidgetModel";
import { RATileModel } from "./RATileModel";
import { RATileStyle } from "./RATileStyle";

export default function RATile(raTileProps: RATileModel) {

    const RATileStyleClasses = RATileStyle();

    return (
        <Grid container className={RATileStyleClasses.gridRoot} direction="column">
            {/* Title */}
            <Grid item>
                <Typography className={RATileStyleClasses.quarterText}>
                    {raTileProps.revenueAchievementData.quarterDetails}
                </Typography>
            </Grid>
            <Grid item>
                <Typography className={100 <= raTileProps.revenueAchievementData.percentage ? RATileStyleClasses.raGreenText : RATileStyleClasses.raRedText}>
                    {`${raTileProps.revenueAchievementData.percentage}%`}
                </Typography>
            </Grid>
            {/* Active Business Goal  */}
            <Grid item className={RATileStyleClasses.businessLinesGrid}>
                {
                    raTileProps.revenueAchievementData.BusinessLineList.map((businessLine: RABusinessLine) => (
                        <div className={RATileStyleClasses.businessGoalDiv}>
                            <Typography className={RATileStyleClasses.businessLineText} title={businessLine.businessLineName}>
                                {businessLine.businessLineName}
                            </Typography>
                            <Chip size="small" className={RATileStyleClasses.percentageChip} label={`${businessLine.percentage}%`} />
                        </div>
                    ))
                }
            </Grid>
        </Grid>
    );
}