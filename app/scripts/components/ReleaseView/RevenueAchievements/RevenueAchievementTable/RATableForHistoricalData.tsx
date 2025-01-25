import { Avatar, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, ThemeProvider, Tooltip } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { COLOR_BLACK, COLOR_EMERALD_2, COLOR_GREY_3, COLOR_LIGHT, COLOR_WHITE, RISK_SCORE_RED } from "../../../../constant/Colors";
import { ScrollBarTheme } from "../../../../themes/TableTheme";
import { parseFloat } from "../../../../utils/Utilities";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";
import { RABusinessGoalModel, RABusinessLineModel, RABusinessLineWithHistoricalDataModel, RAProductModel, RAQuarter } from "../RevenueAchievementModel";
import { RATableForHistoricalDataModel } from "./RevenueAchievementTableModel";
import { RATableTheme, RevenueAchievementTableStyles } from "./RevenueAchievementTableStyles";

export default function RATableForHistoricalData(raTableForHistoricalDataProps: RATableForHistoricalDataModel) {
    const ScrollBarThemeClass = ScrollBarTheme();
    const revenueAchievementTableStyleClasses = RevenueAchievementTableStyles();
    const CENTER: "left" | "right" | "inherit" | "center" | "justify" | undefined = "center";

    function shouldShowBLRow(blNodeId: string): boolean {
        if (raTableForHistoricalDataProps.showBusinessLineList
            && -1 !== raTableForHistoricalDataProps.showBusinessLineList.indexOf(blNodeId)) {
            return true;
        }
        return false;
    }

    function prepareTableHeaderRow(): JSX.Element {
        return (
            <TableRow>
                <TableCell width="33%" />
                <TableCell width="8%" align={CENTER}>
                    <TextWithTooltip
                        text="JOP (M$)"
                        isTextBold={false}
                        tooltipPlacement="bottom"
                        tooltipText="Jump of point" />
                </TableCell>
                <TableCell width="9%" align={CENTER}>
                    <TextWithTooltip
                        text="GOAL (M$)"
                        isTextBold={false}
                        tooltipPlacement="bottom"
                        tooltipText="Achieved Revenue" />
                </TableCell>
                <TableCell width="10%" align={CENTER} />
                <TableCell width="10%" align={CENTER}>
                    Q1
                </TableCell>
                <TableCell width="10%" align={CENTER}>
                    Q2
                </TableCell>
                <TableCell width="10%" align={CENTER}>
                    Q3
                </TableCell>
                <TableCell width="10%" align={CENTER}>
                    Q4
                </TableCell>
            </TableRow>
        );
    }

    function prepareFirstRow(raBusinessLine: RABusinessLineWithHistoricalDataModel): JSX.Element {
        const valueType: string = "Plan";
        return (
            <TableRow>
                {prepareTableCellWithBLName(raBusinessLine.raBusinessLine.name)}
                {prepareEmptyTableCellWithNoBorderBottom()}
                {prepareEmptyTableCellWithNoBorderBottom()}
                {prepareTableCellWithStaticText(valueType)}
                {prepareFourTableCellsWithNumber(valueType, raBusinessLine).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareTableCellWithBLName(name: string): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.nonEditableCells,
                revenueAchievementTableStyleClasses.boldText,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell,
                revenueAchievementTableStyleClasses.blNameGridItem)} align="left">
                {name}
            </TableCell>
        );
    }

    function prepareEmptyTableCellWithNoBorderBottom(): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.nonEditableCells,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell)} align={CENTER} />
        );
    }

    function prepareTableCellWithStaticText(text: string): JSX.Element {
        return (
            <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align="right">
                {text}
            </TableCell>
        );
    }

    function prepareFourTableCellsWithNumber(valueType: string, raBusinessLine: RABusinessLineWithHistoricalDataModel): JSX.Element[] {
        const tableCellsWithNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const quarter: string = "Q" + i;
            let number: string = "";
            if ("Plan" === valueType) {
                number = (raBusinessLine[quarter] as RAQuarter).plan;
            } else if ("Actual" === valueType) {
                number = (raBusinessLine[quarter] as RAQuarter).actual;
            }

            if ("Actual" === valueType) {
                const bgColor: string = getBgColor(valueType, raBusinessLine, quarter);
                tableCellsWithNumberList.push(
                    prepareTableCellsWithNumber(number, bgColor)
                );
            } else {
                tableCellsWithNumberList.push(
                    prepareTableCellsWithNumber(number, COLOR_GREY_3)
                );
            }
        }
        return tableCellsWithNumberList;
    }

    function getBgColor(valueType: string, raBusinessLine: RABusinessLineWithHistoricalDataModel, quarter: string): string {
        let bgColor: string = COLOR_GREY_3;
        if ("Actual" === valueType) {
            const planValue: string = (raBusinessLine[quarter] as RAQuarter).plan;
            const actualValue: string = (raBusinessLine[quarter] as RAQuarter).actual;

            if ("0" === planValue || !planValue || "0" === actualValue || !actualValue) {
                bgColor = COLOR_GREY_3;
            } else if (parseFloat(planValue) > parseFloat(actualValue)) {
                bgColor = RISK_SCORE_RED;
            } else {
                bgColor = COLOR_EMERALD_2;
            }
        }
        return bgColor;
    }

    function prepareSecondRow(raBusinessLine: RABusinessLineWithHistoricalDataModel): JSX.Element {
        const valueType: string = "Actual";
        return (
            <TableRow>
                {prepareTableCellWithProductThumbnails(raBusinessLine.raBusinessLine)}
                {prepareTableCellsWithNumberWithNoTopBorder(raBusinessLine.jop)}
                {prepareTableCellsWithNumberWithNoTopBorder(raBusinessLine.goal)}
                {prepareTableCellWithStaticText(valueType)}
                {prepareFourTableCellsWithNumber(valueType, raBusinessLine).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareTableCellsWithNumberWithNoTopBorder(number: string): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.secondRowtableCell,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align={CENTER}
                style={{ backgroundColor: COLOR_GREY_3 }}>
                {number}
            </TableCell>
        );
    }

    function prepareTableCellsWithNumber(number: string, bgColor: string): JSX.Element {
        const color: string = getColor(bgColor);
        return (
            <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                style={{ backgroundColor: bgColor, color: color }}>
                {number}
            </TableCell>
        );
    }

    function getColor(bgColor: string): string {
        if (COLOR_GREY_3 !== bgColor) {
            return COLOR_LIGHT;
        }
        return COLOR_BLACK;
    }

    function prepareTableCellWithProductThumbnails(businessLine: RABusinessLineModel): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.secondRowtableCell,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align={CENTER}>
                <Grid container direction="row" spacing={1}>
                    {
                        businessLine.productsList.map((product: RAProductModel) => (
                            <Grid item className={revenueAchievementTableStyleClasses.productThumbnailGridItem}>
                                <Tooltip title={product.name} arrow placement="bottom">
                                    <Avatar
                                        src={product.thumbnail}
                                        variant="circular"
                                        className={revenueAchievementTableStyleClasses.avatarRoot} />
                                </Tooltip>
                            </Grid>
                        ))
                    }
                </Grid>
            </TableCell>
        );
    }

    function prepareThirdRow(raBusinessLine: RABusinessLineWithHistoricalDataModel): JSX.Element {
        return (
            <TableRow>
                {prepareTableCellWithBGName(raBusinessLine.raBusinessLine)}
                {prepareEmptyTableCellWithNoTopBorder()}
                {prepareEmptyTableCellWithNoTopBorder()}
                {prepareTableCellWithStaticText("%")}
                {prepareTableCellWithPercentageNumber(raBusinessLine).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareTableCellWithBGName(businessLine: RABusinessLineModel): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.nonEditableCells,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align="left">
                <Grid container direction="row" spacing={1}>
                    <Grid item className={revenueAchievementTableStyleClasses.bgNameChipGridItem}>
                        {
                            businessLine.businessGoalsList.map((bg: RABusinessGoalModel, index: number) => (
                                (index < 3) && (
                                    <Tooltip title={bg.name}>
                                        <Chip className={revenueAchievementTableStyleClasses.bgNameChip}
                                            label={bg.name} />
                                    </Tooltip>
                                )
                            ))
                        }
                        {
                            businessLine.businessGoalsList.length > 3 ? (
                                <Tooltip arrow placement="bottom" title={
                                    <Grid container direction="column" spacing={1}>
                                        {
                                            businessLine.businessGoalsList.map((bg: RABusinessGoalModel, index: number) => (
                                                index >= 3 &&
                                                <Grid item
                                                    className={revenueAchievementTableStyleClasses.tooltipBGNameGridItem}>
                                                    {bg.name}
                                                </Grid>
                                            ))
                                        }

                                    </Grid>
                                }>
                                    <Chip className={revenueAchievementTableStyleClasses.extraBGNameChip}
                                        classes={{
                                            label: revenueAchievementTableStyleClasses.chiplabel
                                        }}
                                        label={"..."} />
                                </Tooltip>
                            ) : null
                        }
                    </Grid>
                </Grid>
            </TableCell>
        );
    }

    function prepareEmptyTableCellWithNoTopBorder(): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.nonEditableCells,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align={CENTER} />
        );
    }

    function prepareTableCellWithPercentageNumber(raBusinessLine: RABusinessLineWithHistoricalDataModel): JSX.Element[] {
        const tableCellWithPercentageNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const percentageNumber: number = calculatePercentage(raBusinessLine, "Q" + i);
            tableCellWithPercentageNumberList.push(
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                    style={{ color: percentageNumber >= 100 ? COLOR_EMERALD_2 : RISK_SCORE_RED }} >
                    {0 !== percentageNumber ? percentageNumber.toString() + "%" : ""}
                </TableCell>
            )
        }
        return tableCellWithPercentageNumberList;
    }

    function calculatePercentage(raBusinessLine: RABusinessLineWithHistoricalDataModel, quarter: string): number {
        const planValue: string = (raBusinessLine[quarter] as RAQuarter).plan;
        const actualValue: string = (raBusinessLine[quarter] as RAQuarter).actual;
        return "0" === planValue || !planValue || "0" === actualValue || !actualValue
            ? 0 : Math.round((parseFloat(actualValue) / parseFloat(planValue)) * 100);
    }

    function prepareTableFooterFirstRow(): JSX.Element {
        return (
            <TableRow>
                {prepareTableCellWithTotalsText()}
                {prepareTableCellWithStaticText("Plan")}
                {prepareFourTableCellWithPlanSumNumber().map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow >
        );
    }

    function prepareTableCellWithTotalsText(): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.nonEditableCells,
                revenueAchievementTableStyleClasses.boldText,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell)}
                colSpan={3} align="right">
                Totals
            </TableCell>
        );
    }

    function prepareFourTableCellWithPlanSumNumber(): JSX.Element[] {
        const fourTableCellWithSumNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const quarter: string = "Q" + i;
            const totalPlan: number = calculateSum(quarter, "Plan");
            fourTableCellWithSumNumberList.push(
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}>
                    {0 === totalPlan ? "" : parseFloat(totalPlan.toString()).toFixed(2)}
                </TableCell>
            );
        }
        return fourTableCellWithSumNumberList;
    }

    function calculateSum(quarter: string, valueType: string): number {
        let sum: number = 0;

        raTableForHistoricalDataProps.raBusinessLinesWithHistoricalDataList.forEach((raBusinessLine: RABusinessLineWithHistoricalDataModel) => {
            const planValue: string = (raBusinessLine[quarter] as RAQuarter).plan;
            const actualValue: string = (raBusinessLine[quarter] as RAQuarter).actual;
            if ("Plan" === valueType) {
                sum = sum + parseFloat(planValue);
            } else {
                sum = sum + parseFloat(actualValue);
            }
        });
        return sum;
    }

    function prepareTableFooterSecondRow(): JSX.Element {
        return (
            <TableRow>
                {prepareEmptyTableCell()}
                {prepareTableCellWithStaticText("Actual")}
                {prepareFourTableCellWithActualSumNumber().map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareEmptyTableCell(): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.noBorderBottomTableCell,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} colSpan={3} />
        );
    }

    function prepareFourTableCellWithActualSumNumber(): JSX.Element[] {
        const fourTableCellWithSumNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const quarter: string = "Q" + i;
            const totalPlan: number = calculateSum(quarter, "Plan");
            const totalActual: number = calculateSum(quarter, "Actual");
            const bgColor: string = getSumBgColor(totalPlan, totalActual);

            fourTableCellWithSumNumberList.push(
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                    style={{
                        backgroundColor: bgColor,
                        color: COLOR_WHITE === bgColor ? COLOR_BLACK : COLOR_WHITE
                    }}>
                    {0 === totalActual ? "" : parseFloat(totalActual.toString()).toFixed(2)}
                </TableCell>
            );
        }
        return fourTableCellWithSumNumberList;
    }

    function getSumBgColor(totalPlan: number, totalActual: number): string {
        let bgColor: string;
        if (0 === totalPlan || 0 === totalActual) {
            bgColor = COLOR_GREY_3;
        } else if (totalPlan > totalActual) {
            bgColor = RISK_SCORE_RED;
        } else {
            bgColor = COLOR_EMERALD_2;
        }
        return bgColor;
    }

    function prepareTableFooterThirdRow(): JSX.Element {
        return (
            <TableRow>
                {prepareEmptyTableCell()}
                {prepareTableCellWithStaticText("%")}
                {prepareFourTableCellWithTotalPercentageNumber().map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareFourTableCellWithTotalPercentageNumber(): JSX.Element[] {
        const fourTableCellWithTotalPercentageNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const quarter: string = "Q" + i;
            const totalPlan: number = calculateSum(quarter, "Plan");
            const totalActual: number = calculateSum(quarter, "Actual");
            const percentageNumber: number = calculateTotalPercentage(totalPlan, totalActual);

            fourTableCellWithTotalPercentageNumberList.push(
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                    style={{ color: percentageNumber >= 100 ? COLOR_EMERALD_2 : RISK_SCORE_RED }} >
                    {0 !== percentageNumber ? percentageNumber.toString() + "%" : ""}
                </TableCell>
            );
        }
        return fourTableCellWithTotalPercentageNumberList;
    }

    function calculateTotalPercentage(totalPlan: number, totalActual: number): number {
        return 0 === totalPlan ? 0 : Math.round((totalActual / totalPlan) * 100);
    }

    return (
        <div className={revenueAchievementTableStyleClasses.mainDiv}>
            <ThemeProvider theme={RATableTheme}>
                <Paper className={revenueAchievementTableStyleClasses.paper} elevation={0}>
                    <TableContainer className={classNames(ScrollBarThemeClass.ScrollBarClass,
                        revenueAchievementTableStyleClasses.tableContainer)}>
                        <Table stickyHeader aria-label="collapsible table" style={{ backgroundColor: COLOR_GREY_3 }}>
                            <TableHead>
                                {prepareTableHeaderRow()}
                            </TableHead>
                            {
                                0 !== raTableForHistoricalDataProps.showBusinessLineList.length ?
                                    <>
                                        <TableBody>
                                            {raTableForHistoricalDataProps.raBusinessLinesWithHistoricalDataList.map((raBusinessLine: RABusinessLineWithHistoricalDataModel) => (
                                                shouldShowBLRow(raBusinessLine.raBusinessLine.nodeId) ? (
                                                    <>
                                                        {prepareFirstRow(raBusinessLine)}
                                                        {prepareSecondRow(raBusinessLine)}
                                                        {prepareThirdRow(raBusinessLine)}
                                                    </>
                                                ) : null
                                            )
                                            )}
                                        </TableBody>
                                        <TableFooter style={{ backgroundColor: COLOR_GREY_3 }}>
                                            {prepareTableFooterFirstRow()}
                                            {prepareTableFooterSecondRow()}
                                            {prepareTableFooterThirdRow()}
                                        </TableFooter>
                                    </> :
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={8}
                                                align={CENTER}
                                                className={revenueAchievementTableStyleClasses.tableDataInfoMessage}>
                                                {"No Business Line selected."}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                            }

                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>
        </div>
    )
}