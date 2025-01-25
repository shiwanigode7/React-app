import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_WHITE } from "../../../../constant/Colors";

const All_CELL_STYLE: Object = {
    border: `solid 1px ${COLOR_GREY_2}`,
    padding: "10px"
};

const RELEASE_CELL_STYLE: Object = {
    width: "15%"
};

export const RRMByBGTableStyles = makeStyles({
    paper: {
        height: "100%",
        width: "100%",
        minWidth: "600px",
        overflow: "auto"
    },
    tableContainer: {
        width: "100%",
        height: "auto",
        overflow: "auto"
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