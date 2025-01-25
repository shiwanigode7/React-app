/**TSX File to display the meetings list */
import { Chip, IconButton, makeStyles, TextField, Tooltip } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { MEETING_LIST_EMPTY, MEETING_THEADING_DATE, MEETING_THEADING_MEETINGTYPE, MEETING_THEADING_TIME, MEETING_THEADING_TOPICS, SAME_MEETING_WARNING_TEXT, TIME_ERROR_MESSAGE_TEXT, TIME_PICKER_FORMAT, TIME_PICKER_MINUTES_STEP, TOPIC_DURATION_EXCEEDED_TEXT, TO_TEXT } from "../../constant/MeetingViewTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { BusinessGoalWithIdType, MeetingInterface, MeetingTopicInterface } from "../../interfaces/InnovationInterface";
import { CollapsibleTable, CollapsibleTableHeadInterface } from "./CollapsibleTable";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { checkDateValidity, checkForMeetingSimilarity, checkMeetingValidity, getTimeAndDate, parseSingleDigit, validateMeetingDuration } from "../../utils/MeetingUtils";
import { MeetingListViewStyles } from "../../themes/MeetingsTheme";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { DiscussionTopics } from "../../components/MeetingsComponent/DiscussionTopics";
import SearchService from "../../services/SearchService";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "../../components/CSS/TimePicker.css";
import moment from "moment";
import { MeetingViewContext } from "../../context/MeetingViewContext";
import { MEETING_OPERATIONS } from "../../constant/InnovationEnums";
import MeetingService from "../../services/service/MeetingService";


/**Defining all the props used in the table component.*/
/**Meeting type drop down props. */
declare interface MeetingTypeProps {
    inMeetingName: string;
    inSelectedValue: string;
    isMeetingOver: boolean;
}

/**Meeting date (text field date) component props  */
declare interface MeetingDateProps {
    inMeetingName: string;
    inDateValue: string;
    isMeetingOver: boolean;
    isMeetingDuplicate: boolean;
    inMeetingType: string;
}

/**Meeting duration component props to display the meeting timings */
declare interface MeetingDurationProps {
    inMeetingName: string;
    inStartTime: string;
    inEndTime: string;
    isMeetingOver: boolean;
    isTopicDurationWithinRange: boolean;
    inMeetingType: string;
}

/**Meeting chip props, for the collapsed view */
declare interface MeetingTopicChipProps {
    inMeetingName: string;
    inTopicData: MeetingTopicInterface[];
    isMeetingOver: boolean;
    meetingStartTime: string;
    meetingEndTime: string;
    inMeetingType: string;
}

/**Props for the delete icon component */
declare interface MeetingDeleteIconProps {
    inMeetingData: MeetingInterface;
    isMeetingOver: boolean;
}

/**Style for Time Picker Input Field */
const PickerStyles = makeStyles(() => ({
    root: {
        width: "100px",
    }
}));

/**Interface declaration for the overall Meeting List view component */
declare interface MeetingListViewProps {
    showPastMeeting: boolean;
    addTopicCallBack: (inMeetingName: string, inTopicList: MeetingTopicInterface[], meetingStartTime: string, meetingEndTime: string, inMeetingTypeSelected: string) => void;
    meetingTypeFilter: string;
    triggerRender: boolean;
    meetingUpdateCallback: (inMeetingName: string, inMeetingData: Object, inOperationPerformed: MEETING_OPERATIONS, deletedTopicId?: string) => void;
    meetingDeleteCallback: (inMeetingData: MeetingInterface) => void;
}

