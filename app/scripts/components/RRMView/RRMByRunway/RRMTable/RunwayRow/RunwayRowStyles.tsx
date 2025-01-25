import { makeStyles } from "@material-ui/styles";
import { COLOR_AMBER_2, COLOR_AZURE_4, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_GREY_3 } from "../../../../../constant/Colors";

const TABLE_CELL_STYLE: Object = {
    border: `solid 1px ${COLOR_GREY_2}`,
    padding: "10px"
};

export const RunwayRowStyles = makeStyles({
    tableCell: {
        ...TABLE_CELL_STYLE,
        background: COLOR_GREY_3,
        color: COLOR_GRAPHITE_4
    },
    warningIconGrid: {
        width: "20%",
        marginTop: "2%"
    },
    fteGrid: {
        width: "60%",
        display: "flex",
        justifyContent: "flex-end"
    },
    activeCell: {
        ...TABLE_CELL_STYLE,
        backgroundColor: COLOR_AZURE_4
    },
    arrowIconGridItem: {
        padding: "12px 0px 4px 0px"
    },
    thumbnailGridItem: {
        paddingLeft: "0px"
    },
    runwayNameGridItem: {
        width: "65%",
        marginTop: "8px"
    },
    ftesSumNumber: {
        alignItems: "center",
        justifyContent: "flex-start"
    },
    warningIcon: {
        color: COLOR_AMBER_2
    },
    tableCellGridContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap"
    },
    warningMessage: {
        fontWeight: "bold",
        color: "#b58100"
    },
    OverAllocationBox: {
        backgroundColor: "rgb(255,250,205)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px"
    }
});