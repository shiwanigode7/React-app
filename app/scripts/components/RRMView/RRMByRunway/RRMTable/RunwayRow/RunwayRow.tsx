import React from "react";
import { Grid, TableCell, TableRow, Tooltip } from "@material-ui/core";
import BgRowForFTEView from "../BusinessGoalRow/BgRowForFTEView";
import { RunwayRowStyles } from "./RunwayRowStyles";
import RunwayRowModel from "./RunwayRowModel";
import BusinessGoalRowModel from "../BusinessGoalRow/BusinessGoalRowModel";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../../FTEModel";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import ResourceModel from "../../../../settings/ResourceManagementView/ResourceModel";
import { parseInt, parseFloat } from "../../../../../utils/Utilities";
import BgRowForPercentageView from "../BusinessGoalRow/BgRowForPercentageView";
import Thumbnail from "../../../../utils/Thumbnail/Thumbnail";
import CollapsibleViewArrowIcon from "../../../../utils/CollapsibleViewArrowIcon/CollapsibleViewArrowIcon";
import TextWithTooltip from "../../../../utils/TextWithTooltip/TextWithTooltip";

export default function RunwayRow(runwayRowProps: RunwayRowModel) {
  const runwayRowStyleClasses = RunwayRowStyles();
  function isOpen() {
    let open: boolean = false;
    if (runwayRowProps.showBGList && -1 !== runwayRowProps.showBGList.indexOf(runwayRowProps.nodeId)) {
      open = true;
    }
    return open;
  }

  function shouldShowBgs() {
    let showBGs = false;
    if (runwayRowProps.showBGList && -1 !== runwayRowProps.showBGList.indexOf(runwayRowProps.nodeId)) {
      showBGs = true;
    }
    return showBGs;
  }

  function getFiveTableCellsForRunwayRowForFTEView() {
    return runwayRowProps.releases?.map((release: ReleaseModel, index: number) => {
      const sumOfFTES: string = getSumOfFTEsForFTEView(release.nodeId).toString();
      const resourceNumber: string = getResourceNumber(release.nodeId);
      const cellContent: JSX.Element = getCellContent(sumOfFTES, parseFloat(sumOfFTES) > parseInt(resourceNumber), resourceNumber);
      return (
        <TableCell className={getStyleClass(index)} align="center">
          {cellContent}
        </TableCell>
      );
    });
  }

  function getFiveTableCellsForRunwayRowForPercentageView() {
    return runwayRowProps.releases?.map((release: ReleaseModel, index: number) => {
      let sumOfFTES: string = getSumOfFTEsForPercentageView(release.nodeId);
      const resourceNumber: string = getResourceNumber(release.nodeId);
      if (sumOfFTES) { sumOfFTES = sumOfFTES + "%"; }
      const cellContent: JSX.Element = getCellContent(sumOfFTES, parseFloat(sumOfFTES) > 100, resourceNumber);
      return (
        <TableCell className={getStyleClass(index)} align="center">
          {cellContent}
        </TableCell>
      );
    });
  }

  function getStyleClass(index: number) {
    let styleClass: string = runwayRowStyleClasses.tableCell;
    if (1 === index) {
      styleClass = runwayRowStyleClasses.activeCell;
    }
    return styleClass;
  }

  function getSumOfFTEsForFTEView(releaseNodeId: string) {
    let total: number = 0;
    runwayRowProps.businessGoalList.forEach((bg: BusinessGoalRowModel) => {
      const foundFTE: FTEModel | undefined = runwayRowProps.fteList?.find((fte: FTEModel) =>
        fte.releaseNodeId === releaseNodeId && fte.runwayNodeId === runwayRowProps.nodeId && fte.bgNodeId === bg.nodeId
      );
      if (undefined !== foundFTE) {
        total = total + parseFloat(foundFTE.number);
      }
    });
    let totalInString: string = "";
    if (0 !== total) {
      totalInString = (Math.round((total + Number.EPSILON) * 10) / 10).toString();
    }
    return totalInString;
  }

  function getSumOfFTEsForPercentageView(releaseNodeId: string) {
    let total: number = 0;
    runwayRowProps.businessGoalList.forEach((bg: BusinessGoalRowModel) => {
      const foundFTE: FTEModel | undefined = runwayRowProps.fteList?.find((fte: FTEModel) =>
        fte.releaseNodeId === releaseNodeId && fte.runwayNodeId === runwayRowProps.nodeId && fte.bgNodeId === bg.nodeId
      );
      if (undefined !== foundFTE) {
        total = total + parseFloat(foundFTE.percentageNumber);
      }
    });
    let totalInString: string = "";
    if (0 !== total) {
      totalInString = (Math.round((total + Number.EPSILON) * 10) / 10).toString();
    }
    return totalInString;
  }

  function getResourceNumber(releaseNodeId: string) {
    let resourceNumber: string = "";
    if (runwayRowProps.resourceList.length > 0) {
      const foundResource: ResourceModel | undefined = runwayRowProps.resourceList.find((resource: ResourceModel) =>
        resource.releaseNodeId === releaseNodeId);
      if (undefined !== foundResource) {
        resourceNumber = foundResource.number;
      }
    }
    return resourceNumber;
  }

  function getCellContent(sumOfFTEs: string, isWarningIconVisible: boolean, resourceNumber: string) {

    return <Grid container direction="row" className={runwayRowStyleClasses.ftesSumNumber}>
      <Grid item className={runwayRowStyleClasses.fteGrid}>{sumOfFTEs}</Grid>
      <Grid item className={runwayRowStyleClasses.warningIconGrid}>
        {isWarningIconVisible &&
          <Tooltip title={"Available: " + resourceNumber} placement="right" arrow>
            <WarningRoundedIcon className={runwayRowStyleClasses.warningIcon} />
          </Tooltip>
        }
      </Grid>
    </Grid>;
  }

  function getBGRows() {
    let bgRows: JSX.Element[] = runwayRowProps.businessGoalList.map((bg: BusinessGoalRowModel) => (
      <BgRowForFTEView
        name={bg.name}
        nodeId={bg.nodeId}
        thumbnail={bg.thumbnail}
        runwayNodeId={runwayRowProps.nodeId}
        handleInputFieldBlurEvent={runwayRowProps.handleInputFieldBlurEvent}
        handleAddNotes={runwayRowProps.handleAddNotes}
        fteList={runwayRowProps.fteList}
        isFTEEditable={runwayRowProps.isFTEEditable}
        releases={runwayRowProps.releases}
        isPercentageView={runwayRowProps.isPercentageView} />
    ))
    if (runwayRowProps.isPercentageView) {
      bgRows = runwayRowProps.businessGoalList.map((bg: BusinessGoalRowModel) => (
        <BgRowForPercentageView
          name={bg.name}
          nodeId={bg.nodeId}
          thumbnail={bg.thumbnail}
          runwayNodeId={runwayRowProps.nodeId}
          handleInputFieldBlurEvent={runwayRowProps.handleInputFieldBlurEvent}
          handleAddNotes={runwayRowProps.handleAddNotes}
          fteList={runwayRowProps.fteList}
          isFTEEditable={runwayRowProps.isFTEEditable}
          releases={runwayRowProps.releases}
          isPercentageView={runwayRowProps.isPercentageView} />
      ))
    }
    return bgRows;
  }
  return (
    <>
      <TableRow>
        <TableCell className={runwayRowStyleClasses.tableCell}>
          <Grid className={runwayRowStyleClasses.tableCellGridContainer} container direction="row" spacing={1}>

            <Grid item className={runwayRowStyleClasses.arrowIconGridItem}>
              <CollapsibleViewArrowIcon isOpen={isOpen()} handleClick={runwayRowProps.handleClick}
                nodeId={runwayRowProps.nodeId} />
            </Grid>

            <Grid item className={runwayRowStyleClasses.thumbnailGridItem}>
              <Thumbnail altText="Runway Thumbnail" src={runwayRowProps.thumbnail?.toString()} />
            </Grid>

            <Grid item className={runwayRowStyleClasses.runwayNameGridItem}>
              <TextWithTooltip
                text={runwayRowProps.name}
                tooltipText={runwayRowProps.name}
                isTextBold={false}
                textAlign={"left"}
                tooltipPlacement="bottom-start" />
            </Grid>

          </Grid>
        </TableCell>
        {
          runwayRowProps.isPercentageView ?
            getFiveTableCellsForRunwayRowForPercentageView()?.map((tableCell: JSX.Element) => (
              tableCell
            )) :
            getFiveTableCellsForRunwayRowForFTEView()?.map((tableCell: JSX.Element) => (
              tableCell
            ))
        }
      </TableRow>
      {
        shouldShowBgs() ? getBGRows() : null
      }
    </>
  )
}