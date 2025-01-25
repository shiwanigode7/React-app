import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_WHITE } from "../../../../constant/Colors";

const All_CELL_STYLE: Object = {
    border: `solid 1px ${COLOR_GREY_2}`,
    padding: "10px"
};

const RELEASE_CELL_STYLE: Object = {
    width: "15%"
};

export const RRMTableStyles = makeStyles({
    mainDiv: {
        height: "100vh"
    },
    paper: {
        width: "auto",
        margin: "10px -8px 10px 10px",
        overflow: "hidden",
        overflowY:"auto"
    },
    tableContainer: {
        maxHeight: "100%",
        minHeight: "100%",
        width: "100%",
        overflowX: "auto"
    },
    table: {
        border: `solid 1px ${COLOR_GREY_2}`
    },
    emptyCell: {
        ...RELEASE_CELL_STYLE,
        ...All_CELL_STYLE,
        width: "25%"
    },
    activeReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...All_CELL_STYLE,
        color: COLOR_WHITE,
        backgroundColor: ACTIVE_COLOR
    },
    inactiveReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...All_CELL_STYLE,
        color: COLOR_GRAPHITE_4,
        backgroundColor: COLOR_GREY_2
    },
    tableDataInfoMessage: {
        fontWeight: "bold",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none"
    }
});