export function MeetingListView(inputProps: MeetingListViewProps) {

    /**Importing the styles */
    const MeetingListViewClasses = MeetingListViewStyles();
    /**Get the styles */
    const TimePickerStyleClass = PickerStyles();

    /**Define the context variables */
    const lInnovationData = useContext(InnovationAppContext);
    const lMeetingData = useContext(MeetingViewContext);

    /**State to hold the meetingl list date  */
    const [meetingDataList, setMeetingDataList] = useState<MeetingInterface[]>([]);
    /**state to hold the data passed to the collapsible table component */
    const [tableData, setTableData] = useState<any[]>([]);
    /**State to have the list of Business Goal List with name and nodeId */
    const [businessGoalListWithId, setBusinessGoalListWithId] = useState<BusinessGoalWithIdType[]>([]);

    /**variable to hold the current data and current time to handle the historical data */
    const [currentDate, currentTime] = getTimeAndDate();

    /**Defining the alignment for the table */
    const HALIGNMENT_ON_COLLAPSE: "left" | "right" | "inherit" | "center" | "justify" | undefined = "left";
    const HALIGNMENT_ON_EXPAND: "left" | "right" | "inherit" | "center" | "justify" | undefined = "left";
    const VALIGNMENT_ON_COLLAPSE: string = "top";
    const VALIGNMENT_ON_EXPAND: string = "top";
    const MEETING_TYPE: string = "meetingType"
    /**Table header data to be displayed */
    const tableHeaderData: CollapsibleTableHeadInterface[] = [
        {
            dateKey: "meetingType",
            displayName: MEETING_THEADING_MEETINGTYPE,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "10%"
        },
        {
            dateKey: "date",
            displayName: MEETING_THEADING_DATE,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "15%"
        },
        {
            dateKey: "duration",
            displayName: MEETING_THEADING_TIME,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "20%"
        },
        {
            dateKey: "discussionTopics",
            displayName: MEETING_THEADING_TOPICS,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "45%"
        },
        {
            dateKey: "delete",
            displayName: "",
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "5%"
        }
    ];

    /**Get the latest data */
    useEffect(() => {
        MeetingService.innovationGetMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((MeetingListResponse: MeetingInterface[]) => {
                setMeetingDataList(MeetingListResponse);
                /**Gets the list of Business Goal with name and nodeId and saves in a variable */
                SearchService.searchGetBGListWithID(lInnovationData.eskoAccountDetail.repoid)
                    .then((BGListResponse: any) => {
                        setBusinessGoalListWithId(BGListResponse);
                    })
                    .catch((BGListError: any) => {
                        console.log(BGListError);
                    });
            })
            .catch((MeetingListError: any) => {
                /**For the first time while getting the list it will give 400 error due to "ecs_date" is not present */
                if (400 === MeetingListError.status && 0 === lMeetingData.totalMeetingsCount) {
                    SearchService.searchGetBGListWithID(lInnovationData.eskoAccountDetail.repoid)
                        .then((BGListResponse: any) => {
                            setBusinessGoalListWithId(BGListResponse);
                        })
                        .catch((BGListError: any) => {
                            console.log(BGListError);
                        });
                }
                setMeetingDataList([]);
            });
    }, [lInnovationData.eskoAccountDetail, inputProps.triggerRender]);

    /**Pass the data to the context that handles data manipulation to handle three second from search */
    useEffect(() => {
        const tempMeetingList: MeetingInterface[] = lMeetingData.handleMeetingDataModification(meetingDataList);
        lMeetingData.setTotalMeetingsCount(tempMeetingList.length);
        convertToTableData(tempMeetingList);
    }, [businessGoalListWithId, inputProps.showPastMeeting, inputProps.meetingTypeFilter]);

    /**Function to get the name of the business goal based on the node id */
    const getBusinessGoalNameFromId = (inBusinessGoalIdList: BusinessGoalWithIdType[], inBusinessGoalId: string) => {
        let outBusinessGoalName: string = "";
        for (let businessGoal of inBusinessGoalIdList) {
            if (businessGoal.nodeId === inBusinessGoalId) {
                outBusinessGoalName = businessGoal.businessGoalName;
                break;
            }
        }
        return outBusinessGoalName;
    };

    /**Defining the component to be passed to the collapsible table */
    /**Meeting type component */
    function MeetingTypeComponent(meetingTypeProps: MeetingTypeProps) {

        return (
            <TextField
                variant="outlined"
                defaultValue={meetingTypeProps.inSelectedValue}
                type={"text"}
                disabled={meetingTypeProps.isMeetingOver}
                InputProps={{
                    classes: {
                        notchedOutline: MeetingListViewClasses.meetingFieldNotchedOutline,
                        root: MeetingListViewClasses.meetingFieldOutlineRoot
                    }
                }}
                inputProps={{
                    className: MeetingListViewClasses.meetingTypeTextFieldOutlined,
                    readOnly: true,
                }}
            />
        );
    }

    /**Meeting date component */
    function MeetingDateComponent(meetingDateProps: MeetingDateProps) {
        const [lMeetingDate, setLMeetingDate] = useState<string>(meetingDateProps.inDateValue);

        const handleMeetingDateChange = (dateChangeEvent: any) => {
            if ("" !== dateChangeEvent.target.value.trim() &&
                meetingDateProps.inDateValue !== dateChangeEvent.target.value.trim()) {
                setLMeetingDate(dateChangeEvent.target.value.trim());
            }
        };

        const duplicateMeetingErrorLabel = meetingDateProps.isMeetingDuplicate ?
            <p className={MeetingListViewClasses.warningMessageText}>{SAME_MEETING_WARNING_TEXT}</p> :
            null;

        /**Use effect to wait for two seconds for the changes to stop
         * this done to avoid onChange callback sending the update
         * request even when user is changing month.
        */
        useEffect(() => {
            /**Get the timeout id buy using setting the time and instruction to be executed */
            const timeOutId = setTimeout(() => {
                if (checkDateValidity(lMeetingDate) && lMeetingDate !== meetingDateProps.inDateValue) {
                    /**Call the function to update the date of meeting */
                    const outMeetingData = {
                        date: lMeetingDate.trim(),
                        meetingType: meetingDateProps.inMeetingType
                    };
                    inputProps.meetingUpdateCallback(meetingDateProps.inMeetingName, outMeetingData, MEETING_OPERATIONS.UPDATE_DATE);
                } else {
                    setLMeetingDate(meetingDateProps.inDateValue);
                }
            }, 2000);
            return (() => {
                clearTimeout(timeOutId);
            });
        }, [lMeetingDate]);

        return (
            <div>
                <TextField
                    variant="outlined"
                    value={lMeetingDate}
                    type={"date"}
                    onChange={handleMeetingDateChange}
                    disabled={meetingDateProps.isMeetingOver}
                    InputProps={{
                        classes: {
                            notchedOutline: MeetingListViewClasses.meetingFieldNotchedOutline,
                            root: MeetingListViewClasses.meetingFieldOutlineRoot
                        }
                    }}
                    inputProps={{
                        className: MeetingListViewClasses.meetingTextFieldOutlined,
                        min: currentDate
                    }}
                />
                {duplicateMeetingErrorLabel}
            </div>
        );
    }

    /**Meeting Duration Component */
    function MeetingDurationComponent(meetingDurationProps: MeetingDurationProps) {
        /**Hold the meeting details */
        const [lStartTime, setLStartTime] = useState<string>(meetingDurationProps.inStartTime);
        const [lEndTime, setLEndTime] = useState<string>(meetingDurationProps.inEndTime);
        /**Field name for the time duration */
        const FROM_TIME_FIELD: string = "fromTime";
        const TO_TIME_FIELD: string = "toTime";
        const parseTime = (inString: string) => {
            return parseSingleDigit(Number(inString.split(":")[0])) + ":" + parseSingleDigit(Number(inString.split(":")[1]));
        }
        /**Calling the update function */
        const handleTimeUpdate = (inTime: string, inParameter: string, inPrevValue: string, inOperationDone: MEETING_OPERATIONS) => {
            if (inTime !== inPrevValue) {
                /**to update the end time if the start time is after the end time */
                if (parseTime(inTime.trim()) > parseTime(lEndTime.trim()) && FROM_TIME_FIELD === inParameter) {
                    inputProps.meetingUpdateCallback(meetingDurationProps.inMeetingName,
                        { [TO_TIME_FIELD]: parseTime(inTime.trim()), [FROM_TIME_FIELD]: parseTime(inTime.trim()), [MEETING_TYPE]: meetingDurationProps.inMeetingType },
                        MEETING_OPERATIONS.UPDATE_DURATION
                    );
                } else {
                    inputProps.meetingUpdateCallback(meetingDurationProps.inMeetingName,
                        { [inParameter]: parseTime(inTime.trim()), [MEETING_TYPE]: meetingDurationProps.inMeetingType },
                        inOperationDone);
                }
            }
        };
        /**Call back function to validate the change made and to call the API function */
        const handleStartTimeChange = (inTime: any) => {
            setLStartTime(parseSingleDigit(inTime.format("HH")) + ":" + parseSingleDigit(inTime.format("m")));
        };
        const handleEndTimeChange = (inTime: any) => {
            const lEndTimeValue = parseSingleDigit(inTime.format("HH")) + ":" + parseSingleDigit(inTime.format("m"));
            setLEndTime(lStartTime < lEndTimeValue ? lEndTimeValue : meetingDurationProps.inEndTime);
        };

        /**Handle time picker onClose Events */
        const handleStartTimePickerClose = () => {
            handleTimeUpdate(lStartTime,
                FROM_TIME_FIELD,
                meetingDurationProps.inStartTime,
                MEETING_OPERATIONS.UPDATE_START_TIME
            )
        };
        const handleEndTimePickerClose = () => {
            handleTimeUpdate(
                lEndTime,
                TO_TIME_FIELD,
                meetingDurationProps.inEndTime,
                MEETING_OPERATIONS.UPDATE_END_TIME
            )
        };

        /**Error labels */
        const timeErrorLabel = (meetingDurationProps.inStartTime === meetingDurationProps.inEndTime) && (!meetingDurationProps.isMeetingOver) ?
            <p className={MeetingListViewClasses.warningMessageText}>{TIME_ERROR_MESSAGE_TEXT}</p> :
            null;
        const topicDurationRangeErrorLabel = meetingDurationProps.isTopicDurationWithinRange ?
            null :
            <p className={MeetingListViewClasses.warningMessageText}>{TOPIC_DURATION_EXCEEDED_TEXT}</p>;
        return (
            <div>
                {/**Div for the drop down */}
                <div className={MeetingListViewClasses.meetingDurationParentDiv}>
                    <TimePicker
                        value={moment(lStartTime, TIME_PICKER_FORMAT)}
                        onChange={handleStartTimeChange}
                        onClose={handleStartTimePickerClose}
                        disabled={meetingDurationProps.isMeetingOver}
                        clearIcon={<div></div>}
                        className={TimePickerStyleClass.root}
                        minuteStep={TIME_PICKER_MINUTES_STEP}
                        showSecond={false}
                        use12Hours
                    />
                    <p
                        className={MeetingListViewClasses.meetingDurationText}
                        // TODO: To make sure condition based styling is handled by makeStyles.
                        style={{
                            opacity: meetingDurationProps.isMeetingOver ? "0.5" : "1"
                        }}
                    >{TO_TEXT}</p>
                    <TimePicker
                        value={moment(lEndTime, TIME_PICKER_FORMAT)}
                        onChange={handleEndTimeChange}
                        onClose={handleEndTimePickerClose}
                        disabled={meetingDurationProps.isMeetingOver}
                        clearIcon={<div></div>}
                        className={TimePickerStyleClass.root}
                        minuteStep={TIME_PICKER_MINUTES_STEP}
                        showSecond={false}
                        use12Hours
                    />
                </div>
                {timeErrorLabel}
                {topicDurationRangeErrorLabel}
            </div>
        );
    }

    /**Meeting topic chip component */
    function MeetingTopicChipComponent(meetingTopicChipProps: MeetingTopicChipProps) {

        /**Function to handle topic delete event */
        const handleTopicDelete = (inTopicIndex: number) => {
            /**Removing the deleted topic */
            const tempTopicList = [...meetingTopicChipProps.inTopicData];
            let deletedTopicId: string = tempTopicList[inTopicIndex].discussionTopicId;
            tempTopicList.splice(inTopicIndex, 1);
            /**Callback function to delete the topic added */
            const outMeetingData: Object = {
                discussionTopics: tempTopicList,
                meetingType: meetingTopicChipProps.inMeetingType
            };
            inputProps.meetingUpdateCallback(meetingTopicChipProps.inMeetingName, outMeetingData, MEETING_OPERATIONS.UPDATE_TOPICS, deletedTopicId);
            lMeetingData.setMeetingOperationPerformed(MEETING_OPERATIONS.UPDATE_TOPICS);
        };
        /**Function to handle the add event */
        const handleTopicAdd = () => {
            /**Callback function to open the add dialog */
            inputProps.addTopicCallBack(meetingTopicChipProps.inMeetingName, meetingTopicChipProps.inTopicData, meetingTopicChipProps.meetingStartTime, meetingTopicChipProps.meetingEndTime, meetingTopicChipProps.inMeetingType);
        };

        return (
            <div
                className={MeetingListViewClasses.meetingTopicParentDiv}
                style={{
                    cursor: meetingTopicChipProps.isMeetingOver ? "not-allowed" : ""
                }}
            >
                {
                    meetingTopicChipProps.inTopicData.map((topic: MeetingTopicInterface, indexValue: number) => {
                        const lTopic: string = ("text" === topic.topicType.toLowerCase()) ?
                            topic.topic : getBusinessGoalNameFromId(businessGoalListWithId, topic.topic);
                        return (
                            "" !== lTopic &&
                            <Tooltip
                                title={lTopic}
                                placement="right-start"
                                arrow
                            >
                                <Chip
                                    label={lTopic}
                                    onDelete={
                                        !meetingTopicChipProps.isMeetingOver ?
                                            () => { handleTopicDelete(indexValue) } :
                                            undefined
                                    }
                                    disabled={meetingTopicChipProps.isMeetingOver}
                                    classes={{
                                        root: MeetingListViewClasses.meetingTopicChipRoot,
                                        label: MeetingListViewClasses.meetingTopicChipLabel,
                                        deleteIcon: MeetingListViewClasses.meetingTopicChipDeleteIcon
                                    }}
                                />
                            </Tooltip>
                        )
                    })
                }
                <Tooltip title="Add Topic" placement="right" arrow>
                    <IconButton
                        onClick={handleTopicAdd}
                        className={MeetingListViewClasses.meetingTopicIconButton}
                        style={{
                            display: meetingTopicChipProps.isMeetingOver ? "none" : ""
                        }}
                    >
                        <AddRoundedIcon
                            classes={{
                                root: MeetingListViewClasses.meetingTopicAddIcon
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }

    /**Component to display the Delete Icon */
    function DeleteIconComponent(deleteIconProps: MeetingDeleteIconProps) {
        const handleDeleteClick = () => {
            /**Call the function to delete the meeting data */
            inputProps.meetingDeleteCallback(deleteIconProps.inMeetingData);
        };
        return (
            <Tooltip title="Delete Meeting" placement="left" arrow>
                <IconButton
                    onClick={handleDeleteClick}
                    disabled={deleteIconProps.isMeetingOver}
                    className={MeetingListViewClasses.meetingTopicIconButton}
                >
                    {
                        !deleteIconProps.isMeetingOver ? <DeleteForeverRoundedIcon className={MeetingListViewClasses.meetingTableDeleteIcon} /> : null
                    }
                </IconButton>
            </Tooltip>
        );
    }

    /**Manipulate data so that it can be passed to the collapsible table */
    function convertToTableData(inMeetingData: MeetingInterface[]) {
        /**Variable to hold the table data passed to the collapsible component */
        const lTempTableData: any[] = [];

        inMeetingData.forEach((meetingData: MeetingInterface) => {
            /**Hold the modified meeting data with components */
            let tempTableRowData: any = {};
            /**check if the meeting is valid */
            const isMeetingOver: boolean = checkMeetingValidity(meetingData.date, meetingData.toTime, currentDate, currentTime);
            /**Check if the topic duration exceeds the meeting duration. If the meeting is already over, no need check the meeting duration range */
            const isTopicDurationWithinRange: boolean = !isMeetingOver ?
                validateMeetingDuration(meetingData.fromTime, meetingData.toTime, meetingData.discussionTopics, 0) :
                true;
            const isMeetingDuplicate: boolean = !isMeetingOver ?
                checkForMeetingSimilarity(inMeetingData, meetingData) :
                false;

            /**Set the meeting type to be assigned */
            const lMeetingTypeComponent = <MeetingTypeComponent
                inMeetingName={meetingData.meetingName}
                inSelectedValue={meetingData.meetingType}
                isMeetingOver={isMeetingOver}
            />;
            tempTableRowData["meetingType"] = {
                "collapsed": lMeetingTypeComponent,
                "expanded": lMeetingTypeComponent
            };
            /**Set the date component */
            const lMeetingDateComponent = <MeetingDateComponent
                inMeetingName={meetingData.meetingName}
                inDateValue={meetingData.date}
                isMeetingOver={isMeetingOver}
                isMeetingDuplicate={isMeetingDuplicate}
                inMeetingType={meetingData.meetingType}
            />;
            tempTableRowData["date"] = {
                "collapsed": lMeetingDateComponent,
                "expanded": lMeetingDateComponent
            };
            /**Set the from and to time components */
            const lDurationComponent = <MeetingDurationComponent
                inMeetingName={meetingData.meetingName}
                inStartTime={meetingData.fromTime}
                inEndTime={meetingData.toTime}
                isMeetingOver={isMeetingOver}
                isTopicDurationWithinRange={isTopicDurationWithinRange}
                inMeetingType={meetingData.meetingType}
            />;
            tempTableRowData["duration"] = {
                "collapsed": lDurationComponent,
                "expanded": lDurationComponent
            };
            /**Set the topic chip component component */
            tempTableRowData["discussionTopics"] = {
                "collapsed": <MeetingTopicChipComponent
                    inMeetingName={meetingData.meetingName}
                    inTopicData={meetingData.discussionTopics}
                    isMeetingOver={isMeetingOver}
                    meetingStartTime={meetingData.fromTime}
                    meetingEndTime={meetingData.toTime}
                    inMeetingType={meetingData.meetingType}
                />,
                "expanded": <DiscussionTopics
                    inMeetingName={meetingData.meetingName}
                    inTopicData={meetingData.discussionTopics}
                    isMeetingOver={isMeetingOver}
                    businessGoalListWithId={businessGoalListWithId}
                    addTopicCallBack={inputProps.addTopicCallBack}
                    meetingUpdateCallback={inputProps.meetingUpdateCallback}
                    meetingStartTime={meetingData.fromTime}
                    meetingEndTime={meetingData.toTime}
                    meetingType={meetingData.meetingType}
                />
            };
            /**Set the delete icon component*/
            const lDeleteComponent = <DeleteIconComponent
                inMeetingData={meetingData}
                isMeetingOver={isMeetingOver}
            />;
            tempTableRowData["delete"] = {
                "collapsed": lDeleteComponent,
                "expanded": lDeleteComponent
            };

            /**Using the name as an id to track which row was expanded/collapsed */
            tempTableRowData["id"] = meetingData.meetingName;

            /**Pushing the modified row to the table */
            if (inputProps.showPastMeeting || !isMeetingOver) {
                if ("ALL" === inputProps.meetingTypeFilter || inputProps.meetingTypeFilter === meetingData.meetingType) {
                    lTempTableData.push(tempTableRowData);
                }
            }
        });
        setTableData(lTempTableData);
    }

    return (
        <CollapsibleTable
            tableData={tableData}
            tableHeaderData={tableHeaderData}
            tableBordered={true}
            tableMaxHeight={"85vh"}
            tableWidth={"96%"}
            tableEmptyMessage={MEETING_LIST_EMPTY}
        />
    );
}

