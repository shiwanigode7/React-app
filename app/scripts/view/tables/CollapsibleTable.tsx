/**TSX file for reusable Collapsible Table */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { CollapsibleTableThemeProps, CollaspibleTableStyles } from "../../themes/CollapsibleTableTheme";
import { TableRowComponent } from "./CollapsibleTableRow";

/**Interface for the table header data */
export declare interface CollapsibleTableHeadInterface {
    dateKey: string;
    displayName: string;
    /**Horizontal alignment */
    hAlignmentOnCollapse: "left" | "right" | "inherit" | "center" | "justify" | undefined;
    hAlignmentOnExpand: "left" | "right" | "inherit" | "center" | "justify" | undefined;
    /**Vertical Alignment */
    vAlignmentOnCollapse: string;
    vAlignmentOnExpand: string;
    cellWidth: string;
}

/**Interface for the table body data to be passed */
export declare interface CollapsibleTableBodyInterface {
    expanded: any;
    collapsed: any;
}

/**Interface for the props to be passed to the component */
declare interface CollapsibleTableInterface {
    tableData: any[];
    tableHeaderData: CollapsibleTableHeadInterface[];
    tableMaxHeight: string;
    tableWidth: string;
    tableEmptyMessage: string;
    tableBordered: boolean;
}

export function CollapsibleTable(inputProps: CollapsibleTableInterface) {
    /**Defining the props for the make styles */
    const themeProps: CollapsibleTableThemeProps = {
        tableMaxHeight: inputProps.tableMaxHeight,
        tableWidth: inputProps.tableWidth,
        tableBordered: inputProps.tableBordered
    };
    /**Styles import */
    const CollapsibleTableClasses = CollaspibleTableStyles(themeProps);

    return (
        <Paper className={CollapsibleTableClasses.collapsiblePaperContainer}>
            <TableContainer className={CollapsibleTableClasses.collapsibleTableContainer}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align={"center"}
                                className={CollapsibleTableClasses.collapsibleTableHead}
                            >
                                <ArrowDropDownRoundedIcon />
                            </TableCell>
                            {
                                inputProps.tableHeaderData.map((columnData: CollapsibleTableHeadInterface) => {
                                    return (
                                        <TableCell
                                            key={columnData.dateKey}
                                            className={CollapsibleTableClasses.collapsibleTableHead}
                                        >
                                            {columnData.displayName}
                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            0 !== inputProps.tableData.length ?
                                inputProps.tableData.map((rowData) => {
                                    return (
                                        <TableRowComponent
                                            key={rowData["id"]}
                                            rowData={rowData}
                                            tableHeaderData={inputProps.tableHeaderData}
                                            isExpanded={undefined === rowData["isExpanded"] ? false : rowData["isExpanded"]}
                                        />)
                                })
                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={inputProps.tableHeaderData.length + 1}
                                            align={"center"}
                                            className={CollapsibleTableClasses.collapsibleTableEmptyBody}
                                        >
                                            {inputProps.tableEmptyMessage}
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}