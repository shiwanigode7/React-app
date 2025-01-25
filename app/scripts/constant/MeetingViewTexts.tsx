import { MeetingTypeDropDownInterface } from "../components/MeetingsComponent/AddMeetingDialog";
import { BGMeetingTypeDropDownInterface } from "../components/MeetingsComponent/AddTopicToMeetingDialog";
import { MeetingViewDropDownInterface, TopicTypeDropDownInterface } from "../interfaces/InnovationInterface";

export const ADD_MEETING_TEXT: string = "Add Meeting";
export const MEETING_DATE_TEXT: string = "Meeting Date";
export const TIME_TEXT: string = "Time";
export const TIME_ERROR_MESSAGE_TEXT: string = "Meeting end time should be after start time";
export const TOPIC_DURATION_EXCEEDED_TEXT: string = "Topic duration exceeds the allocated time";
export const INVALID_DATE_TEXT: string = "Invalid Date";
export const SAME_MEETING_WARNING_TEXT: string = "Duplicate Meeting.";
export const TYPE_TEXT: string = "Type";
export const CANCEL_TEXT: string = "Cancel";
export const ADD_TEXT: string = "Add";
export const UPDATE_TEXT: string = "Update";
export const EDIT: string = "Edit";
export const ADD: string = "Add";
export const EDIT_DISCUSSION_TOPIC: string = "Edit Meeting Topic";
export const NO_PERMISSION_TO_ADD_DT: string = "No permission to Add Slides";
export const ADD_PRESENTATION: string = "Add Slides";
export const ADD_TOPIC_OR_BG_TEXT: string = "Add Topic to Meeting";
export const TO_TEXT: string = "to";
export const PRESENTER_TEXT: string = "Presenter";
export const TOPIC_TYPE_TEXT: string = "Topic Type";
export const TOPIC_TEXT: string = "Topic";
export const BUSINESS_GOAL_TEXT: string = "Business Goal";
export const DURATION_TEXT: string = "Duration";
export const MEETINGS_TEXT: string = "Meetings";
export const MEETING_MINUTE_TEXT: string = "mins";
export const TOPIC_PLACEHOLDER_TEXT: string = "Enter Topic";
export const TIME_PICKER_MINUTES_STEP: number = 5;
export const EDIT_PAST_MEETING_TEXT: string = "You cannot edit meetings from past";
export const NO_UPCOMING_MEETING_SCHEDULED_TEXT: string = "There are no Upcoming Meetings Scheduled"
export const NO_DISCUSSION_TOPICS_TEXT: string = "No Discussion Topics added yet";
export const NO_MEETING_ADDED_TEXT: string = "No Meetings added yet"
/**Drop down field fields for Business Goal Meeting type */
export const BG_MEETING_TYPE_DROP_DOWN_FIELDS: BGMeetingTypeDropDownInterface[] = [
    {
        value: "Intro"
    },
    {
        value: "Update"
    },
    {
        value: "Demo"
    },
];

/**Drop down field fields for Topic type */
export const TOPIC_TYPE_DROP_DOWN_FIELDS: TopicTypeDropDownInterface[] = [
    {
        value: "Text",
    },
    {
        value: "Business Goal",
    }
];

/**Drop down field for Meeting Types */
export const MEETING_TYPE_DROP_DOWN_FIELDS: MeetingTypeDropDownInterface[] = [
    {
        value: "SIR",
    },
    {
        value: "PPG",
    }
];

/**Meeting list view table heading */
export const MEETING_THEADING_MEETINGTYPE: string = "Type";
export const MEETING_THEADING_DATE: string = "Date";
export const MEETING_THEADING_TIME: string = "Time";
export const MEETING_THEADING_TOPICS: string = "Discussion Topics";

/**Meeting List View Messages */
export const MEETING_LIST_EMPTY: string = "No Meetings Scheduled";

/**Meeting filter  */
export const MEETING_SHOW_PAST_DATA: string = "Show Past Meetings";
export const MEETING_FILTER_DROP_DOWN: MeetingViewDropDownInterface[] = [
    {
        dataKey: "ALL",
        displayName: "Show SIR and PPG",
    },
    {
        dataKey: "SIR",
        displayName: "SIR",
    },
    {
        dataKey: "PPG",
        displayName: "PPG",
    },
];

/**Delete confirmation dialog related text */
export const DELETE_DIALOG_TITLE_TEXT = "Delete Meeting";
export const DELETE_DIALOG_BUTTON_TEXT = "Delete";

/**
 * Delete confirmation dialog text. 
 * @param inMeetingType - The type of the meeting
 * @param inMeetingDate - The date when meeting takes place
 * @param inMeetingStartTime - The meeting start time 
 * @param inMeetingEndTime - the meeting end time
 * @returns 
 */
export const meetingDeleteConfirmationText = (inMeetingType: string, inMeetingDate: string, inMeetingStartTime: string, inMeetingEndTime: string) => {
    return `Do you wish to delete the 
    ${inMeetingType} meeting scheduled on
    ${inMeetingDate} from ${inMeetingStartTime} to 
    ${inMeetingEndTime}?`;
};

/**Alert messages to display */
export const ALERT_ADD_SUCCESSFUL: string = "Meeting Details were added successfully.";
export const ALERT_ADD_FAILED: string = "There was an error in the requested Add Operation.";
export const ALERT_UPDATE_SUCCESSFUL: string = "Meeting Details were updated successfully.";
export const ALERT_UPDATE_FAILED: string = "There was an error in the requested Update Operation.";
export const ALERT_DELETE_SUCCESSFUL: string = "Meeting Details were deleted successfully.";
export const ALERT_SLIDE_UPLOAD_FAILED: string = "Error in uploading Slide.";
export const ALERT_SLIDE_UPLOAD_SUCCESS: string = "Slide is uploaded successfully";
export const ALERT_SLIDE_ADD_SUCCESS: string = "Slide is added successfully";
export const ALERT_SLIDE_REPLACE_SUCCESS: string = "Current Slide was replaced successfully.";
export const ALERT_SLIDE_DELETE_SUCCESS: string = "Current Slide was deleted successfully.";
export const FILE_NOT_SUPPORTED: string = "File type not supported.";
export const ALERT_DELETE_FAILED: string = "There was an error in the requested Delete Operation.";
export const ALERT_ADD__TOPIC_SUCCESSFUL: string = "Topic was added successfully to the meeting.";
export const ALERT_ADD__TOPIC__FAILED: string = "There was an error in the requested adding topic to the meeting.";
export const ORDER_CHANGE_PRMISSION_TOOLTIP: string = "No permission to change the order of the Discussion Topic";


export const TIME_PICKER_FORMAT: string = "h:mm a";