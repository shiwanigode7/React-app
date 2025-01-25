/**TSX file for reusable Collapsible Table */
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import React, { useEffect, useState } from "react";
import { CollpasibleTableRowStyles } from "../../themes/CollapsibleTableTheme";
import { CollapsibleTableHeadInterface } from "./CollapsibleTable";

/**Interface for the row component */
declare interface TableRowComponentProps {
    rowData: any;
    tableHeaderData: CollapsibleTableHeadInterface[];
    isExpanded: boolean;
}

export function TableRowComponent(tableRowComponentProps: TableRowComponentProps) {
    /**Styles import */
    const CollapsibleTableClasses = CollpasibleTableRowStyles();

    /**State to handle expansion of row */
    const [expanded, setExpanded] = useState<boolean>(tableRowComponentProps.isExpanded);

    useEffect(() => {
        setExpanded(tableRowComponentProps.isExpanded);
    }, [tableRowComponentProps.isExpanded]);

    return (
        <TableRow>
            <TableCell
                align={"center"}
                className={CollapsibleTableClasses.collapsibleTableBodyArrowCell}
            >
                <IconButton
                    onClick={() => { setExpanded(!expanded) }}
                    className={CollapsibleTableClasses.collapsibleTableIconButton}
                >
                    {
                        expanded ?
                            <ArrowDropDownRoundedIcon /> :
                            <ArrowRightRoundedIcon />
                    }
                </IconButton>
            </TableCell>
            {
                tableRowComponentProps.tableHeaderData.map((columnData: CollapsibleTableHeadInterface) => {
                    return (
                        <TableCell
                            key={columnData.dateKey}
                            className={CollapsibleTableClasses.collapsibleTableCell}
                            align={expanded ?
                                columnData.hAlignmentOnExpand :
                                columnData.hAlignmentOnCollapse
                            }
                            style={{
                                verticalAlign: expanded ?
                                    columnData.hAlignmentOnExpand :
                                    columnData.vAlignmentOnCollapse,
                                width: columnData.cellWidth
                            }}
                        >
                            {expanded ?
                                tableRowComponentProps.rowData[columnData.dateKey].expanded :
                                tableRowComponentProps.rowData[columnData.dateKey].collapsed
                            }
                        </TableCell>
                    );
                })
            }
        </TableRow>
    );
}