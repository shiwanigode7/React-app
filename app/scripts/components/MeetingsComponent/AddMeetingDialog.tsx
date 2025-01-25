import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, ThemeProvider, Typography, MenuItem, TextField, CircularProgress, makeStyles, Select } from "@material-ui/core";
import React, { useState } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Button } from "@esko/cloud-ui-components/dist/esm";
import { AddMeetingDialogTheme } from "../../themes/MeetingsTheme";
import { OutlinedInputTheme } from '../../view/theme';
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "../CSS/TimePicker.css";
import moment from "moment";
import { MeetingInterface } from "../../interfaces/InnovationInterface";
import { MeetingDialogStyles } from "../../themes/MeetingDialogTheme";
import { ADD_TEXT, ADD_MEETING_TEXT, CANCEL_TEXT, MEETING_DATE_TEXT, MEETING_TYPE_DROP_DOWN_FIELDS, TIME_TEXT, TIME_ERROR_MESSAGE_TEXT, TO_TEXT, TYPE_TEXT, TIME_PICKER_FORMAT, INVALID_DATE_TEXT, TIME_PICKER_MINUTES_STEP } from "../../constant/MeetingViewTexts";
import { checkDateValidity, getTimeAndDate, parseSingleDigit } from "../../utils/MeetingUtils";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

/**Interface to define the type of props*/
declare interface AddMeetingDialogPropsType {
    openAddMeetingDialog: boolean;
    setOpenAddMeetingDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setMeetingData: React.Dispatch<React.SetStateAction<MeetingInterface>>;
    meetingData: MeetingInterface;
    defaultMeetingData: MeetingInterface;
    addMeeting: (inMeetingData: MeetingInterface) => void;
    submitLoading: boolean;
}

/**Interface to define the type of Meeting Type Drop Down*/
export declare interface MeetingTypeDropDownInterface {
    value: string;
}

/**Style for Time Picker Input Field */
const PickerStyles = makeStyles(() => ({
    root: {
        width: "100px",
    }
}));

