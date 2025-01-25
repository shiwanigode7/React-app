/**TSX files listing all the util function used for the operation performed in meetings view */

import { ActionTopicInterface } from "../components/ActionComponents/ActionList";
import { ACTIONS_STATUS, MEETING_TOPIC_TYPE } from "../constant/InnovationEnums";
import { ActionInterface, BusinessGoalTableType, MeetingInterface, MeetingTopicInterface } from "../interfaces/InnovationInterface";
import { generateRandomUUID } from "./UUIDGenerator";

/**
 * Function to initialize the meetings data with empty default values on declaring them.
 * @returns - Return Meeting data with default empty value
 */
export function defaultMeetingValueInitializer() {
    const [lCurrentDate, lCurrentTime] = getTimeAndDate();
    const lEndTimeArray = lCurrentTime.split(":");
    const lEndHour = parseSingleDigit((Number(lEndTimeArray[0]) + 1) % 24);
    const lEndTime = `${lEndHour}:${lEndTimeArray[1]}`;
    const defaultMeetingData: MeetingInterface = {
        meetingName: "",
        meetingType: "PPG",
        date: lCurrentDate,
        fromTime: lCurrentTime,
        toTime: lEndTime,
        discussionTopics: [],
        textSlides: [],
        openActionsFromOlderMeetings: []
    }
    return defaultMeetingData;
}
/**
 * Function to initialize the meetings data with empty values on declaring them.
 * @returns - Return Meeting data with empty value
 */
export function emptyMeetingValueInitializer() {
    const [lCurrentDate, lCurrentTime] = "";
    const lEndTimeArray = "";
    const lEndHour = "";
    const lEndTime = "";
    const defaultMeetingData: MeetingInterface = {
        meetingName: "",
        meetingType: "",
        date: "",
        fromTime: lCurrentTime,
        toTime: lEndTime,
        discussionTopics: [],
        textSlides: [],
        openActionsFromOlderMeetings: []
    }
    return defaultMeetingData;
}
/**
 * Function to initialize the meeting topic with empty values.
 * @returns - Return meeting topic with default values
 */
export function defaultMeetingTopicInitializer() {
    const defaultMeetingTopic: MeetingTopicInterface = {
        topic: "",
        presenter: "",
        topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL.trim(),
        topicDuration: 15,
        typeOfTopic: "Update",
        discussionTopicId: generateRandomUUID(),
        slideId: ""
    }
    return defaultMeetingTopic;
}

/**
 * Function to initialize the action with empty values.
 * @returns - Return action with default values
 */
export function defaultActionInitializer(inMeetingName: string, inDiscussionTopicId?: string) {
    const defaultAction: ActionInterface = {
        actionName: "",
        nodeId: "",
        discussionTopicId: inDiscussionTopicId ? inDiscussionTopicId : "",
        owner: "",
        meetingName: inMeetingName,
        comment: "",
        text: "",
        dueDate: "",
        status: ACTIONS_STATUS.PENDING
    }
    return defaultAction;
}

export function defaultActionTopicInitializer() {
    const defaultActionTopic: ActionTopicInterface = {
        discussionTopicId: "",
        topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL.trim(),
        topic: "",
        businessGoalName: ""
    };
    return defaultActionTopic;
}

export function getBusinessGoalsInMeetingTopics(inBusinessGoalList: BusinessGoalTableType[],
    inMeetingTopics: MeetingTopicInterface[]) {
    let lBusinessGoalTopicList: ActionTopicInterface[] = [];
    inMeetingTopics.forEach((discussionTopic: MeetingTopicInterface) => {
        if (MEETING_TOPIC_TYPE.BUSINESS_GOAL === discussionTopic.topicType) {
            let lBusinessGoal = inBusinessGoalList.find((lBG: BusinessGoalTableType) =>
                discussionTopic.topic === lBG.nodeId);
            if (lBusinessGoal) {
                let lBusinessGoalTopic: ActionTopicInterface = {
                    discussionTopicId: discussionTopic.discussionTopicId,
                    topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL,
                    topic: discussionTopic.topic,
                    businessGoalName: lBusinessGoal.businessGoalName,
                };
                lBusinessGoalTopicList.push(lBusinessGoalTopic);
            }
        }
    });
    return lBusinessGoalTopicList;
}

