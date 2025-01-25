import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_4, COLOR_RED_2 } from "../../../constant/Colors";

export const ProjectionsFieldStyle = makeStyles(() => ({
    titleAndSuffix: {
        fontSize: "16px",
        color: COLOR_GRAPHITE_4
    },
    value: {
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "right"
    },
    negativeValue: {
        color: COLOR_RED_2,
        fontSize: "20px",
        textAlign: "right",
        fontWeight: "bold"
    },
    gridContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    maxwidthClass: {
        maxWidth: "14.666667%",
    }
}))