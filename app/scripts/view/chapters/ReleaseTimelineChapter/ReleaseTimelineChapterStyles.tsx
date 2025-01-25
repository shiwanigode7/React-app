import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GREY_3 } from "../../../constant/Colors";

export const ReleaseTimelineStyles = makeStyles(() => ({
    rootGridContainer: {
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    releaseNameGrid: {
        height: "15%",
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-between"
    },
    releaseTypeBar: {
        // Because we want bar height to be same to make sure icon doesn't overflow or have too much space
        height: "32px",
        width: "100%",
        display: "inline-flex",
        justifyContent: "center",
        borderRadius: "18px",
        background: COLOR_GREY_3
    },
    releaseTypeBarGrid: {
        width: "90%",
        display: "inline-flex",
        justifyContent: "space-evenly",
    },
    rightArrowicon: {
        width: "5%",
        alignSelf: "center",
        textAlign: "end"
    },
    leftArrowicon: {
        width: "5%",
        alignSelf: "center"
    },
    icon: {
        color: COLOR_GRAPHITE_1
    },
    iconButton: {
        padding: "8px"
    },
    milestoneGrid: {
        height: "60%",
        width: "90%",
        display: "inline-flex",
        justifyContent: "space-evenly"
    },
    horizontalGridItem: {
        marginTop: "4px",
        width: "18%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4px"
    },
    releaseNameText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: COLOR_GRAPHITE_1,
        fontSize: "14px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        maxWidth: "100%"
    },
    tooltip: {
        fontSize: "10px"
    }
}));