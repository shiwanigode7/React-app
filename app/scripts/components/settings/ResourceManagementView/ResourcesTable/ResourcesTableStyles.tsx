import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createTheme, makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_AZURE_2, COLOR_AZURE_4, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_LIGHT, COLOR_WHITE } from "../../../../constant/Colors";

const All_CELL_STYLE: Object = {
    padding: "10px"
};

//optional parameter is used  for interface variable below to resolve an error, see MPL-1314 story task for more info
interface TablePaperContainerPropsModel {
    isRunwayOverAllocated?: boolean
}

export const ResourcesTableStyles = makeStyles(() => ({
    tableSectionContainer: {
        height: "100vh"
    },
    tablePaperContainer: (tablePaperProps: TablePaperContainerPropsModel) => ({
        height: tablePaperProps.isRunwayOverAllocated ? "72%" : "85%",
        padding: 10,
        margin: 10,
        overflow: "hidden",
        width: "83.25%"
    }),
    tableContainer: {
        maxHeight: "100%",
        minHeight: "100%"
    },
    activeCell: {
        backgroundColor: COLOR_AZURE_4,
        "&:hover": {
            border: `solid 1px ${COLOR_AZURE_2}`
        }
    },
    otherCell: {
        background: COLOR_LIGHT,
        color: COLOR_GRAPHITE_1,
        "&:hover": {
            border: `solid 1px ${COLOR_AZURE_2}`
        }
    },
    tableHeadRow: {
        backgroundColor: COLOR_GREY_2
    },
    releaseContainer: {
        padding: "2px 15px 0px 35px",
        display: "flex"
    },
    releaseNameContainer: {
        padding: "10px 0px 10px 10px"
    },
    blankCell: {
        width: "25%"
    },
    activeReleaseCell: {
        ...All_CELL_STYLE,
        width: "15%",
        backgroundColor: ACTIVE_COLOR,
        color: COLOR_WHITE
    },
    iconContainer: {
        color: COLOR_WHITE,
        padding: "10px"
    },
    otherReleasesCell: {
        ...All_CELL_STYLE,
        width: "15%",
        color: COLOR_GRAPHITE_4,
        backgroundColor: COLOR_GREY_2
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
    },
    tableDataCell: {
        whiteSpace: "nowrap",
        borderBottom: "none",
        borderColor: COLOR_GREY_2,
        justifyContent: "center"
    }

}));


export const ResourceTableTheme = createTheme({
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
                border: "1px solid #EDEEEF",
                wordBreak : "break-word"
            },
        }
    }
});