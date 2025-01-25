import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE, COLOR_EMERALD_2, COLOR_RED_2 } from "../../../../constant/Colors";

const OTD_TEXT: any = {
    fontSize: "36px",
    fontWeight: "bold",
    whiteSpace: "nowrap"
};

export const OTDTileStyle = makeStyles(() => ({
    gridRoot: {
        alignContent: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
    },
    monthText: {
        fontSize: "16px",
    },
    incompleteOTDText: {
        ...OTD_TEXT,
        color: COLOR_RED_2
    },
    completeOTDText: {
        ...OTD_TEXT,
        color: COLOR_EMERALD_2
    },
    incompleteMilestonesDiv: {
        display: "inline-flex",
        flexWrap: "nowrap",
        alignItems: "center"
    },
    incompleteMilestonesGrid: {
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        overflowY: "scroll",
        maxHeight: "50%",
        width: "100%",
        "&::-webkit-scrollbar": {
            display: "NONE",
            width: "0px"
        }
    },
    incompleteMilestoneText: {
        fontSize: "12px",
        wordBreak: "break-all",
        width: "127px",
        textAlign: "end",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    inCompleteMilestoneChip: {
        width: "fit-content",
        height: "fit-content",
        fontSize: "12px",
        margin: "0px",
        padding: "2px 0px 2px 0px",
        color: COLOR_WHITE,
        backgroundColor: COLOR_RED_2
    },
    inCompleteMilestoneChipDivStyle: {
        marginLeft: "2px",
        marginTop: "-7px",
        padding: "2px"
    }
}));