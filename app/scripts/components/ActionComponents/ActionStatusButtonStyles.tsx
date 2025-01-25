/**TSX file defining style to ActionStatusButton Component */
import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_2, COMPLETED_STATUS_COLOR, ON_TRACK_STATUS_COLOR, PAST_DUE_STATUS_COLOR, CANCELLED_STATUS_COLOR, PENDING_STATUS_COLOR } from "../../constant/Colors";

/**Theme for the action status button */
export const ActionStatusButtonStyles = makeStyles(() => ({
    root: {
        width: "140px",
        textTransform: "none",
        borderRadius: "30px",
        fontWeight: 500,
        padding: "18px 24px",
    },
    iconVisible: {
        opacity: "1"
    },
    iconHidden: {
        opacity: "0"
    },
    /**Colour definition for Pending */
    pendingButton: {
        background: PENDING_STATUS_COLOR,
        backgroundColor: PENDING_STATUS_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: PENDING_STATUS_COLOR
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: PENDING_STATUS_COLOR,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for On Track */
    onTrackButton: {
        backgroundColor: ON_TRACK_STATUS_COLOR,
        background: ON_TRACK_STATUS_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${ON_TRACK_STATUS_COLOR} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: ON_TRACK_STATUS_COLOR,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for Past Due */
    pastDueButton: {
        backgroundColor: PAST_DUE_STATUS_COLOR,
        background: PAST_DUE_STATUS_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${PAST_DUE_STATUS_COLOR} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: PAST_DUE_STATUS_COLOR,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for Completed */
    completedButton: {
        backgroundColor: COMPLETED_STATUS_COLOR,
        background: COMPLETED_STATUS_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${COMPLETED_STATUS_COLOR} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: COMPLETED_STATUS_COLOR,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for Cancelled */
    cancelledButton: {
        backgroundColor: CANCELLED_STATUS_COLOR,
        background: CANCELLED_STATUS_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${CANCELLED_STATUS_COLOR} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: CANCELLED_STATUS_COLOR,
            color: COLOR_GRAPHITE_2
        }
    },
    MenuPaper: {
        padding: "0px 12px",
        margin: "0px",
        width: "fit-content"
    },
    startIcon: {
        marginLeft: "0em"
    }
}));