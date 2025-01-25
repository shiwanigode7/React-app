/**TSX file defining the menu for action status (Pending, On Track, Completed, Cancelled, Past Due) */
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useContext, useState } from "react";
import { CancelledStatusIcon, CompletedStatusIcon, OnTrackStatusIcon, PastDueStatusIcon, PendingStatusIcon } from "../../../Icons/ActionStatusIcons";
import { ACTIONS_STATUS } from "../../constant/InnovationEnums";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { ActionStatusButtonStyles } from "./ActionStatusButtonStyles";

declare interface ActionStatusMenuProps {
    defaultValue: ACTIONS_STATUS.PENDING | ACTIONS_STATUS.ON_TRACK | ACTIONS_STATUS.COMPLETED | ACTIONS_STATUS.CANCELLED | ACTIONS_STATUS.PAST_DUE | string;
    actionId: string;
    meetingName: string;
    callBack: (inActionId: string, inMeetingName: string, inValue: string, inPrevValue: string) => void;
}

export function ActionStatusButton(inputProps: ActionStatusMenuProps) {

    /**Importing the context data */
    const lInnovationData = useContext(InnovationAppContext);
    /**To set the position of the menu. Added type based on the Menu Props */
    const [anchorEl, setAnchorEl] = React.useState<((element: Element) => Element) | null | undefined>(null);
    /**To handle whether the menu should be displayed or not */
    const open = Boolean(anchorEl);
    /**When button is selected open the menu */
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    /**To close the menu on selecting a value */
    const handleClose = () => {
        setAnchorEl(null);
    };
    /**Function to update status on status change*/
    const updateStatus = (event: any) => {
        /**Calling the call back function to update the status/perform any other desired action*/
        inputProps.callBack(inputProps.actionId, inputProps.meetingName, event.target.innerText, inputProps.defaultValue);
        handleClose();
    }

    const isStatusChangeable: boolean = lInnovationData.userPermission.meetingModel.isMeetingEditable;
    const actionStatusButtonStyleClass = ActionStatusButtonStyles();

    /**To set the visibility of the down icon when user hovers over
     * the button
     */
    const [iconVisibility, setIconVisibility] = useState<boolean>(false);

    return (
        <div>
            {
                /**Pending button */
                ACTIONS_STATUS.PENDING === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<PendingStatusIcon />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon
                            className={iconVisibility ? actionStatusButtonStyleClass.iconVisible : actionStatusButtonStyleClass.iconHidden} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: actionStatusButtonStyleClass.root,
                            containedPrimary: actionStatusButtonStyleClass.pendingButton,
                            startIcon: actionStatusButtonStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**On Track Button */
                ACTIONS_STATUS.ON_TRACK === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<OnTrackStatusIcon />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: actionStatusButtonStyleClass.root,
                            containedPrimary: actionStatusButtonStyleClass.onTrackButton,
                            startIcon: actionStatusButtonStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Active Button */
                ACTIONS_STATUS.PAST_DUE === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<PastDueStatusIcon />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: actionStatusButtonStyleClass.root,
                            containedPrimary: actionStatusButtonStyleClass.pastDueButton,
                            startIcon: actionStatusButtonStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Completed Button */
                ACTIONS_STATUS.COMPLETED === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<CompletedStatusIcon />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: actionStatusButtonStyleClass.root,
                            containedPrimary: actionStatusButtonStyleClass.completedButton,
                            startIcon: actionStatusButtonStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Cancelled Button */
                ACTIONS_STATUS.CANCELLED === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<CancelledStatusIcon />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: actionStatusButtonStyleClass.root,
                            containedPrimary: actionStatusButtonStyleClass.cancelledButton,
                            startIcon: actionStatusButtonStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {/**Menu options */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{
                    top: "45px",
                }}
                classes={{
                    paper: actionStatusButtonStyleClass.MenuPaper
                }}
            >
                {/**If the button is of Pending then don't provide Pending in the dropdown menu */}
                {inputProps.defaultValue !== ACTIONS_STATUS.PENDING ? (
                    <MenuItem onClick={updateStatus}>{ACTIONS_STATUS.PENDING}</MenuItem>
                ) : null}
                {/**If the button is of on track then don't provide on track in the dropdown menu */}
                {inputProps.defaultValue !== ACTIONS_STATUS.ON_TRACK ? (
                    <MenuItem onClick={updateStatus}>{ACTIONS_STATUS.ON_TRACK}</MenuItem>
                ) : null}
                {/**If the button is of completed then don't provide completed in the dropdown menu */}
                {inputProps.defaultValue !== ACTIONS_STATUS.COMPLETED ? (
                    <MenuItem onClick={updateStatus}>{ACTIONS_STATUS.COMPLETED}</MenuItem>
                ) : null}
                {/**If the button is of Past Due then don't provide Past Due in the dropdown menu */}
                {inputProps.defaultValue !== ACTIONS_STATUS.PAST_DUE ? (
                    <MenuItem onClick={updateStatus}>{ACTIONS_STATUS.PAST_DUE}</MenuItem>
                ) : null}
                {/**If the button is of cancelled then don't provide cancelled in the dropdown menu */}
                {inputProps.defaultValue !== ACTIONS_STATUS.CANCELLED ? (
                    <MenuItem onClick={updateStatus}>{ACTIONS_STATUS.CANCELLED}</MenuItem>
                ) : null}
            </Menu>
        </div>
    );
}