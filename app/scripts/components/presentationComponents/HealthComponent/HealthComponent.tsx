import { Card, CardContent, CardHeader, Chip, Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { BG_HEALTH_ITEMS, BG_HEALTH_STATUS } from "../../../constant/InnovationEnums";
import HealthComponentModel from "./HealthComponentModel";
import { HealthComponentStyles } from "./HealthComponentStyles";

export default function HealthComponent(healthComponentProps: HealthComponentModel) {
    const healthComponentStyleClasses = HealthComponentStyles();

    function getChipClassName(status: string) {
        let chipClassName: string = healthComponentStyleClasses.chip;
        switch (status) {
            case BG_HEALTH_STATUS.OK: chipClassName = healthComponentStyleClasses.chipOk; break;
            case BG_HEALTH_STATUS.AT_RISK: chipClassName = healthComponentStyleClasses.chipAtRisk; break;
            case BG_HEALTH_STATUS.NOT_OK: chipClassName = healthComponentStyleClasses.chipNotOk; break;
            case BG_HEALTH_STATUS.NOT_APPLICABLE: chipClassName = healthComponentStyleClasses.chipNotApplicable; break;
            case BG_HEALTH_STATUS.NO_STATUS: chipClassName = healthComponentStyleClasses.chipNoStatus; break;
        }
        return chipClassName;
    }

    const getTypography = (heading: string, comment: string) => {
        if (comment == "") {
            return <><b>No comment added</b></>
        }
        else
            return <><b>{comment}</b></>
    }
    const getToolTip = (healthType: string) => {
        switch (healthType) {
            case "T": return getTypography(BG_HEALTH_ITEMS.TECHNICAL, healthComponentProps.bgHealth.technical.comment);
            case "S": return getTypography(BG_HEALTH_ITEMS.SCHEDULE, healthComponentProps.bgHealth.schedule.comment);
            case "R": return getTypography(BG_HEALTH_ITEMS.RESOURCES, healthComponentProps.bgHealth.resources.comment);
            case "I": return getTypography(BG_HEALTH_ITEMS.IP, healthComponentProps.bgHealth.IP.comment);
            case "B": return getTypography(BG_HEALTH_ITEMS.BUSINESS_CASE, healthComponentProps.bgHealth.businessCase.comment);
            default: return getTypography("", "");
        }
    }

    return (
        <Card className={healthComponentStyleClasses.cardRoot}>
            <CardHeader
                title={"Health"}
                classes={{ title: healthComponentStyleClasses.cardHeaderStyles }}
            />
            <CardContent className={healthComponentStyleClasses.cardContent}>
                <Grid container direction="row" className={healthComponentStyleClasses.container}>
                    <Grid item className={healthComponentStyleClasses.itemGrid}>
                        <Tooltip
                            title={getToolTip("T")}
                            placement="bottom-start"
                            arrow>
                            <Chip label={BG_HEALTH_ITEMS.TECHNICAL}
                                classes={{ label: healthComponentStyleClasses.labelStyles }}
                                className={getChipClassName(healthComponentProps.bgHealth.technical.status)} />
                        </Tooltip>
                    </Grid>
                    <Grid item className={healthComponentStyleClasses.itemGrid}>
                        <Tooltip
                            title={getToolTip("S")}
                            placement="bottom-start"
                            arrow>
                            <Chip label={BG_HEALTH_ITEMS.SCHEDULE}
                                classes={{ label: healthComponentStyleClasses.labelStyles }}
                                className={getChipClassName(healthComponentProps.bgHealth.schedule.status)} />
                        </Tooltip>
                    </Grid>
                    <Grid item className={healthComponentStyleClasses.resourcesGrid}>
                        <Tooltip
                            title={getToolTip("R")}
                            placement="bottom-start"
                            arrow>
                            <Chip label={BG_HEALTH_ITEMS.RESOURCES}
                                classes={{ label: healthComponentStyleClasses.labelStyles }}
                                className={getChipClassName(healthComponentProps.bgHealth.resources.status)} />
                        </Tooltip>
                    </Grid>
                    <Grid item className={healthComponentStyleClasses.ipGrid}>
                        <Tooltip
                            title={getToolTip("I")}
                            placement="bottom-start"
                            arrow>
                            <Chip label={BG_HEALTH_ITEMS.IP}
                                classes={{ label: healthComponentStyleClasses.labelStyles }}
                                className={getChipClassName(healthComponentProps.bgHealth.IP.status)} />
                        </Tooltip>
                    </Grid>
                    <Grid item className={healthComponentStyleClasses.bgCaseGrid}>
                        <Tooltip
                            title={getToolTip("B")}
                            placement="bottom-start"
                            arrow>
                            <Chip label={BG_HEALTH_ITEMS.BUSINESS_CASE}
                                classes={{ label: healthComponentStyleClasses.labelStyles }}
                                className={getChipClassName(healthComponentProps.bgHealth.businessCase.status)} />
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
