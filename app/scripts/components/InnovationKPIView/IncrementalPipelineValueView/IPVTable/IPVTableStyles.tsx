import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createTheme, makeStyles } from "@material-ui/core";
import { COLOR_AMBER_2, COLOR_AZURE_2, COLOR_DARK_YELLOW, COLOR_GRAPHITE_4, COLOR_GRAY_5, COLOR_GREY_2, COLOR_GREY_3, COLOR_WHITE } from "../../../../constant/Colors";

const All_CELL_STYLE: Object = {
    padding: "10px"
};

export const IPVTableStyles = makeStyles(() => ({
    tableSectionContainer: {
        height: "100vh"
    },
    tablePaperContainer: {
        height: "75%",
        padding: "0",
        margin: "10px 0px",
        overflow: "hidden",
        width: "auto",
        marginTop: "25px"
    },
    tableContainer: {
        maxHeight: "100%",
        minHeight: "100%"
    },
    fiveYearIPVCell: {
        backgroundColor: COLOR_AMBER_2
    },
    rpCell: {
        background: COLOR_GREY_3
    },
    unitCell: {
        background: COLOR_GRAY_5
    },
    activeYearHeaderCell: {
        ...All_CELL_STYLE,
        width: "9%",
        backgroundColor: COLOR_AZURE_2,
        color: COLOR_WHITE,
        fontWeight: "bold"
    },
    inactiveYearHeaderCell: {
        ...All_CELL_STYLE,
        width: "9%",
        color: COLOR_GRAPHITE_4,
        backgroundColor: COLOR_GRAY_5,
        fontWeight: "bold"
    },
    unitHeaderCell: {
        ...All_CELL_STYLE,
        width: "3%",
        backgroundColor: COLOR_GRAY_5
    },
    bgHeaderCell: {
        ...All_CELL_STYLE,
        width: "33%",
        backgroundColor: COLOR_GREY_3
    },
    fiveYearIPVHeaderCell: {
        ...All_CELL_STYLE,
        width: "10%",
        color: COLOR_WHITE,
        backgroundColor: COLOR_DARK_YELLOW,
        fontWeight: "bold"
    },
    tableDataInfoMessage: {
        fontWeight: "bold",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none"
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
    }
}));


export const IPVTableTheme = createTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiPaper: {
            root: {
                width: "90%",
                margin: 10,
                overflow: "hidden"
            }
        },
        MuiTableContainer: {
            root: {
                maxHeight: "100%",
                minHeight: "100%"
            }
        },
        MuiTableCell: {
            root: {
                padding: "10px",
                borderBottom: "1px solid #EDEEEF",
                border: "1px solid #EDEEEF"
            }
        }
    }
});