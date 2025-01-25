import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_AZURE_3, COLOR_WHITE } from "../../../constant/Colors";

const SIDE_HEADING_TEXT: Object = {
    height: "100%",
    whiteSpace: "nowrap",
    alignSelf: "baseline",
    textAlign: "end"
};

export const PredictionIPVWidgetStyles = makeStyles(()=>({
    loadingIconClass: {
        color: COLOR_WHITE
    },
    loadingIconDivClass: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "baseline"
    },
    sideHeadingRootGrid: {
        width: "100%",
        height: "100%",
        display: "inline-flex",
        flexWrap: "nowrap",
        padding: "0px",
        margin: "0px",
        minWidth: "300px",
        justifyContent: "space-between"
    },
    sideHeadingLegendItemGrid: {
        width: "50%",
        height: "100%",
        display: "inline-flex",
        flexWrap: "nowrap",
        justifyContent: "flex-end"
    },
    sideHeadingLegendCurrentActiveColor: {
        width: "25px",
        height: "25px",
        background: COLOR_AZURE_2
    },
    sideHeadingLegendNewActiveColor: {
        width: "25px",
        height: "25px",
        background: COLOR_AZURE_3
    },
    sideHeadingLegendCurrentActiveText: {
        width: "75%",
        ...SIDE_HEADING_TEXT
    },
    sideHeadingLegendNewActiveText: {
        width: "60%",
        ...SIDE_HEADING_TEXT
    },
    graphCanvas: {
        width: "100% !important",
        height: "107% !important",
        marginTop: "-18px"
    },
}));