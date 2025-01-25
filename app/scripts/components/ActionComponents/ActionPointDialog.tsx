import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, ThemeProvider, Typography, MenuItem, TextField, CircularProgress, Select, FormHelperText } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Button, LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { OutlinedInputTheme } from '../../view/theme';
import { InnovationAppContext } from "../../context/InnovationAppContext";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { ActionInterface, BusinessGoalTableType, MeetingTopicInterface, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import { MEETING_TOPIC_TYPE } from "../../constant/InnovationEnums";
import Asterisk from "../utils/Asterisk/Asterisk";
import { Autocomplete } from "../../components/utils/Autocomplete/Autocomplete";
import UserService from "../../services/UserService";
import { ActionDialogStyles, AddActionDialogTheme } from "./ActionPointDialogStyles";
import { ADD_ACTION_POINT_TEXT, EDIT_ACTION_POINT_TEXT, DUE_DATE_TEXT, OWNER_TEXT, TEXT_TITLE_TEXT, COMMENT_TEXT } from "../../constant/ActionTexts";
import { TOPIC_TYPE_TEXT, ADD, TOPIC_TYPE_DROP_DOWN_FIELDS, TOPIC_TEXT, BUSINESS_GOAL_TEXT, CANCEL_TEXT, ADD_TEXT, UPDATE_TEXT } from "../../constant/MeetingViewTexts";
import { defaultActionTopicInitializer, getBusinessGoalsInMeetingTopics, getTextTopicsFromMeetingTopics, getTimeAndDate } from "../../utils/MeetingUtils";
import { ActionTopicInterface } from "./ActionList";

/**Interface to define the type of props*/
declare interface ActionPointDialogProps {
    openActionPointDialog: boolean;
    setOpenActionPointDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setActionData: React.Dispatch<React.SetStateAction<ActionInterface>>;
    actionData: ActionInterface;
    defaultActionData: ActionInterface;
    actionUpdateCallback: (inActionData: ActionInterface) => void | any;
    currentOperation: string;
    meetingTopicList: MeetingTopicInterface[];
    businessGoalList: BusinessGoalTableType[];
    actionTopicData?: ActionTopicInterface;
    isTopicReadOnly?: boolean;
}

export default function ActionPointDialog(props: ActionPointDialogProps) {
    /**Get the context data */
    const lInnovationData = useContext(InnovationAppContext);
    /**State to check if the form is valid for creation of discussion topic */
    const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
    /**State to show warning */
    const [dropDownWarningMessage, setDropDownWarningMessage] = useState<boolean>(false);
    const [ownerWarningMessage, setOwnerWarningMessage] = useState<boolean>(false);
    const [textWarningMessage, setTextWarningMessage] = useState<boolean>(false);
    /**State to show/hide the loading Icon */
    const [loading, setLoading] = useState<boolean>(false);
    /**Get the styles */
    const actionDialogStyleClass = ActionDialogStyles();
    /**Max character length */
    const MAX_CHARACTER_LIMIT: number = 1000;
    /**Circular progress component style */
    const CIRCULAR_PROGRESS_SIZE: number = 15;
    const [allUsersList, setGetAllUsersList] = useState<UserListWithEmailModel[]>([]);
    const [userListWithName, setUserListWithName] = useState<string[]>([]);
    const [selectedOwner, setSelectedOwner] = useState<string>("");
    const [businessGoalTopicList, setBusinessGoalTopicList] = useState<ActionTopicInterface[]>([]);
    const [textTopicList, setTextTopicList] = useState<ActionTopicInterface[]>([]);

    /**Value to hold the current date */
    const currentDateAndTimeArray = getTimeAndDate();
    const currentDateString = currentDateAndTimeArray[0];

    const getActionTopic = (inDiscussionTopicId: string) => {
        let lActionTopic = businessGoalTopicList.find((lBusinessGoalTopic: ActionTopicInterface) =>
            inDiscussionTopicId === lBusinessGoalTopic.discussionTopicId);
        if (lActionTopic) {
            return lActionTopic;
        }
        lActionTopic = textTopicList.find((lTextTopic: ActionTopicInterface) =>
            inDiscussionTopicId === lTextTopic.discussionTopicId);
        if (lActionTopic) {
            return lActionTopic;
        } else {
            return defaultActionTopicInitializer();
        }
    }

    /**State to hold the action topic */
    const [actionTopic, setActionTopic] = useState<ActionTopicInterface>(defaultActionTopicInitializer());
    /**State to hold the text topic selected by user */
    const [textTopic, setTextTopic] = useState<ActionTopicInterface>(actionTopic);
    /**State to hold the business goal topic selected by user */
    const [businessGoalTopic, setBusinessGoalTopic] = useState<ActionTopicInterface>(actionTopic);

    const handleActionTopicChange = (inDiscussionTopicId: string) => {
        let lActionTopic: ActionTopicInterface = getActionTopic(inDiscussionTopicId);
        if ("" !== lActionTopic.discussionTopicId) {
            setActionTopic(lActionTopic);
            if (MEETING_TOPIC_TYPE.TEXT === lActionTopic.topicType) {
                setTextTopic(lActionTopic);
            } else {
                setBusinessGoalTopic(lActionTopic);
            }
        }
    }

    /**Set User list */
    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setGetAllUsersList(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID]);

    useEffect(() => {
        setBusinessGoalTopicList(getBusinessGoalsInMeetingTopics(props.businessGoalList, props.meetingTopicList));
    }, [props.meetingTopicList, props.businessGoalList, props.isTopicReadOnly]);

    useEffect(() => {
        setTextTopicList(getTextTopicsFromMeetingTopics(props.meetingTopicList));
    }, [props.meetingTopicList, props.isTopicReadOnly]);

    useEffect(() => {
        setUserListWithName(allUsersList.map(user => user.displayName));
    }, [allUsersList]);

    useEffect(() => {
        if(props.actionTopicData) {
            setActionTopic(props.actionTopicData);
        }
    }, [props.actionTopicData]);

    useEffect(() => {
        if (props.isTopicReadOnly && props.actionTopicData) {
            setBusinessGoalTopicList([props.actionTopicData]);
            setTextTopicList([props.actionTopicData]);
        } else {
            handleActionTopicChange(props.actionData.discussionTopicId);
        }
    }, [props.actionData.discussionTopicId, props.isTopicReadOnly, props.actionTopicData]);

    useEffect(() => {
        if (undefined !== props.actionData.owner) {
            const userDetail: any = allUsersList.find(user => user.email === props.actionData.owner);
            setSelectedOwner(userDetail != undefined ? userDetail.displayName : props.actionData.owner);
        }
    }, [props.actionData.owner]);

    /**Changes the value of topicType if the Topic Type field is changed */
    const handleTopicTypeChange = (evt: any) => {
        setDropDownWarningMessage(false);
        setIsFormInvalid(false);
        /**If the Type is changed then set the previous values already present */
        if (MEETING_TOPIC_TYPE.TEXT === evt.target.value) {
            props.setActionData((prevState: ActionInterface) => ({
                ...prevState,
                discussionTopicId: textTopic.discussionTopicId
            }));
            setActionTopic({
                discussionTopicId: textTopic.discussionTopicId,
                topicType: MEETING_TOPIC_TYPE.TEXT,
                topic: textTopic.topic
            });
        }
        else {
            props.setActionData((prevState: ActionInterface) => ({
                ...prevState,
                discussionTopicId: businessGoalTopic.discussionTopicId
            }));
            setActionTopic({
                discussionTopicId: businessGoalTopic.discussionTopicId,
                topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL,
                topic: businessGoalTopic.topic,
                businessGoalName: businessGoalTopic.businessGoalName
            });
        }
    };

    /**Changes the value of topic if the Topic field is changed */
    const handleTopicFieldChange = (event: any) => {
        handleActionTopicChange(event.target.value);
        setIsFormInvalid(false);
        setDropDownWarningMessage(false);
        props.setActionData((prevState: ActionInterface) => ({
            ...prevState,
            discussionTopicId: event.target.value
        }));
    };

    const handleDueDateChange = (dateChangeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setActionData((prevState: ActionInterface) => ({
            ...prevState,
            dueDate: dateChangeEvent.target.value.trim()
        }));
    };

    const handleOwnerChange = (inNewOwner: string) => {
        const newOwner: string = null !== inNewOwner ? inNewOwner : "";
        const userDetail: any = allUsersList.find(user => user.displayName === newOwner);
        let userEmail: string = "";
        if (undefined !== userDetail) {
            userEmail = userDetail.email;
            setOwnerWarningMessage(false);
        } else {
            setOwnerWarningMessage(true);
        }
        props.setActionData((prevState: ActionInterface) => ({
            ...prevState,
            owner: userEmail
        }));
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setActionData((prevState: ActionInterface) => ({
            ...prevState,
            text: event.target.value
        }));
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setActionData((prevState: ActionInterface) => ({
            ...prevState,
            comment: event.target.value
        }));
    };

    /**Function to close the dialog */
    const handleCloseDialog = () => {
        /**Setting the values to default */
        props.setOpenActionPointDialog(false);
        props.setActionData(props.defaultActionData);
        setActionTopic(defaultActionTopicInitializer());
        setBusinessGoalTopic(defaultActionTopicInitializer());
        setTextTopic(defaultActionTopicInitializer());
        setDropDownWarningMessage(false);
        setOwnerWarningMessage(false);
        setTextWarningMessage(false);
        setIsFormInvalid(false);
    };

    /**Function to save the data */
    const handleSubmit = () => {
        if (("" === props.actionData.owner) || ("" === props.actionData.discussionTopicId)
            || ("" === props.actionData.text)) {
            setOwnerWarningMessage("" === props.actionData.owner);
            setDropDownWarningMessage("" === props.actionData.discussionTopicId);
            setTextWarningMessage("" === props.actionData.text);
            setIsFormInvalid(true);
            return;
        }
        setLoading(true);
        props.actionUpdateCallback(props.actionData)
            .then(() => {
                setLoading(false);
                handleCloseDialog();
            })
            .catch((updateError: any) => {
                console.log(updateError);
                setLoading(false);
                handleCloseDialog();
            });
    };

    return (
        <div>
            <ThemeProvider theme={LightTheme}>
                <Dialog open={props.openActionPointDialog} maxWidth={"xs"} fullWidth={true}>
                    <ThemeProvider theme={AddActionDialogTheme}>
                        <DialogTitle >
                            {/**Using grid to align the dialog title text and the x button */}
                            <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                {/**Title of the dialog */}
                                <Grid item xs={6} md={8}  >
                                    {ADD === props.currentOperation ? ADD_ACTION_POINT_TEXT : EDIT_ACTION_POINT_TEXT}
                                </Grid>
                                {/**the close icon */}
                                <Grid item xs={6} md={4} className={actionDialogStyleClass.CancelIconClass}>
                                    <IconButton onClick={handleCloseDialog}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent className={actionDialogStyleClass.DialogContentClass}>
                            <ThemeProvider theme={OutlinedInputTheme}>
                                <Grid container direction="column" spacing={2} className={actionDialogStyleClass.GridContainerClass}>
                                    <Grid item>
                                        <Typography className={actionDialogStyleClass.HeadingClass}>{DUE_DATE_TEXT}</Typography>
                                        <TextField
                                            variant={"outlined"}
                                            type={"date"}
                                            value={props.actionData.dueDate}
                                            onChange={handleDueDateChange}
                                            className={actionDialogStyleClass.DateFieldClass}
                                            required
                                            inputProps={{ min: currentDateString }} />
                                    </Grid>
                                    <Grid item className={actionDialogStyleClass.ownerDropdownGridClass}>
                                        <Typography className={actionDialogStyleClass.HeadingClass}>{OWNER_TEXT} <Asterisk /></Typography>
                                        <Autocomplete
                                            dataList={userListWithName}
                                            selectedValue={selectedOwner}
                                            onChange={handleOwnerChange}
                                            keyValue={"owner"}
                                            noOptionText={"User Not Found"}
                                        />
                                        {ownerWarningMessage && <FormHelperText>This field is required</FormHelperText>}
                                    </Grid>
                                    <Grid item>
                                        <Typography className={actionDialogStyleClass.HeadingClass}>{TOPIC_TYPE_TEXT}</Typography>
                                        <Select
                                            disabled={props.isTopicReadOnly}
                                            className={actionDialogStyleClass.TopicTypeFieldClass}
                                            variant={"outlined"}
                                            IconComponent={ArrowDropDownRoundedIcon}
                                            classes={{
                                                iconOutlined: actionDialogStyleClass.selectIcon
                                            }}
                                            value={actionTopic.topicType}
                                            onChange={handleTopicTypeChange}
                                        >
                                            {TOPIC_TYPE_DROP_DOWN_FIELDS.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    {MEETING_TOPIC_TYPE.TEXT === actionTopic.topicType ?
                                        <Grid item>
                                            <Typography className={actionDialogStyleClass.HeadingClass}>{TOPIC_TEXT} <Asterisk /></Typography>
                                            <Select
                                                disabled={props.isTopicReadOnly}
                                                className={actionDialogStyleClass.TopicTypeFieldClass}
                                                variant={"outlined"}
                                                labelId="demo-multiple-name-label"
                                                IconComponent={ArrowDropDownRoundedIcon}
                                                classes={{
                                                    iconOutlined: actionDialogStyleClass.selectIcon
                                                }}
                                                displayEmpty
                                                renderValue={actionTopic.topic !== "" ? undefined : () => <div style={{ color: "#aaa" }}>Select Text Topic</div>}
                                                error={isFormInvalid}
                                                value={actionTopic.discussionTopicId}
                                                onChange={handleTopicFieldChange}
                                            >
                                                {textTopicList.map((option) => (
                                                    <MenuItem key={option.discussionTopicId} value={option.discussionTopicId}>
                                                        {option.topic}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {dropDownWarningMessage && <FormHelperText>This field is required</FormHelperText>}
                                        </Grid> :
                                        <Grid item>
                                            <Typography className={actionDialogStyleClass.HeadingClass}>{BUSINESS_GOAL_TEXT} <Asterisk /></Typography>
                                            <Select
                                                disabled={props.isTopicReadOnly}
                                                className={actionDialogStyleClass.TopicTypeFieldClass}
                                                variant={"outlined"}
                                                labelId="demo-multiple-name-label"
                                                IconComponent={ArrowDropDownRoundedIcon}
                                                classes={{
                                                    iconOutlined: actionDialogStyleClass.selectIcon
                                                }}
                                                displayEmpty
                                                renderValue={actionTopic.topic !== "" ? undefined : () => <div style={{ color: "#aaa" }}>Select Business Goal</div>}
                                                error={isFormInvalid}
                                                value={actionTopic.discussionTopicId}
                                                onChange={handleTopicFieldChange}
                                            >
                                                {businessGoalTopicList.map((option) => (
                                                    <MenuItem key={option.discussionTopicId} value={option.discussionTopicId}>
                                                        {option.businessGoalName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {dropDownWarningMessage && <FormHelperText>This field is required</FormHelperText>}
                                        </Grid>
                                    }
                                    <Grid item>
                                        <Typography className={actionDialogStyleClass.HeadingClass}>{TEXT_TITLE_TEXT} <Asterisk /></Typography>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            required={true}
                                            value={props.actionData.text}
                                            onChange={handleTextChange}
                                            helperText={(
                                                (MAX_CHARACTER_LIMIT === props.actionData.text.length &&
                                                    `Maximum limit is ${MAX_CHARACTER_LIMIT} characters`) ||
                                                (textWarningMessage && "This field is required")
                                            )}
                                            inputProps={{
                                                className: actionDialogStyleClass.textarea,
                                                maxLength: MAX_CHARACTER_LIMIT
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography className={actionDialogStyleClass.HeadingClass}>{COMMENT_TEXT}</Typography>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={props.actionData.comment}
                                            onChange={handleCommentChange}
                                            helperText={(
                                                MAX_CHARACTER_LIMIT === props.actionData.text.length &&
                                                `Maximum limit is ${MAX_CHARACTER_LIMIT} characters`
                                            )}
                                            inputProps={{
                                                className: actionDialogStyleClass.textarea,
                                                maxLength: MAX_CHARACTER_LIMIT
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </DialogContent>
                        {/**Dialog Action button components */}
                        <Divider light className={actionDialogStyleClass.DividerClass} />
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
                            onClick={handleSubmit}
                            className={undefined}
                            startIcon={undefined}
                            endIcon={undefined}
                            pullDown={undefined}
                        >
                            {ADD === props.currentOperation ? ADD_TEXT : UPDATE_TEXT}
                            {/**To display loading when user clicks on create */}
                            {loading ?
                                <CircularProgress size={CIRCULAR_PROGRESS_SIZE} className={actionDialogStyleClass.LoadingIconClass} /> :
                                null
                            }
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    )
}
