import { Avatar, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, ThemeProvider, Tooltip } from "@material-ui/core";
import classNames from "classnames";
import React, { createRef, useEffect, useState } from "react";
import { COLOR_EMERALD_2, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_GREY_3, COLOR_LIGHT, RISK_SCORE_RED } from "../../../../constant/Colors";
import { ScrollBarTheme } from "../../../../themes/TableTheme";
import { parseFloat } from "../../../../utils/Utilities";
import InvisibleInputTextField from "../../../utils/InputFields/InvisibleInputTextField/InvisibleInputTextField";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";
import { RABusinessGoalModel, RABusinessLineModel, RAProductModel, RAQuarter, RevenueAchievementModel } from "../RevenueAchievementModel";
import RevenueAchievementTableModel from "./RevenueAchievementTableModel";
import { RATableTheme, RevenueAchievementTableStyles } from "./RevenueAchievementTableStyles";

export default function RevenueAchievementTable(revenueAchievementTableProps: RevenueAchievementTableModel) {
    const STRING_SEPERATOR: string = "-#&&*#-";

    const ScrollBarThemeClass = ScrollBarTheme();
    const revenueAchievementTableStyleClasses = RevenueAchievementTableStyles();
    const CENTER: "left" | "right" | "inherit" | "center" | "justify" | undefined = "center";
    const LEFT: "left" | "right" | "inherit" | "center" | "justify" | undefined = "left";
    const RIGHT: "left" | "right" | "inherit" | "center" | "justify" | undefined = "right";

    const [allRevenueAchievements, setAllRevenueAchievements] = useState<RevenueAchievementModel[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>(revenueAchievementTableProps.selectedYear);

    useEffect(() => {
        setAllRevenueAchievements(revenueAchievementTableProps.allRevenueAchievements);
        setSelectedYear(revenueAchievementTableProps.selectedYear);
    }, [revenueAchievementTableProps.selectedYear, revenueAchievementTableProps.allRevenueAchievements]);

    function shouldShowBLRow(blNodeId: string): boolean {
        if (revenueAchievementTableProps.showBusinessLineList
            && -1 !== revenueAchievementTableProps.showBusinessLineList.indexOf(blNodeId)) {
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
                        textAlign="center"
                        tooltipText="Jump of point" />
                </TableCell>
                <TableCell width="9%" align={CENTER}>
                    <TextWithTooltip
                        text="GOAL (M$)"
                        isTextBold={false}
                        textAlign="center"
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

    function prepareFirstRow(businessLine: RABusinessLineModel): JSX.Element {
        const valueType: string = "Plan";
        return (
            <TableRow>
                {prepareTableCellWithBLName(businessLine.name)}
                {prepareTableCellWithJOPInputField(businessLine.nodeId)}
                {prepareTableCellWithGOALInputField(businessLine.nodeId)}
                {prepareTableCellWithStaticText(valueType)}
                {prepareFourTableCellsWithInvisibleInputField(valueType, businessLine.nodeId).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareTableCellWithBLName(name: string): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.tableCell,
                revenueAchievementTableStyleClasses.boldText,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell,
                revenueAchievementTableStyleClasses.blNameGridItem)} align={LEFT}>
                {name}
            </TableCell>
        );
    }

    function prepareTableCellWithStaticText(text: string): JSX.Element {
        return (
            <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={RIGHT}>
                {text}
            </TableCell>
        );
    }

    function prepareFourTableCellsWithInvisibleInputField(valueType: string, blNodeId: string): JSX.Element[] {
        const tableCellsWithInvisibleInputFieldsList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const quarter: string = "Q" + i;
            const inputFieldName: string = getInputFieldName(valueType, quarter, blNodeId);
            const defaultValue: string = getDefaultValue(inputFieldName);
            const bgColor: string = getBgColor(valueType, blNodeId, quarter);
            const color: string = getColor(bgColor);

            tableCellsWithInvisibleInputFieldsList.push(
                <TableCell className={!revenueAchievementTableProps.isRAEditable ? revenueAchievementTableStyleClasses.ediableTableCell : revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                    style={{ backgroundColor: bgColor }}>
                    <InvisibleInputTextField
                        name={inputFieldName}
                        backgroundColor={bgColor}
                        defaultValue={defaultValue}
                        handleBlur={revenueAchievementTableProps.handleQuarterFieldBlur}
                        maxCharactersAllowed={6}
                        disabled={revenueAchievementTableProps.isRAEditable}
                        color={color} />
                </TableCell>
            );
        }
        return tableCellsWithInvisibleInputFieldsList;
    }

    function getInputFieldName(valueType: string, quarter: string, blNodeId: string): string {
        return valueType + STRING_SEPERATOR + quarter + STRING_SEPERATOR + blNodeId;
    }

    function getDefaultValue(fieldName: string): string {
        const splitedStrings: string[] = fieldName.split(STRING_SEPERATOR);
        const valueType: string = splitedStrings[0];
        const quarter: string = splitedStrings[1];
        const blNodeId: string = splitedStrings[2];
        let [planValue, actualValue] = getPlanAndActualValues(blNodeId, quarter);

        const defaultValue: string = "Plan" === valueType ? planValue : actualValue;
        return defaultValue;
    }

    function getBgColor(valueType: string, blNodeId: string, quarter: string): string {
        let bgColor: string = COLOR_LIGHT;
        if ("Actual" === valueType) {
            const [planValue, actualValue] = getPlanAndActualValues(blNodeId, quarter);
            if ("0" === planValue || !planValue || "0" === actualValue || !actualValue) {
                bgColor = !revenueAchievementTableProps.isRAEditable ? COLOR_LIGHT : COLOR_GREY_3;
            } else if (parseFloat(planValue) > parseFloat(actualValue)) {
                bgColor = RISK_SCORE_RED;
            } else {
                bgColor = COLOR_EMERALD_2;
            }
        }
        if ("Plan" === valueType) {
            bgColor = !revenueAchievementTableProps.isRAEditable ? COLOR_LIGHT : COLOR_GREY_3;
        }
        return bgColor;
    }

    function getColor(bgColor: string): string {
        if (COLOR_LIGHT !== bgColor) {
            return COLOR_LIGHT;
        }
        return COLOR_GRAPHITE_1;
    }

    function getPlanAndActualValues(blNodeId: string, quarter: string): readonly [string, string] {
        const raData: RevenueAchievementModel = getRevenueAchievementData(blNodeId);
        const quarterData: RAQuarter = raData[quarter] as RAQuarter;
        const planValue: string = quarterData.plan;
        const actualValue: string = quarterData.actual;
        return [planValue, actualValue] as const;
    }

    function prepareSecondRow(businessLine: RABusinessLineModel): JSX.Element {
        const valueType: string = "Actual";
        return (
            <TableRow>
                {prepareTableCellWithProductThumbnails(businessLine)}
                {prepareTableCellWithStaticText(valueType)}
                {prepareFourTableCellsWithInvisibleInputField(valueType, businessLine.nodeId).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
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

    function prepareTableCellWithJOPInputField(blNodeId: string): JSX.Element {

        const buttonRef: any = createRef();

        function handleFocus() {
            buttonRef.current.focus();
        }
        return (
            <TableCell rowSpan={3} onClick={handleFocus} className={!revenueAchievementTableProps.isRAEditable ? revenueAchievementTableStyleClasses.ediableTableCell : revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}>
                <input ref={buttonRef} defaultValue={getJOPFieldDefaultValue(blNodeId)}
                    disabled={revenueAchievementTableProps.isRAEditable} onBlur={event => revenueAchievementTableProps.handleJOPFieldBlur(event, blNodeId)}
                    className={revenueAchievementTableStyleClasses.input}
                    maxLength={6}
                    type="text" />
            </TableCell>
        );
    }

    function getJOPFieldDefaultValue(blNodeId: string): string {
        return getRevenueAchievementData(blNodeId).jop;
    }

    function prepareTableCellWithGOALInputField(blNodeId: string): JSX.Element {

        const buttonRef: any = createRef();

        function handleFocus() {
            buttonRef.current.focus();
        }

        return (
            <TableCell rowSpan={3} onClick={handleFocus} className={!revenueAchievementTableProps.isRAEditable ? revenueAchievementTableStyleClasses.ediableTableCell : revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}>
                <input ref={buttonRef} defaultValue={getGOALFieldDefaultValue(blNodeId)}
                    disabled={revenueAchievementTableProps.isRAEditable} onBlur={event => revenueAchievementTableProps.handleGOALFieldBlur(event, blNodeId)}
                    className={revenueAchievementTableStyleClasses.input}
                    maxLength={6}
                    type="text" />
            </TableCell>
        );
    }

    function getGOALFieldDefaultValue(blNodeId: string): string {
        return getRevenueAchievementData(blNodeId).goal;
    }

    function prepareThirdRow(businessLine: RABusinessLineModel): JSX.Element {
        return (
            <TableRow>
                {prepareTableCellWithBGName(businessLine)}
                {prepareTableCellWithStaticText("%")}
                {prepareTableCellWithPercentageNumber(businessLine).map(
                    (tableCell: JSX.Element) => tableCell)}
            </TableRow>
        );
    }

    function prepareTableCellWithBGName(businessLine: RABusinessLineModel): JSX.Element {
        return (
            <TableCell className={classNames(revenueAchievementTableStyleClasses.tableCell,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align={LEFT}>
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
            <TableCell className={classNames(revenueAchievementTableStyleClasses.tableCell,
                revenueAchievementTableStyleClasses.noBorderTopTableCell)} align={CENTER} />
        );
    }

    function prepareTableCellWithPercentageNumber(businessLine: RABusinessLineModel): JSX.Element[] {
        const tableCellWithPercentageNumberList: JSX.Element[] = [];
        for (let i = 1; i <= 4; i++) {
            const percentageNumber: number = calculatePercentage(businessLine.nodeId, "Q" + i);
            tableCellWithPercentageNumberList.push(
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells} align={CENTER}
                    style={{ color: percentageNumber >= 100 ? COLOR_EMERALD_2 : RISK_SCORE_RED }} >
                    {0 !== percentageNumber ? percentageNumber.toString() + "%" : ""}
                </TableCell>
            )
        }
        return tableCellWithPercentageNumberList;
    }

    function calculatePercentage(blNodeId: string, quarter: string): number {
        const [planValue, actualValue] = getPlanAndActualValues(blNodeId, quarter);
        const RAPercentage = (parseFloat(actualValue) / parseFloat(planValue)) * 100;
        if (planValue == "0.00" || !planValue || "0.00" === actualValue || !actualValue) {
            return 0;
        }
        else if (RAPercentage > 99.50 && RAPercentage < 100) {
            return Math.floor(RAPercentage);
        }
        else {
            return Math.round(RAPercentage);
        }
    }

    function getRevenueAchievementData(blNodeId: string): RevenueAchievementModel {
        let lRevenueAchivementData: RevenueAchievementModel = {
            blNodeId: "",
            productList: [""],
            bgList: [""],
            jop: "",
            goal: "",
            Q1: {
                plan: "",
                actual: ""
            },
            Q2: {
                plan: "",
                actual: ""
            },
            Q3: {
                plan: "",
                actual: ""
            },
            Q4: {
                plan: "",
                actual: ""
            },
            year: ""
        }
        allRevenueAchievements.forEach((revenueAchievementData: RevenueAchievementModel) => {
            if (revenueAchievementData.blNodeId === blNodeId && revenueAchievementData.year === selectedYear) {
                lRevenueAchivementData = revenueAchievementData;
            }
        });
        return lRevenueAchivementData;
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
            <TableCell className={classNames(revenueAchievementTableStyleClasses.tableCell,
                revenueAchievementTableStyleClasses.boldText,
                revenueAchievementTableStyleClasses.noBorderBottomTableCell)}
                colSpan={3} align={RIGHT}>
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
                <TableCell className={revenueAchievementTableStyleClasses.nonEditableCells}>
                    {0 === totalPlan ? "" : parseFloat(totalPlan.toString()).toFixed(2)}
                </TableCell>
            );
        }
        return fourTableCellWithSumNumberList;
    }

    function calculateSum(quarter: string, valueType: string): number {
        let sum: number = 0;
        const raOfCurrentYearList: RevenueAchievementModel[] =
            allRevenueAchievements.filter((ra: RevenueAchievementModel) =>
                ra.year === selectedYear &&
                -1 !== revenueAchievementTableProps.showBusinessLineList.indexOf(ra.blNodeId)
            );
        raOfCurrentYearList.forEach((ra: RevenueAchievementModel) => {
            const [planValue, actualValue] = getPlanAndActualValues(ra.blNodeId, quarter);
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
                <TableCell className={revenueAchievementTableStyleClasses.tableCell} align={CENTER}
                    style={{
                        backgroundColor: bgColor === COLOR_LIGHT ? COLOR_GREY_3 : bgColor,
                        color: COLOR_LIGHT === bgColor ? COLOR_GRAPHITE_4 : COLOR_LIGHT
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
            bgColor = COLOR_LIGHT;
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
        let RATotalPercentage = (totalActual / totalPlan) * 100;
        if (totalPlan == 0) {
            return 0;
        }
        else if (RATotalPercentage > 99.50 && RATotalPercentage < 100) {
            return Math.floor(RATotalPercentage)
        }
        else {
            return Math.round(RATotalPercentage);
        }
    }

    return (
        <div className={revenueAchievementTableStyleClasses.mainDiv}>
            <ThemeProvider theme={RATableTheme}>
                <Paper className={revenueAchievementTableStyleClasses.paper} elevation={0}>
                    <TableContainer className={classNames(ScrollBarThemeClass.ScrollBarClass,
                        revenueAchievementTableStyleClasses.tableContainer)}>
                        <Table stickyHeader aria-label="collapsible table">
                            <TableHead>
                                {prepareTableHeaderRow()}
                            </TableHead>
                            {
                                0 !== revenueAchievementTableProps.showBusinessLineList.length ?
                                    <>
                                        <TableBody>
                                            {revenueAchievementTableProps.raBusinessLinesList.map((businessLine: RABusinessLineModel) => (
                                                shouldShowBLRow(businessLine.nodeId) ? (
                                                    <>
                                                        {prepareFirstRow(businessLine)}
                                                        {prepareSecondRow(businessLine)}
                                                        {prepareThirdRow(businessLine)}
                                                    </>
                                                ) : null
                                            )
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            {prepareTableFooterFirstRow()}
                                            {prepareTableFooterSecondRow()}
                                            {prepareTableFooterThirdRow()}
                                        </TableFooter>
                                    </>
                                    :
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