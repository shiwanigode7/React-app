import { Card, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { BottomWidgetModel } from "./BottomWidgetModel";
import { BottomWidgetStyles } from "./BottomWidgetStyle";

export function BottomWidget(props: BottomWidgetModel) {

    const bottomWidgetStyleClasses = BottomWidgetStyles();
    return (
        <Card className={bottomWidgetStyleClasses.cardRoot}>
            <Grid container spacing={1} className={bottomWidgetStyleClasses.headerGrid} alignItems="center">
                <Grid item>
                    {props.cardHeaderIcon}
                </Grid>
                <Grid item>
                    <Typography className={bottomWidgetStyleClasses.cardTitle}>{props.cardHeaderTitle}</Typography>
                </Grid>
            </Grid>
            <Divider className={bottomWidgetStyleClasses.divider}/>
            {props.cardContent}
        </Card>
    )
}