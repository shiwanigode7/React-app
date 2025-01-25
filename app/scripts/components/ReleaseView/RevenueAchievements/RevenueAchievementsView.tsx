import React, { useContext, useEffect, useState } from "react";
import { Grid, } from "@material-ui/core";
import FilterSubmenu from "../../FilterSubmenu";
import { RevenueAchievementStyle } from "./RevenueAchievementStyle";
import Header from "../../utils/Header/Header";
import BusinessLineService from "../../../services/service/BusinessLineService";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { BusinessLineModel } from "../../settings/BusinessLineView/BusinessLineModel";
import { ProductModel } from "../../settings/ProductView/ProductModel";
import ProductService from "../../../services/service/ProductService";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import { BusinessGoalTableType } from "../../../interfaces/InnovationInterface";
import { RABusinessLineModel, RAProductModel, RABusinessGoalModel, RevenueAchievementModel, RAQuarter, RABusinessLineWithHistoricalDataModel } from "./RevenueAchievementModel";
import RevenueAchievementService from "../../../services/service/RevenueAchievementService";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import AlertPopupModel from "../../utils/AlertPopup/AlertPopupModel";
import SelectMenuModel from "../../utils/Header/SelectMenu/SelectMenuModel";
import RevenueAchievementTable from "./RevenueAchievementTable/RevenueAchievementTable";
import { isFloatingNumber, parseInt } from "../../../utils/Utilities";
import RATableForHistoricalData from "./RevenueAchievementTable/RATableForHistoricalData";

