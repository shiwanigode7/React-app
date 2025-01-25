import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_AZURE_4, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_GREY_2, COLOR_GREY_3, COLOR_LIGHT } from "../../../../../constant/Colors";

const TABLE_CELL_STYLE: Object = {
    border: `solid 1px ${COLOR_GREY_2}`,
    padding: "10px"
};

const COLLAPSED_ROW_CELL_STYLE: Object = {
    border: `solid 1px ${COLOR_GREY_2}`,
    padding: "10px",
    backgroundColor: COLOR_GREY_3
};

export const BusinessGoalRowStyles = makeStyles({
    emptySpaceBeforeBGThumbnail: {
        width: "13%"
    },
    bgNameCell: {
        borderLeft: "none",
        ...COLLAPSED_ROW_CELL_STYLE
    },
    editableTableCell: {
        ...TABLE_CELL_STYLE,
        background: COLOR_LIGHT,
        color: COLOR_GRAPHITE_1,
        "&:hover": {
            border: `solid 1px ${COLOR_AZURE_2}`
        }
    },
    nonEditableTableCell: {
        ...TABLE_CELL_STYLE,
        background: COLOR_GREY_3,
        color: COLOR_GRAPHITE_4
    },
    activeCell: {
        ...TABLE_CELL_STYLE,
        backgroundColor: COLOR_AZURE_4,
        "&:hover": {
            border: `solid 1px ${COLOR_AZURE_2}`
        }
    },
    nonEditableActiveCell: {
        ...TABLE_CELL_STYLE,
        backgroundColor: COLOR_AZURE_4,
    },
    thumbnailGridItem: {
        paddingLeft: "0px"
    },
    bgNameGridItem: {
        width: "70%",
        marginTop: "8px"
    },
    tableCellGridContainer: {
        flexWrap: "nowrap"
    },
    notesIconGridStyle: {
        marginTop: "2%",
        width: "20%"
    },
    inputGridStyle: {
        width: "60%"
    },
    iconButton: {
        padding: "2px"
    }
});