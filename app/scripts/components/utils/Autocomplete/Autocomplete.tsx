import { Avatar, Grid, TextField, Typography } from "@material-ui/core";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { Autocomplete as AutocompleteMUI } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../../utils/UserAvatarColorFunction";
import { AutocompleteModel } from "./AutocompleteModel";
import { AutocompleteStyles } from "./AutocompleteStyles";

export function Autocomplete(autoCompleteProps: AutocompleteModel) {

    const autoCompleteStyleClasses = AutocompleteStyles();

    /**State to hold the value typed/selected */
    const [selectedValue, setSelectedValue] = useState<string>(autoCompleteProps.selectedValue);
    const [inputValue, setInputValue] = useState<string>(autoCompleteProps.selectedValue);
    /**State to not display the user logo if the user is still typing/if user has not selected any values */
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSelectedValueChangeEvent = (_event: any, inNewValue: any) => {
        const lSelectedValue: string = null !== inNewValue ? inNewValue : "";
        setSelectedValue(lSelectedValue);
        setInputValue(lSelectedValue);
        setIsFocused(null === inNewValue);
        autoCompleteProps.onChange(lSelectedValue, autoCompleteProps.keyValue);
    };

    const handleInputValueChangeEvent = (_event: any, inNewValue: any) => {
        setInputValue(inNewValue);
    };

    const handleOnTextFieldValueChange = (event: any) => {
        setSelectedValue(event.target.value);
        if ("" === event.target.value) {
            autoCompleteProps.onChange(event.target.value, autoCompleteProps.keyValue);
        }
        setIsFocused(true);
    };

    const handleTextFieldBlur = (event: any) => {
        if (-1 === autoCompleteProps.dataList.indexOf(event.target.value)) {
            setSelectedValue(autoCompleteProps.selectedValue);
        } else {
            autoCompleteProps.onChange(event.target.value, autoCompleteProps.keyValue);
        }
        setIsFocused(false);
    };

    const handleTextFieldFocus = (event: any) => {
        setIsFocused("" === event.target.value || "" === selectedValue);
    };

    /**Function to return the filtered list when user starts typing */
    const filterFunction = (inOptions: string[], _state: any) => {
        if (-1 === autoCompleteProps.dataList.indexOf(selectedValue)) {
            return inOptions.filter((option) =>
                option.toLowerCase().includes(selectedValue.toLowerCase())
            );
        }
        return inOptions;
    };

    /**React component to display the selected avatar */
    const TEXTFIELD_START_ADORNMENT_SELECTED: React.ReactNode = <Avatar
        className={autoCompleteStyleClasses.startAdornmentAvatar}
        key={autoCompleteProps.selectedValue}
        style={{
            color: userAvatarTextColor(autoCompleteProps.selectedValue),
            backgroundColor: userAvatarBackgroundColor(autoCompleteProps.selectedValue)
        }}
    >
        {
            (
                autoCompleteProps.selectedValue.split(", ")[1] !== undefined ?
                    autoCompleteProps.selectedValue.split(", ")[1].charAt(0) :
                    ""
            ) +
            (
                autoCompleteProps.selectedValue.split(", ")[0] !== undefined ?
                    autoCompleteProps.selectedValue.split(", ")[0].charAt(0) :
                    ""
            )
        }
    </Avatar>;

    /**Avatar to display when no value is selected */
    const TEXTFIELD_START_ADORNMENT_EMPTY: React.ReactNode = <Avatar
        className={autoCompleteStyleClasses.startAdornmentAvatar}
        key={"-"}
        style={{
            color: userAvatarTextColor(""),
            backgroundColor: userAvatarBackgroundColor("")
        }}
    >
        {"-"}
    </Avatar>;

    const TEXTFIELD_START_ADORNMENT: React.ReactNode = "" !== selectedValue ?
        TEXTFIELD_START_ADORNMENT_SELECTED : TEXTFIELD_START_ADORNMENT_EMPTY;

    useEffect(() => {
        setSelectedValue(autoCompleteProps.selectedValue);
    }, [autoCompleteProps]);

    return (
        <AutocompleteMUI
            autoHighlight
            filterOptions={filterFunction}
            value={!isFocused && "" === selectedValue ? "Unassigned" : selectedValue}
            inputValue={inputValue}
            disableClearable
            fullWidth={false}
            openText=""
            closeText=""
            options={autoCompleteProps.dataList}
            onChange={handleSelectedValueChangeEvent}
            onInputChange={handleInputValueChangeEvent}
            popupIcon={<ArrowDropDownRoundedIcon className={autoCompleteStyleClasses.svgRoot} />}
            classes={{
                input: autoCompleteStyleClasses.input,
                inputRoot: autoCompleteStyleClasses.inputRoot,
                endAdornment: autoCompleteStyleClasses.endAdornment,
                popupIndicator: autoCompleteStyleClasses.popupIndicator
            }}
            noOptionsText={autoCompleteProps.noOptionText}
            renderOption={(inOption) => {
                return (
                    <Grid
                        container
                        direction='row'
                        spacing={1}
                        className={autoCompleteStyleClasses.userMenuListGrid}
                    >
                        <Grid item>
                            {/* Inline styling done to avoid the definition of the props in theme which leads
                             * which leads increased unused variables for other classes  */}
                            <Avatar
                                className={autoCompleteStyleClasses.avatar}
                                style={{
                                    color: userAvatarTextColor(inOption),
                                    backgroundColor: userAvatarBackgroundColor(inOption)
                                }}
                            >
                                {inOption.split(", ")[1].charAt(0) + inOption.split(", ")[0].charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography classes={{ body1: autoCompleteStyleClasses.menuListTypography }}>
                                {inOption}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
            renderInput={
                (textFieldParams) => <TextField
                    {...textFieldParams}
                    variant="outlined"
                    onChange={handleOnTextFieldValueChange}
                    onBlur={handleTextFieldBlur}
                    onFocus={handleTextFieldFocus}
                    InputProps={{
                        ...textFieldParams.InputProps,
                        classes: {
                            notchedOutline: autoCompleteStyleClasses.notchedOutline,
                            root: autoCompleteStyleClasses.fieldOutlineRoot,
                        },
                        startAdornment: !isFocused ? TEXTFIELD_START_ADORNMENT : null
                    }}
                />
            }
        />
    );
}