export function getTextTopicsFromMeetingTopics(inMeetingTopics: MeetingTopicInterface[]) {
    let lTextTopicList: ActionTopicInterface[] = [];
    inMeetingTopics.forEach((discussionTopic: MeetingTopicInterface) => {
        if (MEETING_TOPIC_TYPE.TEXT === discussionTopic.topicType) {
            let lTextTopic: ActionTopicInterface = {
                discussionTopicId: discussionTopic.discussionTopicId,
                topicType: MEETING_TOPIC_TYPE.TEXT,
                topic: discussionTopic.topic
            };
            lTextTopicList.push(lTextTopic);
        }
    });
    return lTextTopicList;
}

/**
 * Function to update the meeting data with a default value if there is an undefined value
 * in it.
 * @param inMeetingData - The meeting data to be checked for undefined value
 * @returns 
 */
export function meetingUpdateUndefinedValues(inMeetingData: MeetingInterface) {
    const outMeetingData: MeetingInterface = {
        meetingName: undefined !== inMeetingData.meetingName ? inMeetingData.meetingName : "",
        meetingType: undefined !== inMeetingData.meetingType ? inMeetingData.meetingType : "",
        date: undefined !== inMeetingData.date ? inMeetingData.date : "",
        fromTime: undefined !== inMeetingData.fromTime ? inMeetingData.fromTime : "",
        toTime: undefined !== inMeetingData.toTime ? inMeetingData.toTime : "",
        discussionTopics: undefined !== inMeetingData.discussionTopics ? inMeetingData.discussionTopics : [],
        textSlides: undefined !== inMeetingData.textSlides ? inMeetingData.textSlides : [],
        openActionsFromOlderMeetings: undefined !== inMeetingData.openActionsFromOlderMeetings ? inMeetingData.openActionsFromOlderMeetings : []
    };

    return outMeetingData;
}

/**Parse single digit time values ex: 3-30 to 03-30 */
export const parseSingleDigit = (value: number | undefined) => {
    let val = "0" + value?.toString();
    return val.slice(-2);
}

/**
 * Function to get the time in the required format
 * @returns - Return array of [currentDate, currentTime]
 */
export function getTimeAndDate() {
    const date = new Date();
    const year: string = date.getUTCFullYear().toString();
    // utc month starts from 0 to 11
    const month: string = date.getUTCMonth() + 1 < 10 ?
        "0" + (date.getUTCMonth() + 1).toString() :
        (date.getUTCMonth() + 1).toString();
    const day: string = date.getUTCDate() < 10 ?
        "0" + date.getUTCDate().toString() :
        date.getUTCDate().toString();
    const hour: string = date.getUTCHours() < 10 ?
        "0" + date.getUTCHours().toString() :
        date.getUTCHours().toString();
    const minutes: string = date.getUTCMinutes() < 10 ?
        "0" + date.getUTCMinutes().toString() :
        date.getUTCMinutes().toString();
    const lCurrentDate: string = year + "-" + month + "-" + day;
    const lCurrentTime: string = hour + ":" + minutes;
    return [lCurrentDate, lCurrentTime];
}

/**
 * Function to check if the meeting has already occured or not. 
 * @param inMeetingDate - The date of the meeting
 * @param inMeetingTime - The meeting end time
 * @param inCurrentDate - Today's date
 * @param inCurrentTime - Present Time
 * @returns - Boolean value telling if the meeting is over (true) or not (false).
 */
