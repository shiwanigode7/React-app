/**TSX file defining the menu for status (Ideation, Scheduled, Completed) */
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RotateRightRoundedIcon from "@material-ui/icons/RotateRightRounded";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import React, { useContext, useState } from "react";
import { InnovationStatus } from "../constant/InnovationEnums";
import { InnovationAppContext } from "../context/InnovationAppContext";
import { StatusMenuStyle } from "../themes/StatusMenuTheme";

/**Type of the inputProps
 * defaultValue - can have three values only
 * nodePath - path of businessGoal to make call to the
 * repo when the status is changed. 
 */
declare interface statusMenuProps {
    defaultValue: "Ideation" | "Scheduled" | "Completed" | "Active" | string,
    nodePath: string
    callBack: (inNodePath: string, inBusinessGoalName : string, inValue: string, inPrevValue: string) => void
    businessGoalName : string
}

/**
 * Component to return the status menu button 
 * @param inputProps - Takes in the value to be displayed in the button
 * and the node path of the business goal
 * @returns - React Menu Button component for Ideation and Schduled alone.
 * Note: This file will be updated to return status menu button for Completed
 * if there is a requirement for the completed status button in the future
 */
export function StatusMenuButton(inputProps: statusMenuProps) {

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
        inputProps.callBack(inputProps.nodePath, inputProps.businessGoalName, event.target.innerText, inputProps.defaultValue);
        handleClose();
    }

    const isStatusChangeable: boolean = lInnovationData.userPermission.businessGoal.isStatusChangeable;
    const StatusMenuStyleClass = StatusMenuStyle();

    /**To set the visibility of the down icon when user hovers over
     * the button
     */
    const [iconVisibility, setIconVisibility] = useState<boolean>(false);

    return (
        <div>
            {
                /**Ideation button */
                InnovationStatus.IDEATION === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<CategoryRoundedIcon />}
                        endIcon={ isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: StatusMenuStyleClass.root,
                            containedPrimary: StatusMenuStyleClass.containedPrimary,
                            startIcon: StatusMenuStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Scheduled Button */
                InnovationStatus.SCHEDULED === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"secondary"}
                        startIcon={<SwapVertIcon />}
                        endIcon={ isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: StatusMenuStyleClass.root,
                            containedSecondary: StatusMenuStyleClass.containedSecondary,
                            startIcon: StatusMenuStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Active Button */
                InnovationStatus.ACTIVE === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<RotateRightRoundedIcon />}
                        endIcon={ isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: StatusMenuStyleClass.root,
                            containedPrimary: StatusMenuStyleClass.activeButton,
                            startIcon: StatusMenuStyleClass.startIcon
                        }}
                    >
                        {inputProps.defaultValue}
                    </Button>
                ) : null
            }
            {
                /**Completed Button */
                InnovationStatus.COMPLETED === inputProps.defaultValue ? (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!isStatusChangeable}
                        disableElevation
                        color={"primary"}
                        startIcon={<DoneRoundedIcon />}
                        endIcon={ isStatusChangeable ? <KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} /> : null}
                        onMouseEnter={() => { setIconVisibility(true) }}
                        onMouseLeave={() => { setIconVisibility(false) }}
                        classes={{
                            root: StatusMenuStyleClass.root,
                            containedPrimary: StatusMenuStyleClass.completedButton,
                            startIcon: StatusMenuStyleClass.startIcon                            
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
                    paper: StatusMenuStyleClass.MenuPaper
                }}
            >
                {/**If the button is of ideation then don't provide Ideation in the dropdown menu */}
                {inputProps.defaultValue !== "Ideation" ? (
                    <MenuItem onClick={updateStatus}>Ideation</MenuItem>
                ) : null}
                {/**If the button is of scheduled then don't provide Scheduled in the dropdown menu */}
                {inputProps.defaultValue !== "Scheduled" ? (
                    <MenuItem onClick={updateStatus}>Scheduled</MenuItem>
                ) : null}
                {/**If the button is of active then don't provide active in the dropdown menu */}
                {"Active" !== inputProps.defaultValue ? (
                    <MenuItem onClick={updateStatus}>Active</MenuItem>
                ) : null}
                {/**If the button is of completed then don't provide completed in the dropdown menu */}
                {inputProps.defaultValue !== "Completed" ? (
                    <MenuItem onClick={updateStatus}>Completed</MenuItem>
                ) : null}
                
            </Menu>
        </div>
    );
}