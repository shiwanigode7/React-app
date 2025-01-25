import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { MILLION_DOLLAR } from "../../../constant/IPVTexts";
import { convertToMillionGetWithoutUnit } from "../../../utils/Utilities";
import { NPV } from "../PPGPresentationConstant";
import { npvWidgetStyle } from "./NPVComponentStyle";

export declare interface NPVComponentModel {
    npvValue: number;
}

export function NPVComponent(npvComponentProps: NPVComponentModel) {
    const npvComponentClasses = npvWidgetStyle();
    return (
        <Card className={npvComponentClasses.cardRoot}>
            {
                <CardContent className={npvComponentClasses.cardcontent}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography>
                                <span className={0 > npvComponentProps.npvValue ? npvComponentClasses.negativeNPV : npvComponentClasses.typographyStyles}>
                                    {convertToMillionGetWithoutUnit(npvComponentProps.npvValue)}
                                </span>
                                <span className={npvComponentClasses.npvUnit}>
                                    {` ${MILLION_DOLLAR}`}
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={npvComponentClasses.typographyNPV}>{NPV}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            }
        </Card>
    )
}


