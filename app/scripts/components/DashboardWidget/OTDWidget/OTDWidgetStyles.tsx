import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE } from "../../../constant/Colors";

export const OTDWidgetStyle = makeStyles(() => ({
    loadingIconClass: {
        color: COLOR_WHITE
    },
    loadingIconDivClass: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    otdTileRoot: {
        display: "inline-flex",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%"
    }
}));