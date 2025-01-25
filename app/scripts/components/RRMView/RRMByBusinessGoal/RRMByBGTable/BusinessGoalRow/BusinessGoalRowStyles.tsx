import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_4, COLOR_GREY_3 } from "../../../../../constant/Colors";

const RELEASE_CELL_STYLE: Object = {
    width: "20%",
    padding: "2px",
    display: "grid",
    justifyContent: "center",
    maxHeight : "32px",
    minHeight : "32px"
};

const ACTIVE_CELL: Object = {
    backgroundColor: COLOR_AZURE_4
};

const INACTIVE_CELL: Object = {
    backgroundColor: COLOR_GREY_3
};

export const BusinessGoalRowStyles = makeStyles({
    firstReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        borderTopLeftRadius: "18px",
        borderBottomLeftRadius: "18px",
        width: "100%"
    },
    currentReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...ACTIVE_CELL,
        width: "100%"
    },
    otherReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        width: "100%"
    },
    lastReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        borderTopRightRadius: "18px",
        borderBottomRightRadius: "18px",
        width: "100%"
    },
    releaseContainer: {
        display: "flex",
        width: "100%"
    },
    releaseTableCell : {
        padding : "0px",
        width : "15%"
    },
    lastreleaseTableCell : {
        padding : "0px",
        width : "14%",
        paddingRight : "6px"
    },
    bgCell : {
        padding : "10px"
    },
    bgCellGrid : {
        display : "inline-flex",
        flexDirection : "row",
        flexWrap : "nowrap",
        alignItems : "center"
    },
    bgNameGrid : {
        marginTop : "0px"
    },
    iconGrid: {
        // important is used to handle the issue with custom style from material ui 
        // overwriting the required styles
        padding: "0px !important",
        minHeight: "30px",
        minWidth: "30px",
        display: "inline-flex",
        justifyContent: "center"
    }
});