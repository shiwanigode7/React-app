import { Box, Grid } from "@material-ui/core";
import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { RunwayRowStyles } from "./RRMView/RRMByRunway/RRMTable/RunwayRow/RunwayRowStyles";
export interface overallocationModel {
    warningMessage: string;
    widthValue: string;
    marginLeftBox?: string;
    marginRightBox?: string;
    marginBottomBox?: string;
}
export default function OverallocationWarning(props: overallocationModel) {
    const runwayRowStyleClasses = RunwayRowStyles();

    return (
        <Box className={runwayRowStyleClasses.OverAllocationBox}
            sx={{
                width: props.widthValue,
                marginLeft: props.marginLeftBox ? props.marginLeftBox : "0px",
                marginRight: props.marginRightBox ? props.marginRightBox : "0px",
                marginBottom: props.marginBottomBox ? props.marginBottomBox : "0px"
            }}>
            <WarningRoundedIcon style={{ fontSize: 60, margin: "15px 15px 10px 15px" }} className={runwayRowStyleClasses.warningIcon} />
            <Grid container direction="column">
                <Grid item className={runwayRowStyleClasses.warningMessage}>
                    {"Warning"}
                </Grid>
                <Grid item >
                    {props.warningMessage}
                </Grid>
            </Grid>
        </Box>
    );
}