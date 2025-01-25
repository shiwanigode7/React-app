import React from "react";
import { MenuItem, ListItem, ListItemText, TextField } from "@material-ui/core";
import selectMenuModel from "./SelectMenuModel";
import { SelectMenuStyles } from "./SelectMenuStyle";
import UnfoldMoreRoundedIcon from "@material-ui/icons/UnfoldMoreRounded";

export default function SelectFieldWithScrollbar(selectFieldWithScrollbarProps: selectMenuModel) {
    const SelectMenuStyleClasses = SelectMenuStyles();

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        /**Whenever the user changes the dropdown value set the value*/
        selectFieldWithScrollbarProps.setSelectedValue(event.target.value);
    };
    return (
        <TextField
            value={selectFieldWithScrollbarProps.selectedValue}
            onChange={handleSelectChange}
            variant={"outlined"}
            select
            className={SelectMenuStyleClasses.selectedItem}
            InputProps={{
                classes: {
                    notchedOutline: SelectMenuStyleClasses.selectFieldNotchedOutline,
                    root: SelectMenuStyleClasses.selectFieldOutlineRoot,
                }
            }}
            SelectProps={{
                classes: {
                    select: SelectMenuStyleClasses.selectFilterDropDownOutlined,
                    outlined: SelectMenuStyleClasses.selectedItem
                },
                IconComponent: UnfoldMoreRoundedIcon,
                MenuProps: {
                    classes: {
                        paper: SelectMenuStyleClasses.menuList
                    }
                }
            }}
        >
            {selectFieldWithScrollbarProps.items.map((option) => {
                return (
                    <MenuItem key={option} value={option}>
                        <ListItem className={SelectMenuStyleClasses.listItem}>
                            <ListItemText primary={option} />
                        </ListItem>
                    </MenuItem>
                );
            })}
        </TextField>
    )
}