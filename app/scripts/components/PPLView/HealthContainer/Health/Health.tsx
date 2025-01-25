import { Avatar, Tooltip } from "@material-ui/core";
import React from "react";
import { BG_HEALTH_ITEMS } from "../../../../constant/InnovationEnums";
import HealthModel from "./HealthModel";
import { HealthStyles } from "./HealthStyles";

export default function Health(healthProps: HealthModel) {
    const healthStyleClasses = HealthStyles();

    const getTypography = (heading: string, comment: string) => {
        return <><b>{heading}: </b>{comment}</>
    }

    const getToolTip = () => {
        switch (healthProps.initial) {
            case "T": return getTypography(BG_HEALTH_ITEMS.TECHNICAL, healthProps.comment);
            case "S": return getTypography(BG_HEALTH_ITEMS.SCHEDULE, healthProps.comment);
            case "R": return getTypography(BG_HEALTH_ITEMS.RESOURCES, healthProps.comment);
            case "I": return getTypography(BG_HEALTH_ITEMS.IP, healthProps.comment);
            case "B": return getTypography(BG_HEALTH_ITEMS.BUSINESS_CASE, healthProps.comment);
            default: return getTypography("", healthProps.comment);
        }
    }

    return (
        <Tooltip
            title={getToolTip()}
            placement="bottom-start"
            arrow>
            <Avatar
                className={healthStyleClasses.avatar}
                style={{ color: healthProps.color, backgroundColor: healthProps.backGroundColor }}>
                {healthProps.initial}
            </Avatar>
        </Tooltip>
    )
}