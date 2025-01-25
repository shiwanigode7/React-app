import { Grid, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import Thumbnail from "../../../../utils/Thumbnail/Thumbnail";
import TextWithTooltip from "../../../../utils/TextWithTooltip/TextWithTooltip";
import FTEModel from "../../../FTEModel";
import RunwayRowModel from "./RunwayRowModel";
import { RunwayRowStyles } from "./RunwayRowStyles";

export default function RunwayRow(runwayRowProps: RunwayRowModel) {

    const runwayName: string = runwayRowProps.runway.runwayName ? runwayRowProps.runway.runwayName.toString() : "";
    const thumbnail: string = runwayRowProps.runway.thumbnail ? runwayRowProps.runway.thumbnail.toString() : "";

    const runwayRowStyleClasses = RunwayRowStyles();

    // Declared this function to reduce the Cognitive Complexity
    function getStyleClass(index: number) {
        let styleClass = runwayRowStyleClasses.otherReleaseCell;
        if (1 === index) {
            styleClass = runwayRowStyleClasses.currentReleaseCell;
        }
        return styleClass;
    }

    function getFTENumber(inNumber: string): string {
        if (inNumber) {
            return inNumber;
        }
        return "";
    }

    function getFTEPercentage(inNumber: string): string {
        if (inNumber) {
            return `${inNumber}%`;
        }
        return "";
    }

    function getRunwayCells() {
        const tableCell: JSX.Element[] = [];
        runwayRowProps.releases.forEach((release: ReleaseModel, index: number) => {
            // Variable is true is FTE data is present for the release
            let isFTEPresent: boolean = false;
            runwayRowProps.fteList.forEach((fte: FTEModel) => {
                if ((runwayRowProps.businessGoalNodeId === fte.bgNodeId) && (fte.runwayNodeId === runwayRowProps.runway.nodeId) && (release.nodeId === fte.releaseNodeId)) {
                    isFTEPresent = true;
                    tableCell.push(
                        <TableCell className={getStyleClass(index)}>
                            {runwayRowProps.isPercentageView ? getFTEPercentage(fte.percentageNumber) : getFTENumber(fte.number)}
                        </TableCell >
                    )
                }
            })
            if (!isFTEPresent) {
                tableCell.push(
                    <TableCell className={getStyleClass(index)}>
                        {""}
                    </TableCell>
                )
            }
        })
        return tableCell;
    }

    return (
        <TableRow>
            <TableCell className={runwayRowStyleClasses.thumbnailCell}>
                <Grid container direction="row" spacing={1} className={runwayRowStyleClasses.runwayCell}>
                    <Grid item className={runwayRowStyleClasses.emptyGrid}></Grid>
                    <Grid item >
                        <Thumbnail altText="Runway Thumbnail" src={thumbnail} />
                    </Grid>
                    <Grid item className={runwayRowStyleClasses.runwayName}>
                        <TextWithTooltip
                            text={runwayName}
                            textAlign={"left"}
                            tooltipText={runwayName}
                            isTextBold={false}
                            tooltipPlacement="bottom" />
                    </Grid>
                </Grid>
            </TableCell>
            {getRunwayCells()}
        </TableRow>
    )
}