import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../../constant/Colors";
export const CardContentStyle = makeStyles(({
    cardContentContainer: {
        marginLeft: "-4px",
        marginTop: "2px",
        fontSize: "12px"
    },
    descriptionGrid: {
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
        width: "auto",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    description: {
        fontSize: "12px"
    },
    runwayGrid: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "4px",
        width: "100%"
    },
    avatarGrid: {
        display: "flex",
        flexDirection: "initial",
        minHeight: "25px",
        width: "100%",
        height: "30px",
        overflowY: "auto"
    },
    mileStoneGrid: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "4px",
        width: "100%"
    },
    avatar: {
        width: "25px",
        height: "25px",
        marginLeft: "0px",
        marginRight: "6px"
    },
    milestoneChip: {
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
    tooltip: {
        background: COLOR_GRAPHITE_5,
        color: COLOR_WHITE,
        fontSize: "14px",
        margin: "0px",
        maxWidth: "55%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    },
    tooltipPopper: {
        maxWidth: "55%",
        whiteSpace: "nowrap"
    },
    descriptionTypography: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "12px",
        width: "100%",
        minHeight: "36px",
        wordBreak: "break-all"
    },
    mileStoneChipGrid: {
        display: "content",
        flexDirection: "initial",
        minHeight: "25px",
        width: "100%",
        height: "30px",
        overflowY: "auto"
    },
    gridItem: {
        width: "100%"
    }
}))