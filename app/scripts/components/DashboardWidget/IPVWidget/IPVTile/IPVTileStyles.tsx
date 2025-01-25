import { makeStyles } from "@material-ui/core";
import { COLOR_EMERALD_2, COLOR_RED_2 } from "../../../../constant/Colors";

const arrowIconStyle: any = {
    fontSize: "30px"
}

export const IPVTileStyle = makeStyles(() => ({
    gridRoot: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
    },
    quarterText: {
        fontSize: "16px",
    },
    ipvText: {
        fontSize: "36px",
        fontWeight: "bold",
        whiteSpace: "nowrap"
    },
    businessGoalDiv: {
        display: "inline-flex",
        flexWrap: "nowrap",
        alignItems: "center"
    },
    businessGoalGrid: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flexStart",
        overflowY: "scroll",
        width: "100%",
        maxHeight: "50%",
        "&::-webkit-scrollbar": {
            display: "NONE",
            width : "0px"
        }
    },
    businessGoalText: {
        fontSize: "12px",
        wordBreak: "break-all",
        width: "147px", 
        maxWidth: "fit-content",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow : "hidden"

    },
    activeArrowIcon: {
        ...arrowIconStyle,
        transform: "rotate(-90deg)",
        width: "20px",
        marginTop: "2px",
        height: "16px",
        color: COLOR_EMERALD_2
    },
    inActiveArrowIcon: {
        ...arrowIconStyle,
        transform: "rotate(90deg)",
        width: "20px",
        marginTop: "2px",
        height: "16px",
        color: COLOR_RED_2
    }
}));