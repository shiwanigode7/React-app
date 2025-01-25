import { AccordionDetails, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import InfoIcon from '@material-ui/icons/Info';
import SelectMultipleValues from "../../../components/SelectMultipleValues";
import { ProductModel } from "../../../components/settings/ProductView/ProductModel";
import Label from "../../../components/utils/Label/Label";
import Title from "../../../components/utils/Title/Title";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { RunwayModel } from "../../../interfaces/InnovationInterface";
import ProductService from "../../../services/service/ProductService";
import RunwayService from "../../../services/service/RunwayService";
import { addThousandSeparatorToString, isNumberZero, parseInt } from "../../../utils/Utilities";
import { BusinessGoalType } from "../../MPLView";
import BusinessCaseChapterModel from "./BusinessCaseChapterModel";
import { BusinessCaseChapterStyles } from "./BusinessCaseChapterStyles";
import DecimalInputField from "./BusinessCaseInputFields/DecimalInputField";
import NumberTypeInputField from "./BusinessCaseInputFields/NumberTypeInputField";
import TextTypeInputField from "./BusinessCaseInputFields/TextTypeInputField";
import { ProjectionDetailsModel } from "./BusinessCaseModel";
import { NodeEventContext } from "../../../context/NodeEventContext";
import InfoDialog from "../../../components/utils/InfoDialog/InfoDialog";
import { COST_PROJECTIONS, COST_PROJECTIONS_DETAIL, PROFIT_PROJECTIONS, PROFIT_PROJECTIONS_DETAIL, RESOURCES_RELEASES, RESOURCES_RELEASES_DETAIL, REVENUE_PROJECTIONS, REVENUE_PROJECTIONS_DETAIL } from "./BusinessCaseChapterText";
export default function BusinessCaseChapter(businessCaseChapterProps: BusinessCaseChapterModel) {
    const businessCaseChapterStyleClasses = BusinessCaseChapterStyles();

    const lInnovationData = useContext(InnovationAppContext);

    const [sumOfAllRevenueProjections, setSumOfAllRevenueProjections] = useState<number>(0);
    const [sumOfAllCostOfSales, setSumOfAllCostOfSales] = useState<number>(0);
    const [sumOfAllOPEX, setSumOfAllOPEX] = useState<number>(0);
    const [yearZeroEBitAmount, setYearZeroEBitAmount] = useState<number>(0);
    const [eBitsList, setEBitsList] = useState<ProjectionDetailsModel[]>(prepareDefaultProjectionDetailsList());
    const [simplePaybacksList, setSimplePaybacksList] =
        useState<ProjectionDetailsModel[]>(prepareDefaultProjectionDetailsList());
    const [allRunwaysList, setAllRunwaysList] = useState<RunwayModel[]>([]);
    const [allProductsList, setAllProductsList] = useState<ProductModel[]>([]);
    const [openInfoDialog, setopenInfoDialog] = useState<boolean>(false);
    const [infoDialogTitle, setInfoDialogTitle] = useState<string>("");
    const [infoDialogContent, setInfoDialogContent] = useState<string[]>([]);
    const lNodeEventData = useContext(NodeEventContext);
    function prepareDefaultProjectionDetailsList(): ProjectionDetailsModel[] {
        return [
            { year: "Y1", amount: 0 },
            { year: "Y2", amount: 0 },
            { year: "Y3", amount: 0 },
            { year: "Y4", amount: 0 },
            { year: "Y5", amount: 0 }
        ];
    }

    function hanldeOpenInfoDialog(title: string, content: string[]) {
        setopenInfoDialog(true);
        setInfoDialogTitle(title);
        setInfoDialogContent(content);
    }

    function prepareGridItemWithTitle(title: string, content: string[]): JSX.Element {
        return (
            <Grid container spacing={1} direction="row" alignItems="center" className={businessCaseChapterStyleClasses.titleGridItem}>
                <Grid item>
                    <Title text={title} />
                </Grid>
                <Grid>
                    <IconButton onClick={() => hanldeOpenInfoDialog(title, content)}>
                        <InfoIcon className={businessCaseChapterStyleClasses.infoIcon}></InfoIcon>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    function prepareGridItemWithLabel(label: string): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.labelGridItem}>
                <Label text={label} />
            </Grid>
        );
    }

    function prepareGridItemWithUnit(unit: string): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.unitGridItem}>
                <Typography className={businessCaseChapterStyleClasses.unit}>
                    {unit}
                </Typography>
            </Grid>
        );
    }

    function prepareFiveGridItemsWithRecurringRPTextField(): JSX.Element[] {
        const gridItemWithRecurringRPTextFieldsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.recurringRevenueProjections) {
            gridItemWithRecurringRPTextFieldsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <TextTypeInputField
                        name={year}
                        handleBlur={handleRecurringRPTextFieldBlurEvent}
                        startAdornmentText={year}
                        isStartAdornmentVisible={true}
                        defaultValue={
                            addThousandSeparatorToNumber(
                                businessCaseChapterProps.businessGoalData.businessCaseData.recurringRevenueProjections[year]
                            )
                        }
                        maxCharactersAllowed={7} />
                </Grid>
            );
        }
        return gridItemWithRecurringRPTextFieldsList;
    }

    const handleRecurringRPTextFieldBlurEvent = (evt: any) => {
        const year: string = evt.target.name;
        const enteredValue: number = removeComma(evt.target.value);

        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                recurringRevenueProjections: {
                    ...prevState.businessCaseData.recurringRevenueProjections,
                    [year]: enteredValue
                }
            }
        }));
    };

    function checkForNegativeValue(number: number): string {
        let convertedValue: string = addThousandSeparatorToNumber(number);
        if (0 > number) {
            convertedValue = "-" + addThousandSeparatorToNumber(number);
        }
        return convertedValue;
    }

    function addThousandSeparatorToNumber(number: number): string {
        return addThousandSeparatorToString(number.toString());
    }

    function removeComma(enteredValue: string): number {
        return parseInt(enteredValue.replace(/,/g, ''));
    }

    function prepareFiveGridItemsWithNonRecurringRPTextField(): JSX.Element[] {
        const gridItemWithNonRecurringRPTextFieldsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.nonRecurringRevenueProjections) {
            gridItemWithNonRecurringRPTextFieldsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <TextTypeInputField
                        name={year}
                        handleBlur={handleNonRecurringRPTextFieldBlurEvent}
                        startAdornmentText={year}
                        isStartAdornmentVisible={true}
                        defaultValue={
                            addThousandSeparatorToNumber(
                                businessCaseChapterProps.businessGoalData.businessCaseData.nonRecurringRevenueProjections[year]
                            )
                        }
                        maxCharactersAllowed={7} />
                </Grid>
            );
        }
        return gridItemWithNonRecurringRPTextFieldsList;
    }

    const handleNonRecurringRPTextFieldBlurEvent = (evt: any) => {
        const year: string = evt.target.name;
        const enteredValue: number = removeComma(evt.target.value);

        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                nonRecurringRevenueProjections: {
                    ...prevState.businessCaseData.nonRecurringRevenueProjections,
                    [year]: enteredValue
                }
            }
        }));
    };

    useEffect(() => {
        for (let i = 1; i <= 5; i++) {
            const year: string = "Y" + i;
            const recurringRP: number =
                businessCaseChapterProps.businessGoalData.businessCaseData.recurringRevenueProjections[year];
            const nonRecurringRP: number =
                businessCaseChapterProps.businessGoalData.businessCaseData.nonRecurringRevenueProjections[year];

            const total: number = recurringRP + nonRecurringRP;
            const recurringRatio: number = 0 === total ? 0 : Math.round((recurringRP * 100) / (total));

            businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
                ...prevState,
                businessCaseData: {
                    ...prevState.businessCaseData,
                    totalRevenueProjections: {
                        ...prevState.businessCaseData.totalRevenueProjections,
                        [year]: total
                    }
                }
            }));

            businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
                ...prevState,
                businessCaseData: {
                    ...prevState.businessCaseData,
                    recurringRatios: {
                        ...prevState.businessCaseData.recurringRatios,
                        [year]: recurringRatio
                    }
                }
            }));
        }
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.recurringRevenueProjections,
    businessCaseChapterProps.businessGoalData.businessCaseData.nonRecurringRevenueProjections]);

    function prepareFiveGridItemsWithTotalOfRP(): JSX.Element[] {
        const gridItemWithTotalOfRPsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections) {
            gridItemWithTotalOfRPsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <Grid container direction="row" className={businessCaseChapterStyleClasses.calculatedFieldGridContainer}>
                        <Grid item className={businessCaseChapterStyleClasses.yearGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.year}> {year} </Typography>
                        </Grid>
                        <Grid item className={businessCaseChapterStyleClasses.calculatedValueGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.calculatedValue}>
                                {
                                    addThousandSeparatorToString(
                                        businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections[year].toString()
                                    )
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return gridItemWithTotalOfRPsList;
    }

    function prepareFiveGridItemsWithRecurringRatio(): JSX.Element[] {
        const gridItemWithRecurringRatioList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.recurringRatios) {
            gridItemWithRecurringRatioList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <Grid container direction="row" className={businessCaseChapterStyleClasses.calculatedFieldGridContainer}>
                        <Grid item className={businessCaseChapterStyleClasses.yearGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.year}> {year} </Typography>
                        </Grid>
                        <Grid item className={businessCaseChapterStyleClasses.calculatedValueGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.calculatedValue}>
                                {
                                    businessCaseChapterProps.businessGoalData.businessCaseData.recurringRatios[year]
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return gridItemWithRecurringRatioList;
    }

    function prepareGridItemWithHistoricalCAGRTextField(): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.withoutSAWithArrowsInputFieldGridItem}>
                <NumberTypeInputField
                    name="HistoricalCAGR"
                    handleBlur={handleHistoricalCAGRTextFieldBlurEvent}
                    defaultValue={businessCaseChapterProps.businessGoalData.businessCaseData.historicalCAGR}
                    isStartAdornmentVisible={false}
                    minNumberAllowed={0}
                    maxNumberAllowed={100}
                    maxDigitsAllowed={3} />
            </Grid>
        );
    }

    const handleHistoricalCAGRTextFieldBlurEvent = (evt: any) => {
        const enteredValue: number = parseInt(evt.target.value);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                historicalCAGR: enteredValue
            }
        }));
    };

    useEffect(() => {
        const yearOneTotalRP: number = businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections["Y1"];
        const yearFiveTotalRP: number = businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections["Y5"];
        const estimatedCAGR: number = 0 === yearOneTotalRP ? 0 :
            (Math.round((Math.pow((yearFiveTotalRP / yearOneTotalRP), (1 / 4)) - 1) * 100));
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                estimatedCAGR: estimatedCAGR
            }
        }));
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections]);

    function prepareFiveGridItemsWithCOSTextField(): JSX.Element[] {
        const gridItemWithCOSTextFieldsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales) {
            gridItemWithCOSTextFieldsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <TextTypeInputField
                        name={year}
                        handleBlur={handleCOSTextFieldBlurEvent}
                        allowNegativeValue={true}
                        startAdornmentText={year}
                        isStartAdornmentVisible={true}
                        defaultValue={checkForNegativeValue(businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales[year])}
                        maxCharactersAllowed={7} />
                </Grid>
            );
        }
        return gridItemWithCOSTextFieldsList;
    }

    const handleCOSTextFieldBlurEvent = (evt: any) => {
        const year: string = evt.target.name;
        const enteredValue: number = removeComma(evt.target.value);

        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                costOfSales: {
                    ...prevState.businessCaseData.costOfSales,
                    [year]: enteredValue
                }
            }
        }));
    };

    function prepareFiveGridItemsWithOPEXTextField(): JSX.Element[] {
        const gridItemWithOPEXTextFieldsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.opex) {
            gridItemWithOPEXTextFieldsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <TextTypeInputField
                        name={year}
                        handleBlur={handleOPEXTextFieldBlurEvent}
                        allowNegativeValue={true}
                        startAdornmentText={year}
                        isStartAdornmentVisible={true}
                        defaultValue={checkForNegativeValue(businessCaseChapterProps.businessGoalData.businessCaseData.opex[year])}
                        maxCharactersAllowed={7} />
                </Grid>
            );
        }
        return gridItemWithOPEXTextFieldsList;
    }

    const handleOPEXTextFieldBlurEvent = (evt: any) => {
        const year: string = evt.target.name;
        const enteredValue: number = removeComma(evt.target.value);

        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                opex: {
                    ...prevState.businessCaseData.opex,
                    [year]: enteredValue
                }
            }
        }));
    };

    function prepareGridItemWithInvestmentPreLaunchTextField(): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.withoutSAWithArrowsInputFieldGridItem}>
                <TextTypeInputField
                    name="InvestmentPreLaunch"
                    handleBlur={handleInvestmentPreLaunchTextFieldBlurEvent}
                    defaultValue={
                        addThousandSeparatorToNumber(
                            businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch
                        )
                    }
                    isStartAdornmentVisible={false}
                    maxCharactersAllowed={7} />
            </Grid>
        );
    }

    const handleInvestmentPreLaunchTextFieldBlurEvent = (evt: any) => {
        const enteredValue: number = removeComma(evt.target.value);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                investmentPreLaunch: enteredValue
            }
        }));
    };

    useEffect(() => {
        const recurringInvestment: number = Math.round(sumOfAllOPEX / 5);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                recurringInvestment: recurringInvestment
            }
        }));
    }, [sumOfAllOPEX]);

    useEffect(() => {
        const keys: string[] = Object.keys(businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections);
        const sumOfRPs: number =
            keys.reduce((accumulator: number, key: string) => {
                return accumulator + businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections[key];
            }, 0);
        setSumOfAllRevenueProjections(sumOfRPs);
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections]);

    useEffect(() => {
        const keys: string[] = Object.keys(businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales);
        const sumOfCostOfSales: number =
            keys.reduce((accumulator: number, key) => {
                return accumulator + businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales[key];
            }, 0);
        setSumOfAllCostOfSales(sumOfCostOfSales);
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales]);

    useEffect(() => {
        const keys: string[] = Object.keys(businessCaseChapterProps.businessGoalData.businessCaseData.opex);
        const sumOfOPEX: number =
            keys.reduce((accumulator: number, key: string) => {
                return accumulator + businessCaseChapterProps.businessGoalData.businessCaseData.opex[key];
            }, 0);
        setSumOfAllOPEX(sumOfOPEX);
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.opex]);

    useEffect(() => {
        const eBit: number = sumOfAllRevenueProjections - sumOfAllCostOfSales -
            (businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch + sumOfAllOPEX);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                fiveYearEBit: eBit
            }
        }));
    }, [sumOfAllRevenueProjections, sumOfAllCostOfSales, sumOfAllOPEX,
        businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch]);

    useEffect(() => {
        const currentGP: number = 0 === sumOfAllRevenueProjections ? 0 :
            (sumOfAllRevenueProjections - sumOfAllCostOfSales) / sumOfAllRevenueProjections;
        const currentGPInPercent: number = Math.round(currentGP * 100);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                currentGrossProfit: currentGPInPercent
            }
        }));
    }, [sumOfAllRevenueProjections, sumOfAllCostOfSales]);

    useEffect(() => {
        const yearFiveRevenueProjection: number = businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections["Y5"];
        const yearOneRevenueProjection: number = businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections["Y1"];
        const yearFiveGPI: number = 0 === yearFiveRevenueProjection ? 0 :
            (yearFiveRevenueProjection - businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales["Y5"]) / yearFiveRevenueProjection;
        const yearOneGPI: number = 0 === yearOneRevenueProjection ? 0 :
            (yearOneRevenueProjection - businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales["Y1"]) / yearOneRevenueProjection;
        const grossPI: number = Math.round(yearFiveGPI) - Math.round(yearOneGPI);
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                grossProfitImprovement: Math.round(grossPI)
            }
        }));
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections,
    businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales]);

    useEffect(() => {
        const yearZeroEBit: number = 0 - businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch;
        setYearZeroEBitAmount(yearZeroEBit);
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch]);

    useEffect(() => {
        for (let i = 1; i <= 5; i++) {
            const year: string = "Y" + i;
            const eBitForYear: number =
                businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections[year] -
                businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales[year] -
                businessCaseChapterProps.businessGoalData.businessCaseData.opex[year];
            eBitsList[i - 1].amount = eBitForYear;
            eBitsList[i - 1].year = year;
            setEBitsList([...eBitsList]);
        }
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.totalRevenueProjections,
    businessCaseChapterProps.businessGoalData.businessCaseData.costOfSales,
    businessCaseChapterProps.businessGoalData.businessCaseData.opex]);

    useEffect(() => {
        for (let index = 0; index <= 4; index++) {
            let simplePaybackForYear: number;
            if (0 === index) {
                simplePaybackForYear = getYearOneSimplePaybackAmount();
            } else {
                simplePaybackForYear = getSimplePaybackAmountForOtherThanOneYear(index);
            }
            simplePaybacksList[index].amount = simplePaybackForYear;
            setSimplePaybacksList([...simplePaybacksList]);
        }
    }, [yearZeroEBitAmount, eBitsList]);

    useEffect(() => {
        let lNPVValue: number = yearZeroEBitAmount;
        for (let index = 0; index <= 4; index++) {
            lNPVValue += eBitsList[index].amount / Math.pow(1.099, index+1);
        }
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                npvValue: Math.round(lNPVValue)
            }
        }));
    }, [eBitsList, yearZeroEBitAmount]);

    function getYearOneSimplePaybackAmount(): number {
        let yearOneSimplePaybackAmount: number;
        const yearOneEBitAmount: number = eBitsList[0].amount;
        const eBitSum: number = yearZeroEBitAmount + yearOneEBitAmount;
        if (eBitSum < 0) {
            yearOneSimplePaybackAmount = 1;
        } else {
            yearOneSimplePaybackAmount = 0 === yearOneEBitAmount ? 0 : (eBitSum / yearOneEBitAmount);
        }
        return yearOneSimplePaybackAmount;
    }

    function getSimplePaybackAmountForOtherThanOneYear(index: number): number {
        let simplePaybackForYear: number;
        if (simplePaybacksList[index - 1].amount < 1) {
            simplePaybackForYear = 0;
        } else {
            const eBitSum: number = getEBitSum(index);
            if (eBitSum < 0) {
                simplePaybackForYear = 1;
            } else {
                simplePaybackForYear = 0 === eBitsList[index].amount ? 0 : (eBitSum / eBitsList[index].amount);
            }
        }
        return simplePaybackForYear;
    }

    function getEBitSum(index: number): number {
        let sum: number = yearZeroEBitAmount;
        for (let i = 0; i <= index; i++) {
            sum = sum + eBitsList[i].amount;
        }
        return sum;
    }

    useEffect(() => {
        const investmentPreLaunch: number = businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch;
        let numberOfYears: number = 0;
        let numberOfMonths: number = 0;
        if (!isNumberZero(investmentPreLaunch)) {
            const sumOfAllSimplePayback: number =
                simplePaybacksList.reduce((accumulator: number, projectionDetails: ProjectionDetailsModel) => {
                    return accumulator + projectionDetails.amount;
                }, 0);
            const totalMonths: number = Math.round(sumOfAllSimplePayback * 12);
            numberOfYears = Math.trunc(totalMonths / 12);
            numberOfMonths = totalMonths - (numberOfYears * 12);
        }
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                simplePayback: {
                    years: numberOfYears,
                    months: numberOfMonths
                }
            }
        }));
    }, [businessCaseChapterProps.businessGoalData.businessCaseData.investmentPreLaunch, simplePaybacksList]);

    function prepareGridItemWithCalculatedValue(calculatedValue: number): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.calculatedValueGridItem}>
                <Typography className={ 0 <= calculatedValue ? businessCaseChapterStyleClasses.calculatedValue : businessCaseChapterStyleClasses.calculatedNegativeValue}>
                    {checkForNegativeValue(calculatedValue)}
                </Typography>
            </Grid>
        );
    }

    function prepareFiveGridItemsWithEBITField(): JSX.Element[] {
        const gridItemWithEBITsList: JSX.Element[] = [];
        for (let i: number = 0; i < 5; i++) {
            gridItemWithEBITsList.push(
                <Grid item className={businessCaseChapterStyleClasses.textFieldGridItem}>
                    <Grid container direction="row" className={businessCaseChapterStyleClasses.calculatedFieldGridContainer}>
                        <Grid item className={businessCaseChapterStyleClasses.yearGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.year}> {eBitsList[i].year} </Typography>
                        </Grid>
                        <Grid item className={businessCaseChapterStyleClasses.calculatedValueGridItem}>
                            <Typography className={ 0 <= eBitsList[i].amount ? businessCaseChapterStyleClasses.calculatedValue : businessCaseChapterStyleClasses.calculatedNegativeValue}>
                                {
                                    checkForNegativeValue(eBitsList[i].amount)
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
        return gridItemWithEBITsList;
    }

    function prepareFiveGridItemsWithEstimatedFTETextField(): JSX.Element[] {
        const gridItemWithEstimatedFTETextFieldsList: JSX.Element[] = [];
        for (const year in businessCaseChapterProps.businessGoalData.businessCaseData.estimatedFTECounts) {
            gridItemWithEstimatedFTETextFieldsList.push(
                <Grid item className={businessCaseChapterStyleClasses.fieldWithSAAndArrow}>
                    <NumberTypeInputField
                        name={year}
                        handleBlur={handleEstimatedFTETextFieldBlurEvent}
                        defaultValue={businessCaseChapterProps.businessGoalData.businessCaseData.estimatedFTECounts[year]}
                        startAdornmentText={year}
                        isStartAdornmentVisible={true}
                        minNumberAllowed={0}
                        maxNumberAllowed={99}
                        maxDigitsAllowed={2} />
                </Grid>
            );
        }
        return gridItemWithEstimatedFTETextFieldsList;
    }

    const handleEstimatedFTETextFieldBlurEvent = (evt: any) => {
        const year: string = evt.target.name;
        const enteredValue: number = parseInt(evt.target.value);

        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessCaseData: {
                ...prevState.businessCaseData,
                estimatedFTECounts: {
                    ...prevState.businessCaseData.estimatedFTECounts,
                    [year]: enteredValue
                }
            }
        }));
    };

    const handleEstimatedDevelopmentCyclesChange = (evt: any) => {
        if ((parseFloat(evt.target.value) < 99.99 && parseFloat(evt.target.value) >= 0.0) || evt.target.value === "") {
            businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
                ...prevState,
                businessCaseData: {
                    ...prevState.businessCaseData,
                    estimatedDevelopmentTime: parseFloat(parseFloat(evt.target.value).toFixed(1))
                }
            }));
        }
    }

    function prepareGridItemWithEstimatedDevelopmentTimeTextField(): JSX.Element {
        return (
            <Grid item className={businessCaseChapterStyleClasses.withoutSAWithArrowsInputFieldGridItem}>
                <DecimalInputField
                    value={businessCaseChapterProps.businessGoalData.businessCaseData.estimatedDevelopmentTime}
                    onBlur={handleEstimatedDevelopmentTimeTextFieldBlurEvent}
                    title="EstimatedDevelopmentTime"
                    onChange={handleEstimatedDevelopmentCyclesChange}
                />
            </Grid>
        );
    }

    const handleEstimatedDevelopmentTimeTextFieldBlurEvent = (evt: any) => {
        if (evt.target.value === "") {
            businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
                ...prevState,
                businessCaseData: {
                    ...prevState.businessCaseData,
                    estimatedDevelopmentTime: 0
                }
            }))
        }
    };

    useEffect(() => {
        RunwayService.getRunways(lInnovationData.eskoAccountDetail.repoid)
            .then((response: RunwayModel[]) => {
                setAllRunwaysList(response);
            })
            .catch((err: any) => {
                console.log(err);
            });

        ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
            .then((getProductResponse: ProductModel[]) => {
                setAllProductsList(getProductResponse);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [lNodeEventData.runwaysUpdated , lNodeEventData.productsUpdated]);

    useEffect(() => {
        //TODO: check this logic 
        let filteredRunways: string[] = businessCaseChapterProps.businessGoalData.runwaysList;
        filteredRunways.forEach((runwayNodeId: string) => {
            if (0 !== allRunwaysList.length && !allRunwaysList.find(option => option.nodeId == runwayNodeId)) {
                filteredRunways = filteredRunways.filter((val) => val != runwayNodeId);
            }
        });
        businessCaseChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            runwaysList: filteredRunways
        }));
    }, [allRunwaysList]);

    return (
        <AccordionDetails className={businessCaseChapterStyleClasses.accordionDetails}>
            <Grid container spacing={2} direction="column" style={{ width: "100%" }}>
                <Grid item container spacing={2} className={businessCaseChapterStyleClasses.fourSections}>
                    {prepareGridItemWithTitle(REVENUE_PROJECTIONS, REVENUE_PROJECTIONS_DETAIL)}

                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Recurring")}
                        {prepareFiveGridItemsWithRecurringRPTextField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Non-Recurring")}
                        {prepareFiveGridItemsWithNonRecurringRPTextField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Total")}
                        {prepareFiveGridItemsWithTotalOfRP().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Recurring Ratio")}
                        {prepareFiveGridItemsWithRecurringRatio().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("%")}
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Historical CAGR")}
                        {prepareGridItemWithHistoricalCAGRTextField()}
                        {prepareGridItemWithUnit("%")}
                        <Grid item className={businessCaseChapterStyleClasses.subLabelGridItem}>
                            <Label text="Estimated CAGR" />
                        </Grid>
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.estimatedCAGR)}
                        {prepareGridItemWithUnit("%")}
                    </Grid>
                </Grid>
                <Grid item container spacing={2} className={businessCaseChapterStyleClasses.fourSections}>
                    {prepareGridItemWithTitle(COST_PROJECTIONS, COST_PROJECTIONS_DETAIL)}

                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Cost of Sales")}
                        {prepareFiveGridItemsWithCOSTextField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("OPEX")}
                        {prepareFiveGridItemsWithOPEXTextField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Investment Pre-Launch")}
                        {prepareGridItemWithInvestmentPreLaunchTextField()}
                        {prepareGridItemWithUnit("K$")}
                        <Grid item className={businessCaseChapterStyleClasses.unitGridItem}>
                            <Typography className={businessCaseChapterStyleClasses.unit}>
                                <span className={businessCaseChapterStyleClasses.boldText}>{"Tip: "}</span>
                                {"This is same as OPEX Y0."}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Recurring Investment")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.recurringInvestment)}
                        {prepareGridItemWithUnit("K$/year")}
                    </Grid>
                </Grid>
                <Grid item container spacing={2} className={businessCaseChapterStyleClasses.fourSections}>
                    {prepareGridItemWithTitle(PROFIT_PROJECTIONS,PROFIT_PROJECTIONS_DETAIL)}
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("NPV Value")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.npvValue)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("EBIT")}
                        {prepareFiveGridItemsWithEBITField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("5 Year Ebit")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.fiveYearEBit)}
                        {prepareGridItemWithUnit("K$")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Current Gross Profit")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.currentGrossProfit)}
                        {prepareGridItemWithUnit("%")}
                        <Grid item className={businessCaseChapterStyleClasses.subLabelGridItem}>
                            <Label text="Gross Profit Improvement" />
                        </Grid>
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.grossProfitImprovement)}
                        {prepareGridItemWithUnit("%")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Simple Payback")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.simplePayback.years)}
                        {prepareGridItemWithUnit("year")}
                        {prepareGridItemWithCalculatedValue(businessCaseChapterProps.businessGoalData.businessCaseData.simplePayback.months)}
                        {prepareGridItemWithUnit("months")}
                    </Grid>
                </Grid>
                <Grid item container spacing={2} className={businessCaseChapterStyleClasses.fourSections}>
                    {prepareGridItemWithTitle(RESOURCES_RELEASES, RESOURCES_RELEASES_DETAIL)}

                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Estimated FTE Count")}
                        {prepareFiveGridItemsWithEstimatedFTETextField().map((gridItem: JSX.Element) => gridItem)}
                        {prepareGridItemWithUnit("FTE")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Runways")}
                        <Grid item className={businessCaseChapterStyleClasses.multiSelectGridItem}>
                            <SelectMultipleValues
                                totalRunwayListData={allRunwaysList}
                                businessGoalData={businessCaseChapterProps.businessGoalData}
                                setBusinessGoalData={businessCaseChapterProps.setBusinessGoalData}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Estimated Development Time")}
                        {prepareGridItemWithEstimatedDevelopmentTimeTextField()}
                        {prepareGridItemWithUnit("year(s)")}
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                        {prepareGridItemWithLabel("Products")}
                        <Grid item className={businessCaseChapterStyleClasses.multiSelectGridItem}>
                            <SelectMultipleValues
                                totalProductListData={allProductsList}
                                businessGoalData={businessCaseChapterProps.businessGoalData}
                                setBusinessGoalData={businessCaseChapterProps.setBusinessGoalData}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <InfoDialog 
                open={openInfoDialog}
                setOpen={setopenInfoDialog}
                dialogTitle={infoDialogTitle}
                dialogContent={infoDialogContent}/>
        </AccordionDetails >
    )
}
