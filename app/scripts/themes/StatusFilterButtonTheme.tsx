/**Style definitions for Status Filter button */

import { makeStyles } from "@material-ui/styles";
import { IDEATION_COLOR, SCHEDULED_COLOR, ACTIVE_COLOR, COMPLETED_COLOR, COLOR_GRAPHITE_2, COLOR_DARK_TRANSPARENT, COLOR_WHITE, COLOR_GRAPHITE_1 } from "../constant/Colors"

export const StatusFilterButtonStyles = makeStyles(() => ({
    /**default button styling */
    rootDiv: {
    },

    buttonRoot: {
        width: "100%",
        height: "40px",
        borderRadius: "24px",
        fontSize: "14px",
        marginBottom: "4%"
    },

    displayText: {
        marginRight: "auto",
        marginLeft: "6px"
    },

    buttonOutlined: {
        color: COLOR_WHITE,
        background: COLOR_GRAPHITE_2,
        "&:hover": {
            color: COLOR_WHITE,
            background: COLOR_GRAPHITE_2,
        }
    },

    /**Material UI Icon Size */
    materialUISvg: {
        fontSize: "24px !important"
    },

    /**Chip styling */
    chipLabel: {
        padding: 0
    },

    chipDefault: {
        color: COLOR_WHITE,
        background: COLOR_DARK_TRANSPARENT,
        fontSize: "11px !important",
        width: "24px",
        height: "24px",
        marginRight: "8px"
    },

    chipOutlined: {
        background: COLOR_GRAPHITE_1
    },

    /**Styling for Ideation related UI */
    ideationButtonContained: {
        color: COLOR_GRAPHITE_2,
        background: IDEATION_COLOR,
        "&:hover": {
            color: COLOR_GRAPHITE_2,
            background: IDEATION_COLOR,
        }
    },

    /**Styling for Scheduled related UI */
    scheduledButtonContained: {
        color: COLOR_WHITE,
        background: SCHEDULED_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: SCHEDULED_COLOR,
        }
    },

    /**Styling for Active related UI */
    activeButtonContained: {
        color: COLOR_WHITE,
        background: ACTIVE_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: ACTIVE_COLOR,
        }
    },

    /**Styling for Completed related UI */
    completedButtonContained: {
        color: COLOR_WHITE,
        background: COMPLETED_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: COMPLETED_COLOR,
        }
    }

}));

export const DashBoardStatusFilterButtonStyles = makeStyles(() => ({
    /**DashBoard button styling */

    rootDiv: {
        display: "inline-flex",
        width: "100%",
        justifyContent: "flex-end"
    },

    buttonRoot: {
        width: "35%",
        height: "3.125rem",
        borderRadius: "0.25rem",
        fontSize: "0.875rem",
        marginBottom: "4%",
        marginLeft: "2%",
        marginTop: "1%",
        maxWidth: "180px"
    },

    displayText: {
        width: "60%",
        fontSize: "0.80vw",
        marginLeft: "-0.25rem",
        textAlign: "left",
        fontWeight: "bold"
    },

    buttonOutlined: {
        color: COLOR_WHITE,
        background: COLOR_GRAPHITE_2,
        "&:hover": {
            color: COLOR_WHITE,
            background: COLOR_GRAPHITE_2,
        }
    },

    /**Material UI Icon Size */
    materialUISvg: {
        fontSize: "1.5rem !important",
        marginLeft: "0rem",
        marginRight: "0rem"
    },

    /**Chip styling */
    chipLabel: {
        padding: 0
    },

    chipDefault: {
        color: COLOR_WHITE,
        background: COLOR_DARK_TRANSPARENT,
        fontSize: "0.688rem !important",
        width: "1.5rem",
        height: "1.5rem",
        marginLeft: "0rem"
    },

    chipOutlined: {
        background: COLOR_GRAPHITE_1
    },

    /**Styling for Ideation related UI */
    ideationButtonContained: {
        color: COLOR_GRAPHITE_2,
        background: IDEATION_COLOR,
        "&:hover": {
            color: COLOR_GRAPHITE_2,
            background: IDEATION_COLOR,
        },
        "&:disabled": {
            color: COLOR_GRAPHITE_2,
            background: IDEATION_COLOR,
        }
    },

    /**Styling for Scheduled related UI */
    scheduledButtonContained: {
        color: COLOR_WHITE,
        background: SCHEDULED_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: SCHEDULED_COLOR,
        },
        "&:disabled": {
            color: COLOR_WHITE,
            background: SCHEDULED_COLOR,
        }
    },

    /**Styling for Active related UI */
    activeButtonContained: {
        color: COLOR_WHITE,
        background: ACTIVE_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: ACTIVE_COLOR,
        },
        "&:disabled": {
            color: COLOR_WHITE,
            background: ACTIVE_COLOR,
        }
    },

    /**Styling for Completed related UI */
    completedButtonContained: {
        color: COLOR_WHITE,
        background: COMPLETED_COLOR,
        "&:hover": {
            color: COLOR_WHITE,
            background: COMPLETED_COLOR,
        },
        "&:disabled": {
            color: COLOR_WHITE,
            background: COMPLETED_COLOR,
        }
    }

}));