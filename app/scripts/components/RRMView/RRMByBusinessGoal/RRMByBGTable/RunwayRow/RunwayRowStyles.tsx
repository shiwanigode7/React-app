import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_4, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_GREY_3 } from "../../../../../constant/Colors";

const RELEASE_CELL_STYLE: Object = {
    width: "15%",
    padding: "2px",
    justifyContent: "center",
    border: `solid 1px ${COLOR_GREY_2}`,
    cursor: "context-menu"
};

const ACTIVE_CELL: Object = {
    backgroundColor: COLOR_AZURE_4
};

const INACTIVE_CELL: Object = {
    backgroundColor: COLOR_GREY_3,
    color: COLOR_GRAPHITE_4
};

export const RunwayRowStyles = makeStyles({
    currentReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...ACTIVE_CELL,
        height: "100%",
        textAlign: "center"
    },
    otherReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        height: "100%",
        textAlign: "center"
    },
    thumbnailCell: {
        backgroundColor: COLOR_GREY_3,
        width: "25%",
        padding: "10px"
    },
    emptyGrid: {
        width: "15%",
        minWidth: "35px"
    },
    runwayCell: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    runwayName: {
        width: "65%",
        marginTop: "8px"
    }
});