export function checkMeetingValidity(inMeetingDate: string, inMeetingTime: string, inCurrentDate: string, inCurrentTime: string) {
    /**Check if the meeting was in the past */
    const lMeetingDateCheck: boolean = inMeetingDate < inCurrentDate;
    /**Check if the meeting end time has passed if Meeting date and current date is same*/
    /**If meeting date is in the past return true
     * if meeting date is equal to current time check the time and return the status
     * If meeting date is in the future return false
      */
    const isMeetingOver: boolean = lMeetingDateCheck;
    return isMeetingOver;
}

/**
 * To sort the meeting based on the date and time
 * @param inMeetingList - The meeting to be sorted
 */
export function sortMeetingList(inMeetingList: MeetingInterface[]) {
    inMeetingList.sort((lFirstElementValue: MeetingInterface, lSecondElementValue: MeetingInterface) => {
        let lReturnValue: number = 0;
        if (lFirstElementValue.date < lSecondElementValue.date) {
            lReturnValue = -1;
        }
        if (lFirstElementValue.date > lSecondElementValue.date) {
            lReturnValue = 1;
        }
        if (lFirstElementValue.date === lSecondElementValue.date) {
            lReturnValue = 0;
            if (lFirstElementValue.fromTime < lSecondElementValue.fromTime) {
                lReturnValue = -1;
            }
            if (lFirstElementValue.fromTime > lSecondElementValue.fromTime) {
                lReturnValue = 1;
            }
        }
        return lReturnValue;
    });
    return inMeetingList;
}

/**
 * Function to check if the topic duration is within the meeting duration range. 
 * @param inStartTime - The starting time of the meeting
 * @param inEndTime - The ending time of the meeting
 * @param inTopicList - List of all the topics to be discussed
 * @returns - True if the duration of the topics are within the meeting range, otherwise false.
 */
export function validateMeetingDuration(inStartTime: string, inEndTime: string, inTopicList: MeetingTopicInterface[], currentTopicDuration: number) {
    /**Get the total duration of all the topics in meeting */
    let lTotalTopicDuration: number = 0;
    inTopicList.forEach((topic: MeetingTopicInterface) => {
        lTotalTopicDuration = Number(topic.topicDuration) + Number(lTotalTopicDuration);
    });
    const lStartTimeArray: string[] = inStartTime.split(":");
    const lEndTimeArray: string[] = inEndTime.split(":");
    const lStartHour: number = Number(lStartTimeArray[0]);
    const lStartMinute: number = Number(lStartTimeArray[1]);
    const lEndHour: number = Number(lEndTimeArray[0]);
    const lEndMinute: number = Number(lEndTimeArray[1]);
    /**To calculate total minutes from start time to end time -  [60 * (endHour - startHour)] + endMinute - startMinute */
    const lMeetingDuration = (60 * (lEndHour - lStartHour)) + lEndMinute - lStartMinute;
    return lMeetingDuration >= lTotalTopicDuration + currentTopicDuration ? true : false;
}

/**
 * To convert the date in from one format to another.
 * Eg. This function converts date from 2099-12-31 to 31-Dec-2099
 * @param inDate - date string in the format YYYY-MM-DD
 */
