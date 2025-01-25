import { makeStyles } from "@material-ui/styles";
import { IDEATION_COLOR, COMPLETED_COLOR, SCHEDULED_COLOR, COLOR_GREY_3, COLOR_WHITE, COLOR_GRAPHITE_2, BORDER_GRAPHITE_5_OPACITY_02, COLOR_GREY_AVATAR } from "../../../../constant/Colors"

/**Theme for the health item status menu button */
export const HealthItemStatusButtonStyle = makeStyles(() => ({
    root: {
        width: "180px",
        height: "30px",
        textTransform: "none",
        borderRadius: "30px",
        fontWeight: 500,
        marginTop: "6px",
        border: `2px solid ${BORDER_GRAPHITE_5_OPACITY_02}`
    },
    /**Colour definition for OK */
    statusOkButton: {
        background: COMPLETED_COLOR,
        backgroundColor: COMPLETED_COLOR,
        color: COLOR_WHITE,
        "&:hover": {
            backgroundColor: COMPLETED_COLOR,
        },
        "&:disabled": {
            color: COLOR_WHITE,
            background: COMPLETED_COLOR,
        }
    },
    /**Colour definition for NOT OK */
    statusNotOkButton: {
        backgroundColor: SCHEDULED_COLOR,
        background: SCHEDULED_COLOR,
        color: COLOR_WHITE,
        "&:hover": {
            backgroundColor: `${SCHEDULED_COLOR} !important`,
        },
        "&:disabled": {
            color: COLOR_WHITE,
            background: SCHEDULED_COLOR,
        }
    },
    /**Colour definition for At Risk */
    statusAtRiskButton: {
        backgroundColor: IDEATION_COLOR,
        background: IDEATION_COLOR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            backgroundColor: IDEATION_COLOR,
        },
        "&:disabled": {
            background: IDEATION_COLOR,
            color: COLOR_GRAPHITE_2,
        }
    },
    /**Colour definition for Not Applicable */
    statusNotApplicableButton: {
        background: COLOR_GREY_AVATAR,
        backgroundColor: COLOR_GREY_AVATAR,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            backgroundColor: COLOR_GREY_AVATAR,
        },
        "&:disabled": {
            color: COLOR_GRAPHITE_2,
            background: COLOR_GREY_AVATAR,
        }
    },
    /**Colour definition for No Status */
    statusNoStatusButton: {
        background: COLOR_GREY_3,
        backgroundColor: COLOR_GREY_3,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            backgroundColor: COLOR_GREY_3,
        },
        "&:disabled": {
            color: COLOR_GRAPHITE_2,
            background: COLOR_GREY_3,
        }
    },
    MenuPaper: {
        padding: 0,
        margin: "4px",
        width: "fit-content"
    },
    endIcon: {
        marginRight: "0em"
    },
    startIcon: {
        color: COLOR_GRAPHITE_2
    },
    menu: {
        top: "45px",
        marginTop: "40px",
        marginLeft: "25px"
    },
    tooltip: {
        background: COLOR_GRAPHITE_2,
        color: COLOR_WHITE,
        fontSize: "13px",
        margin: "0px",
        maxWidth: "55%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    }
}));