import { createTheme, makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_BLACK, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_GREY_3, COLOR_LIGHT, COLOR_WHITE } from "../../../../constant/Colors";

export const RevenueAchievementTableStyles = makeStyles({
    mainDiv: {
        height: "85vh"
    },
    paper: {
        height: "100%",
        width: "100%",
        overflow: "hidden"
    },
    tableContainer: {
        maxHeight: "100%",
        minHeight: "100%",
        width: "100%",
        overflowX: "auto"
    },
    tableCell: {
        padding: "7px"
    },
    nonEditableCells: {
        textAlign: "center",
        background: COLOR_GREY_3,
        color: COLOR_GRAPHITE_4
    },
    ediableTableCell: {
        background: COLOR_LIGHT,
        color: COLOR_GRAPHITE_1,
        "&:hover": {
            border: `solid 1px ${COLOR_AZURE_2}`
        }
    },
    blNameGridItem: {
        whiteSpace: "nowrap",
        textOverflow: "ellipse",
        overflow: "hidden",
        textAlign: "left"
    },
    secondRowtableCell: {
        padding: "0px 5px 0px 5px"
    },
    noBorderBottomTableCell: {
        borderBottom: "none"
    },
    noBorderTopTableCell: {
        borderTop: "none"
    },
    boldText: {
        fontWeight: "bold"
    },
    productThumbnailGridItem: {
        padding: "0px"
    },
    bgNameChipGridItem: {
        padding: "0px",
        display: "content",
        flexDirection: "initial",
        minHeight: "25px",
        width: "100%",
        height: "auto"
    },
    extraBGNameChip: {
        paddingLeft: "5px",
        paddingRight: "5px",
        height: "20px",
        marginBottom: "3px"
    },
    chiplabel: {
        padding: "0px 0px 7px 0px"
    },
    bgNameChip: {
        maxWidth: "90px",
        height: "20px",
        textAlign: "left",
        whiteSpace: "nowrap",
        textOverflow: "ellipse",
        overflow: "hidden",
        marginLeft: "0px",
        marginRight: "6px",
        minWidth: "90px",
        marginBottom: "4px"
    },
    totalGridItem: {
        width: "20%",
        padding: "5px",
        border: `solid 1px ${COLOR_GREY_2}`,
        display: "flex",
        justifyContent: "center"
    },
    avatarRoot: {
        width: "35px",
        height: "35px"
    },
    tooltipBGNameGridItem: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "11rem"
    },
    tableDataInfoMessage: {
        fontWeight: "bold",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none"
    },
    input: {
        outline: "none !important",
        textAlign: "center",
        border: "none !important"
    }
});

export const RATableTheme = createTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: "5px",
                border: `solid 1px ${COLOR_GREY_2}`
            },
            stickyHeader: {
                backgroundColor: COLOR_GREY_2,
                color: COLOR_GRAPHITE_4
            },
            footer: {
                color: COLOR_BLACK,
                fontSize: "0.875rem"
            }
        },
        MuiTableFooter: {
            root: {
                position: "sticky",
                bottom: 0,
                backgroundColor: COLOR_WHITE
            }
        }
    }
});