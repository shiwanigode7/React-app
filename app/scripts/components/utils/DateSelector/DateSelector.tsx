import { convertDateIntoDDMMMYYYYFormat } from "../../../utils/Utilities";
import { DateSelectorModel } from "../Header/HeaderModel";
import React, { useEffect, useState } from 'react';
import { DateSelectorStyles } from "./DateSelectorStyles";
import { Grid, IconButton, TextField } from "@material-ui/core";
import TodayIcon from '@material-ui/icons/Today';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

export default function DateSelector(dateSelectorProps: DateSelectorModel) {
    const [displayDate, setDisplayDate] = useState<string>("");
    const [disableUpArrow, setDisableUpArrow] = useState<boolean>(false);
    const [disableDownArrow, setDisableDownArrow] = useState<boolean>(false);
    const dateSelectorStyleClasses = DateSelectorStyles();

    useEffect(() => {
        let lConvertedDate: string = convertDateIntoDDMMMYYYYFormat(dateSelectorProps.selectedDate);
        setDisplayDate(lConvertedDate);
        let lDateIndex: number = dateSelectorProps.meetingDateList.indexOf(dateSelectorProps.selectedDate);
        if (lDateIndex == dateSelectorProps.meetingDateList.length - 1) {
            setDisableUpArrow(true);
        }
        else {
            setDisableUpArrow(false);
        }
        if (lDateIndex <= 0) {
            setDisableDownArrow(true);
        }
        else {
            setDisableDownArrow(false);
        }
    }, [dateSelectorProps.selectedDate, dateSelectorProps.meetingDateList])

    const handleUpArrowClick = () => {
        let lDateIndex: number = dateSelectorProps.meetingDateList.indexOf(dateSelectorProps.selectedDate);
        if (lDateIndex < dateSelectorProps.meetingDateList.length - 1) {
            let lMeetingDate: string = dateSelectorProps.meetingDateList[lDateIndex + 1];
            dateSelectorProps.setSelectedDate(lMeetingDate);
        }

    };

    const handleDownArrowClick = () => {
        let lDateIndex: number = dateSelectorProps.meetingDateList.indexOf(dateSelectorProps.selectedDate);
        if (lDateIndex <= dateSelectorProps.meetingDateList.length - 1 && lDateIndex !== 0) {
            let lMeetingDate: string = dateSelectorProps.meetingDateList[lDateIndex - 1];
            dateSelectorProps.setSelectedDate(lMeetingDate);
        }
    };

    return (
        <div>
            {
                0 !== dateSelectorProps.meetingDateList.length &&
                <Grid container>
                    <Grid item>
                        <TodayIcon
                            className={dateSelectorStyleClasses.iconStyle}
                        />
                    </Grid>
                    <Grid item className={dateSelectorStyleClasses.textGrid}>
                        <TextField
                            variant='standard'
                            type="string"
                            value={displayDate}
                            InputProps={
                                {
                                    classes: {
                                        input: dateSelectorStyleClasses.date
                                    },
                                    readOnly: true,
                                    disableUnderline: true,
                                }}
                        />
                    </Grid>
                    <Grid item className={dateSelectorStyleClasses.arrowGrid}>
                        <IconButton className={dateSelectorStyleClasses.upArrow}
                            onClick={handleUpArrowClick}
                            disabled={disableUpArrow}>
                            <ArrowDropUpSharpIcon className={dateSelectorStyleClasses.arrowSize} />
                        </IconButton>
                        <IconButton
                            onClick={handleDownArrowClick}
                            disabled={disableDownArrow}
                            className={dateSelectorStyleClasses.downArrow}>
                            <ArrowDropDownSharpIcon className={dateSelectorStyleClasses.arrowSize} />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        </div>
    )
}