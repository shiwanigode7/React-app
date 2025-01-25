import React from "react";
import { MenuItem, ListItem, ListItemText, TextField, Tooltip } from "@material-ui/core";
import selectMenuModel from "./SelectMenuModel";
import { SelectMenuStyles } from "./SelectMenuStyle";
import UnfoldMoreRoundedIcon from "@material-ui/icons/UnfoldMoreRounded";

export default function SelectMenu(selectMenuProps: selectMenuModel) {
    const SelectMenuStyleClasses = SelectMenuStyles();

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        /**Whenever the user changes the dropdown value set the value*/
        selectMenuProps.setSelectedValue(event.target.value);
    };
    return (
        <TextField
            value={selectMenuProps.selectedValue}
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
                    classes : {
                        paper : SelectMenuStyleClasses.menuList
                    }
                }
            }}
        >
            {selectMenuProps.items.map((option) => {
                return (
                    <MenuItem key={option.id} value={option.nodeId}>
                        <ListItem className={SelectMenuStyleClasses.listItem}>
                            <Tooltip title={option.name} arrow placement="right-start">
                                <ListItemText primary={option.name} />
                            </Tooltip>
                        </ListItem>
                    </MenuItem>
                );
            })}
        </TextField>
    )
}