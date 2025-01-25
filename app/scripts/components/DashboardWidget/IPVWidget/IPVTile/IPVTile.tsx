import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { IPVTileInputModel } from "./IPVTileModel";
import { IPVTileStyle } from "./IPVTileStyles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

export default function IPVTile(inputProps: IPVTileInputModel) {

    const IPVTileStyleClasses = IPVTileStyle();
    return (
        <Grid container className={IPVTileStyleClasses.gridRoot} direction="column">
            {/* Title */}
            <Grid item>
                <Typography className={IPVTileStyleClasses.quarterText}>
                    {inputProps.ipvData.quarterDetails}
                </Typography>
            </Grid>
            {/* IPV */}
            <Grid item>
                <Typography className={IPVTileStyleClasses.ipvText}>
                    {`${inputProps.ipvData.ipv} M$`}
                </Typography>
            </Grid>
            {/* Active Business Goal  */}
            <Grid item className={IPVTileStyleClasses.businessGoalGrid}>
                {
                    inputProps.ipvData.activeBusinessGoals.map((businessGoal: string) => (
                        <div className={IPVTileStyleClasses.businessGoalDiv}>
                            <PlayArrowIcon className={IPVTileStyleClasses.activeArrowIcon} />
                            <Typography className={IPVTileStyleClasses.businessGoalText} title={businessGoal}>
                                {businessGoal}
                            </Typography>
                        </div>
                    ))
                }
                {/* InActive Business Goal */}
                {
                    inputProps.ipvData.inActiveBusinessGoals.map((businessGoal: string) => (
                        <div className={IPVTileStyleClasses.businessGoalDiv}>
                            <PlayArrowIcon className={IPVTileStyleClasses.inActiveArrowIcon} />
                            <Typography className={IPVTileStyleClasses.businessGoalText} title={businessGoal}>
                                {businessGoal}
                            </Typography>
                        </div>
                    ))
                }
            </Grid>
        </Grid>
    );
}