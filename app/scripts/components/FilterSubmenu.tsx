import { ObjectView } from "@esko/cloud-ui-components/dist/esm";
import { Grid, IconButton, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import images from "../../Icons/images";
import { FilterSubMenuTheme, FilterSubMenuStyles } from "../themes/FilterSubMenuTheme";
import RunwayFilter from "./utils/Flyout/RunwayFilter";
import { StatusFilterButtonInterface } from "./StatusFilterButton";
import ReleaseModel from "./settings/InnovationCadenceView/ReleaseModel";
import UpcomingMeetings from "./utils/Flyout/UpcomingMeetings/UpcomingMeetings";
import StatusFilter from "./utils/Flyout/StatusFilter/StatusFilter";
import BusinessGoalFilter from "./utils/Flyout/Filters/BusinessGoalFilter/BusinessGoalFilter";
import RRMByMenu from "./utils/Flyout/RRMByMenu";
import Info from "./utils/Flyout/Info";
import ReleaseOverview from "./utils/Flyout/ReleaseOverview";
import Description from "./utils/Flyout/Description/Description";
import ProductsFilter from "./utils/Flyout/Filters/ProductsFilter/ProductsFilter";
import BusinessLineFilter from "./utils/Flyout/Filters/BusinessLineFilter/BusinessLineFilter";
import SubMenuCheckboxFilter from "./utils/Flyout/Filters/SubMenuFilter/SubMenuCheckboxFilter";
import { businessUnits } from "../constant/BusinessGoalDropdownValues";
import { BUSINESS_UNIT_FILTER_TEXT, CURRENT_STATUS } from "../constant/SubMenuFilterTexts";
import { heroFeatureStatusDropDownValue } from "./ReleaseView/OnTimeDelivery/HeroFeaturesTable/HeroFeatureTableModel";
import { ProductWithIdAndNameModel } from "./utils/Flyout/Filters/ProductsFilter/ProductFilterModel";
import InnovationKPIOverview from "./utils/Flyout/InnovationKPIOverview";

/**Interface for the props */
export interface FilterSubMenuProps {
    openFilterMenu: boolean;
    setOpenFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
    view: string;
    /**Props for the Status Filter */
    listOfButtons?: StatusFilterButtonInterface[];
    selectedStatusValues?: string[];
    setSelectedStatusValues?: React.Dispatch<React.SetStateAction<string[]>>;
    /**Props for the Runways Filter */
    selectedRunwaysList?: string[];
    setSelectedRunwaysList?: React.Dispatch<React.SetStateAction<string[]>>;
    selectedReleaseObject?: ReleaseModel;
    hideFlyoutOpeningIcon?: boolean;
    selectedBusinessGoalsList?: string[];
    setSelectedBusinessGoalsList?: React.Dispatch<React.SetStateAction<string[]>>;
    selectedProductsList?: string[];
    setSelectedProductsList?: React.Dispatch<React.SetStateAction<string[]>>;
    selectedBusinessLinesList?: string[];
    setSelectedBusinessLinesList?: React.Dispatch<React.SetStateAction<string[]>>;
    selectedBusinessUnitsList?: string[];
    rememberSessionForProductFilter?: boolean;
    productFilterOptions?: ProductWithIdAndNameModel[];
    setSelectedBusinessUnitsList?: React.Dispatch<React.SetStateAction<string[]>>;
    isMeetingsPresent?: boolean;
}

export default function FilterSubmenu(props: FilterSubMenuProps) {

    /**State to have the width for the Filter Menu */
    const [sideNavWidth, setSideNavWidth] = useState<number>();

    useEffect(() => {
        if (undefined != props.hideFlyoutOpeningIcon && props.hideFlyoutOpeningIcon) {
            setSideNavWidth(500);
        } else {
            setSideNavWidth(240);
        }
    }, []);

    /**When even the sideNavOpen changes update the drawer width */
    useEffect(() => {
        if (props.openFilterMenu) {
            setSideNavWidth(240);
        }
        else {
            setSideNavWidth(1);
        }
    }, [props.openFilterMenu]);

    const FilterSubMenuStylesClasses = FilterSubMenuStyles();

    /**Set open to true/false whenevr the Icon button is clicked */
    const handleDrawerOpen = () => {
        props.setOpenFilterMenu(!props.openFilterMenu);
    };

    function isInfoVisible(): boolean {
        if (("SIR" === props.view || "PPG" === props.view) && (props.isMeetingsPresent ? props.isMeetingsPresent : false)) {
            return true;
        }
        return false;
    }

    function isUpcomingMeetingsVisible(): boolean {
        if ("MPL" === props.view || "PPL" === props.view || "SIR" === props.view || "PPG" === props.view) {
            return true;
        }
        return false;
    }

    function isStatusFilterVisible(): boolean {
        if ("RRM" !== props.view && "Release" !== props.view && "Innovation KPI" !== props.view && "SIR" !== props.view && "PPG" !== props.view && "ResourceManagement" !== props.view) {
            return true;
        }
        return false;
    }

    function isRRMByVisible(): boolean {
        if ("RRM" === props.view) {
            return true;
        }
        return false;
    }

    function isDescriptionVisible(): boolean {
        if ("Release" === props.view) {
            return true;
        }
        return false;
    }

    return (
        <ThemeProvider theme={FilterSubMenuTheme}>
            <Grid container>
                <Grid item>
                    <ObjectView
                        properties={{}}
                        DrawerProps={{
                            open: true,
                            PaperProps: {
                                className: undefined != props.hideFlyoutOpeningIcon && props.hideFlyoutOpeningIcon ?
                                    FilterSubMenuStylesClasses.showSideBar : FilterSubMenuStylesClasses.drawerPaper
                            },
                            anchor: "left"
                        }}
                        headerTitle={""}
                        headerIcon={null}
                        width={sideNavWidth}
                        objectId={""}
                        className={FilterSubMenuStylesClasses.root}>
                        {/**Display the content inside the Object View */}
                        {() => {
                            return (
                                <div>
                                    <Grid container style={{ alignItems: "center" }} direction="column">
                                        {
                                            isInfoVisible() &&
                                            <Grid item>
                                                <Info
                                                    view={props.view} />
                                            </Grid>
                                        }
                                        {
                                            isUpcomingMeetingsVisible() &&
                                            <Grid item>
                                                <UpcomingMeetings />
                                            </Grid>
                                        }
                                        {
                                            isStatusFilterVisible() &&
                                            <Grid item>
                                                <StatusFilter
                                                    listOfButtons={props.listOfButtons}
                                                    selectedStatusValues={props.selectedStatusValues}
                                                    setSelectedStatusValues={props.setSelectedStatusValues} />
                                            </Grid>
                                        }
                                        {
                                            isRRMByVisible() &&
                                            <Grid item>
                                                <RRMByMenu />
                                            </Grid>
                                        }
                                        {
                                            isDescriptionVisible() && props.selectedReleaseObject &&
                                            <Grid item className={FilterSubMenuStylesClasses.releaseDescription} >
                                                <Description
                                                    selectedReleaseObject={props.selectedReleaseObject} />
                                            </Grid>
                                        }
                                        {
                                            "Release" === props.view &&
                                            <Grid item>
                                                <ReleaseOverview />
                                            </Grid>
                                        }
                                        {
                                            "Innovation KPI" === props.view &&
                                            <Grid item>
                                                <InnovationKPIOverview />
                                            </Grid>
                                        }
                                        {
                                            "Innovation KPI" === props.view && props.selectedStatusValues && props.setSelectedStatusValues &&
                                            <Grid item className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <SubMenuCheckboxFilter
                                                    title={CURRENT_STATUS}
                                                    listOfItems={heroFeatureStatusDropDownValue}
                                                    selectedCheckboxList={props.selectedStatusValues}
                                                    setSelectedCheckboxList={props.setSelectedStatusValues} />
                                            </Grid>
                                        }
                                        {
                                            props.selectedBusinessUnitsList && props.setSelectedBusinessUnitsList &&
                                            <Grid item className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <SubMenuCheckboxFilter
                                                    title={BUSINESS_UNIT_FILTER_TEXT}
                                                    listOfItems={businessUnits}
                                                    selectedCheckboxList={props.selectedBusinessUnitsList}
                                                    setSelectedCheckboxList={props.setSelectedBusinessUnitsList} />
                                            </Grid>
                                        }
                                        {
                                            props.selectedRunwaysList && props.setSelectedRunwaysList &&
                                            <Grid item className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <RunwayFilter
                                                    selectedRunwaysList={props.selectedRunwaysList}
                                                    setSelectedRunwaysList={props.setSelectedRunwaysList}
                                                    view={props.view} />
                                            </Grid>
                                        }
                                        {
                                            props.selectedBusinessGoalsList && props.setSelectedBusinessGoalsList &&
                                            <Grid item className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <BusinessGoalFilter
                                                    selectedBusinessGoalsList={props.selectedBusinessGoalsList}
                                                    setSelectedBusinessGoalsList={props.setSelectedBusinessGoalsList} />
                                            </Grid>
                                        }
                                        {
                                            props.selectedProductsList && props.setSelectedProductsList &&
                                            <Grid className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <ProductsFilter
                                                    rememberSession={undefined !== props.rememberSessionForProductFilter ? props.rememberSessionForProductFilter : false}
                                                    productFilterOptions={props.productFilterOptions}
                                                    selectedProductList={props.selectedProductsList}
                                                    setSelectedProductList={props.setSelectedProductsList} />
                                            </Grid>
                                        }
                                        {
                                            props.selectedBusinessLinesList && props.setSelectedBusinessLinesList &&
                                            <Grid className={FilterSubMenuStylesClasses.checkBoxFilterGrid}>
                                                <BusinessLineFilter
                                                    selectedBusinessLineList={props.selectedBusinessLinesList}
                                                    setSelectedBusinessLineList={props.setSelectedBusinessLinesList} />
                                            </Grid>
                                        }
                                    </Grid>
                                </div>
                            )
                        }}
                    </ObjectView>
                </Grid>
                {/**Icons for closing and opening the Filter Menu */}
                {
                    (undefined === props.hideFlyoutOpeningIcon && !props.hideFlyoutOpeningIcon) &&
                    <Grid item style={{ marginLeft: props.openFilterMenu ? "12px" : "20px" }} onClick={handleDrawerOpen}>
                        <IconButton
                            onClick={handleDrawerOpen}
                            style={{ transition: "300ms", top: "50vh" }}
                        >
                            {props.openFilterMenu ?
                                <img src={images.ChevronLeft}></img> :
                                <img src={images.ChevronRight}></img>
                            }
                        </IconButton>
                    </Grid>
                }
            </Grid>
        </ThemeProvider>
    )
}