import { ThemeProvider, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import images from "../../../../../Icons/images";
import { FIVE_YEAR_IPV, NO_ACTIVE_BUSINESS_GOALS, THOUSAND_DOLLAR } from "../../../../constant/IPVTexts";
import { IPVBusinessGoalModel } from "../../../../interfaces/InnovationInterface";
import { getBGThumbnailAndName } from "../../../../utils/MPLViewUtils";
import { addThousandSeparator, getCurrentYear, parseInt } from "../../../../utils/Utilities";
import { IPVTableModel } from "./IPVTableModel";
import { IPVTableStyles, IPVTableTheme } from "./IPVTableStyles";
import classNames from "classnames";

export function IPVTable(props: IPVTableModel) {

    const [yearList, setYearList] = useState<string[]>([]);

    const IPVTableStylesClasses = IPVTableStyles();
    const getYearsList = (): string[] => {
        const lYearList: string[] = [];

        let lSelectedYear: number = parseInt(props.selectedYear);
        if (0 === lSelectedYear) {
            lSelectedYear = getCurrentYear();
        }

        for (let year = lSelectedYear - 1; year <= lSelectedYear + 4; year++) {
            lYearList.push(year.toString());
        }
        return lYearList;
    }

    useEffect(() => {
        if ("" !== props.selectedYear) {
            setYearList(getYearsList());
        }
    }, [props.selectedYear]);

    const getYearHeaderData = (): JSX.Element[] => {
        let yearHeaderData: JSX.Element[] = [];
        if (0 === yearList.length) {
            return yearHeaderData;
        }
        yearHeaderData.push(<TableCell className={IPVTableStylesClasses.inactiveYearHeaderCell} align="center">{yearList[0]}</TableCell>);
        const activeYearList: string[] = yearList.slice(1);
        activeYearList.forEach((year: string) => (
            yearHeaderData.push(<TableCell className={IPVTableStylesClasses.activeYearHeaderCell} align="center">{year}</TableCell>)))
        return yearHeaderData;
    }

    const getTableHeader = (): JSX.Element => {
        return (
            <TableRow>
                <TableCell className={IPVTableStylesClasses.bgHeaderCell} align="left" />
                {
                    getYearHeaderData().map((tableCell: JSX.Element) => (
                        tableCell
                    ))
                }
                <TableCell className={IPVTableStylesClasses.fiveYearIPVHeaderCell} align="center">{FIVE_YEAR_IPV}</TableCell>
                <TableCell className={IPVTableStylesClasses.unitHeaderCell} align="center" />
            </TableRow>);
    }

    const getIPVTableRow = (inBusinessGoal: IPVBusinessGoalModel): JSX.Element[] => {
        let tableCells: JSX.Element[] = [];
        if ("" !== inBusinessGoal.businessGoalName) {
            tableCells.push(
                <TableCell align="left">
                    {getBGThumbnailAndName(inBusinessGoal.thumbnail ?
                        inBusinessGoal.thumbnail : images.EskoStarPng,
                        inBusinessGoal.businessGoalName)}
                </TableCell>);
            yearList.forEach((year: string) =>
                tableCells.push(<TableCell align="center" className={IPVTableStylesClasses.rpCell}>
                    {addThousandSeparator(inBusinessGoal.revenueProjections[year])}
                </TableCell>)
            );
            tableCells.push(
                <TableCell align="center" className={IPVTableStylesClasses.fiveYearIPVCell}>{addThousandSeparator(inBusinessGoal.fiveYearIPV)}</TableCell>
            );
            tableCells.push(
                <TableCell align="center" className={IPVTableStylesClasses.unitCell}>{THOUSAND_DOLLAR}</TableCell>
            )
        }
        return tableCells;
    }

    return (
        <div className={IPVTableStylesClasses.tableSectionContainer}>
            <ThemeProvider theme={IPVTableTheme}>
                <Paper className={IPVTableStylesClasses.tablePaperContainer} elevation={0}>
                    <TableContainer className={classNames(IPVTableStylesClasses.ScrollBarClass, IPVTableStylesClasses.tableContainer)}>
                        <Table stickyHeader>
                            <TableHead>
                                {getTableHeader()}
                            </TableHead>
                            <TableBody>
                                {
                                    (0 === props.ipvData.activeBusinessGoals.length) ? (
                                        <TableRow>
                                            <TableCell colSpan={9}
                                                align={"center"}
                                                className={IPVTableStylesClasses.tableDataInfoMessage}>
                                                {NO_ACTIVE_BUSINESS_GOALS}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        props.ipvData.activeBusinessGoals.map((businessGoal: IPVBusinessGoalModel) => (
                                            <TableRow>
                                                {getIPVTableRow(businessGoal)?.map((tableCell: JSX.Element) => (
                                                    tableCell
                                                ))}
                                            </TableRow>
                                        )))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>
        </div>
    )
}