export function displayFormattedDate(inDate: string) {
    /**the array will have date as ["year", "month", "day"] */
    const lDateArray: string[] = inDate.split("-");
    const lMonthNameArray: string[] = ["null", "Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${lDateArray[2]}-${lMonthNameArray[Number(lDateArray[1])]}-${lDateArray[0]}`;
}

/**
 * Function to conver the time string passed to 12 hour format
 * @param inTime - Time string in the 24 format HH:MM
 */
export function displayFormattedTime(inTime: string) {
    /**Time will be saved as ["hour":"minute"] */
    const lTimeArray: string[] = inTime.split(":");
    const lMeridiem = Number(lTimeArray[0]) >= 12 ? "pm" : "am";
    const lHour = (Number(lTimeArray[0]) % 12) || 12;
    return `${lHour}:${lTimeArray[1]} ${lMeridiem} `;
}

/**
 * Function to check if the date is valid or not
 * @param inDate - Date to be checked in the format YYYY-MM-DD
 * @returns - True if the date is valid, otherwise false
 */
export function checkDateValidity(inDate: string) {
    /**Date is saved as [currentDate, currentTime] */
    const lHoldDateAndTime = getTimeAndDate();
    const NEXT_MAX_YEAR: number = 20;
    /**Max years is current year + 20  */
    const lMaxYears: number = Number(lHoldDateAndTime[0].split("-")[0]) + NEXT_MAX_YEAR;
    let outIsDateValid: boolean = true;
    if (inDate < lHoldDateAndTime[0]) {
        outIsDateValid = false;
    } else {
        const lYear: string = inDate.split("-")[0];
        outIsDateValid = Number(lYear) <= Number(lMaxYears);
    }
    return outIsDateValid;
}


/**
 * To check if a meeting is same as the previous meeting.
 * Note: The previous meeting is checked for similarity since
 * we get meeting with same date and time next to each other because of search.
 * @param inMeetingList - The List of all the meetings
 * @param inCurrentMeeting - The meeting to be checked
 * @returns - Returns true if the meetings are similar
 */
export function checkForMeetingSimilarity(inMeetingList: MeetingInterface[], inCurrentMeeting: MeetingInterface) {
    let outIsMeetingSimilary: boolean = false;
    /**
     * TODO: To create an alternative function that is more efficient or need handle
     * this case in the backend (similar to the way permissions will be handled(?))
     */
    for (let meetingData of inMeetingList) {
        if (meetingData.date === inCurrentMeeting.date &&
            meetingData.fromTime === inCurrentMeeting.fromTime &&
            meetingData.toTime === inCurrentMeeting.toTime &&
            meetingData.meetingType === inCurrentMeeting.meetingType &&
            meetingData.discussionTopics.length === inCurrentMeeting.discussionTopics.length &&
            meetingData.meetingName !== inCurrentMeeting.meetingName
        ) {
            //Variable to track how many topics a same for both the meetings. This is done to handle event the reorder cases
            let lSimilarity: number = 0;
            //Check all the meeting topic 
            meetingData.discussionTopics.forEach((meetingTopic: MeetingTopicInterface) => {
                inCurrentMeeting.discussionTopics.forEach((currentMeetingTopic: MeetingTopicInterface) => {
                    if (
                        (meetingTopic.topic.toLowerCase().trim() === currentMeetingTopic.topic.toLowerCase().trim()) &&
                        (Number(meetingTopic.topicDuration) === Number(currentMeetingTopic.topicDuration)) &&
                        (meetingTopic.topicType.trim() === currentMeetingTopic.topicType.trim()) &&
                        ((undefined === meetingTopic.typeOfTopic ? "" : meetingTopic.typeOfTopic.trim())
                            === (undefined === currentMeetingTopic.typeOfTopic ? "" : currentMeetingTopic.typeOfTopic.trim()))
                    ) {
                        ++lSimilarity;
                    }
                });
            });
            outIsMeetingSimilary = lSimilarity === meetingData.discussionTopics.length;
        }
    }
    return outIsMeetingSimilary;
}

/**Variable that stores the Month list to show it in date */
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**Funtion to Change the date format from 2022-02-16 to 2 February, 2022 */
export function getDateString(inDate: string) {
    const date = new Date(inDate);
    const dateString: string = date.getUTCDate() + " " + months[date.getUTCMonth()] + ", " + date.getUTCFullYear();
    return dateString
}

/*function to get the index of upcoming meeting */
export const getUpcomingMeetingIndex = (inMeetingListData: MeetingInterface[]) => {
    let currentMeetingDataIndex = 0;
    let currentDate = getTimeAndDate()[0];
    let todaysDate = new Date(currentDate);
    inMeetingListData.forEach((meetingData: MeetingInterface) => {
        let meetingDate = new Date(meetingData.date);
        if (todaysDate <= meetingDate) {
            return;
        }
        currentMeetingDataIndex++;
    });
    if (inMeetingListData.length === currentMeetingDataIndex)
        return -1;//when there are no upcoming meeting
    else
        return currentMeetingDataIndex;
}