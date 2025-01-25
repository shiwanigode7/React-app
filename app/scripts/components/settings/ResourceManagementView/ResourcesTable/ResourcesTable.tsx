import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { COLOR_AZURE_4, COLOR_LIGHT } from "../../../../constant/Colors";
import { RunwayModel } from "../../../../interfaces/InnovationInterface";
import ActiveReleaseTableCellContent from "../../../utils/ActiveReleaseTableCellContent/ActiveReleaseTableCellContent";
import InvisibleInputTextField from "../../../utils/InputFields/InvisibleInputTextField/InvisibleInputTextField";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";
import ThumbnailWithName from "../../../utils/ThumbnailWithName/ThumbnailWithName";
import ReleaseModel from "../../InnovationCadenceView/ReleaseModel";
import ResourceModel from "../ResourceModel";
import ResourcesTableModel from "./ResourcesTableModel";
import { ResourcesTableStyles, ResourceTableTheme } from "./ResourcesTableStyles";

export default function ResourcesTable(resourcesTableProps: ResourcesTableModel) {
    const resourcesTableStyleClasses = ResourcesTableStyles({
        isRunwayOverAllocated: resourcesTableProps.isRunwayOverAllocated
    });

    function getFiveTableCellsForResourceRow(runwayNodeId: string): JSX.Element[] {
        return resourcesTableProps.releasesList.map((release: ReleaseModel, index: number) => {
            const inputFieldName: string = getInputFieldName(runwayNodeId, release.nodeId);
            const defaultValue: string = getDefaultValue(inputFieldName);
            return (
                1 === index ?
                    <TableCell align="center" className={resourcesTableStyleClasses.activeCell}>
                        <InvisibleInputTextField
                            maxCharactersAllowed={2}
                            defaultValue={defaultValue}
                            name={inputFieldName}
                            handleBlur={resourcesTableProps.handleInputFieldBlurEvent}
                            backgroundColor={COLOR_AZURE_4} />
                    </TableCell> :
                    <TableCell align="center" className={resourcesTableStyleClasses.otherCell}>
                        <InvisibleInputTextField
                            maxCharactersAllowed={2}
                            defaultValue={defaultValue}
                            name={inputFieldName}
                            handleBlur={resourcesTableProps.handleInputFieldBlurEvent}
                            backgroundColor={COLOR_LIGHT} />
                    </TableCell>
            );
        });
    }

    function getInputFieldName(runwayNodeId: string, releaseNodeId: string): string {
        return runwayNodeId + "-#&&*#-" + releaseNodeId;
    }

    function getDefaultValue(inputFieldName: string): string {
        const splitedStrings: string[] = inputFieldName.split("-#&&*#-");
        const runwayNodeId: string = splitedStrings[0];
        const releaseNodeId: string = splitedStrings[1];
        const foundResource: ResourceModel | undefined = resourcesTableProps.resourcesList.find((resource: ResourceModel) =>
            resource.releaseNodeId === releaseNodeId && resource.runwayNodeId === runwayNodeId
        );
        return undefined === foundResource ? "" : foundResource.number;
    }

    function getFiveTableCellsForTableHeadRow(): JSX.Element[] {
        return resourcesTableProps.releasesList.map((release: ReleaseModel, index: number) => {
            return (
                1 === index ?
                    <TableCell className={getReleaseCellStyleClass(index)} align="center">
                        <ActiveReleaseTableCellContent
                            text={release.name.substring(0, 7)}
                            tooltipText={release.name}
                            isTextBold={true}
                            tooltipPlacement="bottom" />
                    </TableCell> :
                    <TableCell className={getReleaseCellStyleClass(index)} align="center">
                        <TextWithTooltip
                            text={release.name.substring(0, 7)}
                            tooltipText={release.name}
                            isTextBold={true}
                            tooltipPlacement="bottom" />
                    </TableCell>
            );
        });
    }

    function getReleaseCellStyleClass(releaseIndex: number): string {
        if (1 === releaseIndex) {
            return resourcesTableStyleClasses.activeReleaseCell;
        }
        return resourcesTableStyleClasses.otherReleasesCell;
    }

    function shouldShowRunwayRow(runwayNodeId: string): boolean {
        if (resourcesTableProps.showRunwayList && -1 !== resourcesTableProps.showRunwayList.indexOf(runwayNodeId)) {
            return true;
        }
        return false;
    }

    return (
        <div className={resourcesTableStyleClasses.tableSectionContainer}>
            <ThemeProvider theme={ResourceTableTheme}>
                <Paper className={resourcesTableStyleClasses.tablePaperContainer} elevation={0}>
                    <TableContainer className={classNames(resourcesTableStyleClasses.ScrollBarClass, resourcesTableStyleClasses.tableContainer)}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow className={resourcesTableStyleClasses.tableHeadRow}>
                                    <TableCell className={resourcesTableStyleClasses.blankCell} />
                                    {
                                        getFiveTableCellsForTableHeadRow().map((tableCell: JSX.Element) => (
                                            tableCell
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (0 === resourcesTableProps.showRunwayList.length || 0 === resourcesTableProps.runwaysList.length) ? (
                                        <TableRow>
                                            <TableCell colSpan={6}
                                                align={"center"}
                                                className={resourcesTableStyleClasses.tableDataInfoMessage}>
                                                {"No Runway selected."}
                                            </TableCell>
                                        </TableRow>
                                    ) :
                                        resourcesTableProps.runwaysList.map((runway: RunwayModel) => (
                                            shouldShowRunwayRow(runway.nodeId) ? (
                                                <TableRow>
                                                    <TableCell>
                                                        <ThumbnailWithName
                                                            thumbnailAltText="Runway Thumbnail"
                                                            src={runway.thumbnail?.toString()}
                                                            name={runway.runwayName}
                                                            isNameBold={false}
                                                            tooltipText={runway.runwayName}
                                                            tooltipPlacement="bottom"
                                                            nameGridItemMaxWidth="80%" />
                                                    </TableCell>
                                                    {
                                                        getFiveTableCellsForResourceRow(runway.nodeId).map((tableCell: JSX.Element) => (
                                                            tableCell
                                                        ))
                                                    }
                                                </TableRow>
                                            ) : null
                                        ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>
        </div>
    )
}