import React, { useState } from "react";
import { BG_HEALTH_STATUS } from "../../../../constant/InnovationEnums";
import HealthItemStatusButtonModel from "./HealthItemStatusButtonModel";
import { HealthItemStatusButtonStyle } from "./HealthItemStatusButtonStyle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { HealthItemButton } from "./HealthItemButtom/HealthItemButton";


export function HealthItemStatusButton(HealthItemStatusButtonProps: HealthItemStatusButtonModel) {

    /**To set the position of the menu. Added type based on the Menu Props */
    const [anchorEl, setAnchorEl] = useState<((element: Element) => Element) | null | undefined>(null);
    /**To handle whether the menu should be displayed or not */
    const open = Boolean(anchorEl);

    const HealthItemStatusButtonStyleClass = HealthItemStatusButtonStyle();

    const startIcon: any = HealthItemStatusButtonProps.isCommentPresent ? <CommentRoundedIcon /> : null;

    /**When button is selected open the menu */
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    /**To close the menu on selecting a value */
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (event: any) => {
        HealthItemStatusButtonProps.handleStatusChange(HealthItemStatusButtonProps.item, event);
        handleClose();
    };

    return (
        <div>
            {
                BG_HEALTH_STATUS.OK === HealthItemStatusButtonProps.status &&
                <HealthItemButton
                    item={HealthItemStatusButtonProps.item}
                    handleClick={handleClick}
                    isDisabled={HealthItemStatusButtonProps.isDisabled}
                    startIcon={startIcon}
                    rootClass={HealthItemStatusButtonStyleClass.root}
                    containedPrimaryClass={HealthItemStatusButtonStyleClass.statusOkButton}
                    endIconClass={HealthItemStatusButtonStyleClass.endIcon}
                    startIconClass={HealthItemStatusButtonStyleClass.startIcon}
                    toolTipClass={HealthItemStatusButtonStyleClass.tooltip}
                />
            }
            {
                BG_HEALTH_STATUS.NOT_OK === HealthItemStatusButtonProps.status &&
                <HealthItemButton
                    item={HealthItemStatusButtonProps.item}
                    handleClick={handleClick}
                    isDisabled={HealthItemStatusButtonProps.isDisabled}
                    startIcon={startIcon}
                    rootClass={HealthItemStatusButtonStyleClass.root}
                    containedPrimaryClass={HealthItemStatusButtonStyleClass.statusNotOkButton}
                    endIconClass={HealthItemStatusButtonStyleClass.endIcon}
                    startIconClass={HealthItemStatusButtonStyleClass.startIcon}
                    toolTipClass={HealthItemStatusButtonStyleClass.tooltip}
                />
            }
            {
                BG_HEALTH_STATUS.NOT_APPLICABLE === HealthItemStatusButtonProps.status &&
                <HealthItemButton
                    item={HealthItemStatusButtonProps.item}
                    handleClick={handleClick}
                    isDisabled={HealthItemStatusButtonProps.isDisabled}
                    startIcon={startIcon}
                    rootClass={HealthItemStatusButtonStyleClass.root}
                    containedPrimaryClass={HealthItemStatusButtonStyleClass.statusNotApplicableButton}
                    endIconClass={HealthItemStatusButtonStyleClass.endIcon}
                    startIconClass={HealthItemStatusButtonStyleClass.startIcon}
                    toolTipClass={HealthItemStatusButtonStyleClass.tooltip}
                />
            }
            {
                BG_HEALTH_STATUS.AT_RISK === HealthItemStatusButtonProps.status &&
                <HealthItemButton
                    item={HealthItemStatusButtonProps.item}
                    handleClick={handleClick}
                    isDisabled={HealthItemStatusButtonProps.isDisabled}
                    startIcon={startIcon}
                    rootClass={HealthItemStatusButtonStyleClass.root}
                    containedPrimaryClass={HealthItemStatusButtonStyleClass.statusAtRiskButton}
                    endIconClass={HealthItemStatusButtonStyleClass.endIcon}
                    startIconClass={HealthItemStatusButtonStyleClass.startIcon}
                    toolTipClass={HealthItemStatusButtonStyleClass.tooltip}
                />
            }
            {
                BG_HEALTH_STATUS.NO_STATUS === HealthItemStatusButtonProps.status &&
                <HealthItemButton
                    item={HealthItemStatusButtonProps.item}
                    handleClick={handleClick}
                    isDisabled={HealthItemStatusButtonProps.isDisabled}
                    startIcon={startIcon}
                    rootClass={HealthItemStatusButtonStyleClass.root}
                    containedPrimaryClass={HealthItemStatusButtonStyleClass.statusNoStatusButton}
                    endIconClass={HealthItemStatusButtonStyleClass.endIcon}
                    startIconClass={HealthItemStatusButtonStyleClass.startIcon}
                    toolTipClass={HealthItemStatusButtonStyleClass.tooltip}
                />
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={HealthItemStatusButtonStyleClass.menu}
                classes={{
                    paper: HealthItemStatusButtonStyleClass.MenuPaper
                }}
            >
                {/**If the button is of OK then don't provide OK in the dropdown menu */}
                {
                    BG_HEALTH_STATUS.OK !== HealthItemStatusButtonProps.status &&
                    <MenuItem onClick={handleStatusChange}>{BG_HEALTH_STATUS.OK}</MenuItem>
                }
                {/**If the button is of At Risk then don't provide At Risk in the dropdown menu */}
                {
                    BG_HEALTH_STATUS.AT_RISK !== HealthItemStatusButtonProps.status &&
                    <MenuItem onClick={handleStatusChange}>{BG_HEALTH_STATUS.AT_RISK}</MenuItem>
                }
                {/**If the button is of Not Ok then don't provide Not Ok in the dropdown menu */}
                {
                    BG_HEALTH_STATUS.NOT_OK !== HealthItemStatusButtonProps.status &&
                    <MenuItem onClick={handleStatusChange}>{BG_HEALTH_STATUS.NOT_OK}</MenuItem>
                }
                {/**If the button is of Not Applicable then don't provide Not Applicable in the dropdown menu */}
                {
                    BG_HEALTH_STATUS.NOT_APPLICABLE !== HealthItemStatusButtonProps.status &&
                    <MenuItem onClick={handleStatusChange}>{BG_HEALTH_STATUS.NOT_APPLICABLE}</MenuItem>
                }
                {/**If the button is of No Status then don't provide No Status in the dropdown menu */}
                {
                    BG_HEALTH_STATUS.NO_STATUS !== HealthItemStatusButtonProps.status &&
                    <MenuItem onClick={handleStatusChange}>{BG_HEALTH_STATUS.NO_STATUS}</MenuItem>
                }
            </Menu>
        </div>
    );
}