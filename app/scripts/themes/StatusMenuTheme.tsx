/**TSX file defining style to StatusMenuButton Component */
import { makeStyles } from "@material-ui/styles";
import { IDEATION_COLOR, SCHEDULED_COLOR, COLOR_WHITE, COLOR_GRAPHITE_2, ACTIVE_COLOR, COLOR_EMERALD_2 } from "../constant/Colors"

/**Theme for the status menu button */
export const StatusMenuStyle = makeStyles(() => ({
    root: {
        width: "140px",
        textTransform: "none",
        borderRadius: "30px",
        fontWeight: 500,
        padding: "18px 24px",
    },
    /**Colour definition for Ideation */
    containedPrimary: {
        background: IDEATION_COLOR,
        backgroundColor: IDEATION_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: IDEATION_COLOR,
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: IDEATION_COLOR,
            color: COLOR_GRAPHITE_2,
        }
    },
    /**Colour definition for Scheduled */
    containedSecondary: {
        backgroundColor: SCHEDULED_COLOR,
        background: SCHEDULED_COLOR,
        color: COLOR_WHITE,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${SCHEDULED_COLOR} !important`,
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: SCHEDULED_COLOR,
            color: COLOR_WHITE,
        }
    },
    activeButton: {
        backgroundColor: ACTIVE_COLOR,
        background: ACTIVE_COLOR,
        color: COLOR_WHITE,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${ACTIVE_COLOR} !important`,
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: ACTIVE_COLOR,
            color: COLOR_WHITE,
        }
    },
    completedButton: {
        backgroundColor: COLOR_EMERALD_2,
        background: COLOR_EMERALD_2,
        color: COLOR_WHITE,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${COLOR_EMERALD_2} !important`,
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: COLOR_EMERALD_2,
            color: COLOR_WHITE,
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