import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../../constant/Colors";

export const BusinessGoalCardContentViewStyle = makeStyles(({
    tooltip: {
        background: COLOR_GRAPHITE_5,
        color: COLOR_WHITE,
        fontSize: "14px",
        margin: "0px",
        maxWidth: "55%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    },
    productsChipGrid: {
        display: "content",
        flexDirection: "initial",
        minHeight: "25px",
        width: "100%",
        height: "30px",
        overflowY: "auto"
    },
    gridItem: {
        width: "100%"
    },
    productsChip: {
        maxWidth: "235px",
        height: "20px",
        textAlign: "left",
        whiteSpace: "nowrap",
        textOverflow: "ellipse",
        overflow: "hidden",
        marginLeft: "0px",
        marginRight: "6px",
        minWidth: "90px",
        marginBottom: "4px"
    },
    productsGrid: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "4px",
        width: "100%"
    },
    headings: {
        fontWeight: "bold",
        fontSize: "12px",
        whiteSpace: "nowrap",
        marginBottom: "4px",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    milestoneGrid: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "4px",
        width: "100%"
    }
}));