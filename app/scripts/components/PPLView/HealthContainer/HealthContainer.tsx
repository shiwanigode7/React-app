import { Grid } from "@material-ui/core";
import React from "react";
import { COLOR_GRAPHITE_2, COLOR_GREY_3, COLOR_GREY_AVATAR, COLOR_WHITE, COMPLETED_COLOR, IDEATION_COLOR, SCHEDULED_COLOR } from "../../../constant/Colors";
import { BG_HEALTH_STATUS } from "../../../constant/InnovationEnums";
import Health from "./Health/Health";
import HealthContainerModel from "./HealthContainerModel";
import { HealthContainerStyles } from "./HealthContainerStyles";

export default function HealthContainer(healthContainerProps: HealthContainerModel) {

    const healthContainerStyleClasses = HealthContainerStyles();

    function getColor(status: string) {
        let color: string = COLOR_GRAPHITE_2;
        switch (status) {
            case BG_HEALTH_STATUS.OK: color = COLOR_WHITE; break;
            case BG_HEALTH_STATUS.AT_RISK: color = COLOR_GRAPHITE_2; break;
            case BG_HEALTH_STATUS.NOT_OK: color = COLOR_WHITE; break;
            case BG_HEALTH_STATUS.NOT_APPLICABLE: color = COLOR_GRAPHITE_2; break;
            case BG_HEALTH_STATUS.NO_STATUS: color = COLOR_GRAPHITE_2; break;
        }
        return color;
    }

    function getBackGroundColor(status: string) {
        let backGroundColor: string = COLOR_GREY_3;
        switch (status) {
            case BG_HEALTH_STATUS.OK: backGroundColor = COMPLETED_COLOR; break;
            case BG_HEALTH_STATUS.AT_RISK: backGroundColor = IDEATION_COLOR; break;
            case BG_HEALTH_STATUS.NOT_OK: backGroundColor = SCHEDULED_COLOR; break;
            case BG_HEALTH_STATUS.NOT_APPLICABLE: backGroundColor = COLOR_GREY_AVATAR; break;
            case BG_HEALTH_STATUS.NO_STATUS: backGroundColor = COLOR_GREY_3; break;
        }
        return backGroundColor;
    }

    return (
        <Grid container direction="row" className={healthContainerStyleClasses.container}>
            <Grid item>
                <Health
                    initial="T"
                    comment={healthContainerProps.bgHealth.technical.comment}
                    color={getColor(healthContainerProps.bgHealth.technical.status)}
                    backGroundColor={getBackGroundColor(healthContainerProps.bgHealth.technical.status)} />
            </Grid>
            <Grid item>
                <Health
                    initial="S"
                    comment={healthContainerProps.bgHealth.schedule.comment}
                    color={getColor(healthContainerProps.bgHealth.schedule.status)}
                    backGroundColor={getBackGroundColor(healthContainerProps.bgHealth.schedule.status)} />
            </Grid>
            <Grid item>
                <Health
                    initial="R"
                    comment={healthContainerProps.bgHealth.resources.comment}
                    color={getColor(healthContainerProps.bgHealth.resources.status)}
                    backGroundColor={getBackGroundColor(healthContainerProps.bgHealth.resources.status)} />
            </Grid>
            <Grid item>
                <Health
                    initial="I"
                    comment={healthContainerProps.bgHealth.IP.comment}
                    color={getColor(healthContainerProps.bgHealth.IP.status)}
                    backGroundColor={getBackGroundColor(healthContainerProps.bgHealth.IP.status)} />
            </Grid>
            <Grid item>
                <Health
                    initial="B"
                    comment={healthContainerProps.bgHealth.businessCase.comment}
                    color={getColor(healthContainerProps.bgHealth.businessCase.status)}
                    backGroundColor={getBackGroundColor(healthContainerProps.bgHealth.businessCase.status)} />
            </Grid>

        </Grid>
    )
}
