import { IconButton } from "@material-ui/core";
import React from "react";
import CollapsibleViewArrowIconModel from "./CollapsibleViewArrowIconModel";
import { CollapsibleViewArrowIconStyles } from "./CollapsibleViewArrowIconStyles";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export default function CollapsibleViewArrowIcon(collapsibleViewArrowIconProps: CollapsibleViewArrowIconModel) {
    const collapsibleViewArrowIconStyleClasses = CollapsibleViewArrowIconStyles();

    function getArrowIcon() {
        let arrowIcon = <ArrowRightRoundedIcon />;
        if (collapsibleViewArrowIconProps.isOpen) {
            arrowIcon = <ArrowDropDownRoundedIcon />;
        }
        return arrowIcon;
    }

    return (
        <IconButton className={collapsibleViewArrowIconStyleClasses.IconButton}
            onClick={() => collapsibleViewArrowIconProps.handleClick(collapsibleViewArrowIconProps.nodeId)}>
            {getArrowIcon()}
        </IconButton>
    )
}
