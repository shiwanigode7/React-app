import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import BasicTableModel from "./BasicTableModel";
import ColumnModel from "./ColumnModel";
import { BasicTableStyles } from "./BasicTableStyles";
import { COLOR_GREY_2 } from "../../../constant/Colors";
import classNames from "classnames";

export default function BasicTable(basicTableProps: BasicTableModel) {
  const basicTableStyleClasses = BasicTableStyles();

  return (
    <div className={basicTableStyleClasses.tableSectionContainer}>

      <Paper className={basicTableStyleClasses.paper}
        elevation={basicTableProps.borderedRow ? 0 : 1}>
        <TableContainer className={classNames(basicTableStyleClasses.ScrollBarClass, basicTableStyleClasses.tableContainer)}>
          <Table
            stickyHeader
            style={{
              padding: basicTableProps.borderedRow ? "0px" : "10px",
              border: basicTableProps.borderedRow ? "solid 1px" : "",
              borderColor: basicTableProps.borderedRow ? COLOR_GREY_2 : ""
            }}>
            <TableHead
              style={{
                outline: `solid 1px ${COLOR_GREY_2}`
              }} >
              <TableRow>
                {
                  basicTableProps.columns.map((columnCell: ColumnModel) => (
                    <TableCell
                      key={columnCell.dataIndex}
                      align={columnCell.alignment}
                      style={{ width: columnCell.width }}
                      className={basicTableStyleClasses.tableHeadCell}>
                      {columnCell.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                basicTableProps.rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={basicTableProps.columns.length}
                      align={"center"}
                      className={basicTableStyleClasses.tableDataInfoMessage}>
                      {basicTableProps.customMessageOnEmpty}
                    </TableCell>
                  </TableRow>
                ) :
                  basicTableProps.rows.map((row: any) => (
                    <TableRow
                      key={row["id"]}
                      hover={true}>
                      {
                        basicTableProps.columns.map((columnCell: ColumnModel) => (
                          <TableCell
                            key={columnCell.dataIndex}
                            align={columnCell.alignment}
                            className={basicTableStyleClasses.tableDataCell}
                            style={{
                              width: columnCell.width
                            }}>
                            {row[columnCell.dataIndex]}
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div >
  )
}
