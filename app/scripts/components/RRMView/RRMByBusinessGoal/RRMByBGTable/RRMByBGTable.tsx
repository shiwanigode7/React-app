import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { BusinessGoalTableType } from "../../../../interfaces/InnovationInterface";
import { ScrollBarTheme } from "../../../../themes/TableTheme";
import ReleaseModel from "../../../settings/InnovationCadenceView/ReleaseModel";
import ActiveReleaseTableCellContent from "../../../utils/ActiveReleaseTableCellContent/ActiveReleaseTableCellContent";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";
import BusinessGoalRow from "./BusinessGoalRow/BusinessGoalRow";
import RRMByBGModel from "./RRMByBGTableModel";
import { RRMByBGTableStyles } from "./RRMByBGTableStyle";

export default function RRMByBGTable(rrmByBGTableProps: RRMByBGModel) {

    const scrollBarThemeClass = ScrollBarTheme();
    const rrmByBGTableStyleClasses = RRMByBGTableStyles();

    function getReleaseCellStyleClass(releaseIndex: number) {
        let styleClass: string = rrmByBGTableStyleClasses.inactiveReleaseCell;
        if (1 === releaseIndex) {
            styleClass = rrmByBGTableStyleClasses.activeReleaseCell;
        }
        return styleClass;
    }

    function getFiveTableCellsForTableHead() {
        return rrmByBGTableProps.releases.map((release: ReleaseModel, index: number) => {
            return (
                1 === index ?
                    <TableCell className={getReleaseCellStyleClass(index)} align="center">
                        <ActiveReleaseTableCellContent
                            text={release.name.substring(0, 7)}
                            tooltipText={release.name}
                            isTextBold={true}
                            tooltipPlacement="bottom" />
                    </TableCell>
                    :
                    <TableCell className={getReleaseCellStyleClass(index)} align="center">
                        <TextWithTooltip
                            text={release.name.substring(0, 7)}
                            tooltipText={release.name}
                            textAlign={"center"}
                            isTextBold={true}
                            tooltipPlacement="bottom" />
                    </TableCell>
            );
        });
    }

    return (
        <Paper className={rrmByBGTableStyleClasses.paper} elevation={0}>
            <TableContainer className={classNames(scrollBarThemeClass.ScrollBarClass, rrmByBGTableStyleClasses.tableContainer)}>
                <Table stickyHeader aria-label="collapsible table" className={rrmByBGTableStyleClasses.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={rrmByBGTableStyleClasses.emptyCell} />
                            {
                                getFiveTableCellsForTableHead().map((tableCell: JSX.Element) => (
                                    tableCell
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            0 !== rrmByBGTableProps.businessGoalList.length ?
                                rrmByBGTableProps.businessGoalList.map((businessGoal: BusinessGoalTableType) => {
                                    return (
                                        <BusinessGoalRow
                                            key={businessGoal.nodePath.toString()}
                                            businessGoal={businessGoal}
                                            handleClick={rrmByBGTableProps.handleClick}
                                            fteList={rrmByBGTableProps.fteList}
                                            releases={rrmByBGTableProps.releases}
                                            isPercentageView={rrmByBGTableProps.isPercentageView}
                                            runwayList={rrmByBGTableProps.runwayList} />
                                    );
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={6}
                                            align={"center"}
                                            className={rrmByBGTableStyleClasses.tableDataInfoMessage}>
                                            {"No Business Goal selected."}
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