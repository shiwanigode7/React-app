import { getNextMonth, getPreviousMonth } from "../../../utils/Utilities";
import { DateRangeSelectorModel } from "../Header/HeaderModel";
import React, { useEffect, useState } from 'react';
import { IconButton, TextField } from "@material-ui/core";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import { DateRangeSelectorStyles } from "./DateRangeSelectorStyles";

export default function DateRangeSelector(props: DateRangeSelectorModel) {
    const [displayDate, setDisplayDate] = useState<string>("");
    
    const dateRangeSelectorStyleClasses = DateRangeSelectorStyles();

    useEffect(() => {
        setDisplayDate(props.selectedDate);
    }, [props.selectedDate]);

    const handleUpArrowClick = () => {
        const lDate: Date = new Date(displayDate);
        props.setSelectedDate(getNextMonth(lDate));
        setDisplayDate(getNextMonth(lDate));
    };

    const handleDownArrowClick = () => {
        const lDate: Date = new Date(displayDate);
        props.setSelectedDate(getPreviousMonth(lDate));
        setDisplayDate(getPreviousMonth(lDate));
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                type="text"
                value={displayDate}
                InputProps={
                    {
                        classes: {
                            notchedOutline: dateRangeSelectorStyleClasses.textFieldNotchedOutline,
                            root: dateRangeSelectorStyleClasses.textFieldOutlineRoot,
                        },
                        endAdornment: (
                            <div>
                                <IconButton disabled={props.disableUpArrow} className={dateRangeSelectorStyleClasses.iconButton} onClick={handleUpArrowClick}>
                                    <ArrowDropUpSharpIcon className={dateRangeSelectorStyleClasses.arrowUpIcon} />
                                </IconButton>
                                <IconButton disabled={props.disableDownArrow} className={dateRangeSelectorStyleClasses.iconButton} onClick={handleDownArrowClick}>
                                    <ArrowDropDownSharpIcon className={dateRangeSelectorStyleClasses.arrowDownIcon} />
                                </IconButton>
                            </div>
                        ),
                        readOnly: true,
                    }}
            />
        </div>
    )
}