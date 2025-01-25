import { Card, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { COLOR_DARK_YELLOW, COLOR_GRAPHITE_5, COMPLETED_COLOR, SCHEDULED_COLOR } from "../../../../constant/Colors";
import { CheckIcon } from "../../../Icons/CheckIcon";
import { ExclamationIcon } from "../../../Icons/ExclamationIcon";
import { HoreseIcon } from "../../../Icons/HorseIcon";
import { TruckIcon } from "../../../Icons/TruckCheckIcon";
import OverallScoreCardModel from "./OverallScoreCardModel";
import { OverallScoreCardStyle } from "./OverallScoreCardStyle";

export function OverallScoreCard(overallScoreCardProps: OverallScoreCardModel) {

    const overallScoreCardStyleClasses = OverallScoreCardStyle();

    const getScoreCardClass = () => {
        switch (overallScoreCardProps.scoreCardName) {
            case "OTD": return overallScoreCardStyleClasses.OTDCard;
            case "Milestones On Track": return overallScoreCardStyleClasses.completedCard;
            case "Milestones Behind": return overallScoreCardStyleClasses.notCompleted;
            case "Business Goals": return overallScoreCardStyleClasses.businessGoal;
        }
    }

    const getScoreCardHeadingClass = () => {
        switch (overallScoreCardProps.scoreCardName) {
            case "OTD": return overallScoreCardStyleClasses.OTDHeadingGrid;
            case "Milestones On Track": return overallScoreCardStyleClasses.headingGrid;
            case "Milestones Behind": return overallScoreCardStyleClasses.headingGrid;
            case "Business Goals": return overallScoreCardStyleClasses.headingGrid;
        }
    }
    const getScoreCardIcon = () => {
        switch (overallScoreCardProps.scoreCardName) {
            case "OTD": return <TruckIcon fill={COLOR_DARK_YELLOW} />;
            case "Milestones On Track": return <CheckIcon fill={COMPLETED_COLOR} />;
            case "Milestones Behind": return <ExclamationIcon fill={SCHEDULED_COLOR} />;
            case "Business Goals": return <HoreseIcon fill={COLOR_GRAPHITE_5} />;
        }
    }

    const getDividerClass = () => {
        switch (overallScoreCardProps.scoreCardName) {
            case "OTD": return getOTDDividerClass();
            case "Milestones On Track": return overallScoreCardStyleClasses.completedDivider;
            case "Milestones Behind": return overallScoreCardStyleClasses.notCompletedDivider;
            case "Business Goals": return overallScoreCardStyleClasses.businessGoalDivider;
        }
    }

    const getOTDDividerClass = () => {
        const otdValue: string = overallScoreCardProps.value.toString();

        switch (otdValue.length) {
            case 1: return overallScoreCardStyleClasses.OTDDivider;
            case 2: return overallScoreCardStyleClasses.OTDDivider1;
            case 3: return overallScoreCardStyleClasses.OTDDivider2;
            default: return overallScoreCardStyleClasses.OTDDivider;
        }
    }

    return (
        <Card className={getScoreCardClass()}>
            <Grid container direction="row" className={overallScoreCardStyleClasses.iconGridContainer}>
                <Grid item className={overallScoreCardStyleClasses.iconGrid}>
                    {getScoreCardIcon()}
                </Grid>
                <Grid item className={getScoreCardHeadingClass()}>
                    {overallScoreCardProps.scoreCardName}
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" variant="middle" flexItem className={getDividerClass()} />
                </Grid>
                <Grid item>
                    <Typography className={overallScoreCardStyleClasses.cardValue}>
                        {"OTD" === overallScoreCardProps.scoreCardName ?
                            `${overallScoreCardProps.value}%` : overallScoreCardProps.value}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}