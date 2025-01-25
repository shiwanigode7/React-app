/**List of all the enums used in Innovation Application */

export enum InnovationStatus {
    IDEATION = "Ideation",
    SCHEDULED = "Scheduled",
    ACTIVE = "Active",
    COMPLETED = "Completed"
}

/**Meeting Operations performed Enum  */
export enum MEETING_OPERATIONS {
    ADD = "ADD",
    DELETE = "DELETE",
    UPDATE_DATE = "UPDATE_DATE",
    UPDATE_TIME = "UPDATE_TIME",
    UPDATE_START_TIME = "UPDATE_START_TIME",
    UPDATE_END_TIME = "UPDATE_END_TIME",
    UPDATE_TOPICS = "UPDATE_TOPIC",
    UPDATE_MEETING_TYPE = "UPDATE_MEETING_TYPE",
    UPDATE = "UPDATE",
    UPDATE_DURATION = "UPDATE_DURATION",
    NONE = "NONE"
}

export enum MEETING_TOPIC_TYPE {
    TEXT = "Text",
    BUSINESS_GOAL = "Business Goal"
}

export enum ACTIONS_STATUS {
    PENDING = "Pending",
    ON_TRACK = "On Track",
    PAST_DUE = "Past Due",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

export enum HERO_FEATURE_STATUS {
    WAITING_FOR_INPUT = "Waiting for Input",
    ON_TRACK = "On Track",
    BEHIND = "Behind"
}

/** severity values for the snackbar alert*/
export enum ALERT_SEVERITY {
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}

/** Enum to define the list of display mode avaiable */
export enum BUSINESS_GOAL_DISPLAY_MODE {
    SIR_PRESENTATION = "sirPresentation",
    PPG_PRESENTATION = "ppgPresentation",
    NONE = "none"
}

/**Enum for click actions in the business goal add and edit dialog*/
export enum BUSINESS_GOAL_DIALOG_ACTIONS {
    CANCEL = "cancel",
    CREATE = "create",
    SAVE = "save",
    DELETE = "delete",
    VIEW_CHANGE = "viewChange",
    NONE = "none"
}

/**Enum for the view related actions made in the edit business goal dialog */
export enum BG_DIALOG_VIEW_CHANGE_ACTIONS {
    SIR_VIEW_CHANGE = "sirView",
    PPG_VIEW_CHANGE = "ppgView",
    BG_CHANGE = "businessGoalChange",
    NONE = "none"
}

export enum BG_RELEASE_TYPE {
    NO_RELEASE = "No Release",
    PREDICTED_ACTIVE = "Predicted Active",
    CONTROLLED_RELEASE = "Controlled Release",
    OPEN_RELEASE = "Open Release",
    LAUNCH_RELEASE = "Launch"
}

export enum BG_HEALTH_STATUS {
    OK = "OK",
    AT_RISK = "At Risk",
    NOT_OK = "Not OK",
    NOT_APPLICABLE = "Not Applicable",
    NO_STATUS = "No Status"
}

export enum BG_HEALTH_ITEMS {
    TECHNICAL = "Technical",
    SCHEDULE = "Schedule",
    RESOURCES = "Resources",
    IP = "IP",
    BUSINESS_CASE = "Business Case"
}

export enum VIEW_OPTIONS {
    HEALTH = "Health",
    TIMELINE = "Timeline"
}