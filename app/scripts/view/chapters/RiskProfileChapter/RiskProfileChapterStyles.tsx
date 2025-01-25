import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_3, COLOR_GRAPHITE_4 } from "../../../constant/Colors";

export const RiskProfileChapterStyle = makeStyles(() => ({
    riskChapterItems: {
        width: "50%"
    },
    typography: {
        fontSize: "12px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1,
        padding: "0",
        margin: "0"
    },
    textField: {
        width: "100%"
    },
    dropdownIcon: {
        color: COLOR_GRAPHITE_3,
        fontSize: "22px"
    },
    description: {
        fontSize: "12px",
        color: COLOR_GRAPHITE_4,
        padding: "0",
        margin: "0"
    },
    gridItem: {
        marginTop: "4px"
    },
    avatar: {
        width: "60px",
        height: "60px",
        marginTop: "3px",
        fontSize: "26px"
    }
}))