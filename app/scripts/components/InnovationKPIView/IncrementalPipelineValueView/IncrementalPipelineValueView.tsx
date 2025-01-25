import { Grid, Box } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { YealryIPVModel } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import { defaultYealryIPVInitializer } from "../../../utils/MPLViewUtils";
import { getCurrentYear } from "../../../utils/Utilities";
import FilterSubmenu from "../../FilterSubmenu";
import Header from "../../utils/Header/Header";
import SelectMenuModel from "../../utils/Header/SelectMenu/SelectMenuModel";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import { IncrementalPipelineValueViewStyles } from "./IncrementalPipelineValueViewStyles";
import { IPVTable } from "./IPVTable/IPVTable";
import { IPVWidgetCards } from "./IPVWidgetCards/IPVWidgetCards";

export function IncrementalPipelineValueView() {

    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 85;

    /**Importing the context data */
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const IPVViewStyles = IncrementalPipelineValueViewStyles();

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);

    /**Selected year */
    const [selectedYear, setSelectedYear] = useState<string>(getCurrentYear().toString());

    /**Loading icon */
    const [loadingIcon, setLoadingIcon] = useState<boolean>(true);

    const [ipvData, setIPVData] = useState(defaultYealryIPVInitializer(selectedYear));
    const defaultQuarterlyIPVData: number[] = [0, 0, 0, 0];
    const [quarterlyIPVData, setQuarterlyIPVData] = useState<number[]>(defaultQuarterlyIPVData);

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
        if ("" !== selectedYear) {
            setLoadingIcon(true);
            BusinessGoalService.innovationGetYearlyIPV(lInnovationData.eskoAccountDetail.repoid,
                selectedYear)
                .then((ipvResponse: YealryIPVModel) => {
                    setIPVData(ipvResponse);
                    setLoadingIcon(false);
                }).catch((ipvError: any) => {
                    console.log(ipvError);
                    setIPVData(defaultYealryIPVInitializer(selectedYear));
                    setLoadingIcon(false);
                });
        }
    }, [lInnovationData.eskoAccountDetail.repoid, lNodeEventData.IPVUpdated, selectedYear]);

    useEffect(() => {
        if ("" !== selectedYear) {
            setLoadingIcon(true);
            BusinessGoalService.innovationGetQuarterlyIPV(lInnovationData.eskoAccountDetail.repoid,
                selectedYear)
                .then((ipvResponse: number[]) => {
                    setQuarterlyIPVData(ipvResponse);
                    setLoadingIcon(false);
                }).catch((ipvError: any) => {
                    console.log(ipvError);
                    setQuarterlyIPVData(defaultQuarterlyIPVData);
                    setLoadingIcon(false);
                });
        }
    }, [lInnovationData.eskoAccountDetail.repoid, lNodeEventData.IPVUpdated, selectedYear]);

    function getYearsList(): string[] {
        const options: string[] = [];
        const startYear: number = 2023;
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

    return (
        <Grid container className={IPVViewStyles.rootContainer}>
            <Grid item className={IPVViewStyles.filterMenu}>
                <FilterSubmenu
                    view="Innovation KPI"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView }} className={IPVViewStyles.IPVGrid}>
                <Box className={IPVViewStyles.rootBox}>
                    <div
                        style={{
                            opacity: loadingIcon ? 0.5 : 1,
                            pointerEvents: loadingIcon ? "none" : "all"
                        }}>
                        <Header
                            currentPageHeading="Incremental Pipeline Value"
                            currentPageSubHeading="for"
                            selectFieldWithScrollbar={selectMenuData}
                        />
                        <IPVWidgetCards
                            quarterIPV={quarterlyIPVData}
                            softwareIPV={ipvData.softwareIPV}
                            hardwareIPV={ipvData.hardwareIPV} />
                        <IPVTable
                            ipvData={ipvData}
                            selectedYear={selectedYear} />
                    </div>
                </Box>
            </Grid>
            {
                /**Display the loading animation only when loadingIcon is true */
                loadingIcon ?
                    <LoadingIcon /> :
                    null
            }
        </Grid>
    )
}