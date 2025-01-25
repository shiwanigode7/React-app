import { Accordion, AccordionDetails, Checkbox, FormControl, FormControlLabel, FormGroup, ListItem, ThemeProvider, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../../../context/InnovationAppContext";
import { RunwayFilterTheme } from "../../../../../themes/RunwayFilterTheme";
import CheckBoxItem from "../../../../FilterComponents/CheckBoxItem";
import { FilterStyles } from "../FilterStyles";
import { BusinessLineFilterModel, BusinessLinesListWithChecked } from "./BusinessLineFilterModel";
import BusinessLineService from "../../../../../services/service/BusinessLineService";
import { BusinessLineModel } from "../../../../settings/BusinessLineView/BusinessLineModel";
import { FilterAccordionSummary, FilterSubMenuStyles } from "../../../../../themes/FilterSubMenuTheme";
import { BUSINESS_LINE_FILTER_TEXT, NO_BUSINESS_LINES_ADDED_TEXT, SHOW_OR_HIDE_ALL } from "../../../../../constant/SubMenuFilterTexts";

export default function BusinessLineFilter(businessLineFilterProps: BusinessLineFilterModel) {

    const lInnovationData = useContext(InnovationAppContext);

    const businessLineFilterStyleClasses = FilterStyles();
    const FilterSubMenuStyleClasses = FilterSubMenuStyles();

    const [businessLinesList, setBusinessLinesList] = useState<BusinessLineModel[]>([]);
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [loadedBusinessLinesList, setLoadedBusinessLinesList] = useState<boolean>(false);
    const [totalBusinessLineListDatawithChecked, setTotalBusinessLineListDatawithChecked] = useState<BusinessLinesListWithChecked[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(false);
    const [checkshowAll, setCheckShowAll] = useState<boolean>(false);

    const handleChecked = (index: number) => {
        let tempCheckedBusinessLinelData: BusinessLinesListWithChecked[] = [...totalBusinessLineListDatawithChecked];
        tempCheckedBusinessLinelData[index] = {
            businessLineDetails: totalBusinessLineListDatawithChecked[index].businessLineDetails,
            checked: !totalBusinessLineListDatawithChecked[index].checked
        }
        let tempCheckedBusinessLinesList: string[] = [...businessLineFilterProps.selectedBusinessLineList];
        /**If a BusinessLine is checked add the nodeId to checkedBusinessLinesList array */
        if (tempCheckedBusinessLinelData[index].checked) {
            tempCheckedBusinessLinesList = tempCheckedBusinessLinesList.concat(tempCheckedBusinessLinelData[index].businessLineDetails.nodeId);
            businessLineFilterProps.setSelectedBusinessLineList(tempCheckedBusinessLinesList);
        }
        /**If a BusinessLine is unchecked remove the nodeId from checkedBusinessLinesList array */
        else {
            tempCheckedBusinessLinesList.splice(tempCheckedBusinessLinesList.indexOf(tempCheckedBusinessLinelData[index].businessLineDetails.nodeId), 1);
            businessLineFilterProps.setSelectedBusinessLineList(tempCheckedBusinessLinesList);
        }
        setTotalBusinessLineListDatawithChecked(tempCheckedBusinessLinelData);
        /**If every check box is checked, check the "Show/Hide All" */
        if (tempCheckedBusinessLinesList.length - 1 === businessLinesList.length) {
            setCheckShowAll(true);
        }
        /**If a check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
        if (!totalBusinessLineListDatawithChecked[index].checked === false && checkshowAll) {
            setShowAll(true);
            setCheckShowAll(false);
        }
    };

    const handleShowAll = () => {
        setShowAll(!checkshowAll);
        setCheckShowAll(!checkshowAll);
    };

    useEffect(() => {
        setShowLoadingIcon(true);
        BusinessLineService.getAllBusinessLines(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessLinesResponse: BusinessLineModel[]) => {
                const activeBusinessLines: BusinessLineModel[] =
                    getBusinessLinesResponse.filter((businessLine: BusinessLineModel) => businessLine.isActive);
                setBusinessLinesList(activeBusinessLines);
                setShowLoadingIcon(false);
                setLoadedBusinessLinesList(true);
            })
            .catch((error: any) => {
                console.log(error);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        if (loadedBusinessLinesList) {
            let tempTotalBusinessLinesListData: BusinessLineModel[] = [...businessLinesList];
            let filteredSelectedBusinessLinesList: string[] = [];
            tempTotalBusinessLinesListData.forEach((businessLine: BusinessLineModel) => {
                if (-1 !== businessLineFilterProps.selectedBusinessLineList.indexOf(businessLine.nodeId)) {
                    filteredSelectedBusinessLinesList = filteredSelectedBusinessLinesList.concat(businessLine.nodeId);
                }
            });

            businessLineFilterProps.setSelectedBusinessLineList(filteredSelectedBusinessLinesList);

            let tempBusinessLineListDataWithChecked: BusinessLinesListWithChecked[] = [];
            tempTotalBusinessLinesListData.forEach((businessLine: BusinessLineModel) => {
                const tempBusinessLineDataWithChecked: BusinessLinesListWithChecked = {
                    businessLineDetails: businessLine,
                    checked: businessLineFilterProps.selectedBusinessLineList.indexOf(businessLine.nodeId) != -1 ? true : false
                }
                tempBusinessLineListDataWithChecked = tempBusinessLineListDataWithChecked.concat(tempBusinessLineDataWithChecked);
            })
            /**Set the list with the BusinessLinesList and checked to false */
            setTotalBusinessLineListDatawithChecked(tempBusinessLineListDataWithChecked);
        }
    }, [loadedBusinessLinesList]);

    useEffect(() => {
        let tempCheckedBusinessLinesData: BusinessLinesListWithChecked[] = [...totalBusinessLineListDatawithChecked];
        /**Checks every Checkboxes and push the nodeId of every BusinessLines into the selectedBusinessLinesList */
        if (showAll && checkshowAll) {
            let tempCheckedBusinessLinesList: string[] = [];
            businessLinesList.forEach((businessLine: BusinessLineModel) => {
                tempCheckedBusinessLinesList = tempCheckedBusinessLinesList.concat(businessLine.nodeId);
            });
            tempCheckedBusinessLinesData.forEach((businessLine: BusinessLinesListWithChecked) => {
                businessLine.checked = checkshowAll;
            });
            setTotalBusinessLineListDatawithChecked(tempCheckedBusinessLinesData);
            businessLineFilterProps.setSelectedBusinessLineList(tempCheckedBusinessLinesList);
        }
        else if (showAll && !checkshowAll) {
            setShowAll(false);
        }
        /**UnChecks every Checkboxes and set the CheckedBusinessLinesList to empty array */
        else if (!showAll && !checkshowAll && initialLoad) {
            tempCheckedBusinessLinesData.forEach((businessLine) => {
                businessLine.checked = checkshowAll;
            })
            setTotalBusinessLineListDatawithChecked(tempCheckedBusinessLinesData);
            businessLineFilterProps.setSelectedBusinessLineList([]);
        }
    }, [checkshowAll]);

    useEffect(() => {
        if (businessLinesList.length != 0 && businessLineFilterProps.selectedBusinessLineList.length === businessLinesList.length) {
            setCheckShowAll(true);
        }
    }, [businessLinesList, businessLineFilterProps.selectedBusinessLineList]);

    useEffect(() => {
        /**If every check box is checked, check the "Show/Hide All" */
        if (businessLineFilterProps.selectedBusinessLineList.length === businessLinesList.length && businessLinesList.length != 0) {
            setCheckShowAll(true);
            setShowAll(true);
            setInitialLoad(true);
        }
    }, [businessLineFilterProps.selectedBusinessLineList]);

    return (
        <Accordion defaultExpanded className={FilterSubMenuStyleClasses.accordionRoot}>
            <FilterAccordionSummary>
                <Typography className={FilterSubMenuStyleClasses.accordionTitleText}>
                    {BUSINESS_LINE_FILTER_TEXT}
                </Typography>
            </FilterAccordionSummary>
            <AccordionDetails>
            {
                showLoadingIcon ? <CircularProgress className={businessLineFilterStyleClasses.LoadingIconClass} /> :
                    !showLoadingIcon && businessLinesList.length === 0 ?
                        <h5 className={businessLineFilterStyleClasses.NoBLMessageClass}>{NO_BUSINESS_LINES_ADDED_TEXT}</h5> :
                        // TODO : Need to change the ThemeProvider to CSS styling 
                        // TODO : Checkbox is Esko UI Element so Theme Provider is required
                        <ThemeProvider theme={RunwayFilterTheme}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox
                                            name={""}
                                            checked={checkshowAll}
                                            onChange={handleShowAll}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                                        label={<p className={businessLineFilterStyleClasses.ShowOrHideAllClass}>{SHOW_OR_HIDE_ALL}</p>}
                                        className={businessLineFilterStyleClasses.ShowAllCheckBoxClass}
                                    />
                                    <div>
                                        {totalBusinessLineListDatawithChecked.map((businessLine: BusinessLinesListWithChecked, index) => (
                                            <ListItem key={businessLine.businessLineDetails.nodeId} value={businessLine.businessLineDetails.name}>
                                                <CheckBoxItem
                                                    itemName={businessLine.businessLineDetails.name}
                                                    isChecked={businessLine.checked}
                                                    index={index}
                                                    onChange={handleChecked}
                                                    itemId={businessLine.businessLineDetails.nodeId}></CheckBoxItem>
                                            </ListItem>
                                        ))}
                                    </div>
                                </FormGroup>
                            </FormControl>
                        </ThemeProvider>
            }
            </AccordionDetails>
        </Accordion>
    )
}