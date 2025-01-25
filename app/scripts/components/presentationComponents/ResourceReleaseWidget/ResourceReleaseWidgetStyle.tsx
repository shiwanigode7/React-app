import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_4, COLOR_GREY_2 } from "../../../constant/Colors";

export const ResourceReleaseWidgetStyles = makeStyles(() => ({
    avatar: {
        height: "57px",
        width: "57px",
        display: "flex",
        margin: "1%",
        alignSelf: "center"
    },
    avatarDiv: {
        display: "inline-flex",
        margin: "1%",
        width: "98%",
        overflow: "auto",
        /**Width */
        "&::-webkit-scrollbar": {
            width: "8px",
            height: "5px"
        },
        /* Track */
        "&::-webkit-scrollbar-track": {
            background: COLOR_GREY_2,
            borderRadius: "70px",
        },
        /**Handle */
        "&::-webkit-scrollbar-thumb": {
            background: "#c4c4c4",
            borderRadius: "70px"
        },
        /**Changes for mozilla */
        /**Width */
        "&::-ms-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        /* Track */
        "&::-ms-scrollbar-track": {
            boxShadow: "inset 0 0 5px #edeeef",
            borderRadius: "10px",
        },
        /**Handle */
        "&::-moz-scrollbar-thumb": {
            background: "#e5e5e5",
            borderRadius: "70px"
        }
    },
    title :{
        fontSize: "16px",
        color: COLOR_GRAPHITE_4
    },
    tooltip: {
        fontSize: "10px",
        margin: "0px"
    },
    cardContentGrid: {
        width: "100%",
        height: "75%",
    },
    runwaysGrid: {
        width: "95%",
        marginLeft: "3%",
        marginTop: "1%",
        height: "72%"
    },
    noRunwaysTypography: {
        fontSize: "14px",
        width: "100%",
        textAlign: "center"
    }
}));