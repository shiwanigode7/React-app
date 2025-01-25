import { makeStyles } from "@material-ui/core";
import { COLOR_EMERALD_2, COLOR_RED_2, COLOR_WHITE } from "../../../../constant/Colors";

const arrowIconStyle: any = {
    fontSize: "30px"
}

export const RATileStyle = makeStyles(() => ({
    gridRoot: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
    },
    quarterText: {
        fontSize: "16px",
    },
    raRedText: {
        fontSize: "36px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        color: COLOR_RED_2
    },
    raGreenText: {
        fontSize: "36px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        color: COLOR_EMERALD_2
    },
    businessGoalDiv: {
        display: "inline-flex",
        flexWrap: "nowrap",
        alignItems: "center"
    },
    businessLinesGrid: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "end",
        overflowY: "scroll",
        maxHeight: "50%",
        "&::-webkit-scrollbar": {
            display: "NONE",
            width: "0px"
        }
    },
    businessLineText: {
        fontSize: "12px",
        wordBreak: "break-all",
        width: "120px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textAlign: "end",
        overflow: "hidden",
        paddingRight: "2px",
        marginTop: "4px"
    },
    percentageChip: {
        height: "fit-content",
        fontSize: "12px",
        width: "fit-content",
        padding: "2px 0px 2px 0px",
        marginTop: "4px",
        background: COLOR_RED_2,
        color: COLOR_WHITE
    }
}))