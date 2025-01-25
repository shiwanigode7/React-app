import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GREY_2, COLOR_RED_2, COLOR_WHITE } from "../constant/Colors";

const BORDER_DEFAULT: string = "1px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";
const MEETING_FIELD_OUTLINE = {
    background: COLOR_WHITE,
    color: COLOR_GRAPHITE_2,
    borderRadius: BORDER_RADIUS,
    "&.Mui-disabled": {
        opacity: "0.5",
        cursor: "not-allowed"
    }
}

/**Theme for the scroll bar */
export const MeetingsViewStyles = makeStyles(() => ({
    GridContainerClass: {
        flexWrap: "nowrap",
        whiteSpace: "nowrap"
    },
    TitleClass: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: "#22262A",
        paddingLeft: "18px"
    },
    TooltipClass: {
        fontSize: "10px"
    },
    IconButtonClass: {
        padding: "0px"
    }
}));

export const AddMeetingDialogTheme = createMuiTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiDialogTitle: {
            root: {
                backgroundColor: "#F8F8F9",
                padding: "0",
                paddingLeft: "24px"
            }
        },
        MuiTypography: {
            /**Styling for the form text in dialog */
            body1: {
                fontSize: '12px',
                fontWeight: 'bold',
                color: "#22262A",
                padding: "0",
                margin: "0"
            },
            /**Styling for the head */
            h6: {
                padding: "0",
                fontSize: "16px",
                fontWeight: "bold"
            }
        },
    }
});

export const MeetingListViewStyles = makeStyles(() => ({
    selectIcon: {
        top: "4px",
        right: "7px"
    },
    /**Theme for the text fields */
    meetingTextFieldOutlined: {
        ...MEETING_FIELD_OUTLINE
    },
    meetingTypeTextFieldOutlined: {
        ...MEETING_FIELD_OUTLINE,
        cursor: "auto",
        width: "5vh",
        textAlign: "center"
    },
    /**Common theme for the fields in list view */
    meetingFieldOutlineRoot: {
        margin: 0,
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: BORDER_DEFAULT,
        borderRadius: BORDER_RADIUS,
        "&:focus": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&:hover": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&.Mui-disabled": {
            opacity: "0.5",
            border: BORDER_DEFAULT,
            borderRadius: BORDER_RADIUS,
            cursor: "not-allowed"
        }
    },
    meetingFieldNotchedOutline: {
        border: `none !important`,
    },
    /**Meeting topic collapsed themes - Chip component */
    meetingTopicChipLabel: {
        fontSize: "14px"
    },
    meetingTopicChipRoot: {
        backgroundColor: COLOR_GREY_2,
        height: "24px",
        margin: "2px",
        verticalAlign: "inherit",
        maxWidth : "160px"
    },
    meetingTopicChipDeleteIcon: {
        color: COLOR_GRAPHITE_2
    },
    meetingTopicParentDiv: {
        whiteSpace: "normal",
        verticalAlign: "inherit"
    },
    meetingTopicAddIcon: {
        fontSize: "24px"
    },
    meetingTopicIconButton: {
        padding: "2px"
    },
    /**Meeting duration related styling */
    meetingDurationParentDiv: {
        display: "inline-flex",
        alignItems: "center"
    },
    meetingDurationText: {
        margin: 0,
        padding: 0,
        paddingLeft: "10px",
        paddingRight: "10px"
    },
    /**Meeting filter container */
    meetingFilterContainerRoot: {
        margin: "0px",
        marginRight: "21px",
        flexWrap: "nowrap",
        whiteSpace: "nowrap"
    },
    /**Meeting show past meeting theme */
    meetingSwitchRoot: {
        marginLeft: "auto"
    },
    /**Meeting filter drop down */
    meetingFilterDropDownOutlined: {
        width: "128px",
        ...MEETING_FIELD_OUTLINE
    },
    /**Style for the warning message */
    warningMessageText: {
        fontSize: "10px",
        color: COLOR_RED_2,
        fontWeight: "bold",
        whiteSpace: "normal",
        textAlign: "center"
    },
    meetingTableDeleteIcon: {
        height:"24px", 
        width:"24px"
    }, 
}));

export const AlertStyles = makeStyles(() => ({
    root: {
        width: "500px"
    }
}));