export function RevenueAchivementsView() {
    const lInnovationData = useContext(InnovationAppContext);

    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;
    const STRING_SEPERATOR: string = "-#&&*#-";

    const revenueAchievementStyleClasses = RevenueAchievementStyle();

    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth);
    const [activeBusinessLineList, setActiveBusinessLineList] = useState<BusinessLineModel[]>([]);
    const [allProductList, setAllProductList] = useState<ProductModel[]>([]);
    const [allBusinessGoalList, setAllBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [raBusinessLinesList, setRaBusinessLinesList] = useState<RABusinessLineModel[]>([]);
    const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
    const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
    const [selectedYear, setSelectedYear] = useState<string>(getCurrentYear().toString());
    const [allRevenueAchievements, setAllRevenueAchievements] = useState<RevenueAchievementModel[]>([]);
    const [selectedBusinessLinesList, setSelectedBusinessLinesList] = useState<string[]>([]);
    const [showBusinessLineList, setShowBusinessLineList] = useState<string[]>([]);
    const [isPassedYear, setIsPassedYear] = useState<boolean>(true);

    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth);
        }
        else {
            setMarginContentView(leftNavWidth);
        }
    }, [openFilterMenu]);

    function getCurrentYear(): number {
        return new Date().getFullYear();
    }

    function getYearsList(): string[] {
        const options: string[] = [];
        const startYear: number = 2021;
        const currentYear: number = getCurrentYear();

        for (let year = startYear; year <= currentYear + 4; year++) {
            options.push(year.toString());
        }
        return options;
    }

    const selectMenuData: SelectMenuModel = {
        items: getYearsList(),
        selectedValue: selectedYear,
        setSelectedValue: setSelectedYear
    }

    useEffect(() => {
        BusinessLineService.getAllBusinessLines(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessLinesResponse: BusinessLineModel[]) => {
                const activeBusinessLines: BusinessLineModel[] =
                    getBusinessLinesResponse.filter((businessLine: BusinessLineModel) => businessLine.isActive);
                setActiveBusinessLineList(activeBusinessLines);
                setCheckedBusinessLines(activeBusinessLines);
            })
            .catch((getBusinessLinesError: any) => {
                console.log(getBusinessLinesError);
            });

        ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
            .then((getProductResponse: ProductModel[]) => {
                setAllProductList(getProductResponse);
            });

        BusinessGoalService.getAllBusinessGoals(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessGoalResponse: BusinessGoalTableType[]) => {
                setAllBusinessGoalList(getBusinessGoalResponse);
            });
    }, [lInnovationData]);

    function setCheckedBusinessLines(activeBusinessLines: BusinessLineModel[]): void {
        const checkedBusinessLinesArray: string[] = [];
        activeBusinessLines.forEach((businessLine: BusinessLineModel) => {
            if (undefined !== businessLine.nodeId) {
                checkedBusinessLinesArray.push(businessLine.nodeId);
            }
        });
        setSelectedBusinessLinesList([...checkedBusinessLinesArray]);
    }

    useEffect(() => {
        const raBusinessLines: RABusinessLineModel[] = [];
        activeBusinessLineList.forEach((businessLine: BusinessLineModel) => {
            const raBusinessLine: RABusinessLineModel = getDummyRABusinessLineData();
            raBusinessLine.nodeId = businessLine.nodeId;
            raBusinessLine.name = businessLine.name;
            raBusinessLine.productsList = getProductsListForBusinessLine(businessLine.nodeId);
            raBusinessLine.businessGoalsList = getBusinessGoalsListForBusinessLine(businessLine.nodeId);
            raBusinessLines.push(raBusinessLine);
        });
        setRaBusinessLinesList(raBusinessLines);
    }, [activeBusinessLineList, allProductList, allBusinessGoalList]);

    useEffect(() => {
        setIsPassedYear(true);
        if (parseInt(selectedYear) < getCurrentYear()) {
            setIsPassedYear(true);
        } else {
            setTimeout(() => {
                setIsPassedYear(false);
            }, 500);
        }
    }, [selectedYear])

    function getDummyRABusinessLineData(): RABusinessLineModel {
        return {
            nodeId: "",
            name: "",
            productsList: [{
                nodeId: "",
                name: "",
                thumbnail: ""
            }],
            businessGoalsList: [{
                nodeId: "",
                name: ""
            }]
        };
    }

    function getProductsListForBusinessLine(nodeId: string): RAProductModel[] {
        const raProductsList: RAProductModel[] = [];
        const foundBL: BusinessLineModel | undefined =
            activeBusinessLineList.find((businessLine: BusinessLineModel) => nodeId === businessLine.nodeId);
        if (undefined !== foundBL) {
            foundBL.productList.forEach((productNodeId: string) => {
                const foundProduct: ProductModel | undefined =
                    allProductList.find((product: ProductModel) => product.nodeId === productNodeId);
                if (undefined !== foundProduct) {
                    raProductsList.push({
                        nodeId: foundProduct.nodeId,
                        name: foundProduct.productName,
                        thumbnail: foundProduct.thumbnail
                    });
                }
            });
        }
        return raProductsList;
    }

    function getBusinessGoalsListForBusinessLine(nodeId: string): RABusinessGoalModel[] {
        const raBusinessGoalsList: RABusinessGoalModel[] = [];
        const foundBL: BusinessLineModel | undefined =
            activeBusinessLineList.find((businessLine: BusinessLineModel) => nodeId === businessLine.nodeId);
        if (undefined !== foundBL) {
            foundBL.businessGoalList.forEach((bgNodeId: string) => {
                const foundBG: BusinessGoalTableType | undefined =
                    allBusinessGoalList.find((bg: BusinessGoalTableType) => bg.nodeId === bgNodeId &&
                        ("Active" === bg.status || "Completed" === bg.status));
                if (undefined !== foundBG) {
                    raBusinessGoalsList.push({
                        nodeId: foundBG.nodeId,
                        name: foundBG.businessGoalName
                    });
                }
            });
        }
        return raBusinessGoalsList;
    }

    const handleJOPFieldBlur = (evt: any, blNodeId: string) => {
        evt.preventDefault();
        const enteredValue: string = evt.target.value;

        const isValid: boolean =
            validateEnteredValue(evt, isJOPValueAlreadyPresent(blNodeId), enteredValue, getJOPValue(blNodeId));

        if (isValid) {
            let raData: RevenueAchievementModel = prepareDummyRAData();

            if (isRevenueAchievementDataAlreadyPresent(blNodeId)) {
                raData = getRevenueAchievementDataFromList(blNodeId);
            } else {
                raData.blNodeId = blNodeId;
                raData.year = selectedYear;
            }
            const productsList: RAProductModel[] = getProductsListForBusinessLine(blNodeId);
            const bgsList: RABusinessGoalModel[] = getBusinessGoalsListForBusinessLine(blNodeId);
            const duplicateProductList: string[] = [];
            const duplicateBgList: string[] = [];
            productsList.forEach((product: RAProductModel) => {
                duplicateProductList.push(product.nodeId);
            });

            bgsList.forEach((bg: RABusinessGoalModel) => {
                if (undefined !== bg.nodeId) {
                    duplicateBgList.push(bg.nodeId);
                }
            });

            raData.productList = [...duplicateProductList];
            raData.bgList = [...duplicateBgList];

            raData.jop = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            evt.target.value = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            createRevenueAchievement(raData);
        }
    };

    function validateEnteredValue(evt: any, isValueAlreadyPresent: boolean, enteredValue: string, oldValue: string): boolean {
        if (isValueAlreadyPresent) {
            if (enteredValue && !isFloatingNumber(enteredValue)) {
                showError("Only digits allowed.");
                evt.target.value = oldValue;
                return false;
            } else if (oldValue === enteredValue) {
                return false;
            }
        } else {
            if (enteredValue && !isFloatingNumber(enteredValue)) {
                showError("Only digits allowed.");
                evt.target.value = "";
                return false;
            } else if (!enteredValue) {
                return false;
            }
        }
        return true;
    }

    function isJOPValueAlreadyPresent(blNodeId: string): boolean {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return false;
        } else if (getRevenueAchievementDataFromList(blNodeId).jop) {
            return true;
        } else {
            return false;
        }
    }

    function getJOPValue(blNodeId: string): string {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return "";
        }
        return getRevenueAchievementDataFromList(blNodeId).jop;
    }

    function convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue: string): string {
        return "" === enteredValue ? "" : parseFloat(enteredValue).toFixed(2);
    }

    const handleGOALFieldBlur = (evt: any, blNodeId: string) => {
        evt.preventDefault();
        const enteredValue: string = evt.target.value;

        const isValid: boolean =
            validateEnteredValue(evt, isGOALValueAlreadyPresent(blNodeId), enteredValue, getGOALValue(blNodeId));

        if (isValid) {
            let raData: RevenueAchievementModel = prepareDummyRAData();
            if (isRevenueAchievementDataAlreadyPresent(blNodeId)) {
                raData = getRevenueAchievementDataFromList(blNodeId);
            } else {
                raData.blNodeId = blNodeId;
                raData.year = selectedYear;
            }

            const productsList: RAProductModel[] = getProductsListForBusinessLine(blNodeId);
            const bgsList: RABusinessGoalModel[] = getBusinessGoalsListForBusinessLine(blNodeId);
            const duplicateProductList: string[] = [];
            const duplicateBgList: string[] = [];
            productsList.forEach((product: RAProductModel) => {
                duplicateProductList.push(product.nodeId);
            });

            bgsList.forEach((bg: RABusinessGoalModel) => {
                if (undefined !== bg.nodeId) {
                    duplicateBgList.push(bg.nodeId);
                }
            });

            raData.productList = [...duplicateProductList];
            raData.bgList = [...duplicateBgList];

            raData.goal = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            evt.target.value = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            createRevenueAchievement(raData);
        }
    };

    function isGOALValueAlreadyPresent(blNodeId: string): boolean {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return false;
        } else if (getRevenueAchievementDataFromList(blNodeId).goal) {
            return true;
        } else {
            return false;
        }
    }

    function getGOALValue(blNodeId: string): string {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return "";
        }
        return getRevenueAchievementDataFromList(blNodeId).goal;
    }

    const handleQuarterFieldBlur = (evt: any) => {
        evt.preventDefault();
        const inputTextFieldName: string = evt.target.name;
        const splitedStrings: string[] = inputTextFieldName.split(STRING_SEPERATOR);
        const valueType: string = splitedStrings[0];
        const quarter: string = splitedStrings[1];
        const blNodeId: string = splitedStrings[2];
        const enteredValue: string = evt.target.value;

        const isValid: boolean =
            validateEnteredValue(evt, isQuarterValueAlreadyPresent(blNodeId, valueType, quarter),
                enteredValue, getOldQuarterValue(blNodeId, valueType, quarter));

        if (isValid) {
            let raData: RevenueAchievementModel = prepareDummyRAData();

            if (isRevenueAchievementDataAlreadyPresent(blNodeId)) {
                raData = getRevenueAchievementDataFromList(blNodeId);
            } else {
                raData.blNodeId = blNodeId;
                raData.year = selectedYear;
            }

            const productsList: RAProductModel[] = getProductsListForBusinessLine(blNodeId);
            const bgsList: RABusinessGoalModel[] = getBusinessGoalsListForBusinessLine(blNodeId);
            const duplicateProductList: string[] = [];
            const duplicateBgList: string[] = [];
            productsList.forEach((product: RAProductModel) => {
                duplicateProductList.push(product.nodeId);
            });

            bgsList.forEach((bg: RABusinessGoalModel) => {
                if (undefined !== bg.nodeId) {
                    duplicateBgList.push(bg.nodeId);
                }
            });

            raData.productList = [...duplicateProductList];
            raData.bgList = [...duplicateBgList];

            if ("Plan" === valueType) {
                (raData[quarter] as RAQuarter).plan = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            } else {
                (raData[quarter] as RAQuarter).actual = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            }

            evt.target.value = convertToFloatNumberWithTwoDigitsAfterDecimal(enteredValue);
            createRevenueAchievement(raData);
        }
    };

    function isQuarterValueAlreadyPresent(blNodeId: string, valueType: string, quarter: string): boolean {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return false;
        } else if ("Plan" === valueType && (getRevenueAchievementDataFromList(blNodeId)[quarter] as RAQuarter).plan) {
            return true;
        } else if ("Actual" === valueType && (getRevenueAchievementDataFromList(blNodeId)[quarter] as RAQuarter).actual) {
            return true;
        } else {
            return false;
        }
    }

    function getOldQuarterValue(blNodeId: string, valueType: string, quarter: string): string {
        if (!isRevenueAchievementDataAlreadyPresent(blNodeId)) {
            return "";
        } else if ("Plan" === valueType) {
            return (getRevenueAchievementDataFromList(blNodeId)[quarter] as RAQuarter).plan;
        } else if ("Actual" === valueType) {
            return (getRevenueAchievementDataFromList(blNodeId)[quarter] as RAQuarter).actual;
        }
        return "";
    }

    function isRevenueAchievementDataAlreadyPresent(blNodeId: string): boolean {
        return undefined !==
            allRevenueAchievements.find((ra: RevenueAchievementModel) => ra.blNodeId === blNodeId && ra.year === selectedYear);
    }

    function getRevenueAchievementDataFromList(blNodeId: string): RevenueAchievementModel {
        return allRevenueAchievements[getRevenueAchievementDataIndex(blNodeId)];
    }

    function getRevenueAchievementDataIndex(blNodeId: string): number {
        return allRevenueAchievements.findIndex((ra: RevenueAchievementModel) =>
            ra.blNodeId === blNodeId && ra.year === selectedYear)
    }

    function createRevenueAchievement(raData: RevenueAchievementModel) {
        RevenueAchievementService.createRevenueAchievement(raData, lInnovationData.eskoAccountDetail.repoid)
            .then((raResponse: any) => {
                if (isRevenueAchievementDataAlreadyPresent(raData.blNodeId)) {
                    updateExistingRevenueAchievementData(raData);
                } else {
                    addRevenueAchievementData(raData);
                }
                setMainPageLoading(false);
                setAlertPopupData({
                    isOpen: true,
                    content: raResponse.message,
                    severity: "success",
                    handleCloseButtonClick: () => {
                        setAlertPopupData({ isOpen: false });
                    }
                });
            });
    }

    function updateExistingRevenueAchievementData(raData: RevenueAchievementModel): void {
        allRevenueAchievements[getRevenueAchievementDataIndex(raData.blNodeId)] = raData;
        setAllRevenueAchievements([...allRevenueAchievements])
    }

    function addRevenueAchievementData(raData: RevenueAchievementModel): void {
        const duplicateRevenueAchievementsList = [...allRevenueAchievements];
        duplicateRevenueAchievementsList.push(raData);
        setAllRevenueAchievements(duplicateRevenueAchievementsList);
    }

    function prepareDummyRAData(): RevenueAchievementModel {
        return {
            blNodeId: "",
            productList: [],
            bgList: [],
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
        };
    }

    useEffect(() => {
        setMainPageLoading(true);
        RevenueAchievementService.getRevenueAchievements(lInnovationData.eskoAccountDetail.repoid)
            .then((rasResponse: RevenueAchievementModel[]) => {
                setAllRevenueAchievements(rasResponse);
                setMainPageLoading(false);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        const showBusinessLineNodeIdList: string[] = [];
        selectedBusinessLinesList.forEach((selectedBusinessLineNodeId: string) => {
            showBusinessLineNodeIdList.push(selectedBusinessLineNodeId);
        });
        setShowBusinessLineList(showBusinessLineNodeIdList);
    }, [selectedBusinessLinesList]);

    useEffect(() => {
        const showBLNodeIdList: string[] = [];
        selectedBusinessLinesList.forEach((selectedBLNodeId: string) => {
            showBLNodeIdList.push(selectedBLNodeId);
        });
        setShowBusinessLineList(showBLNodeIdList);
    }, [selectedBusinessLinesList]);

    function showError(message: string) {
        setMainPageLoading(false);
        setTimeout(function () {
            setAlertPopupData({
                isOpen: true,
                content: message,
                severity: "error",
                handleCloseButtonClick: () => {
                    setAlertPopupData({ isOpen: false });
                }
            });
        }, 500);
    }

    function prepareRABusinessLinesWithHistoricalDataList(): RABusinessLineWithHistoricalDataModel[] {
        const raBusinessLineWithHistoricalDataList: RABusinessLineWithHistoricalDataModel[] = [];
        getRADataListForSelectedYear().forEach((ra: RevenueAchievementModel) => {
            const raBusinessLineWithHistoricalData: RABusinessLineWithHistoricalDataModel = {
                raBusinessLine: prepareRABusinessLineData(ra.blNodeId, ra.productList, ra.bgList),
                jop: ra.jop,
                goal: ra.goal,
                Q1: ra.Q1,
                Q2: ra.Q2,
                Q3: ra.Q3,
                Q4: ra.Q4
            };
            raBusinessLineWithHistoricalDataList.push(raBusinessLineWithHistoricalData);
        });
        return raBusinessLineWithHistoricalDataList;
    }

    function getRADataListForSelectedYear(): RevenueAchievementModel[] {
        return allRevenueAchievements.filter((ra: RevenueAchievementModel) => ra.year === selectedYear
            && -1 !== showBusinessLineList.indexOf(ra.blNodeId));
    }

    function prepareRABusinessLineData(blNodeId: string, productNodeIdList: string[], bgNodeIdList: string[]): RABusinessLineModel {
        return {
            name: getBLName(blNodeId),
            nodeId: blNodeId,
            productsList: prepareProductList(productNodeIdList),
            businessGoalsList: prepareBGList(bgNodeIdList)
        };
    }

    function getBLName(blNodeId: string): string {
        const blName: string | undefined =
            activeBusinessLineList.find((bl: BusinessLineModel) => bl.nodeId === blNodeId)?.name;
        return undefined !== blName ? blName : "";
    }

    function prepareProductList(productNodeIdList: string[]): RAProductModel[] {
        const productDataList: RAProductModel[] = [];
        allProductList.forEach((product: ProductModel) => {
            productNodeIdList.forEach((prodNodeId: string) => {
                if (product.nodeId === prodNodeId) {
                    const productData: RAProductModel = {
                        name: product.productName,
                        nodeId: product.nodeId,
                        thumbnail: product.thumbnail
                    };
                    productDataList.push(productData);
                }
            });
        });
        return productDataList;
    }

    function prepareBGList(bgNodeIdList: string[]): RABusinessGoalModel[] {
        const bgDataList: RABusinessGoalModel[] = [];
        allBusinessGoalList.forEach((bg: BusinessGoalTableType) => {
            bgNodeIdList.forEach((bgNodeId: string) => {
                if (bg.nodeId === bgNodeId) {
                    const bgData: RABusinessGoalModel = {
                        name: bg.businessGoalName,
                        nodeId: bg.nodeId
                    };
                    bgDataList.push(bgData);
                }
            });
        });
        return bgDataList;
    }

    return (
        <Grid container direction="column">
            <Grid item className={revenueAchievementStyleClasses.filterMenu}>
                <FilterSubmenu
                    view="Innovation KPI"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    selectedBusinessLinesList={selectedBusinessLinesList}
                    setSelectedBusinessLinesList={setSelectedBusinessLinesList} />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView }}
                className={revenueAchievementStyleClasses.revenueAchivementGrid}>
                <Grid container direction="column" spacing={3} className={revenueAchievementStyleClasses.rootBox}>
                    <Grid item style={{ marginRight: openFilterMenu ? "26px" : "32px" }} >
                        <Header
                            currentPageHeading="Revenue Achievement"
                            currentPageSubHeading="for"
                            selectFieldWithScrollbar={selectMenuData} />
                    </Grid>
                    <Grid item>
                        {
                            isPassedYear ?
                                <RATableForHistoricalData
                                    raBusinessLinesWithHistoricalDataList={prepareRABusinessLinesWithHistoricalDataList()}
                                    showBusinessLineList={showBusinessLineList} />
                                :
                                <RevenueAchievementTable
                                    handleJOPFieldBlur={handleJOPFieldBlur}
                                    handleGOALFieldBlur={handleGOALFieldBlur}
                                    handleQuarterFieldBlur={handleQuarterFieldBlur}
                                    raBusinessLinesList={raBusinessLinesList}
                                    allRevenueAchievements={allRevenueAchievements}
                                    selectedYear={selectedYear}
                                    isRAEditable={!lInnovationData.userPermission.releaseView.isRAEditable}
                                    showBusinessLineList={showBusinessLineList} />
                        }
                    </Grid>
                </Grid>
            </Grid>
            {alertPopupData.isOpen &&
                <AlertPopup
                    isOpen={alertPopupData.isOpen}
                    severity={alertPopupData.severity}
                    content={alertPopupData.content}
                    handleCloseButtonClick={alertPopupData.handleCloseButtonClick} />}

            {mainPageLoading && <LoadingIcon />}
        </Grid>
    )
}