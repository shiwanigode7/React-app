/**TSX file defining the menu for action status (Pending, On Track, Completed, Cancelled, Past Due) */
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useEffect, useState, useContext } from "react";
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PauseIcon from '@material-ui/icons/Pause';
import { HERO_FEATURE_STATUS } from "../../../../constant/InnovationEnums";
import { HeroFeatureStatusButtonStyles } from "./HeroFeatureStatusButtonStyle";
import { InnovationAppContext } from "../../../../context/InnovationAppContext";

declare interface HeroFeatureStatusMenuProps {
    defaultValue: HERO_FEATURE_STATUS.BEHIND | HERO_FEATURE_STATUS.ON_TRACK | HERO_FEATURE_STATUS.WAITING_FOR_INPUT | string;
    disableStatusChange: boolean;
    heroFeatureId: string;
    heroFeatureNodeId: string;
    updateCallback: (inNewStatus: string, inHeroFeatureId: string, inHeroFeatureNodeId: string) => void | any;
}

export function HeroFeatureStatusButton(inputProps: HeroFeatureStatusMenuProps) {

    /**To set the position of the menu. Added type based on the Menu Props */
    const [anchorEl, setAnchorEl] = React.useState<((element: Element) => Element) | null | undefined>(null);
    /**Importing the context data */
    const lInnovationData = useContext(InnovationAppContext);
    const [defaultValue, setDefaultValue] = useState<string>(inputProps.defaultValue);
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
        inputProps.updateCallback(event.target.innerText, inputProps.heroFeatureId, inputProps.heroFeatureNodeId)
            .then(() => {
                setDefaultValue(event.target.innerText);
            }).catch(() => {
                setDefaultValue(inputProps.defaultValue);
            })
        handleClose();
    }
    const [isStatusChangeable, setStatusChangeable] = useState<boolean>(false);

    useEffect(() => {
        setDefaultValue(inputProps.defaultValue);
    }, [inputProps.defaultValue])

    useEffect(() => {
        setStatusChangeable(lInnovationData.userPermission.otdModel.isCurrentStatusEditable);
    }, [lInnovationData.userPermission.otdModel.isCurrentStatusEditable]);

    const heroFeatureStatusButtonStyleClass = HeroFeatureStatusButtonStyles();

    /**To set the visibility of the down icon when user hovers over
     * the button
     */
    const [iconVisibility, setIconVisibility] = useState<boolean>(false);

    return (
        <div>
            {
                /**Behind button */
                HERO_FEATURE_STATUS.BEHIND === defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={inputProps.disableStatusChange || !isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<PriorityHighIcon className={heroFeatureStatusButtonStyleClass.iconColor} />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon
                            className={iconVisibility ? heroFeatureStatusButtonStyleClass.iconVisible : heroFeatureStatusButtonStyleClass.iconHidden} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: heroFeatureStatusButtonStyleClass.root,
                            containedPrimary: heroFeatureStatusButtonStyleClass.behindButton,
                            startIcon: heroFeatureStatusButtonStyleClass.startIcon
                        }}
                    >
                        {defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Waiting for Input Button */
                HERO_FEATURE_STATUS.WAITING_FOR_INPUT === defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={inputProps.disableStatusChange || !isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<PauseIcon className={heroFeatureStatusButtonStyleClass.iconColor} />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon
                            className={iconVisibility ? heroFeatureStatusButtonStyleClass.iconVisible : heroFeatureStatusButtonStyleClass.iconHidden} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: heroFeatureStatusButtonStyleClass.root,
                            containedPrimary: heroFeatureStatusButtonStyleClass.waitingForInputButton,
                            startIcon: heroFeatureStatusButtonStyleClass.startIcon
                        }}
                    >
                        {defaultValue}
                    </Button>
                ) : null
            }
            {
                /**On Track button Button */
                HERO_FEATURE_STATUS.ON_TRACK === defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={inputProps.disableStatusChange || !isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<CheckIcon className={heroFeatureStatusButtonStyleClass.iconColor} />}
                        endIcon={isStatusChangeable ? <KeyboardArrowDownIcon
                            className={iconVisibility ? heroFeatureStatusButtonStyleClass.iconVisible : heroFeatureStatusButtonStyleClass.iconHidden} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: heroFeatureStatusButtonStyleClass.root,
                            containedPrimary: heroFeatureStatusButtonStyleClass.onTrackButton,
                            startIcon: heroFeatureStatusButtonStyleClass.startIcon
                        }}
                    >
                        {defaultValue}
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
                    paper: heroFeatureStatusButtonStyleClass.MenuPaper
                }}
            >
                {/**If the button is of Waiting for Input then don't provide Waiting for Input in the dropdown menu */}
                {defaultValue !== HERO_FEATURE_STATUS.WAITING_FOR_INPUT ? (
                    <MenuItem onClick={updateStatus}>{HERO_FEATURE_STATUS.WAITING_FOR_INPUT}</MenuItem>
                ) : null}
                {/**If the button is of on track then don't provide on track in the dropdown menu */}
                {defaultValue !== HERO_FEATURE_STATUS.ON_TRACK ? (
                    <MenuItem onClick={updateStatus}>{HERO_FEATURE_STATUS.ON_TRACK}</MenuItem>
                ) : null}
                {/**If the button is of Behind then don't provide Behind in the dropdown menu */}
                {defaultValue !== HERO_FEATURE_STATUS.BEHIND ? (
                    <MenuItem onClick={updateStatus}>{HERO_FEATURE_STATUS.BEHIND}</MenuItem>
                ) : null}
            </Menu>
        </div>
    );
}