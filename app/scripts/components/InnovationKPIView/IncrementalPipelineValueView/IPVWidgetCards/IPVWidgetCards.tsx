import { Card, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { HARDWARE, MILLION_DOLLAR, SOFTWARE } from "../../../../constant/IPVTexts";
import { addThousandSeparator, roundToOneDecimalPointWithThousandSeparator } from "../../../../utils/Utilities";
import IPVWidgetCardsModel from "./IPVWidgetCardsModel";
import { IPVWidgetCardsStyles } from "./IPVWidgetCardsStyles";

export function IPVWidgetCards(props: IPVWidgetCardsModel) {

    const IPVWidgetCardsStyleClasses = IPVWidgetCardsStyles();

    const getCardValueStyles = (value: string) => {
        if (value.length <= 6) {
            return IPVWidgetCardsStyleClasses.cardValue1;
        } else if (value.length <= 8) {
            return IPVWidgetCardsStyleClasses.cardValue2;
        } else {
            return IPVWidgetCardsStyleClasses.cardValue3;
        }
    }

    return (
        <Grid container direction="row" className={IPVWidgetCardsStyleClasses.ipvWidgetsGrid}>
            <Grid item className={IPVWidgetCardsStyleClasses.quarterWidget}>
                <Card className={IPVWidgetCardsStyleClasses.ipvCard}>
                    <Grid container direction="row" className={IPVWidgetCardsStyleClasses.quarterWidgetContainer}>
                        {
                            props.quarterIPV.map((value: number, index: number) => (
                                <Grid item container direction="row" className={IPVWidgetCardsStyleClasses.quarterGridContainer}>
                                    <Grid item container direction="column" className={IPVWidgetCardsStyleClasses.quarterValueContainer}>
                                        <Grid item className={getCardValueStyles(addThousandSeparator(value))}>
                                            {addThousandSeparator(value)}
                                        </Grid>
                                        <Grid item className={IPVWidgetCardsStyleClasses.quarterHeadingGrid}>
                                            Q{index + 1}
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Divider orientation="vertical" variant="middle" flexItem className={IPVWidgetCardsStyleClasses.ipvDivider} />
                                    </Grid>
                                </Grid>
                            ))
                        }
                        <Grid item className={getCardValueStyles(MILLION_DOLLAR)}>
                            {MILLION_DOLLAR}
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item className={IPVWidgetCardsStyleClasses.ipvWidget}>
                <Card className={IPVWidgetCardsStyleClasses.ipvCard}>
                    <Grid container direction="row" className={IPVWidgetCardsStyleClasses.ipvGridContainer}>
                        <Grid item className={IPVWidgetCardsStyleClasses.ipvHeadingGrid}>
                            {SOFTWARE}
                        </Grid>
                        <Grid item>
                            <Divider orientation="vertical" variant="middle" flexItem className={IPVWidgetCardsStyleClasses.ipvDivider} />
                        </Grid>
                        <Grid item>
                            <Typography className={getCardValueStyles(roundToOneDecimalPointWithThousandSeparator(props.softwareIPV))}>
                                {roundToOneDecimalPointWithThousandSeparator(props.softwareIPV) + " " + MILLION_DOLLAR}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item className={IPVWidgetCardsStyleClasses.ipvWidget}>
                <Card className={IPVWidgetCardsStyleClasses.ipvCard}>
                    <Grid container direction="row" className={IPVWidgetCardsStyleClasses.ipvGridContainer}>
                        <Grid item className={IPVWidgetCardsStyleClasses.ipvHeadingGrid}>
                            {HARDWARE}
                        </Grid>
                        <Grid item>
                            <Divider orientation="vertical" variant="middle" flexItem className={IPVWidgetCardsStyleClasses.ipvDivider} />
                        </Grid>
                        <Grid item>
                            <Typography className={getCardValueStyles(roundToOneDecimalPointWithThousandSeparator(props.hardwareIPV))}>
                                {roundToOneDecimalPointWithThousandSeparator(props.hardwareIPV) + " " + MILLION_DOLLAR}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}