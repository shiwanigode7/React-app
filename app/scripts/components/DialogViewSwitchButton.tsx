/**TSX file defining the menu for status (Ideation, Scheduled, Completed) */
import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider, Typography } from "@material-ui/core";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { EditOutlinedInputTheme } from "../view/theme";
import { DropDownInterface } from "../interfaces/InnovationInterface";
import { DialogViewSwitchButtonStyles } from "../themes/DialogViewSwitchButtonTheme";

declare interface DialogViewSwitchProps {
    /**The default value selected */
    defaultValue: string;
    /**The list of options for the drop down */
    menuList: DropDownInterface[];
    /**Callback for the change event */
    onChangeCallBack: (inDataKey: string) => void;
    /**variant of the component */
    variant: "wide" | "narrow";
}

/**
 * Component to return the Edit Dialog menu button 
 * @param inputProps - Takes in the value to be displayed in the button
 * @returns - React Menu Button component for Edit Mode, SIR View and PPG View alone.
 */
export function DialogViewSwitchButton(inputProps: DialogViewSwitchProps) {
    const DialogViewSwitchButtonClasses = DialogViewSwitchButtonStyles({ isWide: "wide" === inputProps.variant });
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

    /**Function to execute when user selects a value from the drop down */
    const onOptionSelect = (inDataKey: string) => {
        handleClose();
        inputProps.onChangeCallBack(inDataKey);
    };

    /**Function to get the menu display name value */
    const getDisplayName = (inKeyValue: string) => {
        let lHoldDisplayName: string = inKeyValue;
        inputProps.menuList.forEach((menuOption: DropDownInterface) => {
            if (menuOption.dataKey === inKeyValue) {
                lHoldDisplayName = menuOption.displayName;
            }
        });
        return lHoldDisplayName;
    };

    return (
        <ThemeProvider theme={EditOutlinedInputTheme}>
            {
                /**Switch Menu button */
                <Button
                    variant="outlined"
                    onClick={handleClick}
                    disableElevation
                    color={"primary"}
                    endIcon={<ArrowDropDownRoundedIcon />}
                    classes={{
                        root: DialogViewSwitchButtonClasses.button,
                        label: DialogViewSwitchButtonClasses.buttonLabel
                    }}
                >
                    <Typography className={DialogViewSwitchButtonClasses.typography}>
                        {getDisplayName(inputProps.defaultValue)}
                    </Typography>
                </Button>
            }
            {/**Menu options */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                classes={{
                    paper: DialogViewSwitchButtonClasses.paper
                }}
            >
                {
                    inputProps.menuList.map((option: DropDownInterface) => (
                        <MenuItem key={option.dataKey} onClick={() => { onOptionSelect(option.dataKey) }} className={DialogViewSwitchButtonClasses.menuList}>
                            {option.displayName}
                        </MenuItem>
                    ))
                }
            </Menu>
        </ThemeProvider>
    );
}