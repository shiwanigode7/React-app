import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_RED_2 } from "../../../constant/Colors";

export const npvWidgetStyle = makeStyles(() => ({
    cardRoot: {
        width: "100%",
        height: "100%",
        minWidth: "230px"
    },
    cardcontent: {
        width: "100%",
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    typograpghyDiv: {
        display: "flex"
    },
    typographyStyles: {
        fontSize: "45px",
        height: "50%",
        fontWeight: "bold"
    },
    negativeNPV: {
        fontSize: "45px",
        color: COLOR_RED_2,
        height: "50%",
        fontWeight: "bold"
    },
    npvUnit: {
        fontSize: "45px",
        color: COLOR_GRAPHITE_5,
        height: "50%",
        fontWeight: "bold"
    },
    typographyNPV: {
        fontSize: "1.4vw",
        height: "40%",
        color: COLOR_GRAPHITE_5
    }
}));