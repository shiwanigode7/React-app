import { makeStyles } from "@material-ui/styles";
import { COLOR_EMERALD_3, COLOR_RED_3, COLOR_GREY_1, COLOR_GRAPHITE_2 } from "../../../../constant/Colors";

/**Theme for the Hero feature status button */
export const HeroFeatureStatusButtonStyles = makeStyles(() => ({
    root: {
        width: "170px",
        textTransform: "none",
        borderRadius: "30px",
        fontWeight: 500,
        padding: "18px 24px",
    },
    iconVisible: {
        opacity: "1",
        color: COLOR_GRAPHITE_2
    },
    iconHidden: {
        opacity: "0",
        color: COLOR_GRAPHITE_2
    },
    /**Colour definition for On Track */
    onTrackButton: {
        backgroundColor: COLOR_EMERALD_3,
        background: COLOR_EMERALD_3,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${COLOR_EMERALD_3} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: COLOR_EMERALD_3,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for Behind */
    behindButton: {
        backgroundColor: COLOR_RED_3,
        background: COLOR_RED_3,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${COLOR_RED_3} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: COLOR_RED_3,
            color: COLOR_GRAPHITE_2
        }
    },
    /**Colour definition for Waiting for Input */
    waitingForInputButton: {
        backgroundColor: COLOR_GREY_1,
        background: COLOR_GREY_1,
        color: COLOR_GRAPHITE_2,
        "&:hover": {
            paddingLeft: "0px",
            marginLeft: "0px",
            backgroundColor: `${COLOR_GREY_1} !important`
        },
        "&:disabled": {
            opacity: "1",
            backgroundColor: COLOR_GREY_1,
            color: COLOR_GRAPHITE_2
        }
    },
    iconColor: {
        color: COLOR_GRAPHITE_2
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