import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_3 } from "../../../constant/Colors";

export const FlyoutStyles = makeStyles({
    headingGridItem: {
        maxHeight: "60px"
    },
    widgetContentGridItem: {
        width: "200px"
    },
    button: {
        height: "auto",
        width: "100%",
        display: "flexItem",
        fontWeight: "lighter",
        position: "relative",
        fontSize: "12px",
        boxSizing: "border-box",
        textAlign: "left",
        marginLeft: "0px",
        marginBottom: "2px",
        paddingTop: "8px",
        whiteSpace: "nowrap",
        borderRadius: "4px",
        paddingBottom: "8px",
        justifyContent: "flex-Start",
        color: "white",
        "&:hover, &.Mui-focusVisible": { backgroundColor: COLOR_GRAPHITE_3 }
    },
    selectedButton: {
        height: "auto",
        width: "100%",
        display: "flexItem",
        backgroundColor: COLOR_GRAPHITE_3,
        fontWeight: "lighter",
        position: "relative",
        fontSize: "12px",
        boxSizing: "border-box",
        textAlign: "left",
        marginLeft: "0px",
        marginBottom: "2px",
        paddingTop: "8px",
        whiteSpace: "nowrap",
        borderRadius: "4px",
        paddingBottom: "8px",
        justifyContent: "flex-Start",
        color: "white",
        "&:hover, &.Mui-focusVisible": { backgroundColor: COLOR_GRAPHITE_3 }
    },
    buttonIcon: {
        marginLeft: "2px"
    }
});