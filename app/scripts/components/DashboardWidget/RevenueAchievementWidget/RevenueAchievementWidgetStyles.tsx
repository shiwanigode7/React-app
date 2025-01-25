import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE } from "../../../constant/Colors";

export const RevenueAchievementWidgetStyle = makeStyles(() => ({
    LoadingIconClass: {
        color: COLOR_WHITE
    },
    LoadingIconDivClass: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    RATileRoot: {
        display: "inline-flex",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%"
    },
    tip: {
        fontSize: "10px",
        marginTop: "4px"
    }
}))