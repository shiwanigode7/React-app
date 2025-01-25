/**TSX file with theme declarations for the Collaspible table  */

import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_2, COLOR_WHITE } from "../constant/Colors";

export declare interface CollapsibleTableThemeProps {
    tableMaxHeight: string;
    tableWidth: string;
    tableBordered: boolean;
}

export const CollaspibleTableStyles = makeStyles(() => ({
    collapsiblePaperContainer: (themeProps: CollapsibleTableThemeProps) => ({
        overflow: "auto",
        margin: "20px",
        whiteSpace: "nowrap",
        maxHeight: themeProps.tableMaxHeight,
        width: "auto"
    }),
    collapsibleTableContainer: {
        height: "fit-content",
        maxHeight: "100%",
        width: "100%",
        overflow: "unset"
        /**TODO: setting the border for the table is displaying a redundant scroll bar which
         * is displayed even when screen is maximized, need to understand why
         */
    },
    collapsibleTableHead: {
        backgroundColor: COLOR_WHITE,
        borderBottom: `1px solid ${COLOR_GREY_2}`,
        padding: "8px",
        fontWeight: 700
    },
    collapsibleTableEmptyBody: {
        fontWeight: "bold",
        borderBottom: "none",
        padding: "8px"
    }
}));


export const CollpasibleTableRowStyles = makeStyles(() => ({
    collapsibleTableBodyArrowCell: {
        verticalAlign: "top",
        padding: "8px"
    },
    collapsibleTableIconButton: {
        padding: "4px"
    },
    collapsibleTableCell: {
        padding: "8px",
    }
}));