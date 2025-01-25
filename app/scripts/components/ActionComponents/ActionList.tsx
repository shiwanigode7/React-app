import { Accordion, AccordionDetails, Grid, IconButton, Snackbar, Typography, Tooltip, TextField, ThemeProvider } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { TableWrapper } from "../../view/tables/TableWrapper";
import { ActionAccordionSummary, ActionListStyles, ActionTableStyles } from "./ActionListStyles";
import { ColumnFieldData } from "../../view/tables/TableWrapper";
import { ActionInterface, BusinessGoalTableType, MeetingInterface, MeetingTopicInterface, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import { deleteActionConfirmationContent, NO_NEW_ACTIONS, NO_OPEN_ACTIONS, NO_PREVIOUS_MEETING_ACTIONS, DELETE_DIALOG_TITLE_TEXT, PPG_MEETING_TYPE, SIR_MEETING_TYPE } from "../../constant/ActionTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { UserAvatar } from "../utils/UserAvatar/UserAvatar";
import UserService from "../../services/UserService";
import { MEETING_TOPIC_TYPE, ALERT_SEVERITY } from "../../constant/InnovationEnums";
import { defaultBusinessGoalInitializer } from "../../utils/MPLViewUtils";
import images from "../../../Icons/images";
import { getBGThumbnailAndName } from "../../utils/MPLViewUtils";
import TextWithTooltip from "../utils/TextWithTooltip/TextWithTooltip";
import { ActionStatusButton } from "./ActionStatusButton";
import MeetingService from "../../services/service/MeetingService";
import LoadingIcon from "../utils/LoadingIcon/LoadingIcon";
import TodayIcon from '@material-ui/icons/Today';
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { ALERT_UPDATE_FAILED, DELETE_DIALOG_BUTTON_TEXT, ALERT_DELETE_FAILED, ADD, EDIT, ALERT_ADD_FAILED } from "../../constant/MeetingViewTexts";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Alert } from "@material-ui/lab";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { AlertStyles } from "../../themes/MeetingsTheme";
import ConfirmationDialog from "../../view/ConfirmationDialog";
import ActionPointDialog from "./ActionPointDialog";
import { defaultActionInitializer, defaultActionTopicInitializer } from "../../utils/MeetingUtils";
import { AccordionTheme } from "../../view/theme";
import { convertDateIntoDDMMMYYYYFormat } from "../../utils/Utilities";
import { NodeEventContext } from "../../context/NodeEventContext";
export interface ActionListProps {
    meetingType: string;
    meetingName: string;
    meetingList: MeetingInterface[];
    meetingTopicList: MeetingTopicInterface[];
    openActionIdList: string[];
    businessGoalList: BusinessGoalTableType[];
}

export interface ActionTopicInterface {
    discussionTopicId: string,
    topic: string,
    topicType: string,
    businessGoalName?: string
}

