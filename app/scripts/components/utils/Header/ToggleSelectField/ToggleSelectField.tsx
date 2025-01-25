import React from "react";
import { ListItem, MenuItem, TextField } from "@material-ui/core";
import ToggleSelectFieldModel from "./ToggleSelectFieldModel";
import { ToggleSelectFieldStyles } from "./ToggleSelectFieldStyles";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

export default function ToggleSelectField(toggleSelectFieldProps: ToggleSelectFieldModel) {
    const toggleSelectFieldStyleClasses = ToggleSelectFieldStyles();

    return (
        <TextField
            select
            variant={"outlined"}
            defaultValue={toggleSelectFieldProps.defaultValue}
            onChange={toggleSelectFieldProps.handleChange}
            className={toggleSelectFieldStyleClasses.selectedItem}
            InputProps={{
                classes: {
                    notchedOutline: toggleSelectFieldStyleClasses.selectFieldNotchedOutline,
                    root: toggleSelectFieldStyleClasses.selectFieldOutlineRoot,
                }
            }}
            SelectProps={{
                classes: {
                    select: toggleSelectFieldStyleClasses.selectFilterDropDownOutlined,
                    outlined: toggleSelectFieldStyleClasses.selectedItem
                },
                IconComponent: ArrowDropDownRoundedIcon,
                MenuProps: {
                    classes: {
                        paper: toggleSelectFieldStyleClasses.menuList
                    }
                }
            }}>
            {
                toggleSelectFieldProps.menuOptions.map((option) => {
                    return (
                        <MenuItem className={toggleSelectFieldStyleClasses.menuItemRoot} value={option.value}>
                            <ListItem className={toggleSelectFieldStyleClasses.listItem}>
                                {option.option}
                            </ListItem>
                        </MenuItem>
                    );
                })
            }
        </TextField>
    )
}