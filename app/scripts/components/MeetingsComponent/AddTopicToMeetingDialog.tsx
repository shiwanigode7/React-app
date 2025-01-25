import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, ThemeProvider, Typography, MenuItem, TextField, CircularProgress, Select ,FormHelperText} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Button } from "@esko/cloud-ui-components/dist/esm";
import { AddMeetingDialogTheme , MeetingListViewStyles } from "../../themes/MeetingsTheme";
import { OutlinedInputTheme } from '../../view/theme';
import { InnovationAppContext } from "../../context/InnovationAppContext";

import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { BusinessGoalWithIdType, MeetingInterface, MeetingTopicInterface, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import { MeetingDialogStyles } from "../../themes/MeetingDialogTheme";
import { ADD_TEXT, ADD_TOPIC_OR_BG_TEXT, BG_MEETING_TYPE_DROP_DOWN_FIELDS, BUSINESS_GOAL_TEXT, CANCEL_TEXT, DURATION_TEXT, TOPIC_TEXT, TOPIC_TYPE_TEXT, TOPIC_TYPE_DROP_DOWN_FIELDS, TYPE_TEXT, TOPIC_DURATION_EXCEEDED_TEXT, TOPIC_PLACEHOLDER_TEXT, UPDATE_TEXT, ADD, EDIT_DISCUSSION_TOPIC, EDIT, PRESENTER_TEXT } from "../../constant/MeetingViewTexts";
import { MEETING_TOPIC_TYPE } from "../../constant/InnovationEnums";
import { validateMeetingDuration } from "../../utils/MeetingUtils";
import Asterisk from "../utils/Asterisk/Asterisk";
import SearchService from "../../services/SearchService";
import { Autocomplete } from "../../components/utils/Autocomplete/Autocomplete";
import UserService from "../../services/UserService";

/**Interface to define the type of props*/
declare interface AddTopicToMeetingDialogPropsType {
    openAddMeetingDialog: boolean;
    setOpenAddMeetingDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setMeetingTopicData: React.Dispatch<React.SetStateAction<MeetingTopicInterface>>;
    meetingTopicData: MeetingTopicInterface;
    defaultMeetingTopicData: MeetingTopicInterface;
    meetingUpdateCallback: (inMeetingName: string, inMeetingData: Object) => void | any;
    meetingName: string;
    currentOperation: string;
    existingTopicList: MeetingTopicInterface[];
    meetingStartTime: string;
    meetingEndTime : string;
    currentMeeting ?: MeetingInterface;
    inMeetingDataType ?: string;
}

/**Interface to define the type of Business Goal Meeting Type Drop Down*/
export declare interface BGMeetingTypeDropDownInterface {
    value: string;
}

export default function AddTopicToMeetingDialog(props: AddTopicToMeetingDialogPropsType) {
     /**Importing the styles */
     const MeetingListViewClasses = MeetingListViewStyles();
    /**Get the context data */
    const lInnovationData = useContext(InnovationAppContext);
    /**State to check if the form is valid for creation of discussion topic */
    const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
    /*state to show the topic duration error label if it's greater than available total duration */
    const [isTopicDurationExceeded , setIsTopicDurationExceeded] = useState<boolean>(false);
    /**State to hold the topic data entered by user */
    const [topicData, setTopicData] = useState<string>(props.meetingTopicData.topic);
    /*state to show whether warning to select a bg from the dropdown menu */
    const [dropDownBGwarningMessage , setDropDownBGwarningMessage] = useState<boolean>(false);
    /**State to hold the nodeId of the Business Goal selected by user */
    const [businessGoalId, setBusinessGoalId] = useState<string>(props.meetingTopicData.topic);
    /**State to hold the topic type selected by user for the Business Goal */
    const [typeOfTopic, setTypeOfTopic] = useState<string>("Update");
    /**State to have the list of Business Goal List with name and nodeId */
    const [businessGoalListWithId, setBusinessGoalListWithId] = useState<BusinessGoalWithIdType[]>([]);
    /**State to show/hide the loading Icon */
    const [loading, setLoading] = useState<boolean>(false);
    /**Get the styles */
    const MeetingDialogStyleClass = MeetingDialogStyles();
    /**Max character length */
    const MAX_CHARACTER_LENGTH: number = 140;
    /**Circular progress component style */
    const CIRCULAR_PROGRESS_SIZE: number = 15;
    const [allUsersList, setGetAllUsersList] = useState<UserListWithEmailModel[]>([]);
    const [userListWithName, setUserListWithName] = useState<string[]>([]);
    const [selectedPresenterValue, setSelectedPresenterValue] = useState<string>("")

    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setGetAllUsersList(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, []);

    useEffect(() => {
        setUserListWithName(allUsersList.map(user => user.displayName));
    }, [allUsersList])

    /**Changes the value of topicType if the Topic Type field is changed */
    const handleDropDownValueChange = (evt: any) => {
        setDropDownBGwarningMessage(false);
        setIsFormInvalid(false);
        /**If the Type is changed then set the previous values already present */
        if (MEETING_TOPIC_TYPE.TEXT.trim() === evt.target.value) {
            props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
                ...prevState,
                topic: topicData,
                typeOfTopic: ""
            }));
        }
        else {
            props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
                ...prevState,
                topic: businessGoalId,
                typeOfTopic: typeOfTopic
            }));
        }
        props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
            ...prevState,
            topicType: evt.target.value
        }));
    };

    /**Changes the value of topic if the Topic field is changed */
    const handleTopicFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTopicData(event.target.value);
        setIsFormInvalid(false);
        setDropDownBGwarningMessage(false);
        props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
            ...prevState,
            topic: event.target.value
        }));
    };

    /**Changes the value of topic if a Business Goal is selected */
    const handleBGDropDownValueChange = (event: any) => {
        setBusinessGoalId(event.target.value);
        setIsFormInvalid(false);
        setDropDownBGwarningMessage(false);
        props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
            ...prevState,
            topic: event.target.value
        }));
    };

    /**Changes the value of typeOfTopic if the Meeting Type field is changed */
    const handleBGMeetingTypeDropDownValueChange = (event: any) => {
        setTypeOfTopic(event.target.value);
        props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
            ...prevState,
            typeOfTopic: event.target.value
        }));
    };

    /**Sets the value of duration to 0 if the Duration Field is left empty */
    const onDurationFieldBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if ("" === event.target.value) {
            props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
                ...prevState,
                topicDuration: 15
            }));
        }
    };
    /*function to validate the meeting topic duration */
    const checkMeetingTopicDuration = () => {
        if(props.meetingTopicData.topicDuration >= 0 && props.meetingTopicData.topicDuration <= 999){
            let updatedTopicList : MeetingTopicInterface[] = [];
            if(EDIT === props.currentOperation) {
                props.existingTopicList.forEach((discussionTopic: MeetingTopicInterface) => {
                    if(discussionTopic.discussionTopicId !== props.meetingTopicData.discussionTopicId) {
                        updatedTopicList.push(discussionTopic)
                    }
                })
            } else {
                updatedTopicList = props.existingTopicList;
            }
            if(validateMeetingDuration(props.meetingStartTime,props.meetingEndTime,updatedTopicList,props.meetingTopicData.topicDuration)){
                setIsTopicDurationExceeded(false);
            }
            else{
                setIsTopicDurationExceeded(true);
            }
        }
    }
    /**Changes the value of duration if the Duration field is changed */
    const onDurationChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (999 >= parseInt(event.target.value) || "" === event.target.value) {
            props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
                ...prevState,
                topicDuration: parseInt(event.target.value)
            }));
        }
    };

    /**Gets the list of Business Goal with name and nodeId and saves in a vriable */
    useEffect(() => {
        SearchService.searchGetBGListWithID(lInnovationData.eskoAccountDetail.repoid)
            .then((getBGListResponse: any) => {
                setBusinessGoalListWithId(getBGListResponse);
                console.log(getBGListResponse);
            })
            .catch((getBGListError: any) => {
                console.log(getBGListError);
            });
            
    }, []);

    useEffect(() => {
        checkMeetingTopicDuration();//validate the duration with default discussion topic duration (15 min)
    },[])

    useEffect(() => {
        checkMeetingTopicDuration();//validate the duration with default discussion topic data (15 min) whenever the meeting date changed
    },[props.currentMeeting])

    /*check the duration change to show error message if topic duration exceeds the meeting time limit whenever duration changes */
    useEffect(() => {
        checkMeetingTopicDuration();
    },[onDurationChange]);

    useEffect(() => {
        if(undefined !== props.meetingTopicData.presenter) {
            const userDetail: any = allUsersList.find(o => o.email === props.meetingTopicData.presenter);
            setSelectedPresenterValue(userDetail != undefined ? userDetail.displayName : props.meetingTopicData.presenter)
        }
    },[props.meetingTopicData.presenter])

    const handleValueChange = (inNewValue: string) => {
        const lNewValue: string = null !== inNewValue ? inNewValue : "";
        const userDetail: any = allUsersList.find(o => o.displayName === lNewValue);
        let userEmail: string = "";
        if(undefined !== userDetail) {
            userEmail = userDetail.email;   
        }
        props.setMeetingTopicData((prevState: MeetingTopicInterface) => ({
            ...prevState,
            presenter: userEmail
        }));
        setSelectedPresenterValue(lNewValue);
    }
    
    /**Function to close the dialog */
    const handleCloseDialog = () => {
        /**Setting the values to default */
        props.setOpenAddMeetingDialog(false);
        props.setMeetingTopicData(props.defaultMeetingTopicData);
        setBusinessGoalId("");
        setTopicData("");
        setDropDownBGwarningMessage(false);
        setIsFormInvalid(false);
        setIsTopicDurationExceeded(false);
    }

    /**Function to save the data */
    const handleSubmit = () => {
        /*return from this function is businessGoalId and topicData */
        if(("" === props.meetingTopicData.topic)){
                setDropDownBGwarningMessage(true);
                setIsFormInvalid(true);
            return;
        }
        let outMeetingData: Object = {};
        let updatedTopicList : MeetingTopicInterface[] = [];
        if(EDIT === props.currentOperation) {
            props.existingTopicList.forEach((discussionTopic: MeetingTopicInterface) => {
                if(discussionTopic.discussionTopicId === props.meetingTopicData.discussionTopicId) {
                    updatedTopicList.push(props.meetingTopicData);
                } else {
                    updatedTopicList.push(discussionTopic)
                }
            });
        } else {
            props.existingTopicList.push(props.meetingTopicData);
            updatedTopicList = props.existingTopicList;
        }
        outMeetingData = {
            discussionTopics: updatedTopicList,
            meetingType : props.inMeetingDataType
        };
        setLoading(true);
        props.meetingUpdateCallback(props.meetingName, outMeetingData)
            .then((updateResponse: any) => {
                console.log(updateResponse);
                setLoading(false);
                handleCloseDialog();
            })
            .catch((updateError: any) => {
                console.log(updateError);
                setLoading(false);
                handleCloseDialog();
            });
    }

    const DurationComponent = (
        <Grid container direction='row' alignItems="center" spacing={2}>
            <Grid item>
                <Typography className={MeetingDialogStyleClass.HeadingClass}>{DURATION_TEXT}</Typography>
                <ThemeProvider theme={OutlinedInputTheme}>
                    <TextField
                        variant={"outlined"}
                        type={"number"}
                        value={Number.isNaN(props.meetingTopicData.topicDuration) ? "" : props.meetingTopicData.topicDuration}
                        onBlur={onDurationFieldBlur}
                        onKeyDown={(evt) => (evt.key === '.' || evt.key === 'e') && evt.preventDefault()}
                        onChange={onDurationChange}
                        className={MeetingDialogStyleClass.DurationFieldClass}
                        inputProps={{ min: 0, max: 999, pattern: "[0-9]*", step: "5" }} />
                </ThemeProvider>
            </Grid>
            <Grid item className={MeetingDialogStyleClass.SuffixGridClass} style={{ padding: "0px" }}>
                <Typography className={MeetingDialogStyleClass.SuffixClass}>{"mins"}</Typography>
            </Grid>
        </Grid>
    )

    return (
        <div>
            <Dialog open={props.openAddMeetingDialog} maxWidth={"xs"} fullWidth={true}>
                <ThemeProvider theme={AddMeetingDialogTheme}>
                    <DialogTitle >
                        {/**Using grid to align the dialog title text and the x button */}
                        <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                            {/**Title of the dialog */}
                            <Grid item xs={6} md={8}  >
                                {ADD === props.currentOperation ? ADD_TOPIC_OR_BG_TEXT : EDIT_DISCUSSION_TOPIC}
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
                            <Grid item>
                                <Typography className={MeetingDialogStyleClass.HeadingClass}>{TOPIC_TYPE_TEXT}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <Select  
                                        className={MeetingDialogStyleClass.TopicTypeFieldClass}                             
                                        variant={"outlined"}
                                        IconComponent={ArrowDropDownRoundedIcon}
                                        classes={{
                                            iconOutlined: MeetingDialogStyleClass.selectIcon
                                        }}
                                        value={props.meetingTopicData.topicType}                                        
                                        onChange={handleDropDownValueChange}                            
                                        >
                                        {TOPIC_TYPE_DROP_DOWN_FIELDS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}                              
                                    </Select>
                                </ThemeProvider>
                            </Grid>
                            {MEETING_TOPIC_TYPE.TEXT === props.meetingTopicData.topicType ?
                                <Grid item>
                                    <Typography className={MeetingDialogStyleClass.HeadingClass}>{TOPIC_TEXT} <Asterisk/></Typography>
                                    <ThemeProvider theme={OutlinedInputTheme}>
                                        <TextField
                                            variant={"outlined"}
                                            placeholder={TOPIC_PLACEHOLDER_TEXT}
                                            className={MeetingDialogStyleClass.TopicTypeFieldClass}
                                            value={props.meetingTopicData.topic}
                                            onChange={handleTopicFieldChange}
                                            required
                                            helperText={(props.meetingTopicData.topic.length == MAX_CHARACTER_LENGTH && "Maximum limit is 140 characters")}
                                            error = {isFormInvalid}
                                            inputProps={{ maxLength: MAX_CHARACTER_LENGTH }} />
                                        {dropDownBGwarningMessage && <FormHelperText>This field is required</FormHelperText>}
                                    </ThemeProvider>
                                </Grid> :
                                <Grid item>
                                    <Typography className={MeetingDialogStyleClass.HeadingClass}>{BUSINESS_GOAL_TEXT} <Asterisk/></Typography>
                                    <ThemeProvider theme={OutlinedInputTheme}>
                                        <Select  
                                            className={MeetingDialogStyleClass.TopicTypeFieldClass}                             
                                            variant={"outlined"}
                                            labelId="demo-multiple-name-label"
                                            IconComponent={ArrowDropDownRoundedIcon}
                                            classes={{
                                                iconOutlined: MeetingDialogStyleClass.selectIcon
                                            }}                                            
                                            displayEmpty
                                            renderValue={props.meetingTopicData.topic !== "" ? undefined : () => <div style={{color : "#aaa"}}>Select Business Goal</div>}                                            
                                            error={isFormInvalid}                                        
                                            value={props.meetingTopicData.topic}                                        
                                            onChange={handleBGDropDownValueChange}                            
                                            >
                                            {businessGoalListWithId.map((option) => (
                                                <MenuItem key={option.nodeId} value={option.nodeId}>
                                                    {option.businessGoalName}
                                                </MenuItem>
                                            ))}                             
                                        </Select>
                                        {dropDownBGwarningMessage && <FormHelperText>This field is required</FormHelperText>}
                                    </ThemeProvider>
                                </Grid>
                            }
                            <Grid item className={MeetingDialogStyleClass.presenterDropdownGridClass}>
                                <Typography className={MeetingDialogStyleClass.HeadingClass}>{PRESENTER_TEXT}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <Autocomplete
                                        dataList={userListWithName}
                                        selectedValue={selectedPresenterValue}
                                        onChange={handleValueChange}
                                        keyValue={"presenter"}
                                        noOptionText={"User Not Found"}
                                        />
                                </ThemeProvider>
                            </Grid>
                            {MEETING_TOPIC_TYPE.TEXT !== props.meetingTopicData.topicType ?
                                <Grid item>
                                    <Grid container direction="row" spacing={2} item>
                                        <Grid item>
                                            <Typography className={MeetingDialogStyleClass.HeadingClass}>{TYPE_TEXT}</Typography>
                                            <ThemeProvider theme={OutlinedInputTheme}>
                                            <Select  
                                                className={MeetingDialogStyleClass.MeetingTypeFieldClass}                             
                                                variant={"outlined"}
                                                IconComponent={ArrowDropDownRoundedIcon}
                                                classes={{
                                                    iconOutlined: MeetingDialogStyleClass.selectIcon
                                                }}
                                                value={props.meetingTopicData.typeOfTopic}                                      
                                                onChange={handleBGMeetingTypeDropDownValueChange}                           
                                                >
                                                {BG_MEETING_TYPE_DROP_DOWN_FIELDS.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                ))}                             
                                            </Select>
                                            </ThemeProvider>
                                        </Grid>
                                        <Grid item>
                                            {DurationComponent}
                                        </Grid>
                                    </Grid>
                                </Grid> :
                                <Grid item>
                                    {DurationComponent}
                                </Grid>
                            }
                            {isTopicDurationExceeded &&  <p className={MeetingListViewClasses.warningMessageText}>{TOPIC_DURATION_EXCEEDED_TEXT}</p>}
                        </Grid>
                    </DialogContent>
                    {/**Dialog Action button components */}
                    <Divider light className={MeetingDialogStyleClass.DividerClass} />
                </ThemeProvider>
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
                        disabled={isTopicDurationExceeded}
                        onClick={handleSubmit}
                        className={undefined}
                        startIcon={undefined}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {ADD === props.currentOperation ? ADD_TEXT : UPDATE_TEXT}
                        {/**To display loading when user clicks on create */}
                        {loading ?
                            <CircularProgress size={CIRCULAR_PROGRESS_SIZE} className={MeetingDialogStyleClass.LoadingIconClass} /> :
                            null
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