export default function ActionList(inActionListProps: ActionListProps) {

    const lInnovationData = useContext(InnovationAppContext);

    const actionListStyleClasses = ActionListStyles();
    const actionTableStyleClasses = ActionTableStyles();
    const alertStyleClasses = AlertStyles();
    const [openActionsTable, setOpenActionsTable] = useState<any[]>([]);
    const [previousMeetingActionsTable, setPreviousMeetingActionsTable] = useState<any[]>([]);
    const [newActionsTable, setNewActionsTable] = useState<any[]>([]);
    const [openActionList, setOpenActionList] = useState<ActionInterface[]>([]);
    const [previousMeetingActionList, setPreviousMeetingActionList] = useState<ActionInterface[]>([]);
    const [newActionList, setNewActionList] = useState<ActionInterface[]>([]);
    const [usersListWithName, setUsersListWithName] = useState<UserListWithEmailModel[]>([]);
    const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
    const [isActionEditable, setActionEditable] = useState<boolean>(true);
    /**Alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const ALERT_AUTO_HIDE_DURATION: number = 3000;
    /**Delete */
    const [deleteConfirmDialogContent, setDeleteConfirmDialogContent] = useState<string>("");
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [actionToDelete, setActionToDelete] = useState<string>("");
    /**Action point Dialog */
    const [actionData, setActionData] = useState<ActionInterface>(defaultActionInitializer(inActionListProps.meetingName));
    const [currentOperation, setCurrentOperation] = useState<string>(ADD);
    const [openActionPointDialog, setOpenActionPointDialog] = useState<boolean>(false);
    const [isTopicReadOnly, setTopicReadOnly] = useState<boolean>(false);
    const [actionTopicData, setActionTopicData] = useState<ActionTopicInterface>(defaultActionTopicInitializer());
    /**Event Handling */
    const [actionsUpdated, setActionsUpdated] = useState<boolean>(false);
    const lNodeEventData = useContext(NodeEventContext);
    /**Accordion Expanded */
    const [isNewActionsAccordionExpanded, setNewActionsAccordionExpanded] = useState<boolean>(false);

    const actionColumnData: ColumnFieldData[] = [
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "owner", label: "Owner", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "topic", label: "Topic", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "20%" },
        { dataKey: "text", label: "Text", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "50%" },
        { dataKey: "dueDate", label: "DueDate", isSortable: false, isComponentColumn: true, alignment: "right", returnsRowData: false, cellWidth: "15%" }
    ];

    const actionColumnDataWithDelete: ColumnFieldData[] = [
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "owner", label: "Owner", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "topic", label: "Topic", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "20%" },
        { dataKey: "text", label: "Text", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "45%" },
        { dataKey: "dueDate", label: "DueDate", isSortable: false, isComponentColumn: true, alignment: "right", returnsRowData: false, cellWidth: "15%" },
        { dataKey: "deleteIcon", label: "DeleteIcon", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" }
    ];

    const getOnlyOlderMeetingsOpenActions = (): ActionInterface[] => {
        let lOpenActions: ActionInterface[] = [];

        openActionList.forEach((openAction: ActionInterface) => {
            if (undefined === previousMeetingActionList.find((action: ActionInterface) => action.actionName === openAction.actionName)) {
                lOpenActions.push(openAction);
            }
        });

        return lOpenActions;
    };

    useEffect(() => {
        if (PPG_MEETING_TYPE === inActionListProps.meetingType) {
            setActionsUpdated(!actionsUpdated);
        }
    }, [lNodeEventData.PPGActionsUpdated]);

    useEffect(() => {
        if (SIR_MEETING_TYPE === inActionListProps.meetingType) {
            setActionsUpdated(!actionsUpdated);
        }
    }, [lNodeEventData.SIRActionsUpdated]);

    useEffect(() => {
        if (lInnovationData.userPermission.meetingModel.isActionEditable) {
            setActionEditable(true);
        } else {
            setActionEditable(false);
        }
    }, [lInnovationData.userPermission.meetingModel]);

    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersListWithName(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID]);

    useEffect(() => {
        /** Open Actions */
        if (0 !== inActionListProps.openActionIdList.length) {
            // Get all actions from the meeting
            setMainPageLoading(true);
            MeetingService.innovationGetActions(lInnovationData.eskoAccountDetail.repoid,
                inActionListProps.meetingType, inActionListProps.openActionIdList)
                .then((response: ActionInterface[]) => {
                    setOpenActionList(response);
                    setMainPageLoading(false);
                }).catch((error: any) => {
                    console.log(error);
                });
        } else {
            setOpenActionList([]);
        }
        /** Previous meeting Actions */
        if (0 !== inActionListProps.meetingName.length) {
            setMainPageLoading(true);
            MeetingService.innovationGetPreviousMeetingActions(lInnovationData.eskoAccountDetail.repoid,
                inActionListProps.meetingType, inActionListProps.meetingName)
                .then((response: ActionInterface[]) => {
                    setPreviousMeetingActionList(response);
                    setMainPageLoading(false);
                }).catch((error: any) => {
                    console.log(error);
                });
        } else {
            setPreviousMeetingActionList([]);
        }
        /** New actions from current meeting */
        if (0 !== inActionListProps.meetingName.length) {
            setMainPageLoading(true);
            MeetingService.innovationGetCurrentMeetingActions(lInnovationData.eskoAccountDetail.repoid,
                inActionListProps.meetingType, inActionListProps.meetingName)
                .then((response: ActionInterface[]) => {
                    setNewActionList(response);
                    setMainPageLoading(false);
                }).catch((error: any) => {
                    console.log(error);
                });
        } else {
            setNewActionList([]);
        }
    }, [lInnovationData.eskoAccountDetail.repoid, inActionListProps.meetingName, actionsUpdated]);

    useEffect(() => {
        setOpenActionsTable(tableComponentsBuilder(getOnlyOlderMeetingsOpenActions(), true));
    }, [openActionList, previousMeetingActionList, inActionListProps.meetingList, inActionListProps.businessGoalList, usersListWithName]);

    useEffect(() => {
        setPreviousMeetingActionsTable(tableComponentsBuilder(previousMeetingActionList, true));
    }, [previousMeetingActionList, inActionListProps.meetingList, inActionListProps.businessGoalList, usersListWithName]);

    useEffect(() => {
        setNewActionsTable(tableComponentsBuilder(newActionList, false));
    }, [newActionList, inActionListProps.businessGoalList, inActionListProps.meetingTopicList, usersListWithName]);

    const handleActionRowClick = (data: any) => {
        /**Open Action Point Dialog in Edit mode */
        if (isActionEditable) {
            let clickedActionData = JSON.parse(JSON.stringify(data));
            let allActions = [...openActionList, ...previousMeetingActionList, ...newActionList];
            let clickedAction = allActions.find(action => action.actionName === clickedActionData["actionName"])
            if (clickedAction) {
                setTopicReadOnly(clickedActionData["isTopicReadOnly"]);
                setActionTopicData(getActionTopic(clickedAction.discussionTopicId, clickedAction.meetingName));
                setActionData(clickedAction);
                setOpenActionPointDialog(true);
                setCurrentOperation(EDIT);
            }
        }
    };

    const handleAddActionIconClick = (event: any) => {
        event.stopPropagation();
        /**Open Action Point Dialog in Add mode */
        setActionData(defaultActionInitializer(inActionListProps.meetingName));
        setCurrentOperation(ADD);
        setTopicReadOnly(false);
        setActionTopicData(defaultActionTopicInitializer());
        setOpenActionPointDialog(true);
    };

    const getBusinessGoal = (inNodeId: string): BusinessGoalTableType => {
        let lBusinessGoalData = inActionListProps.businessGoalList.find(
            (lBusinessGoal: BusinessGoalTableType) => {
                return inNodeId === lBusinessGoal.nodeId;
            }
        );
        return lBusinessGoalData ? lBusinessGoalData : defaultBusinessGoalInitializer();
    };

    const onNewActionsAccordionChange = () => {
        setNewActionsAccordionExpanded(!isNewActionsAccordionExpanded);
    };

    const statusChange = (inActionId: string, inMeetingName: string, inNewStatus: string, inPreviousStatus: string) => {
        MeetingService.innovationUpdateActionStatus(lInnovationData.eskoAccountDetail.repoid,
            inActionListProps.meetingType,
            inActionId, inPreviousStatus, inNewStatus, inMeetingName)
            .then((statusChangeResponse: any) => {
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(statusChangeResponse.message);
            }).catch((statusChangeError: any) => {
                console.log(statusChangeError);
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            });
    };

    /**Functions to open the delete confirmation dialog */
    const handleOpenDeleteConfirmationDialog = () => {
        setOpenDeleteConfirmationDialog(true);
    };
    /**Function to close the delete confirmation dialog */
    const handleCloseDeleteConfirmationDialog = () => {
        setOpenDeleteConfirmationDialog(false);
    };

    /**Function to open dialog to confirm if user wants to delete the action */
    const handleDeleteClick = (inActionData: ActionInterface) => {
        setDeleteConfirmDialogContent(deleteActionConfirmationContent(
            inActionData.text
        ));
        setActionToDelete(inActionData.nodeId);
        /**Open the confirmation dialog */
        handleOpenDeleteConfirmationDialog();
    };

    const deleteAction = () => {
        setDeleteLoading(true);
        MeetingService.innovationDeleteAction(lInnovationData.eskoAccountDetail.repoid,
            inActionListProps.meetingType, actionToDelete, inActionListProps.meetingName)
            .then((deleteActionResponse: any) => {
                setDeleteLoading(false);
                handleCloseDeleteConfirmationDialog();
                setActionToDelete("");
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(deleteActionResponse.message);
            })
            .catch((deleteActionError: any) => {
                console.log(deleteActionError)
                setDeleteLoading(false);
                handleCloseDeleteConfirmationDialog();
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_DELETE_FAILED);
            });
    };

    /**Function to update action  */
    const handleUpdateAction = (inActionData: ActionInterface) => {
        /** TODO update only modified fields */
        return new Promise((resolve, reject) => {
            MeetingService.innovationUpdateAction(inActionData.nodeId, inActionData)
                .then((updateActionResponse: any) => {
                    resolve(updateActionResponse);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(updateActionResponse.message);
                })
                .catch((updateActionError: any) => {
                    reject(updateActionError);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.ERROR);
                    setAlertContent(ALERT_UPDATE_FAILED);
                });
        });
    };

    /**Function to add action  */
    const handleAddAction = (inActionData: ActionInterface) => {
        return new Promise((resolve, reject) => {
            MeetingService.innovationCreateAction(lInnovationData.eskoAccountDetail.repoid,
                inActionListProps.meetingType, inActionData)
                .then((addActionResponse: any) => {
                    resolve(addActionResponse);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(addActionResponse.message);
                })
                .catch((addActionError: any) => {
                    reject(addActionError);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.ERROR);
                    setAlertContent(ALERT_ADD_FAILED);
                });
        });
    };

    const getBGName = (inNodeId: string) => {
        let lBusinessGoal = inActionListProps.businessGoalList.find((businessGoal: BusinessGoalTableType) => inNodeId === businessGoal.nodeId);
        if (lBusinessGoal) {
            return lBusinessGoal.businessGoalName;
        }
        return "";
    }

    const getActionTopicFromMeetingTopic = (inDiscussionTopic: MeetingTopicInterface): ActionTopicInterface => {
        if (MEETING_TOPIC_TYPE.BUSINESS_GOAL === inDiscussionTopic.topicType) {
            return {
                topic: inDiscussionTopic.topic,
                topicType: inDiscussionTopic.topicType,
                discussionTopicId: inDiscussionTopic.discussionTopicId,
                businessGoalName: getBGName(inDiscussionTopic.topic)
            }
        } else {
            return {
                topic: inDiscussionTopic.topic,
                topicType: inDiscussionTopic.topicType,
                discussionTopicId: inDiscussionTopic.discussionTopicId
            }
        }
    }

    /** Get action topic */
    const getActionTopic = (inDiscussionTopicId: string, inMeetingName: string) => {
        let lMeeting = inActionListProps.meetingList.find((meeting: MeetingInterface) => inMeetingName === meeting.meetingName);
        if (lMeeting) {
            let lDiscussionTopic = lMeeting.discussionTopics.find((topic: MeetingTopicInterface) => inDiscussionTopicId === topic.discussionTopicId);
            if (lDiscussionTopic) {
                return getActionTopicFromMeetingTopic(lDiscussionTopic);
            }
            return defaultActionTopicInitializer();
        }
        return defaultActionTopicInitializer();
    }

    const tableComponentsBuilder = (actionList: ActionInterface[], inIsTopicReadOnly: boolean) => {

        const lActionsTableData: any[] = [];
        let lRowNumbering = 0;

        if (undefined !== actionList && 0 !== actionList.length) {
            actionList.forEach((action: ActionInterface, key: number) => {
                let actionTopic: ActionTopicInterface = getActionTopic(action.discussionTopicId, action.meetingName);
                /** Check if action topic is present */
                if ("" !== actionTopic.topic) {
                    let actionTableRow: any = {};
                    actionTableRow["actionName"] = action.actionName;
                    actionTableRow["id"] = lRowNumbering;
                    actionTableRow["isTopicReadOnly"] = inIsTopicReadOnly;

                    //status
                    actionTableRow["status"] = {
                        "displayComponent": <ActionStatusButton
                            actionId={action.nodeId}
                            meetingName={action.meetingName}
                            callBack={statusChange}
                            defaultValue={action.status}
                        />,
                        "componentValue": action.status
                    };

                    //owner
                    let holdOwnerDetail = {
                        "displayComponent": <UserAvatar
                            avatarSize="40px"
                            displayText={false}
                            userName={""} />,
                        "componentValue": ""
                    };
                    if (undefined !== action.owner) {
                        const lOwnerEmail: string = action.owner;
                        const userDetail: any = usersListWithName.find(user => user.email === lOwnerEmail);
                        const lOwnerName: string = userDetail != undefined ? userDetail.displayName : lOwnerEmail;

                        const lOwnerAvatar = <UserAvatar
                            avatarSize="40px"
                            displayText={false}
                            userName={lOwnerName} />;
                        holdOwnerDetail = {
                            "displayComponent": lOwnerAvatar,
                            "componentValue": lOwnerEmail
                        };
                    }
                    actionTableRow["owner"] = holdOwnerDetail;
                    if (MEETING_TOPIC_TYPE.BUSINESS_GOAL === actionTopic.topicType) {
                        //topic
                        const businessGoalData = getBusinessGoal(actionTopic.topic);
                        let lthumbnailImage: any = images.EskoStarPng;
                        if (undefined !== businessGoalData["thumbnail"]) {
                            lthumbnailImage = businessGoalData["thumbnail"];
                        }
                        const bgName: string = businessGoalData["businessGoalName"];
                        if (undefined !== bgName) {
                            const lthumbnail = getBGThumbnailAndName(lthumbnailImage, bgName.toString());
                            const lBusinessGoalNameDetail = {
                                "displayComponent": lthumbnail,
                                "componentValue": actionTopic.discussionTopicId
                            };
                            actionTableRow["topic"] = lBusinessGoalNameDetail;
                        }
                    } else if (MEETING_TOPIC_TYPE.TEXT === actionTopic.topicType) {
                        const lTopicDetail = {
                            "displayComponent": <Grid container className={actionListStyleClasses.textTopic}>
                                <Grid item>
                                    <TextWithTooltip
                                        text={actionTopic.topic}
                                        tooltipText={actionTopic.topic}
                                        textAlign={"left"}
                                        isTextBold={false}
                                        tooltipPlacement={"bottom"} />
                                </Grid>
                            </Grid>,
                            "componentValue": actionTopic.discussionTopicId,
                            "cursor": "context-menu"
                        };
                        actionTableRow["topic"] = lTopicDetail;
                    }

                    // text
                    actionTableRow["text"] = {
                        "displayComponent": <Grid container className={actionListStyleClasses.textTopic}>
                            <Grid item>
                                <TextWithTooltip
                                    text={action.text}
                                    textAlign={"left"}
                                    tooltipText={action.text}
                                    isTextBold={false}
                                    tooltipPlacement={"bottom"} />
                            </Grid>
                        </Grid>,
                        "componentValue": action.text,
                        "cursor": isActionEditable ? "pointer" : "context-menu"
                    };

                    // Due date
                    actionTableRow["dueDate"] = {
                        "displayComponent": <Grid container direction="row" className={actionListStyleClasses.dateGrid}>
                            <Grid item className={actionListStyleClasses.dateIconGrid}>
                                <TodayIcon
                                    className={actionListStyleClasses.dateIcon}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant='standard'
                                    type="string"
                                    value={convertDateIntoDDMMMYYYYFormat(action.dueDate)}
                                    InputProps={
                                        {
                                            classes: {
                                                input: actionListStyleClasses.date
                                            },
                                            readOnly: true,
                                            disableUnderline: true,
                                        }}
                                />
                            </Grid>
                        </Grid>,
                        "componentValue": action.dueDate
                    };

                    // Delete button
                    actionTableRow["deleteIcon"] = {
                        "displayComponent": <Tooltip title="Delete Action" placement="left" arrow>
                            <IconButton
                                onClick={() => { handleDeleteClick(action) }}
                                disabled={!isActionEditable}
                                className={actionListStyleClasses.deleteIconButton}
                            >
                                <DeleteForeverRoundedIcon className={actionListStyleClasses.deleteIcon} />
                            </IconButton>
                        </Tooltip>
                    }
                    lActionsTableData.push(actionTableRow);
                    ++lRowNumbering;
                }
            });
        }
        return lActionsTableData;
    }

    return (
        <ThemeProvider theme={AccordionTheme}>
            <Grid container className={actionListStyleClasses.actionListTableGrid}>
                <Grid container>
                    <Accordion className={actionListStyleClasses.accordionRoot}>
                        <ActionAccordionSummary className={actionListStyleClasses.accordionSummaryRoot}>
                            <Typography className={actionListStyleClasses.accordionTitleText}>
                                Open Actions from older {inActionListProps.meetingType} meetings
                            </Typography>
                        </ActionAccordionSummary>
                        <AccordionDetails className={actionListStyleClasses.accordionDetailsRoot}>
                            <TableWrapper
                                borderedRow={false}
                                tableHeight={"auto"}
                                zIndexValue={1}
                                onRowClickCallBack={handleActionRowClick}
                                inputData={openActionsTable}
                                styleTableClasses={actionTableStyleClasses}
                                inputColumn={actionColumnData}
                                customMessageOnEmpty={NO_OPEN_ACTIONS}
                                hideHeader={true} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid container>
                    <Accordion className={actionListStyleClasses.accordionRoot}>
                        <ActionAccordionSummary className={actionListStyleClasses.accordionSummaryRoot}>
                            <Typography className={actionListStyleClasses.accordionTitleText}>
                                Actions from previous {inActionListProps.meetingType} meeting
                            </Typography>
                        </ActionAccordionSummary>
                        <AccordionDetails className={actionListStyleClasses.accordionDetailsRoot}>
                            <TableWrapper
                                borderedRow={false}
                                tableHeight={"100%"}
                                zIndexValue={1}
                                onRowClickCallBack={handleActionRowClick}
                                inputData={previousMeetingActionsTable}
                                styleTableClasses={actionTableStyleClasses}
                                inputColumn={actionColumnData}
                                customMessageOnEmpty={NO_PREVIOUS_MEETING_ACTIONS}
                                hideHeader={true} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid container>
                    <Accordion
                        className={actionListStyleClasses.accordionRoot}
                        expanded={isNewActionsAccordionExpanded}
                        onChange={onNewActionsAccordionChange}>
                        <ActionAccordionSummary className={actionListStyleClasses.accordionSummaryRoot}>
                            <Grid container direction="row" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography className={actionListStyleClasses.accordionTitleText}>
                                        New Actions
                                    </Typography>
                                </Grid>
                                {/**The Add Action icon */}
                                {
                                    isActionEditable && isNewActionsAccordionExpanded &&
                                    (
                                        <Grid item>
                                            <IconButton onClick={handleAddActionIconClick}>
                                                <Typography>
                                                    <Tooltip
                                                        title="Add New Action"
                                                        placement="right"
                                                        arrow
                                                    >
                                                        <img src={images.AddButton}></img>
                                                    </Tooltip>
                                                </Typography>
                                            </IconButton>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </ActionAccordionSummary>
                        <AccordionDetails className={actionListStyleClasses.accordionDetailsRoot}>
                            <TableWrapper
                                borderedRow={false}
                                zIndexValue={1}
                                tableHeight={"auto"}
                                onRowClickCallBack={handleActionRowClick}
                                inputData={newActionsTable}
                                styleTableClasses={actionTableStyleClasses}
                                inputColumn={isActionEditable ? actionColumnDataWithDelete : actionColumnData}
                                customMessageOnEmpty={NO_NEW_ACTIONS}
                                hideHeader={true} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                {mainPageLoading && <LoadingIcon />}
                {/**Confirmation dialog to display for delete */}
                <ConfirmationDialog
                    closeConfirmationDialog={handleCloseDeleteConfirmationDialog}
                    confirmationActionContent={DELETE_DIALOG_BUTTON_TEXT}
                    confirmationDialogContent={deleteConfirmDialogContent}
                    confirmationDialogTitle={DELETE_DIALOG_TITLE_TEXT}
                    handleSubmit={deleteAction}
                    loading={deleteLoading}
                    open={openDeleteConfirmationDialog}
                />
                {/**Snackbar to display the success/error popup */}
                <Snackbar
                    open={openAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={'top' + 'center'}
                    autoHideDuration={ALERT_AUTO_HIDE_DURATION}
                    onClose={() => setOpenAlert(false)}>
                    <Alert
                        icon={alertSeverity === ALERT_SEVERITY.SUCCESS ?
                            <CheckCircleOutlineIcon fontSize="medium" />
                            : <ErrorOutlineIcon fontSize="medium" />
                        }
                        severity={alertSeverity}
                        className={alertStyleClasses.root}
                    >
                        {alertContent}
                    </Alert>
                </Snackbar>
                {/**Dialog to be displayed */}
                <ActionPointDialog
                    actionData={actionData}
                    currentOperation={currentOperation}
                    defaultActionData={defaultActionInitializer(inActionListProps.meetingName)}
                    businessGoalList={inActionListProps.businessGoalList}
                    meetingTopicList={inActionListProps.meetingTopicList}
                    actionTopicData={actionTopicData}
                    isTopicReadOnly={isTopicReadOnly}
                    openActionPointDialog={openActionPointDialog}
                    setOpenActionPointDialog={setOpenActionPointDialog}
                    setActionData={setActionData}
                    actionUpdateCallback={ADD === currentOperation ? handleAddAction : handleUpdateAction}
                />
            </Grid>
        </ThemeProvider>
    )
}