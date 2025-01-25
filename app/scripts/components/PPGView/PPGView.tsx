import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Box, Grid, IconButton, Snackbar, ThemeProvider, Tooltip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import EditIcon from '@material-ui/icons/Edit';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { ALERT_SEVERITY, InnovationStatus, VIEW_OPTIONS } from "../../constant/InnovationEnums";
import { ADD, ALERT_ADD_FAILED, ALERT_ADD__TOPIC__FAILED, ALERT_SLIDE_UPLOAD_SUCCESS, ALERT_UPDATE_FAILED, EDIT, EDIT_DISCUSSION_TOPIC, FILE_NOT_SUPPORTED, NO_DISCUSSION_TOPICS_TEXT, NO_MEETING_ADDED_TEXT, NO_UPCOMING_MEETING_SCHEDULED_TEXT, ORDER_CHANGE_PRMISSION_TOOLTIP } from "../../constant/MeetingViewTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { MPLViewContext } from "../../context/MPLViewContext";
import { NodeEventContext } from "../../context/NodeEventContext";
import { ActionInterface, NoteInterface, BusinessGoalTableType, MeetingInterface, MeetingTopicInterface, SlidesModel, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import MeetingService from "../../services/service/MeetingService";
import UserService from "../../services/UserService";
import { AlertStyles } from "../../themes/MeetingsTheme";
import useFiveReleases from "../../utils/CustomHooks/useFiveReleases";
import { defaultMeetingTopicInitializer, defaultMeetingValueInitializer, defaultActionInitializer, getTimeAndDate, getUpcomingMeetingIndex } from "../../utils/MeetingUtils";
import { defaultBusinessGoalInitializer, getBGThumbnailAndName, defaultBusinessNoteInitializer } from "../../utils/MPLViewUtils";
import { convertTime, getEndTime } from "../../utils/Utilities";
import { BusinessGoalComponent } from "../../view/businessGoal/BusinessGoalComponent";
import { BusinessGoalType, ResponseFromServer } from "../../view/MPLView";
import { ColumnFieldData, TableWrapper } from "../../view/tables/TableWrapper";
import FilterSubmenu from "../FilterSubmenu";
import AddTopicToMeetingDialog from "../MeetingsComponent/AddTopicToMeetingDialog";
import ObjectViewComponent from "../ObjectView";
import HealthContainer from "../PPLView/HealthContainer/HealthContainer";
import ReleaseTimelineBar from "../PPLView/ReleaseTimelineBar/ReleaseTimelineBar";
import ReleaseTimelineHead from "../PPLView/ReleaseTimelineHead/ReleaseTimelineHead";
import ReleaseModel from "../settings/InnovationCadenceView/ReleaseModel";
import { StatusMenuButton } from "../StatusMenuButton";
import AddButtonModel from "../utils/Header/AddButton/AddButtonModel";
import Header from "../utils/Header/Header";
import { DateSelectorModel } from "../utils/Header/HeaderModel";
import ToggleSelectFieldModel from "../utils/Header/ToggleSelectField/ToggleSelectFieldModel";
import LoadingIcon from "../utils/LoadingIcon/LoadingIcon";
import SlidesUpload from "../utils/SlidesUpload/SlidesUpload";
import TextWithTooltip from "../utils/TextWithTooltip/TextWithTooltip";
import { UserAvatar } from "../utils/UserAvatar/UserAvatar";
import { PPGViewStyle } from "./PPGViewStyle";
import ActionList from "../ActionComponents/ActionList";
import ActionPointDialog from "../ActionComponents/ActionPointDialog";
import { PPG_MEETING_TYPE } from "../../constant/ActionTexts";
export default function PPGView() {

    const lNodeEventData = useContext(NodeEventContext);
    const ppgViewStyleClasses = PPGViewStyle()

    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 110;
    const adminText: string = "Administrators";

    const healthColumnDataWithoutEdit: ColumnFieldData[] = [
        { dataKey: "dragIndicatorIcon", label: "Order", isSortable: false, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "3%" },
        { dataKey: "topic", label: "Topic", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "20%" },
        { dataKey: "type", label: "Type", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "duration", label: "Duration", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "8%" },
        { dataKey: "schedule", label: "Schedule", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "presenter", label: "Presenter", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "8%" },
        { dataKey: "health", label: "Health", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "slides", label: "Slides", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" }
    ];

    const healthColumnDataWithEdit: ColumnFieldData[] = [
        { dataKey: "dragIndicatorIcon", label: "Order", isSortable: false, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "3%" },
        { dataKey: "topic", label: "Topic", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "20%" },
        { dataKey: "type", label: "Type", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "duration", label: "Duration", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "8%" },
        { dataKey: "schedule", label: "Schedule", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "7%" },
        { dataKey: "presenter", label: "Presenter", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "4%" },
        { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "8%" },
        { dataKey: "health", label: "Health", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "10%" },
        { dataKey: "slides", label: "Slides", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
        { dataKey: "edit", label: "Edit", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "4%" }
    ];

    const lInnovationData = useContext(InnovationAppContext);
    const [triggerRender, setTriggerRender] = useState<boolean>(false);
    /**State to open/close the Add Topic/Business Goal Dialog */
    const [openAddTopicToMeetingDialog, setOpenAddTopicToMeetingDialog] = useState<boolean>(false);
    /**Defaut data for meeting topic */
    const defaultMeetingTopicData: MeetingTopicInterface = defaultMeetingTopicInitializer();
    /**State to hold meeting Topic data */
    const [meetingTopicData, setMeetingTopicData] = useState<MeetingTopicInterface>(defaultMeetingTopicData);
    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth);
    /**State to hold the list of topics to which the latest topic is to be appended */
    const [holdTopicList, setHoldTopicList] = useState<MeetingTopicInterface[]>([]);
    /*state to hold the start time of the meeting */
    const [meetingStartTime, setMeetingStartTime] = useState<string>("");
    /*state to hold the end time of the meeting */
    const [meetingEndTime, setMeetingEndTime] = useState<string>("");
    const [scheduleList, setScheduleList] = useState<string[]>([]);
    const [isOrderChanged, setIsOrderChanged] = useState<boolean>(false);
    const [meetingsList, setMeetingsList] = useState<MeetingInterface[]>([]);
    const [usersListWithName, setUsersListWithName] = useState<UserListWithEmailModel[]>([]);
    const [tableMeetingData, setTableMeetingData] = useState<any[]>([]);
    const [businessGoalList, setBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [meetingBusinessGoalList, setMeetingBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [modifiedMeeting, setModifiedMeeting] = useState<MeetingInterface>(defaultMeetingValueInitializer);
    const [modifiedBusinessGoal, setModifiedBusinessGoal] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
    const [businessGoalSelected, setBusinessGoalSelected] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    const [textSelected, setTextSelected] = useState<MeetingTopicInterface>(defaultMeetingTopicInitializer());
    const [openBGObjectView, setOpenBGObjectView] = useState<boolean>(false);
    const [openTextObjectView, setOpenTextObjectView] = useState<boolean>(false);
    const [notesList, setNotesList] = useState<NoteInterface[]>([]);
    /**State variable to hold the array to be displayed */
    const [currentMeeting, setCurrentMeeting] = useState<MeetingInterface>(defaultMeetingValueInitializer);
    const [discussionTopicList, setDiscussionTopicList] = useState<MeetingTopicInterface[]>(undefined === currentMeeting ? [] : currentMeeting.discussionTopics);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);
    /**State to handle the snackback alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>();
    const [loadingNotesCircularIcon, setLoadingNotesCircularIcon] = useState<boolean>(false);
    const [fiveReleasesList, setFiveReleasesList] = useState<ReleaseModel[]>([]);
    const [columnData, setColumnData] = useState<ColumnFieldData[]>(healthColumnDataWithoutEdit);
    const ALERT_AUTO_HIDE_DURATION: number = 3000;
    const AlertStyleClasses = AlertStyles();
    const hasAddandEditDiscussionTopicPermission: boolean = lInnovationData.userPermission.meetingModel.isMeetingEditable;
    const canAddSlides: boolean = lInnovationData.userPermission.businessGoal.isAllBGEditable;
    const isOldMeetingEditable: boolean = lInnovationData.userPermission.meetingModel.isOldMeetingEditable;
    const [isCurrentMeetingEditablebyUser, setIsCurrentMeetingEditablebyUser] = useState<boolean>(false);
    const [meetingDateList, setMeetingDateList] = useState<string[]>([]);
    const [showNotes, setShowNotes] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [currentOperation, setCurrentOperation] = useState<string>(ADD);
    const [isUserPresenter, setIsUserPresenter] = useState<boolean>(false);
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
    const [isAnyUpcomingMeetingAvailable, setIsAnyUpcomingMeetingAvailable] = useState<boolean>(false);
    let lBusinessNoteOperation: string = "NONE";
    let lModifiedBusinessGoalNote: NoteInterface = defaultBusinessNoteInitializer();
    /**Action point Dialog */
    const [actionData, setActionData] = useState<ActionInterface>(defaultActionInitializer(currentMeeting.meetingName));
    const [openActionPointDialog, setOpenActionPointDialog] = useState<boolean>(false);
    const [selectedTopicId, setSelectedTopicId] = useState<string>("");

    const handleCreateActionButtonClick = () => {
        /**Open Action Point Dialog in Add mode */
        setActionData(defaultActionInitializer(currentMeeting.meetingName, selectedTopicId));
        setCurrentOperation(ADD);
        setOpenActionPointDialog(true);
    };

    /**Function to add action  */
    const handleAddAction = (inActionData: ActionInterface) => {
        return new Promise((resolve, reject) => {
            MeetingService.innovationCreateAction(lInnovationData.eskoAccountDetail.repoid,
                PPG_MEETING_TYPE, inActionData)
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

    let releasesList: ReleaseModel[] = [];
    let isError: boolean = false;
    let isLoading: boolean = false;
    [releasesList, isLoading, isError] = useFiveReleases(lInnovationData.eskoAccountDetail.repoid);
    useEffect(() => {
        if (releasesList) {
            setFiveReleasesList(releasesList);
        }
        setMainPageLoading(isLoading);
    }, [releasesList, isLoading, isError]);

    const toggleSelectFieldData: ToggleSelectFieldModel = {
        defaultValue: VIEW_OPTIONS.HEALTH,
        menuOptions: [
            {
                value: VIEW_OPTIONS.HEALTH, option: <Tooltip
                    title={"Health View"}
                    arrow
                    placement="left"
                >
                    <SupervisorAccountIcon fontSize="small" />
                </Tooltip>
            },
            {
                value: VIEW_OPTIONS.TIMELINE, option: <Tooltip
                    title={"Timeline View"}
                    arrow
                    placement="left">
                    <DateRangeIcon fontSize="small" />
                </Tooltip>
            }
        ],
        handleChange: (evt: any) => {
            evt.preventDefault();
            setSelectedDropdownValue(evt.target.value);
        }
    };

    const updateNoteView = (notesView: string, textDiscussionTopic: string, textNoteName: string) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        MeetingService.innovationUpdateTextNotes(repoId, textNoteName, notesView.toString(), currentMeeting)
            .then((response: any) => {
                console.log(response);
            })
            .catch((error: any) => {
                console.log(error);
            })
    };

    const handleBGStatusChange = (inBGDataList: BusinessGoalTableType[]) => {
        for (let tableRowData of inBGDataList) {
            if (decodeURI(tableRowData.nodePath.toString()) === modifiedBusinessGoal.businessGoalName) {
                tableRowData.status = modifiedBusinessGoal.status;
                setBusinessGoalSelected({
                    ...businessGoalSelected,
                    status: modifiedBusinessGoal.status
                });
                break;
            }
        }
        return inBGDataList;
    }

    useEffect(() => {
        const lScheduleList: string[] = [];
        let lStartTime: string = currentMeeting ? currentMeeting?.fromTime : "";
        if (currentMeeting) {
            currentMeeting.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
                let lSchedule: string = "";
                if (0 !== discussionTopic.topicDuration) {
                    const lEndTime: string = getEndTime(lStartTime, discussionTopic.topicDuration);
                    lSchedule = convertTime(lStartTime) + " - " + convertTime(lEndTime);
                    lStartTime = lEndTime;
                }
                lScheduleList.push(lSchedule);
            })
        }
        setScheduleList(lScheduleList);
    }, [currentMeeting, meetingsList, businessGoalList, isOrderChanged, refreshTable]);

    const isSlidesPresent = (inDiscussionTopicId: string): boolean => {
        let lIsSlidesPresent: boolean = false;
        currentMeeting.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
            if (inDiscussionTopicId === discussionTopic.discussionTopicId) {
                if (discussionTopic.slideId !== "") {
                    lIsSlidesPresent = true;
                }
            }
        })
        return lIsSlidesPresent;
    }

    /**closes Object View */
    const closeObjectView = () => {
        setShowNotes(false);
        setOpenTextObjectView(false);
    };

    const handleOrderChange = (inMeetingData: MeetingInterface) => {
        if (isOrderChanged) {
            inMeetingData.discussionTopics = modifiedMeeting.discussionTopics;
            setIsOrderChanged(false);
        }
        return inMeetingData;
    }

    const saveNotes = (notesData: NoteInterface) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        setLoadingNotesCircularIcon(true);
        let lNotesData: NoteInterface = notesData;
        lNotesData.parentId = textSelected.discussionTopicId;
        MeetingService.innovationCreateTextNotes(repoId, currentMeeting, lNotesData)
            .then((_createResponse: any) => {
                /**To set the operation performed on text discussion topic and the 
                 * new data that was added.
                 */
                lBusinessNoteOperation = "ADD";
                lModifiedBusinessGoalNote = lNotesData;
                /*create call takes some time, so setting timeout to get the notes after the create call is made*/
                setTimeout(()=>{
                    getTextNotes(textSelected.discussionTopicId);
                },2000);
            })
            .catch((error: ResponseFromServer) => {
                setLoadingNotesCircularIcon(false)
                console.log(error);
            })
    };

    /**Whenever the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth)
        }
        else {
            setMarginContentView(leftNavWidth)
        }
    }, [openFilterMenu])

    useEffect(() => {
        if (VIEW_OPTIONS.TIMELINE === selectedDropdownValue) {
            const releaseTimelineHead: JSX.Element = <ReleaseTimelineHead fiveUnarchivedReleases={fiveReleasesList} />;
            setColumnData([
                { dataKey: "dragIndicatorIcon", label: "Order", isSortable: false, isComponentColumn: false, alignment: "center", returnsRowData: false, cellWidth: "3%" },
                { dataKey: "topic", label: "Topic", isSortable: false, isComponentColumn: true, alignment: "left", returnsRowData: true, cellWidth: "20%" },
                { dataKey: "type", label: "Type", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "5%" },
                { dataKey: "duration", label: "Duration", isSortable: false, isComponentColumn: false, alignment: "left", returnsRowData: false, cellWidth: "8%" },
                { dataKey: "presenter", label: "Presenter", isSortable: false, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "5%" },
                { dataKey: "status", label: "Status", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "10%" },
                { dataKey: "slides", label: "Slides", isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
                { dataKey: "releaseTimeline", label: releaseTimelineHead, isSortable: false, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "50%" }
            ]);
        } else if (VIEW_OPTIONS.HEALTH === selectedDropdownValue) {
            setColumnData(lInnovationData.userPermission.meetingModel.isMeetingEditable ? healthColumnDataWithEdit : healthColumnDataWithoutEdit);
        }
    }, [selectedDropdownValue]);

    /**
     * Function to update the meeting details.
     * @param inMeetingName - The name of the meeting to be updated
     * @param inMeetingData - The meeting data to be updated
     */
    const handleUpdateMeetingData = (inMeetingName: string, inMeetingData: Object) => {
        setMainPageLoading(true);
        MeetingService.innovationUpdateMeeting(lInnovationData.eskoAccountDetail.repoid, inMeetingName, inMeetingData)
            .then((updateMeetingResponse: any) => {
                console.log(updateMeetingResponse);
                setModifiedMeeting({
                    ...modifiedMeeting,
                    ...inMeetingData,
                    meetingName: inMeetingName
                });
                setOpenAlert(true);
                lInnovationData.renderVarUpdateFunction();
                setMainPageLoading(false);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(updateMeetingResponse.message);
            })
            .catch((updateMeetingError: any) => {
                console.log(updateMeetingError);
                setOpenAlert(true);
                setMainPageLoading(false);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            });
    };

    /**Function to reOrder the index values when dragging */
    const reOrderTopicList = (meetingTopicList: MeetingTopicInterface[], startIndex: number, endIndex: number) => {
        /**re-ordering the array of topics */
        const reArrangedTopicList = Array.from(meetingTopicList);
        const [reOrderedTopic] = reArrangedTopicList.splice(startIndex, 1);
        reArrangedTopicList.splice(endIndex, 0, reOrderedTopic);
        /**Send the updated data to callback function */
        const outMeetingData: Object = {
            discussionTopics: reArrangedTopicList,
            meetingType: currentMeeting.meetingType
        }
        setIsOrderChanged(true);
        handleUpdateMeetingData(currentMeeting.meetingName, outMeetingData);
        return reArrangedTopicList;
    };

    const updateSlidesinMeeting = (slideId: string, discussionTopicId: string) => {
        const lNewDiscussionTopicsList: MeetingTopicInterface[] = [];
        let currentMeetingData: MeetingInterface = currentMeeting;
        currentMeetingData.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
            if (discussionTopic.discussionTopicId === discussionTopicId) {
                let lDiscussionTopic: MeetingTopicInterface = {
                    discussionTopicId: discussionTopic.discussionTopicId,
                    slideId: slideId,
                    presenter: discussionTopic.presenter,
                    topic: discussionTopic.topic,
                    topicType: discussionTopic.topicType,
                    typeOfTopic: discussionTopic.typeOfTopic,
                    topicDuration: discussionTopic.topicDuration
                }
                lNewDiscussionTopicsList.push(lDiscussionTopic)
            }
            else {
                lNewDiscussionTopicsList.push(discussionTopic);
            }
        })
        currentMeetingData.discussionTopics = lNewDiscussionTopicsList;
        return new Promise((resolve, reject) => {
            MeetingService.innovationUpdateDiscussionTopicSlideId(lInnovationData.eskoAccountDetail.repoid, currentMeeting.meetingName, slideId, discussionTopicId)
                .then((updateMeetingResponse: any) => {
                    resolve(updateMeetingResponse);
                    setModifiedMeeting({
                        ...modifiedMeeting,
                        ...currentMeetingData,
                        meetingName: currentMeeting.meetingName
                    });
                    setCurrentMeeting(currentMeetingData);
                })
                .catch((updateMeetingError: any) => {
                    reject(updateMeetingError);
                });
        })
    }

    const onSlideUploadSuccess = (inMessage: string) => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
        setAlertContent(inMessage);
        setRefreshTable(!refreshTable);
    };

    const addSlideToMeeting = (slideId: string, discussionTopicId: string, message: string) => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
        setAlertContent(message);
        updateSlidesinMeeting(slideId, discussionTopicId);
        setRefreshTable(!refreshTable);
    };

    const onTextSlideDelete = (inMessage: string) => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
        setAlertContent(inMessage);
        setRefreshTable(!refreshTable);
    }

    const onSlideDelete = (discussionTopicId: string, inMessage: string, inTextSlides?: SlidesModel[]) => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
        setAlertContent(inMessage);
        updateSlidesinMeeting("", discussionTopicId);
        setRefreshTable(!refreshTable);
    };

    /**When uploading of the thumbnail failes */
    const onSlideUploadFailure = (error: any, message: string) => {
        console.log(error);
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.ERROR);
        setAlertContent(message);
    };

    const slideRejectedFilesCallback = () => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.ERROR);
        setAlertContent(FILE_NOT_SUPPORTED);
    };

    const slideUploadSuccessFilesCallback = () => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.SUCCESS);
        setAlertContent(ALERT_SLIDE_UPLOAD_SUCCESS);
        setRefreshTable(!refreshTable)
    };


    /**Function is triggered when a component is dragged */
    const handleTopicDragEvent = (topicDragEvent: any) => {
        if (!topicDragEvent.destination) {
            return;
        }
        /**Store the resultant array */
        const temp = reOrderTopicList(
            discussionTopicList,
            topicDragEvent.source.index,
            topicDragEvent.destination.index
        );
        setDiscussionTopicList(temp);
    };


    const statusChange = (inNodePath: string, inBusinessGoalName: string, inStatusValue: string, inPrevStatusValue: string) => {
        setMainPageLoading(true);
        BusinessGoalService.innovationBusinessGoalStatusUpdate(
            lInnovationData.eskoAccountDetail.repoid,
            inBusinessGoalName,
            inPrevStatusValue,
            inStatusValue
        ).then(() => {
            setModifiedBusinessGoal({
                ...modifiedBusinessGoal,
                businessGoalName: inNodePath,
                status: inStatusValue.trim()
            });
            lInnovationData.renderVarUpdateFunction();
            setOpenAlert(true);
            setMainPageLoading(false);
            setAlertSeverity(ALERT_SEVERITY.SUCCESS);
            setAlertContent("Business Goal Status is updated successfully");
        })
            .catch(() => {
                setOpenAlert(true);
                setMainPageLoading(false);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            });
    };

    const handleRowClick = (data: any) => {
        let clickedData = JSON.parse(JSON.stringify(data));
        setSelectedTopicId(clickedData["discussionTopicId"]);
        if ("" !== clickedData["type"]) {
            clickedData["topic"] = clickedData["topic"].componentValue;
            clickedData["status"] = data["status"].componentValue;
            setValuesOnBGSelect(businessGoalList.find(businessGoal => businessGoal.businessGoalName === clickedData["topic"]));
        }
        else {
            clickedData["topic"] = clickedData["topic"].componentValue;
            setValuesOnTextSelect(discussionTopicList.find(textDiscussionTopic => textDiscussionTopic.topic === clickedData["topic"]));
        }
    };

    const setValuesOnTextSelect = (data: any) => {
        setOpenBGObjectView(false);
        setTextSelected({
            discussionTopicId: data.discussionTopicId,
            presenter: data.presenter,
            slideId: data.slideId,
            topic: data.topic,
            topicDuration: data.topicDuration,
            topicType: data.topicType
        });
        setOpenTextObjectView(true);
    }

    useEffect(() => {
        setLoadingNotesCircularIcon(false);
        getTextNotes(textSelected.discussionTopicId);
    }, [textSelected, lNodeEventData.PPGUpdated])

    const setValuesOnBGSelect = (data: any) => {
        setOpenTextObjectView(false);
        setBusinessGoalSelected({
            nodeId: data.nodeId,
            MPLPriority: data.MPLPriority,
            PPLPriority: data.PPLPriority,
            businessGoalName: data.businessGoalName,
            problemDefinition: data.problemDefinition,
            briefDescription: data.briefDescription,
            owner: data.owner,
            goalType: data.goalType,
            businessUnit: data.businessUnit,
            status: data.status,
            businessCaseData: data.businessCaseData,
            runwaysList: data.runwaysList,
            productsList: data.productsList,
            targetMarketScore: data.targetMarketScore,
            channelPartnerScore: data.channelPartnerScore,
            positioningScore: data.positioningScore,
            ideaTypeScore: data.ideaTypeScore,
            riskScore: data.riskScore,
            thumbnail: data.thumbnail,
            freedomToOperate: data.freedomToOperate,
            potentialIp: data.potentialIp,
            potentialIpDescription: data.potentialIpDescription,
            milestones: data.milestones,
            releaseTimelineData: data.releaseTimelineData,
            slides: data.slides,
            coreTeam: data.coreTeam,
            healthData: data.healthData
        });
        setOpenBGObjectView(true);
    };

    const handleAddButtonClick = () => {
        setOpenAddTopicToMeetingDialog(true);
        setCurrentOperation(ADD);
    }

    const handleEditCLick = (inDiscussionTopic: MeetingTopicInterface) => {
        setMeetingTopicData(inDiscussionTopic);
        setOpenAddTopicToMeetingDialog(true);
        setCurrentOperation(EDIT);
    }

    const addButtonData: AddButtonModel = {
        tooltipTitle: "Add Topic to meeting",
        addButtonAltText: "Add Topic Icon Button",
        handleAddButtonClick: handleAddButtonClick
    };

    function getDragIndicatorIcon() {
        return <DragIndicatorIcon
            color={!hasAddandEditDiscussionTopicPermission ? "disabled" : "inherit"}
            style={{ cursor: hasAddandEditDiscussionTopicPermission ? "default" : "not-allowed" }}
            titleAccess={!hasAddandEditDiscussionTopicPermission ? ORDER_CHANGE_PRMISSION_TOOLTIP : ""}
        />;
    }

    const getBusinessGoalData = (inNodeId: string): BusinessGoalTableType => {
        let lBusinessGoalData: BusinessGoalTableType = defaultBusinessGoalInitializer();

        businessGoalList.forEach((businessGoal: BusinessGoalTableType) => {
            if (inNodeId === businessGoal.nodeId) {
                lBusinessGoalData = businessGoal;
            }
        })

        return lBusinessGoalData;

    }

    const tableComponentsBuilder = () => {

        const lMeetingsTableData: any[] = [];
        const lMeetingBusinesGoalList: BusinessGoalTableType[] = [];
        let lRowNumbering = 0;

        if (undefined !== currentMeeting) {
            currentMeeting.discussionTopics.forEach((discussionTopic: MeetingTopicInterface, key: number) => {
                let meetingTableRow: any = {};
                meetingTableRow["discussionTopicId"] = discussionTopic.discussionTopicId;
                meetingTableRow["id"] = lRowNumbering;
                if (lInnovationData.userPermission.meetingModel.isMeetingEditable) {
                    meetingTableRow["edit"] = {
                        displayComponent: <IconButton onClick={() => handleEditCLick(discussionTopic)}>
                            <Tooltip title={EDIT_DISCUSSION_TOPIC}
                                placement="bottom"
                                arrow>
                                <EditIcon></EditIcon>
                            </Tooltip>
                        </IconButton>,
                        componentValue: "Edit"
                    };
                }
                let holdPresenterDetail = {
                    "displayComponent": <UserAvatar
                        avatarSize="40px"
                        displayText={false}
                        userName={""} />,
                    "componentValue": ""
                }
                //presenter
                if (undefined !== discussionTopic.presenter) {
                    const lPresenterEmail: string = discussionTopic.presenter
                    const userDetail: any = usersListWithName.find(o => o.email === lPresenterEmail);
                    const lPresenterName: string = userDetail != undefined ? userDetail.displayName : lPresenterEmail;

                    const lPresenterBadge = <UserAvatar
                        avatarSize="40px"
                        displayText={false}
                        userName={lPresenterName} />;
                    holdPresenterDetail = {
                        "displayComponent": lPresenterBadge,
                        "componentValue": lPresenterEmail
                    };
                }
                meetingTableRow["presenter"] = holdPresenterDetail;
                if ("Business Goal" === discussionTopic.topicType) {

                    const businessGoalData = getBusinessGoalData(discussionTopic.topic);
                    if ("" === businessGoalData.businessGoalName) {
                        return;
                    }
                    lMeetingBusinesGoalList.push(businessGoalData);

                    //dragIndicatorIcon
                    meetingTableRow.dragIndicatorIcon = getDragIndicatorIcon();

                    //topic
                    let lthumbnailImage: any = images.EskoStarPng;
                    if (undefined !== businessGoalData["thumbnail"]) {
                        lthumbnailImage = businessGoalData["thumbnail"];
                    }
                    const bgName: string = businessGoalData["businessGoalName"];
                    if ("string" === typeof (businessGoalData["businessGoalName"])) {
                        const lthumbnail = getBGThumbnailAndName(lthumbnailImage, bgName);
                        const lBusinessGoalNameDetail = {
                            "displayComponent": lthumbnail,
                            "componentValue": bgName
                        };
                        meetingTableRow["topic"] = lBusinessGoalNameDetail;
                    }

                    //type
                    meetingTableRow["type"] = discussionTopic.typeOfTopic;

                    //duration
                    meetingTableRow["duration"] = `${discussionTopic.topicDuration} min`;

                    //schedule
                    meetingTableRow["schedule"] = scheduleList[key];

                    //health
                    const lhealth = <HealthContainer bgHealth={businessGoalData["healthData"]} />;
                    const lHealthDetail = {
                        "displayComponent": lhealth,
                        "componentValue": businessGoalData["healthData"]
                    };

                    meetingTableRow["health"] = lHealthDetail;

                    //status
                    meetingTableRow["status"] = {
                        displayComponent: <StatusMenuButton
                            businessGoalName={bgName}
                            defaultValue={businessGoalData.status}
                            nodePath={decodeURIComponent(businessGoalData["nodePath"])}
                            callBack={statusChange} />,
                        componentValue: InnovationStatus.SCHEDULED
                    };

                    //businessUnit
                    meetingTableRow["businessUnit"] = businessGoalData.businessUnit;

                    //slides
                    meetingTableRow["slides"] = {
                        displayComponent: <SlidesUpload
                            isSlidePresent={isSlidesPresent(discussionTopic.discussionTopicId)}
                            discussionTopicId={discussionTopic.discussionTopicId}
                            businessGoalName={businessGoalData.businessGoalName}
                            businessGoalData={businessGoalData}
                            refreshTable={refreshTable}
                            setRefreshTable={setRefreshTable}
                            currentMeetingData={currentMeeting}
                            setCurrentMeetingData={setCurrentMeeting}
                            callBackToAddSlides={addSlideToMeeting}
                            callBackForAcceptedFiles={slideUploadSuccessFilesCallback}
                            callBackOnSuccess={onSlideUploadSuccess}
                            callBackOnDelete={onSlideDelete}
                            callBackOnFailure={onSlideUploadFailure}
                            callBackForRejectedFiles={slideRejectedFilesCallback}
                            slides={businessGoalData.slides}
                            isBGDiscussionType={true}
                            isSlidesEditable={canAddSlides ? canAddSlides : (isUserPresenter && discussionTopic.presenter === lInnovationData.currentUserInfo.email) || lInnovationData.currentUserInfo.email === businessGoalData.owner}
                            isOldMeetingEditable={isCurrentMeetingEditablebyUser} />,
                        componentValue: "Slides"
                    };

                    //releaseTimeline
                    const releaseTimelineRow = <ReleaseTimelineBar
                        fiveUnarchivedReleases={fiveReleasesList}
                        releaseTimelineData={businessGoalData["releaseTimelineData"]} />;
                    const lReleaseTimeline = {
                        "displayComponent": releaseTimelineRow,
                        "componentValue": businessGoalData["releaseTimelineData"]
                    };
                    meetingTableRow["releaseTimeline"] = lReleaseTimeline;
                } else {

                    meetingTableRow.dragIndicatorIcon = getDragIndicatorIcon();

                    const lBusinessGoalNameDetail = {
                        "displayComponent": <TextWithTooltip
                            text={discussionTopic.topic}
                            tooltipText={discussionTopic.topic}
                            textAlign={"left"}
                            isTextBold={false}
                            tooltipPlacement={"bottom"} />,
                        "componentValue": discussionTopic.topic,
                        "cursor": "pointer"
                    };

                    meetingTableRow["topic"] = lBusinessGoalNameDetail;

                    //type
                    meetingTableRow["type"] = "";

                    //duration
                    meetingTableRow["duration"] = `${discussionTopic.topicDuration} min`;

                    //schedule
                    meetingTableRow["schedule"] = scheduleList[key];

                    //status
                    meetingTableRow["status"] = {
                        displayComponent: <></>,
                        componentValue: ""
                    };

                    //businessUnit
                    meetingTableRow["businessUnit"] = "";

                    //slides
                    meetingTableRow["slides"] = {
                        displayComponent: <SlidesUpload
                            isSlidePresent={isSlidesPresent(discussionTopic.discussionTopicId)}
                            discussionTopicId={discussionTopic.discussionTopicId}
                            refreshTable={refreshTable}
                            callBackOnTextSlideDelete={onTextSlideDelete}
                            setRefreshTable={setRefreshTable}
                            currentMeetingData={currentMeeting}
                            setCurrentMeetingData={setCurrentMeeting}
                            callBackToAddSlides={addSlideToMeeting}
                            callBackForAcceptedFiles={slideUploadSuccessFilesCallback}
                            callBackOnSuccess={onSlideUploadSuccess}
                            callBackOnDelete={onSlideDelete}
                            callBackOnFailure={onSlideUploadFailure}
                            callBackForRejectedFiles={slideRejectedFilesCallback}
                            isSlidesEditable={isUserAdmin || (isUserPresenter && discussionTopic.presenter === lInnovationData.currentUserInfo.email)}
                            isBGDiscussionType={false}
                            isOldMeetingEditable={isCurrentMeetingEditablebyUser} />,
                        componentValue: "Slides"
                    };

                    meetingTableRow["health"] = {
                        displayComponent: <></>,
                        componentValue: "Health"
                    };
                    //releaseTimeline
                    meetingTableRow["releaseTimeline"] = {
                        displayComponent: <></>,
                        componentValue: "releaseTimeline"
                    };
                }
                lMeetingsTableData.push(meetingTableRow);
                ++lRowNumbering;
            })
        }
        setTableMeetingData(lMeetingsTableData);
        setMeetingBusinessGoalList(lMeetingBusinesGoalList);
    }
    /**Function to add topic to existing meeting  */
    const handleAddTopicSubmit = (inMeetingName: string, inMeetingData: Object) => {
        return new Promise((resolve, reject) => {
            MeetingService.innovationUpdateMeeting(lInnovationData.eskoAccountDetail.repoid, inMeetingName, inMeetingData)
                .then((updateMeetingResponse: any) => {
                    resolve(updateMeetingResponse);
                    setModifiedMeeting({
                        ...modifiedMeeting,
                        ...inMeetingData,
                        meetingName: inMeetingName
                    });
                    console.log(inMeetingData.toString())
                    setTriggerRender(!triggerRender);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(updateMeetingResponse.message);
                    setRefreshTable(!refreshTable);//to update the sir view as new topic is added to SIR  
                })
                .catch((updateMeetingError: any) => {
                    reject(updateMeetingError);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.ERROR);
                    setAlertContent(ALERT_ADD__TOPIC__FAILED);
                });
        });
    };

    const getTableMessage = () => {
        return (currentMeeting.meetingName === "" ? NO_UPCOMING_MEETING_SCHEDULED_TEXT : NO_DISCUSSION_TOPICS_TEXT);
    }

    useEffect(() => {
        setMainPageLoading(true);
        setColumnData(lInnovationData.userPermission.meetingModel.isMeetingEditable ? healthColumnDataWithEdit : healthColumnDataWithoutEdit)
        lInnovationData.currentUserInfo.groupMembership.forEach((group: string) => {
            if (group.includes(adminText)) {
                setIsUserAdmin(true);
            }
        });
        BusinessGoalService.innovationGetAllBusinessGoalList(lInnovationData.eskoAccountDetail.repoid)
            .then((businessGoalListResponse: BusinessGoalTableType[]) => {
                setBusinessGoalList(handleBGStatusChange(businessGoalListResponse));
                businessGoalListResponse.forEach((bgData: BusinessGoalTableType) => {
                    if(bgData.nodeId === businessGoalSelected.nodeId) {
                        setBusinessGoalSelected(bgData);
                    }
                })
            })
            .catch((error: any) => {
                console.log(error);
            });

        MeetingService.innovationGetAllPPGMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((meetingsListResponse: MeetingInterface[]) => {
                setMainPageLoading(false);
                if (meetingsListResponse.length != 0) {
                    let currentMeetingIndex = getUpcomingMeetingIndex(meetingsListResponse);
                    if (-1 === currentMeetingIndex) {
                        setIsAnyUpcomingMeetingAvailable(false);
                        setCurrentMeeting(defaultMeetingValueInitializer);
                        setSelectedDate("");
                    } else {
                        setIsAnyUpcomingMeetingAvailable(true);
                        setCurrentMeeting(handleOrderChange(meetingsListResponse[currentMeetingIndex]));
                        setHoldTopicList(meetingsListResponse[currentMeetingIndex].discussionTopics);//set list of discussion topics of that upcoming PPG meeting name
                        setMeetingStartTime(meetingsListResponse[currentMeetingIndex].fromTime);
                        setMeetingEndTime(meetingsListResponse[currentMeetingIndex].toTime);
                        if("" === selectedDate) {
                            setSelectedDate(meetingsListResponse[currentMeetingIndex].date)
                        }
                    }
                    setMeetingsList(meetingsListResponse);
                    let lMeetingDateList: string[] = [];
                    meetingsListResponse.forEach((meetingdata: MeetingInterface) => {
                        lMeetingDateList.push(meetingdata.date);
                    })
                    if(-1 !== currentMeetingIndex)
                        setMeetingDateList(lMeetingDateList);
                    else
                        setMeetingDateList([...lMeetingDateList].reverse());
                } else {
                    setCurrentMeeting(defaultMeetingValueInitializer);
                    setSelectedDate("");
                    setMeetingDateList([]);
                    setMeetingsList([]);
                }
            })
            .catch((error: any) => {
                console.log(error);
                setMainPageLoading(false);
            });
    }, [lInnovationData, lNodeEventData.PPGUpdated, lNodeEventData.businessGoalsUpdated]);

    useEffect(() => {
        meetingsList.forEach((meeting: MeetingInterface) => {
            if (meeting.date === selectedDate) {
                setCurrentMeeting(meeting);
            }
        })
    }, [selectedDate, meetingsList]);

    useEffect(() => {
        let lcurrentDate = new Date(getTimeAndDate()[0]);
        let lselectedDate = new Date(selectedDate);
        if (lcurrentDate > lselectedDate) {
            if (isOldMeetingEditable) {
                setIsCurrentMeetingEditablebyUser(true);
            } else {
                setIsCurrentMeetingEditablebyUser(false);
            }
        } else {//this props can be set to true if date selected by user is today or future day
            setIsCurrentMeetingEditablebyUser(true);
        }
    }, [selectedDate, lInnovationData.userPermission.meetingModel.isOldMeetingEditable])

    useEffect(() => {
        setMeetingStartTime(currentMeeting.fromTime);
        setMeetingEndTime(currentMeeting.toTime);
        setHoldTopicList(currentMeeting.discussionTopics);
        if ("" !== currentMeeting.meetingName) {
            UserService.isUserPresenter(lInnovationData.eskoAccountDetail.repoid, currentMeeting.meetingName, currentMeeting.meetingType, lInnovationData.currentUserInfo.email)
                .then((response: any) => {
                    setIsUserPresenter(response);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [currentMeeting]);

    useEffect(() => {
        setDiscussionTopicList(undefined === currentMeeting ? [] : currentMeeting.discussionTopics);
        tableComponentsBuilder();
    }, [meetingsList, currentMeeting, businessGoalList, usersListWithName, refreshTable, isUserPresenter]);


    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersListWithName(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID, refreshTable]);

    const dateSelectorData: DateSelectorModel = {
        displayDateSelector: true,
        meetingDateList: meetingDateList,
        setSelectedDate: setSelectedDate,
        selectedDate: selectedDate,
        openFilterMenu: openFilterMenu
    };

    const lMPLViewData = useContext(MPLViewContext);

    /**Function to modify the search response of business goal notes based on the operation performed */
    const handleBGNotesChange = (inNotesList: NoteInterface[]) => {
        if ("ADD" === lBusinessNoteOperation) {
            if (lMPLViewData.totalBusinessNotes === inNotesList.length) {
                /**To set the current time */
                lModifiedBusinessGoalNote.date = new Date();
                /**Should push the latest notes at the top of the list */
                inNotesList.splice(0, 0, lModifiedBusinessGoalNote);
            }
        }
        lBusinessNoteOperation = "NONE";
        lModifiedBusinessGoalNote = defaultBusinessNoteInitializer();
        lMPLViewData.setTotalBusinessNotes(inNotesList.length);
        return inNotesList;
    };

    const deleteBGNote = (inTextName: string, inTextNoteName: string) => {
        MeetingService.innovationDeleteTextNote(lInnovationData.eskoAccountDetail.repoid, currentMeeting, inTextNoteName)
            .then((deleteBGNoteResponse: ResponseFromServer) => {
                setNotesList(notesList.filter(notes => {
                    return notes.noteName !== inTextNoteName
                }));
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(deleteBGNoteResponse.message);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    const getTextNotes = (inDiscussionTopicId: string) => {
        MeetingService.innovationGetTextNotes(lInnovationData.eskoAccountDetail.repoid, inDiscussionTopicId)
            .then((getResponse: NoteInterface[]) => {
                setNotesList(handleBGNotesChange(getResponse));
                lMPLViewData.setTotalBusinessNotes(getResponse.length);
                setLoadingNotesCircularIcon(false);
            })
            .catch((error: any) => {
                console.log(error);
                setLoadingNotesCircularIcon(false)
            })
    };
    return (
        <ThemeProvider theme={LightTheme}>
            <Grid container>
                <Grid item className={ppgViewStyleClasses.filterMenu}>
                    <FilterSubmenu
                        view="PPG"
                        openFilterMenu={openFilterMenu}
                        setOpenFilterMenu={setOpenFilterMenu}
                        isMeetingsPresent={0 !== meetingsList.length && isAnyUpcomingMeetingAvailable ? true : false}
                    />
                </Grid>
                <Grid item style={{ marginLeft: marginContentView, width: openFilterMenu ? "82vw" : "98vw" }} className={ppgViewStyleClasses.ppgViewGrid}>
                    <Box className={ppgViewStyleClasses.rootBox}>
                        <Grid item className={ppgViewStyleClasses.headerGrid}>
                            <Header
                                currentPageHeading="PPG"
                                addButton={hasAddandEditDiscussionTopicPermission && currentMeeting.meetingName != "" ? addButtonData : undefined}
                                toggleSelectField={toggleSelectFieldData}
                                dateSelector={dateSelectorData}
                            />
                        </Grid>
                        <Grid container className={ppgViewStyleClasses.meetingsGrid} style={{
                            opacity: mainPageLoading ? 0.5 : 1,
                            pointerEvents: mainPageLoading ? "none" : "all"
                        }}>
                            <TableWrapper
                                borderedRow={false}
                                tableHeight={"auto"}
                                zIndexValue={1}
                                onRowClickCallBack={handleRowClick}
                                inputData={tableMeetingData}
                                inputColumn={columnData}
                                isDragDisabled={!hasAddandEditDiscussionTopicPermission}
                                handleTopicDragEvent={handleTopicDragEvent}
                                tableWidth={"100%"}
                                customMessageOnEmpty={0 !== meetingsList.length ? getTableMessage() : NO_MEETING_ADDED_TEXT} />
                            <ActionList
                                meetingName={currentMeeting.meetingName}
                                meetingType="PPG"
                                meetingList={meetingsList}
                                meetingTopicList={currentMeeting.discussionTopics}
                                openActionIdList={currentMeeting.openActionsFromOlderMeetings}
                                businessGoalList={businessGoalList} />
                        </Grid>
                        <BusinessGoalComponent
                            openAddDialog={openAddDialog}
                            closeBGObjectView={openTextObjectView}
                            setOpenAddDialog={setOpenAddDialog}
                            lastBusinessGoal={businessGoalList[businessGoalList.length - 1]}
                            businessGoalSelected={businessGoalSelected}
                            openObjectView={openBGObjectView}
                            setOpenObjectView={setOpenBGObjectView}
                            listOfBusinessGoals={meetingBusinessGoalList}
                            setBusinessGoalSelected={setBusinessGoalSelected}
                            showCreateActionButton={true}
                            onCreateActionButtonClick={handleCreateActionButtonClick} />

                        <ObjectViewComponent
                            openObjectView={openTextObjectView}
                            closeObjectView={closeObjectView}
                            textData={textSelected}
                            saveNotes={saveNotes}
                            updateNoteView={updateNoteView}
                            notesList={notesList}
                            setNotesList={setNotesList}
                            loadingNotesCircularIcon={loadingNotesCircularIcon}
                            handleDeleteBGNote={deleteBGNote}
                            showNotes={showNotes}
                            isEditable={true}
                            showCreateActionButton={true}
                            onCreateActionButtonClick={handleCreateActionButtonClick}
                        />
                    </Box>
                </Grid>
                <AddTopicToMeetingDialog
                    meetingTopicData={meetingTopicData}
                    setMeetingTopicData={setMeetingTopicData}
                    defaultMeetingTopicData={defaultMeetingTopicData}
                    openAddMeetingDialog={openAddTopicToMeetingDialog}
                    setOpenAddMeetingDialog={setOpenAddTopicToMeetingDialog}
                    existingTopicList={holdTopicList}
                    currentOperation={currentOperation}
                    meetingName={currentMeeting.meetingName}
                    meetingUpdateCallback={handleAddTopicSubmit}
                    meetingStartTime={meetingStartTime}
                    meetingEndTime={meetingEndTime}
                    currentMeeting={currentMeeting}
                    inMeetingDataType={currentMeeting.meetingType}
                />
                {/** Action Point Dialog to be displayed */}
                <ActionPointDialog
                    actionData={actionData}
                    currentOperation={ADD}
                    defaultActionData={defaultActionInitializer(currentMeeting.meetingName)}
                    businessGoalList={businessGoalList}
                    meetingTopicList={currentMeeting.discussionTopics}
                    openActionPointDialog={openActionPointDialog}
                    setOpenActionPointDialog={setOpenActionPointDialog}
                    setActionData={setActionData}
                    actionUpdateCallback={handleAddAction}
                />
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
                {mainPageLoading && <LoadingIcon />}
            </Grid>
        </ThemeProvider>
    )
}
