import { IconButton, TextField } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import React from "react";
import SearchBarModel from "./SearchBarModel";
import { SearchBarStyles } from "./SearchBarStyles";

export default function SearchBar(searchBarProps: SearchBarModel) {
    const searchBarStyleClasses = SearchBarStyles();

    return (
        <TextField
            variant="outlined"
            value={searchBarProps.value}
            placeholder={"Search"}
            onChange={searchBarProps.handleChange}
            InputProps={{
                classes: {
                    root: searchBarStyleClasses.root,
                    multiline: searchBarStyleClasses.multiline,
                    input: searchBarStyleClasses.input,
                    notchedOutline: searchBarStyleClasses.notchedOutline
                },
                startAdornment: <SearchRoundedIcon className={searchBarStyleClasses.searchRoundedIcon} />,
                endAdornment: "" !== searchBarProps.value ?
                    <IconButton className={searchBarStyleClasses.IconButton} onClick={searchBarProps.handleCloseIconClick}>
                        <CloseRoundedIcon className={searchBarStyleClasses.closeRoundedIconTrue} />
                    </IconButton>
                    : <CloseRoundedIcon className={searchBarStyleClasses.closeRoundedIconFalse} />
            }} />
    )
}
