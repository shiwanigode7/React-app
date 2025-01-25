import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { ScrollBarTheme } from "../../../../themes/TableTheme";
import ReleaseModel from "../../../settings/InnovationCadenceView/ReleaseModel";
import RRMTableModel from "./RRMTableModel";
import { RRMTableStyles } from "./RRMTableStyles";
import RunwayRow from "./RunwayRow/RunwayRow";
import RunwayRowModel from "./RunwayRow/RunwayRowModel";
import classNames from "classnames";
import FTEModel from "../../FTEModel";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";
import ActiveReleaseTableCellContent from "../../../utils/ActiveReleaseTableCellContent/ActiveReleaseTableCellContent";

export default function RRMTable(rrmTableProps: RRMTableModel) {
    const ScrollBarThemeClass = ScrollBarTheme();
    const rrmTableStyleClasses = RRMTableStyles();
    function getReleaseCellStyleClass(releaseIndex: number) {
        let styleClass: string = rrmTableStyleClasses.inactiveReleaseCell;
        if (1 === releaseIndex) {
            styleClass = rrmTableStyleClasses.activeReleaseCell;
        }
        return styleClass;
    }

    function shouldShowRunwayRow(runwayNodeId: string) {
        let showRunwayRow: boolean = false;
        if (rrmTableProps.showRunwayList && -1 !== rrmTableProps.showRunwayList.indexOf(runwayNodeId)) {
            showRunwayRow = true;
        }
        return showRunwayRow;
    }

    function filterFTEList(runwayNodeId: string, releases: ReleaseModel[]) {
        const fteList: FTEModel[] = [];
        releases.forEach((release: ReleaseModel) => {
            const filteredFTEList: FTEModel[] = rrmTableProps.fteList.filter((fte: FTEModel) => fte.runwayNodeId === runwayNodeId
                && fte.releaseNodeId === release.nodeId);
            fteList.push(...filteredFTEList);
        });
        return fteList;
    }

    function getFiveTableCellsForTableHead() {
        return rrmTableProps.releases.map((release: ReleaseModel, index: number) => {
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
                            isTextBold={true}
                            tooltipPlacement="bottom"
                            textAlign="center" />
                    </TableCell>
            );
        });
    }
    return (
        <div className={rrmTableStyleClasses.mainDiv}>
            <Paper  className={rrmTableStyleClasses.paper} style={{height: rrmTableProps.isRunwayOverAllocated ? "71%" : "85%"}} elevation={0} >
                <TableContainer className={classNames(ScrollBarThemeClass.ScrollBarClass, rrmTableStyleClasses.tableContainer)}>
                    <Table stickyHeader aria-label="collapsible table" className={rrmTableStyleClasses.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={rrmTableStyleClasses.emptyCell} />
                                {
                                    getFiveTableCellsForTableHead().map((tableCell: JSX.Element) => (
                                        tableCell
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !((-1 !== rrmTableProps.showRunwayList.indexOf("no_runways") && 1 === rrmTableProps.showRunwayList.length) || 0 === rrmTableProps.showRunwayList.length) ?
                                    rrmTableProps.runwayRowList.map((runwayRow: RunwayRowModel) => (
                                        shouldShowRunwayRow(runwayRow.nodeId) ?
                                            <RunwayRow
                                                businessGoalList={runwayRow.businessGoalList}
                                                handleClick={rrmTableProps.handleClick}
                                                name={runwayRow.name}
                                                nodeId={runwayRow.nodeId}
                                                thumbnail={runwayRow.thumbnail}
                                                showBGList={rrmTableProps.showBGList}
                                                handleInputFieldBlurEvent={rrmTableProps.handleInputFieldBlurEvent}
                                                handleAddNotes={rrmTableProps.handleAddNotes}
                                                fteList={filterFTEList(runwayRow.nodeId, rrmTableProps.releases)}
                                                releases={rrmTableProps.releases}
                                                resourceList={runwayRow.resourceList}
                                                isFTEEditable={rrmTableProps.isFTEEditable}
                                                isPercentageView={rrmTableProps.isPercentageView}
                                            /> : null
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={6}
                                                align={"center"}
                                                className={rrmTableStyleClasses.tableDataInfoMessage}>
                                                {"No Runway selected."}
                                            </TableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

