import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GRAPHITE_2, COLOR_GRAPHITE_4, COLOR_WHITE } from "../../../constant/Colors";

export const ReleaseTimelineHeadStyles = makeStyles({
    releaseTimelineHeadContainer: {
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
        fontSize: "14px",
        cursor: "context-menu",
        alignItems: "center",
        minWidth: "413px",
        "&:hover": {
            color: COLOR_GRAPHITE_2,
        }
    },
    currentRelease: {
        width: "20%",
        padding: "0px 10px",
        backgroundColor: ACTIVE_COLOR,
        color: COLOR_WHITE,
        fontSize: "12px",
        justifyContent: "center",
        flexWrap: "nowrap",
        alignItems: "center",
        display: "inline-flex"
    },
    nextRelease: {
        width: "20%",
        alignItems: "center",
        fontSize: "12px",
        padding: "0px 10px",
        "&:hover": {
            color: COLOR_GRAPHITE_4
        },
        color: COLOR_GRAPHITE_4
    },
    rotateRightIcon: {
        paddingTop: "4px",
        marginLeft: "8px"
    },

});