export default function AddMeetingDialog(props: AddMeetingDialogPropsType) {

    /**State to show Error if the Time is not correct/invalid */
    const [timeAheadError, setTimeAheadError] = useState<boolean>(false);

    /**Variable to hold the circular progress style */
    const CIRCULAR_PROGRESS_SIZE: number = 15;

    /**Get the styles */
    const TimePickerStyleClass = PickerStyles();

    /**Get the styles */
    const MeetingDialogStyleClass = MeetingDialogStyles();

    /**Value to hold the current date */
    const currentDateAndTimeArray = getTimeAndDate();
    const currentDateString = currentDateAndTimeArray[0];

    /**Changes the State value when Start Timing is changed */
    const handleFromTimeChange = (inTime: any) => {
        const lFromTime: string = parseSingleDigit(inTime.format("HH")) + ":" + parseSingleDigit(inTime.format("m"));
        props.setMeetingData((prevState: MeetingInterface) => ({
            ...prevState,
            fromTime: lFromTime
        }));
        if (lFromTime < props.meetingData.toTime) {
            setTimeAheadError(false);
        } else {
            setTimeAheadError(true);
        }
    };

    /**Changes the State value when Start Timing is changed */
    const handleToTimeChange = (inTime: any) => {
        const lToTime: string = inTime.format("HH") + ":" + parseSingleDigit(inTime.format("m"));
        /**If End time is before Start time show the error */
        if (props.meetingData.fromTime < lToTime) {
            props.setMeetingData((prevState: MeetingInterface) => ({
                ...prevState,
                toTime: lToTime
            }));
            setTimeAheadError(false);
        }
        else {
            setTimeAheadError(true);
            props.setMeetingData((prevState: MeetingInterface) => ({
                ...prevState,
                toTime: props.meetingData.fromTime
            }));
        }
    };

    /**Function to validate the time after setting the start time */
    const handleCloseFromTime = () => {
        /**If meeting time exceed the current end time display error */
        if (props.meetingData.fromTime >= props.meetingData.toTime) {
            props.setMeetingData((prevState: MeetingInterface) => ({
                ...prevState,
                toTime: props.meetingData.fromTime.trim()
            }));
            setTimeAheadError(true);
        }
    }

    /**Chages the value of meetingType when the dropdown gets changed */
    const handleDropDownValueChange = (dropDownChangeEvent: any) => {
        props.setMeetingData((prevState: MeetingInterface) => ({
            ...prevState,
            meetingType: dropDownChangeEvent.target.value.trim()
        }));
    };

    /**Changes the value of date if the Date field is changed */
    const handleMeetingDateChange = (dateChangeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setMeetingData((prevState: MeetingInterface) => ({
            ...prevState,
            date: dateChangeEvent.target.value.trim()
        }));
    };

    /**Function to close the dialog */
    const handleCloseDialog = () => {
        props.setOpenAddMeetingDialog(false);
        props.setMeetingData(props.defaultMeetingData);
        setTimeAheadError(false);
    };

    /**Function to save the data */
    const handleSubmit = () => {
        props.addMeeting(props.meetingData);
    };

    /**Element to hold the error label for the invalid date */
    const invalidDateErrorLabel = !checkDateValidity(props.meetingData.date) ?
        <p className={MeetingDialogStyleClass.ErrorMessageClass}>{INVALID_DATE_TEXT}</p> :
        null;

    let invalidTimeErrorLabel = timeAheadError ?
        <p className={MeetingDialogStyleClass.ErrorMessageClass}>{TIME_ERROR_MESSAGE_TEXT}</p> :
        null;

    return (
        <div>
            <Dialog open={props.openAddMeetingDialog} maxWidth={"xs"} fullWidth={true}>
                <ThemeProvider theme={AddMeetingDialogTheme}>
                    <DialogTitle >
                        {/**Using grid to align the dialog title text and the x button */}
                        <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                            {/**Title of the dialog */}
                            <Grid item xs={6} md={8}  >
                                {ADD_MEETING_TEXT}
                            </Grid>
                            {/**the close icon */}
                            <Grid item xs={6} md={4} className={MeetingDialogStyleClass.CancelIconClass}>
                                <IconButton onClick={handleCloseDialog}>
                                    <CloseRoundedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent className={MeetingDialogStyleClass.DialogContentClass}>
                        <Grid container direction="column" spacing={2} className={MeetingDialogStyleClass.GridContainerClass}>
                            {/**Date component grid */}
                            <Grid item>
                                <Typography className={MeetingDialogStyleClass.HeadingClass}>{MEETING_DATE_TEXT}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <TextField
                                        variant={"outlined"}
                                        type={"date"}
                                        value={props.meetingData.date}
                                        onChange={handleMeetingDateChange}
                                        className={MeetingDialogStyleClass.DateFieldClass}
                                        required
                                        inputProps={{ min: currentDateString }} />
                                </ThemeProvider>
                            </Grid>
                            {invalidDateErrorLabel}
                            <Grid item>
                                {/**Time duration component grid */}
                                <Typography className={MeetingDialogStyleClass.HeadingClass}>{TIME_TEXT}</Typography>
                                <Grid container direction="row" alignItems="center" spacing={1}>
                                    <Grid item>
                                        <TimePicker
                                            value={moment(props.meetingData.fromTime, TIME_PICKER_FORMAT)}
                                            onChange={handleFromTimeChange}
                                            onClose={handleCloseFromTime}
                                            clearIcon={<div></div>}
                                            className={TimePickerStyleClass.root}
                                            minuteStep={TIME_PICKER_MINUTES_STEP}
                                            showSecond={false}
                                            use12Hours
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{TO_TEXT}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TimePicker
                                            value={moment(props.meetingData.toTime, TIME_PICKER_FORMAT)}
                                            onChange={handleToTimeChange}
                                            clearIcon={<div></div>}
                                            className={TimePickerStyleClass.root}
                                            minuteStep={TIME_PICKER_MINUTES_STEP}
                                            showSecond={false}
                                            use12Hours
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {invalidTimeErrorLabel}
                            {/**Meeting type drop down grid */}
                            <Grid item>
                                <Typography className={MeetingDialogStyleClass.HeadingClass}>{TYPE_TEXT}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <Select                                
                                        variant={"outlined"}
                                        className={MeetingDialogStyleClass.DateFieldClass}
                                        value={props.meetingData.meetingType}
                                        onChange={handleDropDownValueChange}    
                                        IconComponent={ArrowDropDownRoundedIcon}
                                        classes={{
                                            iconOutlined: MeetingDialogStyleClass.selectIcon
                                        }}
                                        inputProps={{
                                            className : MeetingDialogStyleClass.addMeetingSelectDropdown
                                        }} >
                                        {MEETING_TYPE_DROP_DOWN_FIELDS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}                                
                                    </Select>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </ThemeProvider>
                {/**Dialog Action button components */}
                <Divider light className={MeetingDialogStyleClass.DividerClass} />
                {/**Cancel button to close the dialog */}
                <DialogActions>
                    <Button
                        color={"secondary"}
                        onClick={handleCloseDialog}
                        className={undefined}
                        startIcon={undefined}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {CANCEL_TEXT}
                    </Button>
                    {/**Action button which calls two different function based on 
                     * whether the dialog is opened for add operation or update operation
                     */}
                    <Button
                        color={"primary"}
                        disabled={!checkDateValidity(props.meetingData.date) || timeAheadError}
                        onClick={handleSubmit}
                        className={undefined}
                        startIcon={undefined}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {ADD_TEXT}
                        {/**To display loading when user clicks on create */}
                        {
                            props.submitLoading ?
                                <CircularProgress size={CIRCULAR_PROGRESS_SIZE} className={MeetingDialogStyleClass.LoadingIconClass} /> :
                                null
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
