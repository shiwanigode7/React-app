/**TSX file to display the status in chip component for business goal */
import { Chip } from "@material-ui/core";
import React from "react";
import { InnovationStatus } from "../../constant/InnovationEnums";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import RotateRightRoundedIcon from "@material-ui/icons/RotateRightRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import { BGStatusChipStyles } from "../../themes/BGStatusChipTheme";

declare interface BGStatusChipProps {
    /**Status value of the business goal */
    status: string;
}

export function BGStatusChip(inputProps: BGStatusChipProps) {
    const BGStatusChipStyleClasses = BGStatusChipStyles();

    /**Variables To hold the icon to be displayed and the style class */
    let chipIcon: any = <div></div>;
    let chipStyleClass: any = BGStatusChipStyleClasses.ideation;
    let chipIconStyles: any = InnovationStatus.IDEATION === inputProps.status.trim() ? BGStatusChipStyleClasses.chipIdeationIcon : BGStatusChipStyleClasses.chipIcon;

    /**Set the icon and styles depending upon the status of the business goal */
    switch (inputProps.status) {
        case InnovationStatus.IDEATION:
            chipIcon = <CategoryRoundedIcon />;
            chipStyleClass = BGStatusChipStyleClasses.ideation;
            break;
        case InnovationStatus.SCHEDULED:
            chipIcon = <SwapVertIcon />;
            chipStyleClass = BGStatusChipStyleClasses.scheduled;
            break;
        case InnovationStatus.ACTIVE:
            chipIcon = <RotateRightRoundedIcon />;
            chipStyleClass = BGStatusChipStyleClasses.active;
            break;
        case InnovationStatus.COMPLETED:
            chipIcon = <DoneRoundedIcon />;
            chipStyleClass = BGStatusChipStyleClasses.completed;
            break;
    }

    return (
        <Chip
            icon={chipIcon}
            className={chipStyleClass}
            label={inputProps.status}
            classes={{
                icon: chipIconStyles
            }}
        />
    );
}