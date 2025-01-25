import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { FormControlLabel, Grid, IconButton, MenuItem, Snackbar, Switch, TextField, ThemeProvider, Tooltip, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import AddMeetingDialog from "../../components/MeetingsComponent/AddMeetingDialog";
import AddTopicToMeetingDialog from "../../components/MeetingsComponent/AddTopicToMeetingDialog";
import { MeetingInterface, MeetingTopicInterface, MeetingViewDropDownInterface } from "../../interfaces/InnovationInterface";
import { AlertStyles, MeetingListViewStyles, MeetingsViewStyles } from "../../themes/MeetingsTheme";
import { ADD_MEETING_TEXT, ALERT_ADD_FAILED, ALERT_ADD__TOPIC__FAILED, ALERT_DELETE_FAILED, ALERT_UPDATE_FAILED, DELETE_DIALOG_BUTTON_TEXT, DELETE_DIALOG_TITLE_TEXT, meetingDeleteConfirmationText, MEETINGS_TEXT, MEETING_FILTER_DROP_DOWN, MEETING_SHOW_PAST_DATA } from "../../constant/MeetingViewTexts";
import { MeetingListView } from "../tables/MeetingListView";
import { defaultMeetingTopicInitializer, defaultMeetingValueInitializer, displayFormattedDate, displayFormattedTime, sortMeetingList } from "../../utils/MeetingUtils";
import { FilterSwitchTheme } from "../theme";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import ConfirmationDialog from "../ConfirmationDialog";
import { MeetingViewContext } from "../../context/MeetingViewContext";
import { Alert } from "@material-ui/lab";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { ALERT_SEVERITY, MEETING_OPERATIONS } from "../../constant/InnovationEnums";
import MeetingService from "../../services/service/MeetingService";

export function MeetingView() {

    /**Getting the Cloud account data and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);

    /**Meeting view Context Related Variable declaration */
    const [totalMeetingsCount, setTotalMeetingsCount] = useState<number>(0);
    const [meetingOperationPerformed, setMeetingOperationPerformed] = useState<string>(MEETING_OPERATIONS.NONE);
    const [modifiedMeeting, setModifiedMeeting] = useState<MeetingInterface>(defaultMeetingValueInitializer);
    /*state to hold the start time of the meeting */
    const [meetingStartTime, setMeetingStartTime] = useState<string>("");
    /*state to hold the end time of the meeting */
    const [meetingEndTime, setMeetingEndTime] = useState<string>("");
    /*state to hold meeting type */
    const [meetingTypeSelected, setMeetingTypeSelected] = useState<string>("");
    const handleMeetingsDataModification = (inMeetingsList: MeetingInterface[]) => {
        switch (meetingOperationPerformed) {
            case MEETING_OPERATIONS.ADD:
                /**If the count of the previous meetings and the list of meetings fetched by the 
                 * search is the same then append the newly added data to the meeting list.
                 */
                if (totalMeetingsCount === inMeetingsList.length && "" !== modifiedMeeting.meetingName) {
                    inMeetingsList.push(modifiedMeeting);
                    inMeetingsList = sortMeetingList(inMeetingsList);
                }
                break;
            case MEETING_OPERATIONS.DELETE:
                /**If the count of the previous meetings and the list of meetings fetched by the 
                * search is the same then remove the deleted data from the meetings list.
                */
                if (totalMeetingsCount === inMeetingsList.length && "" !== modifiedMeeting.meetingName) {
                    let dIndex = -1;
                    /**Find the index of the data to be deleted */
                    for (let meetingIndex = 0; meetingIndex < totalMeetingsCount; ++meetingIndex) {
                        if (inMeetingsList[meetingIndex].meetingName === modifiedMeeting.meetingName) {
                            dIndex = meetingIndex;
                            break;
                        }
                    }
                    /**Remove the deleted data from the list */
                    inMeetingsList.splice(dIndex, 1);
                }
                break;
            case MEETING_OPERATIONS.UPDATE_DATE:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.date = modifiedMeeting.date;
                        inMeetingsList = sortMeetingList(inMeetingsList);
                        break;
                    }
                }
                break;
            case MEETING_OPERATIONS.UPDATE_START_TIME:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.fromTime = modifiedMeeting.fromTime;
                        inMeetingsList = sortMeetingList(inMeetingsList);
                        break;
                    }
                }
                break;
            case MEETING_OPERATIONS.UPDATE_END_TIME:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.toTime = modifiedMeeting.toTime;
                        break;
                    }
                }
                break;
            case MEETING_OPERATIONS.UPDATE_TOPICS:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.discussionTopics = modifiedMeeting.discussionTopics;
                        break;
                    }
                }
                break;
            case MEETING_OPERATIONS.UPDATE_MEETING_TYPE:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.meetingType = modifiedMeeting.meetingType;
                        break;
                    }
                }
                break;
            case MEETING_OPERATIONS.UPDATE_DURATION:
                for (let iMeetingData of inMeetingsList) {
                    if (iMeetingData.meetingName === modifiedMeeting.meetingName) {
                        iMeetingData.fromTime = modifiedMeeting.fromTime;
                        iMeetingData.toTime = modifiedMeeting.toTime;
                        break;
                    }
                }
                break;
        }
        setModifiedMeeting(defaultMeetingValueInitializer());
        setMeetingOperationPerformed(MEETING_OPERATIONS.NONE);
        return inMeetingsList;
    };

    const contextSettings = {
        "totalMeetingsCount": totalMeetingsCount,
        "setTotalMeetingsCount": setTotalMeetingsCount,
        "meetingOperationPerformed": meetingOperationPerformed,
        "setMeetingOperationPerformed": setMeetingOperationPerformed,
        "modifiedMeeting": modifiedMeeting,
        "setModifiedMeeting": setModifiedMeeting,
        "handleMeetingDataModification": handleMeetingsDataModification
    }

    /**Get the styles */
    const MeetingsViewStyleClass = MeetingsViewStyles();
    const MeetingListViewClasses = MeetingListViewStyles();
    const AlertStyleClasses = AlertStyles();

    /**State to open/close the Add Meeting Dialog */
    const [openAddMeetingDialog, setOpenAddMeetingDialog] = useState<boolean>(false);
    /**State to open/close the Add Topic/Business Goal Dialog */
    const [openAddTopicToMeetingDialog, setOpenAddTopicToMeetingDialog] = useState<boolean>(false);
    /**State to track the filter change to display the past meetings */
    const [showPastMeeting, setShowPastMeeting] = useState<boolean>(false);
    /**State to track the filter to display only a particular type of meeting */
    const [meetingTypeFilter, setMeetingTypeFilter] = useState<string>("ALL");
    /**State to trigger render of the list view  */
    const [triggerRender, setTriggerRender] = useState<boolean>(false);
    /**Default data for Meeting */
    const defaultMeetingData: MeetingInterface = defaultMeetingValueInitializer();
    /**Defaut data for meeting topic */
    const defaultMeetingTopicData: MeetingTopicInterface = defaultMeetingTopicInitializer();
    /**State to hold meeting Topic data */
    const [meetingData, setMeetingData] = useState<MeetingInterface>(defaultMeetingData);
    /**State to hold meeting Topic data */
    const [meetingTopicData, setMeetingTopicData] = useState<MeetingTopicInterface>(defaultMeetingTopicData);
    /**State to show the loading Icon */
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    /**state to handle the delete confirmation dialog open and close */
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    /**state to handle the delete loading icon*/
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    /**Name of the meeting to be deleted */
    const [meetingToDelete, setMeetingToDelete] = useState<string>("");
    /**Meeting type of the meeting to be deleted */
    const [meetingTypeToDelete, setMeetingTypeToDelete] = useState<string>("");
    /**Delete confirmation dialog content */
    const [deleteConfirmDialogContent, setDeleteConfirmDialogContent] = useState<string>("");
    /**State to hold the name of the meeting to which a new topic is to be added */
    const [holdMeetingName, setHoldMeetingName] = useState<string>("");
    /**State to hold the list of topics to which the latest topic is to be appended */
    const [holdTopicList, setHoldTopicList] = useState<MeetingTopicInterface[]>([]);
    /**State to handle the snackback alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const ALERT_AUTO_HIDE_DURATION: number = 3000;

    /**function to open Add Meeting Dialog */
    const handleOpenAddMeetingDialog = () => {
        setOpenAddMeetingDialog(true);
    };

    /**function to open Add Meeting Dialog */
    const handleOpenAddTopicToMeetingDialog = () => {
        setOpenAddTopicToMeetingDialog(true);
    };

    /**Functions to open the delete confirmation dialog */
    const handleOpenDeleteConfirmationDialog = () => {
        setOpenDeleteConfirmationDialog(true);
    };
    /**Function to close the delete confirmation dialog */
    const handleCloseDeleteConfirmationDialog = () => {
        setOpenDeleteConfirmationDialog(false);
    };

    /**Functiont to update the filter value of - Show past meeting */
    const handlePastMeetingFilterChange = () => {
        setShowPastMeeting(!showPastMeeting);
    };

    /**Function to handle the meeting type filter change  */
    const handleMeetingTypeFilterChange = (event: any) => {
        setMeetingTypeFilter(event.target.value.trim());
    };

    /**
    * The following functions takes in the Meeting data and send it to the service to save the value
    * @param meetingName - name of the meeting
    * @param inMeetingData - Meeting data to be saved
     */
    const addMeeting = (inMeetingData: MeetingInterface) => {
        setSubmitLoading(true);
        //TODO: Update the case of the repo id
        MeetingService.innovationCreateMeeting(lInnovationData.eskoAccountDetail.repoid, inMeetingData)
            .then((createMeetingResponse: any) => {
                setTimeout(() => {
                    setSubmitLoading(false);
                    setOpenAddMeetingDialog(false);
                    setMeetingOperationPerformed(MEETING_OPERATIONS.ADD);
                    setModifiedMeeting(inMeetingData);
                    setTriggerRender(!triggerRender);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(createMeetingResponse.message);
                    setMeetingData(defaultMeetingValueInitializer());
                }, 2000)
            })
            .catch((createMeetingError: any) => {
                setSubmitLoading(false);
                setOpenAddMeetingDialog(false);
                setMeetingToDelete("");
                setMeetingTypeToDelete("");
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_ADD_FAILED);
                setMeetingData(defaultMeetingValueInitializer());
            });
    };

    /**Function to delete the actions that are related to the
     * deleted discussion topic */
    const handleTopicDelete = (inMeetingType: string, inDeletedTopicId: string) => {
        MeetingService.innovationDeleteActionWithTopicId(lInnovationData.eskoAccountDetail.repoid, inMeetingType,
            inDeletedTopicId)
            .then(() => {
            })
            .catch((updateMeetingError: any) => {
                console.log(updateMeetingError);
            });
    };

    /**
     * Function to update the meeting details.
     * @param inMeetingName - The name of the meeting to be updated
     * @param inMeetingData - The meeting data to be updated
     */
    const handleUpdateMeetingData = (inMeetingName: string, inMeetingData: Object, inOperationPerformed: MEETING_OPERATIONS, inDeletedTopicId?: string) => {
        MeetingService.innovationUpdateMeeting(lInnovationData.eskoAccountDetail.repoid, inMeetingName, inMeetingData)
            .then((updateMeetingResponse: any) => {
                setTimeout(() => {
                    setModifiedMeeting({
                        ...modifiedMeeting,
                        ...inMeetingData,
                        meetingName: inMeetingName
                    });
                    setMeetingOperationPerformed(inOperationPerformed);
                    setTriggerRender(!triggerRender);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(updateMeetingResponse.message);
                    let meetingDataJSON = JSON.parse(JSON.stringify(inMeetingData));
                    if (inDeletedTopicId) {
                        handleTopicDelete(meetingDataJSON["meetingType"], inDeletedTopicId);
                    }
                    if (undefined !== meetingDataJSON["date"] || undefined !== meetingDataJSON["fromTime"]) {
                        MeetingService.innovationUpdateOpenActionInMeeting(lInnovationData.eskoAccountDetail.repoid,
                            meetingDataJSON["meetingType"])
                            .then((response: any) => {
                                console.log(response);
                            })
                            .catch((updateMeetingError: any) => {
                                console.log(updateMeetingError);
                            })
                    }
                }, 3000);
            })
            .catch((updateMeetingError: any) => {
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            });
    };

    /**Function to open dialog to confirm if user wants to delete the meeting details */
    const handleDeleteMeetingDataRequest = (inMeetingData: MeetingInterface) => {
        setDeleteConfirmDialogContent(meetingDeleteConfirmationText(
            inMeetingData.meetingType,
            displayFormattedDate(inMeetingData.date),
            displayFormattedTime(inMeetingData.fromTime),
            displayFormattedTime(inMeetingData.toTime)
        ));
        setMeetingToDelete(inMeetingData.meetingName);
        setMeetingTypeToDelete(inMeetingData.meetingType);
        /**Open the confirmation dialog */
        handleOpenDeleteConfirmationDialog();
    };

    /**Function to delete the meeting details */
    const deleteMeeting = () => {
        setDeleteLoading(true);
        MeetingService.innovationDeleteMeeting(lInnovationData.eskoAccountDetail.repoid, meetingToDelete, meetingTypeToDelete)
            .then((deleteMeetingResponse: any) => {
                setTimeout(() => {
                    setDeleteLoading(false);
                    handleCloseDeleteConfirmationDialog();
                    setMeetingOperationPerformed(MEETING_OPERATIONS.DELETE);
                    setModifiedMeeting({
                        ...modifiedMeeting,
                        meetingName: meetingToDelete
                    });
                    setTriggerRender(!triggerRender);
                    setMeetingToDelete("");
                    setMeetingTypeToDelete("");
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(deleteMeetingResponse.message);
                }, 2000)
            })
            .catch((deleteMeetingError: any) => {
                setDeleteLoading(false);
                handleCloseDeleteConfirmationDialog();
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_DELETE_FAILED);
            });
    };

    /**Function to handle the add topic to existing meeting data */
    const handleAddTopicToMeeting = (inMeetingName: string, inTopicList: MeetingTopicInterface[], inMeetingStartTime: string, inMeetingEndTime: string, inMeetingTypeSelected: string) => {
        setHoldMeetingName(inMeetingName);
        setHoldTopicList(inTopicList);
        setMeetingStartTime(inMeetingStartTime);
        setMeetingEndTime(inMeetingEndTime);
        setMeetingTypeSelected(inMeetingTypeSelected);
        handleOpenAddTopicToMeetingDialog();
    };

    /**Function to add topic to existing meeting  */
    const handleAddTopicSubmit = (inMeetingName: string, inMeetingData: Object) => {
        return new Promise((resolve, reject) => {
            MeetingService.innovationUpdateMeeting(lInnovationData.eskoAccountDetail.repoid, inMeetingName, inMeetingData)
                .then((updateMeetingResponse: any) => {
                    setTimeout(() => {
                        resolve(updateMeetingResponse);
                        setModifiedMeeting({
                            ...modifiedMeeting,
                            ...inMeetingData,
                            meetingName: inMeetingName
                        });
                        setMeetingOperationPerformed(MEETING_OPERATIONS.UPDATE_TOPICS);
                        setTriggerRender(!triggerRender);
                        setOpenAlert(true);
                        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                        setAlertContent(updateMeetingResponse.message);
                    }, 2000)
                })
                .catch((updateMeetingError: any) => {
                    reject(updateMeetingError);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.ERROR);
                    setAlertContent(ALERT_ADD__TOPIC__FAILED);
                });
        });
    };

    useEffect(() => {
        setTriggerRender(!triggerRender);
    }, []);

    /**Set the Total Count to 0 whenever the organization is changed */
    useEffect(() => {
        setTotalMeetingsCount(0);
    }, [lInnovationData.eskoAccountDetail]);

    return (
        <ThemeProvider theme={LightTheme}>
            <MeetingViewContext.Provider value={contextSettings}>
                <div>
                    {/* Grid for the title and the add button */}
                    <Grid container spacing={2} alignContent="center" className={MeetingsViewStyleClass.GridContainerClass}>
                        {/**Title of the page */}
                        <Grid item>
                            <Typography className={MeetingsViewStyleClass.TitleClass}>
                                {MEETINGS_TEXT}
                            </Typography>
                        </Grid>
                        {/**Add icon */}
                        <Grid item>
                            <Tooltip title={ADD_MEETING_TEXT} placement="right" arrow>
                                <IconButton onClick={handleOpenAddMeetingDialog} className={MeetingsViewStyleClass.IconButtonClass}>
                                    <Typography>
                                        <img src={images.AddButton}></img>
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        {/**Grid to hold the filter UI elements */}
                        <Grid container spacing={2} className={MeetingListViewClasses.meetingFilterContainerRoot}>
                            {/**The show past meeting filter */}
                            <Grid item className={MeetingListViewClasses.meetingSwitchRoot}>
                                <ThemeProvider theme={FilterSwitchTheme}>
                                    <FormControlLabel
                                        control={<Switch
                                            onChange={handlePastMeetingFilterChange}
                                            disableRipple={true}
                                            color={"primary"}
                                        />}
                                        label={MEETING_SHOW_PAST_DATA}
                                    />
                                </ThemeProvider>
                            </Grid>
                            {/**Filter to select the meeting type */}
                            <Grid item>
                                <TextField
                                    value={meetingTypeFilter}
                                    onChange={handleMeetingTypeFilterChange}
                                    variant={"outlined"}
                                    select
                                    InputProps={{
                                        classes: {
                                            notchedOutline: MeetingListViewClasses.meetingFieldNotchedOutline,
                                            root: MeetingListViewClasses.meetingFieldOutlineRoot
                                        }
                                    }}
                                    SelectProps={{
                                        classes: {
                                            select: MeetingListViewClasses.meetingFilterDropDownOutlined
                                        }
                                    }}
                                >
                                    {MEETING_FILTER_DROP_DOWN.map((option: MeetingViewDropDownInterface) => {
                                        return (
                                            <MenuItem value={option.dataKey}>{option.displayName}</MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/**Dialog to be displayed */}
                    <AddMeetingDialog
                        meetingData={meetingData}
                        submitLoading={submitLoading}
                        addMeeting={addMeeting}
                        setMeetingData={setMeetingData}
                        openAddMeetingDialog={openAddMeetingDialog}
                        defaultMeetingData={defaultMeetingData}
                        setOpenAddMeetingDialog={setOpenAddMeetingDialog}
                    />
                    <AddTopicToMeetingDialog
                        meetingTopicData={meetingTopicData}
                        setMeetingTopicData={setMeetingTopicData}
                        currentOperation={"Add"}
                        defaultMeetingTopicData={defaultMeetingTopicData}
                        openAddMeetingDialog={openAddTopicToMeetingDialog}
                        setOpenAddMeetingDialog={setOpenAddTopicToMeetingDialog}
                        existingTopicList={holdTopicList}
                        meetingName={holdMeetingName}
                        meetingUpdateCallback={handleAddTopicSubmit}
                        meetingStartTime={meetingStartTime}
                        meetingEndTime={meetingEndTime}
                        inMeetingDataType={meetingTypeSelected}
                    />
                    {/**Confirmation dialog to display for delete */}
                    <ConfirmationDialog
                        closeConfirmationDialog={handleCloseDeleteConfirmationDialog}
                        confirmationActionContent={DELETE_DIALOG_BUTTON_TEXT}
                        confirmationDialogContent={deleteConfirmDialogContent}
                        confirmationDialogTitle={DELETE_DIALOG_TITLE_TEXT}
                        handleSubmit={deleteMeeting}
                        loading={deleteLoading}
                        open={openDeleteConfirmationDialog}
                    />
                    {/* Snackbar to display the success/error popup */}
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
                            className={AlertStyleClasses.root}
                        >
                            {alertContent}
                        </Alert>
                    </Snackbar>
                </div>
                <MeetingListView
                    showPastMeeting={showPastMeeting}
                    addTopicCallBack={handleAddTopicToMeeting}
                    meetingTypeFilter={meetingTypeFilter}
                    triggerRender={triggerRender}
                    meetingUpdateCallback={handleUpdateMeetingData}
                    meetingDeleteCallback={handleDeleteMeetingDataRequest}
                />
            </MeetingViewContext.Provider>
        </ThemeProvider >
    );
}
