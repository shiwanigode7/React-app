import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_2, COLOR_LIGHT } from "../../../constant/Colors";

const TABLE_CELL_PADDING: string = "10px";

export const BasicTableStyles = makeStyles(() => ({
    tableSectionContainer: {
        height: "100vh"
    },
    paper: {
        height: "85%",
        width: "100%",
        overflow: "hidden"
    },
    tableContainer: {
        maxHeight: "100%",
        minHeight: "100%"
    },
    tableHeadCell: {
        background: COLOR_LIGHT,
        whiteSpace: "nowrap",
        borderBottom: "solid 0px",
        borderColor: COLOR_GREY_2,
        fontWeight: "bold",
        padding: "12px"
    },
    ScrollBarClass: {
        "&::-webkit-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        "&::-webkit-scrollbar-track": {
            background: COLOR_GREY_2,
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#c4c4c4",
            borderRadius: "10px"
        },
        "&::-ms-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        "&::-ms-scrollbar-track": {
            boxShadow: "inset 0 0 5px #edeeef",
            borderRadius: "10px",
        },
        "&::-moz-scrollbar-thumb": {
            background: "#e5e5e5",
            borderRadius: "10px"
        },
        scrollbarColor: "black",
        scrollBarWidth: "thin"
    },
    tableDataInfoMessage: {
        fontWeight: "bold",
        borderBottom: "none",
        padding: TABLE_CELL_PADDING
    },
    tableDataCell: {
        whiteSpace: "nowrap",
        borderBottom: "none",
        borderColor: COLOR_GREY_2,
        justifyContent: "center",
        padding: TABLE_CELL_PADDING
    }
}));