/**TSX context definition for the Meetings view */

import { createContext } from "react";
import { MeetingInterface } from "../interfaces/InnovationInterface";
import { defaultMeetingValueInitializer } from "../utils/MeetingUtils";

/**Total meeting count */
const totalMeetingsCount: number = 0;
const setTotalMeetingsCount = (inValue: number) => {
    console.log(inValue);
};

/**Operation performed */
const meetingOperationPerformed: string = "";
const setMeetingOperationPerformed = (inValue: string) => {
    console.log(inValue);
};

/**Meeting modified/created/deleted */
const modifiedMeeting: MeetingInterface = defaultMeetingValueInitializer();
const setModifiedMeeting = (inValue: MeetingInterface) => {
    console.log(inValue);
};

/**Handle Meeting data modification */
const handleMeetingsDataModification = (inMeetingsList: MeetingInterface[]) => {
    console.log(inMeetingsList);
    return inMeetingsList;
};

/**Defined context with place holder */
export const MeetingViewContext = createContext({
    "totalMeetingsCount": totalMeetingsCount,
    "setTotalMeetingsCount": setTotalMeetingsCount,
    "meetingOperationPerformed": meetingOperationPerformed,
    "setMeetingOperationPerformed": setMeetingOperationPerformed,
    "modifiedMeeting": modifiedMeeting,
    "setModifiedMeeting": setModifiedMeeting,
    "handleMeetingDataModification": handleMeetingsDataModification
});