import { Accordion, AccordionDetails, Checkbox, FormControl, FormControlLabel, FormGroup, ListItem, ThemeProvider, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useContext, useEffect, useState } from "react";
import { InnovationStatus } from "../../../../../constant/InnovationEnums";
import { InnovationAppContext } from "../../../../../context/InnovationAppContext";
import { BusinessGoalWithIdType } from "../../../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../../../services/service/BusinessGoalService";
import { RunwayFilterTheme } from "../../../../../themes/RunwayFilterTheme";
import CheckBoxItem from "../../../../FilterComponents/CheckBoxItem";
import { BusinessGoalFilterModel, BusinessGoalsListWithChecked, BGModel } from "./BusinessGoalFilterModel";
import { FilterStyles } from "../FilterStyles";
import { NodeEventContext } from "../../../../../context/NodeEventContext";
import { FilterAccordionSummary, FilterSubMenuStyles } from "../../../../../themes/FilterSubMenuTheme";
import { BUSINESS_GOAL_FILTER_TEXT, NO_BUSINESS_GOALS_ADDED_TEXT, SHOW_OR_HIDE_ALL } from "../../../../../constant/SubMenuFilterTexts";

export default function BusinessGoalFilter(businessGoalFilterProps: BusinessGoalFilterModel) {

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const businessGoalFilterStyleClasses = FilterStyles();
    const FilterSubMenuStyleClasses = FilterSubMenuStyles();

    const [businessGoalsList, setBusinessGoalsList] = useState<BusinessGoalWithIdType[]>([]);
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [loadedBusninessGoalsList, setLoadedBusninessGoalsList] = useState<boolean>(false);
    const [totalBusinessGoalListDatawithChecked, setTotalBusinessGoalListDatawithChecked] = useState<BusinessGoalsListWithChecked[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(false);
    const [checkshowAll, setCheckShowAll] = useState<boolean>(false);

    const handleChecked = (index: number) => {
        let tempCheckedBusinessGoalData: BusinessGoalsListWithChecked[] = [...totalBusinessGoalListDatawithChecked];
        tempCheckedBusinessGoalData[index] = {
            businessGoalDetails: totalBusinessGoalListDatawithChecked[index].businessGoalDetails,
            checked: !totalBusinessGoalListDatawithChecked[index].checked
        }
        let tempCheckedBusinessGoalList: string[] = [...businessGoalFilterProps.selectedBusinessGoalsList];
        /**If a Runway is checked add the nodeId to checkedRunwaysList array */
        if (tempCheckedBusinessGoalData[index].checked) {
            tempCheckedBusinessGoalList = tempCheckedBusinessGoalList.concat(tempCheckedBusinessGoalData[index].businessGoalDetails.nodeId);
            businessGoalFilterProps.setSelectedBusinessGoalsList(tempCheckedBusinessGoalList);
        }
        /**If a Runway is unchecked remove the nodeId from checkedRunwaysList array */
        else {
            tempCheckedBusinessGoalList.splice(tempCheckedBusinessGoalList.indexOf(tempCheckedBusinessGoalData[index].businessGoalDetails.nodeId), 1);
            businessGoalFilterProps.setSelectedBusinessGoalsList(tempCheckedBusinessGoalList);
        }
        setTotalBusinessGoalListDatawithChecked(tempCheckedBusinessGoalData);
        /**If every check box is checked, check the "Show/Hide All" */
        if (tempCheckedBusinessGoalList.length - 1 === businessGoalsList.length) {
            setCheckShowAll(true);
        }
        /**If a check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
        if (!totalBusinessGoalListDatawithChecked[index].checked === false && checkshowAll) {
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
        setLoadedBusninessGoalsList(false);
        BusinessGoalService.getAllBusinessGoals(lInnovationData.eskoAccountDetail.repoid)
            .then((businessGoalResponse: BGModel[]) => {

                businessGoalResponse.sort((firstBG: BGModel, secondBG: BGModel) => {
                    return (firstBG.PPLPriority.toLowerCase() > secondBG.PPLPriority.toLowerCase() ? 1 : -1);
                });

                const activeScheduledBGs: BusinessGoalWithIdType[] = businessGoalResponse.filter((bg: BGModel) =>
                    (bg.status === InnovationStatus.ACTIVE || bg.status === InnovationStatus.SCHEDULED)
                );
                setBusinessGoalsList(activeScheduledBGs);
                setShowLoadingIcon(false);
                setLoadedBusninessGoalsList(true);
            })
            .catch((error: any) => {
                console.log(error);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.businessGoalsUpdated]);

    useEffect(() => {
        if (loadedBusninessGoalsList) {
            let tempTotalBusinessGoalsListData: BusinessGoalWithIdType[] = [...businessGoalsList];
            let filteredSelectedBusinessGoalsList: string[] = [];
            tempTotalBusinessGoalsListData.forEach((businessGoal: BusinessGoalWithIdType) => {
                if (-1 !== businessGoalFilterProps.selectedBusinessGoalsList.indexOf(businessGoal.nodeId)) {
                    filteredSelectedBusinessGoalsList = filteredSelectedBusinessGoalsList.concat(businessGoal.nodeId);
                }
            });

            businessGoalFilterProps.setSelectedBusinessGoalsList(filteredSelectedBusinessGoalsList);

            let tempBusinessGoalListDataWithChecked: BusinessGoalsListWithChecked[] = [];
            tempTotalBusinessGoalsListData.forEach((businessGoal: BusinessGoalWithIdType) => {
                const tempBusinessGoalDataWithChecked: BusinessGoalsListWithChecked = {
                    businessGoalDetails: businessGoal,
                    checked: businessGoalFilterProps.selectedBusinessGoalsList.indexOf(businessGoal.nodeId) != -1 ? true : false
                }
                tempBusinessGoalListDataWithChecked = tempBusinessGoalListDataWithChecked.concat(tempBusinessGoalDataWithChecked);
            })
            /**Set the list with the RunwaysList and checked to false */
            setTotalBusinessGoalListDatawithChecked(tempBusinessGoalListDataWithChecked);
        }
    }, [loadedBusninessGoalsList, businessGoalsList]);

    useEffect(() => {
        let tempCheckedBusinessGoalData: BusinessGoalsListWithChecked[] = [...totalBusinessGoalListDatawithChecked];
        /**Checks every Checkboxes and push the nodeId of every runways into the selectedRunwaysList */
        if (showAll && checkshowAll) {
            let tempCheckedBusinessGoalsList: string[] = [];
            businessGoalsList.forEach((businessGoal: BusinessGoalWithIdType) => {
                tempCheckedBusinessGoalsList = tempCheckedBusinessGoalsList.concat(businessGoal.nodeId);
            });
            tempCheckedBusinessGoalData.forEach((businessGoal: BusinessGoalsListWithChecked) => {
                businessGoal.checked = checkshowAll;
            });
            setTotalBusinessGoalListDatawithChecked(tempCheckedBusinessGoalData);
            businessGoalFilterProps.setSelectedBusinessGoalsList(tempCheckedBusinessGoalsList);
        }
        else if (showAll && !checkshowAll) {
            setShowAll(false);
        }
        /**UnChecks every Checkboxes and set the CheckedRunwaysList to empty array */
        else if (!showAll && !checkshowAll && initialLoad) {
            tempCheckedBusinessGoalData.forEach((businessGoal) => {
                businessGoal.checked = checkshowAll;
            })
            setTotalBusinessGoalListDatawithChecked(tempCheckedBusinessGoalData);
            businessGoalFilterProps.setSelectedBusinessGoalsList([]);
        }
    }, [checkshowAll]);

    useEffect(() => {
        /**If every check box is checked, check the "Show/Hide All" */
        if (businessGoalFilterProps.selectedBusinessGoalsList.length === businessGoalsList.length && businessGoalsList.length != 0) {
            setCheckShowAll(true);
            setShowAll(true);
            setInitialLoad(true);
        } else {
            setCheckShowAll(false);
        }
    }, [businessGoalsList, businessGoalFilterProps.selectedBusinessGoalsList]);

    return (
        <Accordion defaultExpanded className={FilterSubMenuStyleClasses.accordionRoot}>
            <FilterAccordionSummary>
                <Typography className={FilterSubMenuStyleClasses.accordionTitleText}>
                    {BUSINESS_GOAL_FILTER_TEXT}
                </Typography>
            </FilterAccordionSummary>
        <AccordionDetails>
                {
                    showLoadingIcon ? <CircularProgress className={businessGoalFilterStyleClasses.LoadingIconClass} /> :
                        !showLoadingIcon && businessGoalsList.length === 0 ?
                            <h5 className={businessGoalFilterStyleClasses.NoBGMessageClass}>{NO_BUSINESS_GOALS_ADDED_TEXT}</h5> :
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
                                            label={<p className={businessGoalFilterStyleClasses.ShowOrHideAllClass}>{SHOW_OR_HIDE_ALL}</p>}
                                            className={businessGoalFilterStyleClasses.ShowAllCheckBoxClass}
                                        />
                                        <div>
                                            {totalBusinessGoalListDatawithChecked.map((businessGoal: BusinessGoalsListWithChecked, index) => (
                                                <ListItem key={businessGoal.businessGoalDetails.nodeId} value={businessGoal.businessGoalDetails.businessGoalName}>
                                                    <CheckBoxItem
                                                        itemName={businessGoal.businessGoalDetails.businessGoalName}
                                                        isChecked={businessGoal.checked}
                                                        index={index}
                                                        onChange={handleChecked}
                                                        itemId={businessGoal.businessGoalDetails.nodeId}></CheckBoxItem>
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