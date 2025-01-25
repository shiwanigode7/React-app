/**TSX file for displaying view for Release - OnTimeDelivery */
import { Box, Grid, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import FilterSubmenu from "../../FilterSubmenu";
import Header from "../../utils/Header/Header";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import { OnTimeDeliveryViewStyle } from "./OnTimeDeliveryViewStyle";
import { OverallScoreCard } from "./OverallScoreCard/OverallScoreCard";
import InfoIcon from '@material-ui/icons/Info';
import { defaultOTDFreezeIn, diffWithCurrentDate } from "../../../utils/Utilities";
import { OTD_FREEZE_IN } from "./OverallScoreCard/OverallScoreCardModel";
import { HeroFeaturesTable } from "./HeroFeaturesTable/HeroFeaturesTable";
import { HeroFeatureTableModel, defaultOTDInitializer, HeroFeatureForOTDModel, heroFeatureStatusDropDownValue, ProductForOTDModel } from "./HeroFeaturesTable/HeroFeatureTableModel";
import { DateRangeSelectorModel } from "../../utils/Header/HeaderModel";
import { MONTH_NAMES } from "../../../utils/Utilities";
import ProductService from "../../../services/service/ProductService";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { ALERT_SEVERITY } from "../../../constant/InnovationEnums";
import { AlertStyles } from "../../../themes/MeetingsTheme";
import { ALERT_UPDATE_FAILED } from "../../../constant/MeetingViewTexts";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { ProductWithIdAndNameModel } from "../../utils/Flyout/Filters/ProductsFilter/ProductFilterModel";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";

export function OnTimeDeliveryView() {

    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 85;

    const OnTimeDeliveryStylesClass = OnTimeDeliveryViewStyle();
    const alertStyleClasses = AlertStyles();

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)

    const getCurrentMonth = () => {
        const tempDate = new Date();
        return MONTH_NAMES[tempDate.getMonth()] + " " + tempDate.getFullYear().toString();
    };

    const [productFilterOptions, setProductFilterOptions] = useState<ProductWithIdAndNameModel[]>([]);
    const [selectedProductsList, setSelectedProductsList] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [isOnlyMyProduct, setIsOnlyMyProduct] = useState<boolean>(false);
    const [endDate, setEndDate] = useState<Date>(new Date(""));
    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
    const [firstMonth, setFirstMonth] = useState<string>(getCurrentMonth());
    const [disableUpArrow, setDisableUpArrow] = useState<boolean>(true);
    const [disableDownArrow, setDisableDownArrow] = useState<boolean>(false);
    const [OTDFreezeInDate, setOTDFreeezeInDate] = useState<string>(defaultOTDFreezeIn);
    const [heroFeatureData, setHeroFeatureData] = useState<HeroFeatureForOTDModel>(defaultOTDInitializer());
    const [businessGoalCount, setBusinessGoalCount] = useState<number>(0);
    /**Alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const ALERT_AUTO_HIDE_DURATION: number = 3000;
    /**Loading icon */
    const [loadingIcon, setLoadingIcon] = useState<boolean>(true);

    const toggleButtonData: ToggleButtonModel = {
        label: "Show only my Products",
        handleChange: (changeEvent: any) => {
            setIsOnlyMyProduct(changeEvent.target.checked);
        }
    };

    const getBusinessGoalCount = () => {
        let businessGoalList: string[] = [];
        if (heroFeatureData.heroFeatures) {
            heroFeatureData.heroFeatures.forEach((lHeroFeature: HeroFeatureTableModel) => {
                if (-1 === businessGoalList.indexOf(lHeroFeature.businessGoalId)) {
                    businessGoalList.push(lHeroFeature.businessGoalId);
                }
            })
        }
        return businessGoalList.length;
    }

    const updateCurrentStatus = (inNewStatus: string, inHeroFeatureId: string, inHeroFeatureNodeId: string): void | any => {
        setLoadingIcon(true);
        return new Promise<void>((resolve, reject) => {
            ProductService.innovationUpdateHeroFeatureStatus(lInnovationData.eskoAccountDetail.repoid,
                heroFeatureData.monthYear, inHeroFeatureId, inHeroFeatureNodeId, inNewStatus)
                .then((statusChangeResponse: any) => {
                    setLoadingIcon(false);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(statusChangeResponse.message);
                    resolve();
                }).catch((statusChangeError: any) => {
                    console.log(statusChangeError);
                    setLoadingIcon(false);
                    setOpenAlert(true);
                    setAlertSeverity(ALERT_SEVERITY.ERROR);
                    setAlertContent(ALERT_UPDATE_FAILED);
                    reject();
                });
        });
    }

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth);
        }
        else {
            setMarginContentView(leftNavWidth);
        }
    }, [openFilterMenu]);

    useEffect(() => {
        if ("" === selectedMonth) {
            setSelectedMonth(getCurrentMonth());
        }
        /**status filter */
        let holdStatusValue = window.sessionStorage.getItem("OTDstatus");
        if (holdStatusValue !== null && holdStatusValue.split(",") !== undefined) {
            setSelectedStatus(holdStatusValue.split(","));
        } else {
            setSelectedStatus(heroFeatureStatusDropDownValue);
        }
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        /**First OTD month with data */
        ProductService.getFirstOTDMonth(lInnovationData.eskoAccountDetail.repoid)
            .then((lFirstMonth: string) => {
                if (undefined !== lFirstMonth && "" !== lFirstMonth) {
                    setFirstMonth(lFirstMonth);
                } else {
                    setFirstMonth(getCurrentMonth());
                }
            }).catch((getOTDError: any) => {
                console.log(getOTDError);
            });
    }, [lInnovationData.eskoAccountDetail.repoid]);

    useEffect(() => {
        if ("" !== selectedMonth) {
            setLoadingIcon(true);
            ProductService.getOTDForMonth(lInnovationData.eskoAccountDetail.repoid, selectedMonth)
                .then((otdResponse: HeroFeatureForOTDModel) => {
                    setHeroFeatureData(otdResponse);
                    setLoadingIcon(false);
                }).catch((getOTDError: any) => {
                    setLoadingIcon(false);
                    console.log(getOTDError);
                });
        }
    }, [selectedMonth, lInnovationData.eskoAccountDetail, lNodeEventData.OTDUpdated]);

    useEffect(() => {
        const lCurrentDate: Date = new Date(getCurrentMonth());
        const lSelectedDate: Date = new Date(heroFeatureData.monthYear);
        let isPastDate: boolean = false;
        if (lSelectedDate.getTime() < lCurrentDate.getTime()) {
            isPastDate = true
        }
        if (isPastDate && 0 !== heroFeatureData.products.length) {
            let tempProductFilterOptions: ProductWithIdAndNameModel[] = [];
            heroFeatureData.products.forEach((product: ProductForOTDModel) => {
                const tempProductDetail: ProductWithIdAndNameModel = {
                    productName: product.productName,
                    nodeId: product.productId
                }
                tempProductFilterOptions = tempProductFilterOptions.concat(tempProductDetail);
            })
            setProductFilterOptions(tempProductFilterOptions);
        } else {
            setProductFilterOptions([]);
        }
        if (undefined !== heroFeatureData.products) {
            let tempProductNodeIds: string[] = [];
            heroFeatureData.products.forEach((product: ProductForOTDModel) => {
                tempProductNodeIds = tempProductNodeIds.concat(product.productId);
            });
            setSelectedProductsList(tempProductNodeIds);
        }
    }, [heroFeatureData.products])

    useEffect(() => {
        if ("" !== heroFeatureData.freezeDate) {
            setEndDate(new Date(heroFeatureData.freezeDate));
        } else {
            setOTDFreeezeInDate(defaultOTDFreezeIn);
        }
    }, [heroFeatureData.freezeDate]);

    useEffect(() => {
        setBusinessGoalCount(getBusinessGoalCount());
    }, [heroFeatureData.activeBusinessGoals, heroFeatureData.heroFeatures]);

    useEffect(() => {
        window.sessionStorage.setItem("OTDstatus", selectedStatus.toString());
    }, [selectedStatus]);

    setInterval(function () {
        setOTDFreeezeInDate(diffWithCurrentDate(endDate));
    }, 60 * 1000);

    useEffect(() => {
        if (firstMonth === selectedMonth) {
            setDisableDownArrow(true);
        } else {
            setDisableDownArrow(false);
        }
        if (OTDFreezeInDate === defaultOTDFreezeIn) {
            setDisableUpArrow(false);
        } else {
            setDisableUpArrow(true);
        }
    }, [selectedMonth, OTDFreezeInDate]);

    useEffect(() => {
        setOTDFreeezeInDate(diffWithCurrentDate(endDate));
    }, [endDate]);

    const dateSelectorData: DateRangeSelectorModel = {
        selectedDate: selectedMonth,
        setSelectedDate: setSelectedMonth,
        disableUpArrow: disableUpArrow,
        disableDownArrow: disableDownArrow
    };

    return (
        <Grid container className={OnTimeDeliveryStylesClass.rootContainer}>
            <Grid item className={OnTimeDeliveryStylesClass.filterMenu}>
                <FilterSubmenu
                    view="Innovation KPI"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    selectedProductsList={selectedProductsList}
                    rememberSessionForProductFilter={false}
                    setSelectedProductsList={setSelectedProductsList}
                    selectedStatusValues={selectedStatus}
                    productFilterOptions={productFilterOptions}
                    setSelectedStatusValues={setSelectedStatus}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView }} className={OnTimeDeliveryStylesClass.OTDGrid}>
                <Box className={OnTimeDeliveryStylesClass.rootBox}>
                    <div
                        style={{
                            opacity: loadingIcon ? 0.5 : 1,
                            pointerEvents: loadingIcon ? "none" : "all"
                        }}
                    >
                        <Header
                            currentPageHeading="On Time Delivery"
                            currentPageSubHeading="for"
                            dateRangeSelector={dateSelectorData}
                            toggleButton={toggleButtonData}
                        />
                        <Grid container direction="row" className={OnTimeDeliveryStylesClass.overallScoreGrid}>
                            <Grid item className={OnTimeDeliveryStylesClass.overallScoreItem}>
                                <OverallScoreCard
                                    scoreCardName="OTD"
                                    value={99.50 < heroFeatureData.otdPercentage && 100 > heroFeatureData.otdPercentage ?
                                        Math.floor(heroFeatureData.otdPercentage) : Math.round(heroFeatureData.otdPercentage)}
                                />
                            </Grid>
                            <Grid item className={OnTimeDeliveryStylesClass.overallScoreItem}>
                                <OverallScoreCard
                                    scoreCardName="Milestones On Track"
                                    value={heroFeatureData.completedMilestones}
                                />
                            </Grid>
                            <Grid item className={OnTimeDeliveryStylesClass.overallScoreItem}>
                                <OverallScoreCard
                                    scoreCardName="Milestones Behind"
                                    value={heroFeatureData.incompleteMilestones}
                                />
                            </Grid>
                            <Grid item className={OnTimeDeliveryStylesClass.overallScoreItem}>
                                <OverallScoreCard
                                    scoreCardName="Business Goals"
                                    value={businessGoalCount}
                                />
                            </Grid>
                        </Grid>
                        <Alert severity="info" icon={<InfoIcon className={OnTimeDeliveryStylesClass.alertIcon} />} className={OnTimeDeliveryStylesClass.alert}>
                            <Typography className={OnTimeDeliveryStylesClass.alertHeading}>
                                {OTD_FREEZE_IN}
                            </Typography>
                            <Typography className={OnTimeDeliveryStylesClass.alertTime}>
                                {OTDFreezeInDate}
                            </Typography>
                        </Alert>
                        <HeroFeaturesTable
                            heroFeatureData={heroFeatureData}
                            selectedStatusValue={selectedStatus}
                            selectedProductValue={selectedProductsList}
                            showOnlyMyProducts={isOnlyMyProduct}
                            updateStatusCallback={updateCurrentStatus} />
                    </div>
                </Box>
            </Grid>
            {/**Snackbar to display the success/error popup */}
            <Snackbar
                open={openAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                key={'top' + 'center'}
                autoHideDuration={ALERT_AUTO_HIDE_DURATION}
                onClose={() => setOpenAlert(false)}>
                <Alert
                    icon={alertSeverity === ALERT_SEVERITY.SUCCESS ?
                        <CheckCircleOutlineIcon fontSize="medium" />
                        : <ErrorOutlineIcon fontSize="medium" />
                    }
                    severity={alertSeverity}
                    className={alertStyleClasses.root}
                >
                    {alertContent}
                </Alert>
            </Snackbar>
            {
                /**Display the loading animation only when loadingIcon is true */
                loadingIcon ?
                    <LoadingIcon /> :
                    null
            }
        </Grid>
    )
}