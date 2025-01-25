import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_WHITE } from "../constant/Colors";

const widgetGrid: any = {
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between"
}

/**Theme for Dashboard Widget */
export const DashboardViewStyles = makeStyles((theme: any) => ({
    rootBox: {
        color: COLOR_WHITE,
        backgroundColor: COLOR_GRAPHITE_1,
        maxHeight: "100vh",
        maxWidth: "100vw",
        // Value taken from the Uiref for the width of left nav
        marginLeft: "64px",
        overflow: "auto",
        padding: "24px",
        minWidth: "1000px",
        minHeight: "800px",
        boxSizing: "border-box",
        height: "100vh"
    },

    rootGridContainer: {
        width: "100%",
        height: "100%"
    },

    titleStatusGridContainerRoot: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        alignItems: "baseline",
        width: "100%",
        height: "10%",
        justifyContent: "space-between"
    },

    TitleClass: {
        fontSize: "24px",
        fontWeight: "bold"
    },

    StatusGridClass: {
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        width: "50%",
        display: "inline-flex",
        justifyContent: "flex-end"
    },

    growthAndMeetingGrid: {
        ...widgetGrid,
        height: "20%"
    },

    ipvGrid: {
        ...widgetGrid,
        height: "32%",
    },

    revenueAndDeliveryGrid: {
        ...widgetGrid,
        height: "32%",
    },

    cardWidgetGrid: {
        width: "49%",
        height: "100%"
    },
}));