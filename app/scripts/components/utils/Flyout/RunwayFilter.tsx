import { Accordion, AccordionDetails, CircularProgress, FormControl, FormControlLabel, FormGroup, ListItem, ThemeProvider, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { RunwayModel } from "../../../interfaces/InnovationInterface";
import RunwayService from "../../../services/service/RunwayService";
import { RunwayFilterStyles, RunwayFilterTheme } from "../../../themes/RunwayFilterTheme";
import CheckBoxItem from "../../FilterComponents/CheckBoxItem";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { FilterAccordionSummary, FilterSubMenuStyles } from "../../../themes/FilterSubMenuTheme";
import { NO_RUNWAYS_ADDED_TEXT, RUNWAY_FILTER_TEXT, SHOW_OR_HIDE_ALL } from "../../../constant/SubMenuFilterTexts";
/**Interface to contain Runway details and checked property to check whether the Runway is checked or not */
export interface RunwayListWithChecked {
  runwayDetails: RunwayModel;
  checked: boolean;
}

/**Interface for the props */
export interface RunwayFilterProps {
  selectedRunwaysList: string[];
  setSelectedRunwaysList: React.Dispatch<React.SetStateAction<string[]>>;
  view?: string;
}

export default function RunwayFilter(props: RunwayFilterProps) {

  /**State to check every Checkboxes */
  const [showAll, setShowAll] = useState<boolean>(false);

  /**Get the styles */
  const RunwayFilterStyleClass = RunwayFilterStyles();
  const FilterSubMenuStyleClasses = FilterSubMenuStyles();

  /**State to check "Show/Hide All" check box */
  const [checkshowAll, setCheckShowAll] = useState<boolean>(false);

  /**State to show the loading icon */
  const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(true);

  /**Show no Runways business Goal */
  const [showNoRunways, setShowNoRunways] = useState<boolean>(false);

  /**Get the context data */
  const lInnovationData = useContext(InnovationAppContext);

  /**State to set the initial load */
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  /**State to hold the Total Runways with nodeId and name */
  const [totalRunwayListData, setTotalRunwayListData] = useState<RunwayModel[]>([]);

  /**State to hold the Total Runways details and checked property(ro indicate the particular runway is checked or not) */
  const [totalRunwayListDatawithChecked, setTotalRunwayListDatawithChecked] = useState<RunwayListWithChecked[]>([]);

  /**State to say that Runway List from the search is loaded or not*/
  const [loadedRunwayList, setLoadedRunwayList] = useState<boolean>(false);

  const noRunwaysViews: string[] = ["ResourceManagement", "RRM"];

  /*context variable for node events */
  const lNodeEventData = useContext(NodeEventContext);


  /**Checks every checkbox by default */
  useEffect(() => {
    /**If every check box is checked, check the "Show/Hide All" */
    if (props.selectedRunwaysList.length - 1 === totalRunwayListData.length && totalRunwayListData.length != 0) {
      setCheckShowAll(true);
      setShowNoRunways(true);
      setShowAll(true);
      setInitialLoad(true);
    }
    if (0 <= noRunwaysViews.indexOf(props.view ? props.view : "")) {
      const lSelectedRunwaylist: string[] = props.selectedRunwaysList;
      if (props.selectedRunwaysList.length === totalRunwayListData.length && -1 === lSelectedRunwaylist.indexOf("no_runways")) {
        lSelectedRunwaylist.push("no_runways");
        setCheckShowAll(true);
        props.setSelectedRunwaysList(lSelectedRunwaylist);
      }
    }
  }, [props.selectedRunwaysList]);

  useEffect(() => {
    if (checkshowAll) {
      const lSelectedRunwaylist: string[] = [];
      totalRunwayListData.forEach((runway: RunwayModel) => {
        lSelectedRunwaylist.push(runway.nodeId);
      })
      lSelectedRunwaylist.push("no_runways");
      props.setSelectedRunwaysList(lSelectedRunwaylist);
    }
  }, [checkshowAll, totalRunwayListData]);

  /**Checks the "Show/Hide All and No Runways when everything is selected by default" */
  useEffect(() => {
    if (totalRunwayListData.length != 0 && props.selectedRunwaysList.length - 1 === totalRunwayListData.length) {
      setCheckShowAll(true);
      setShowNoRunways(true);
    } else {
      setCheckShowAll(false);
    }
  }, [totalRunwayListData, props.selectedRunwaysList]);

  /**Gets the List of Active Runways(id and name) present in the repo using Search */
  useEffect(() => {
    setShowLoadingIcon(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((response: RunwayModel[]) => {
        /**Set the Total Runway List with nodeId and runwayName */
        setTotalRunwayListData(response);
        setShowLoadingIcon(false);
        setLoadedRunwayList(true);
      })
      .catch((error: any) => {
        console.log(error);
        setShowLoadingIcon(false);
      });
  }, [lInnovationData.eskoAccountDetail, lNodeEventData.runwaysUpdated]);

  /**CHecks the Runways which are already selected by getting the value from session */
  useEffect(() => {
    if (loadedRunwayList) {
      let tempTotalRunwayListData: RunwayModel[] = [...totalRunwayListData];
      let tempRunwayListDataWithChecked: RunwayListWithChecked[] = [];
      tempTotalRunwayListData.forEach((runway: RunwayModel) => {
        const tempRunwayDataWithChecked: RunwayListWithChecked = {
          runwayDetails: runway,
          checked: props.selectedRunwaysList.indexOf(runway.nodeId) != -1 ? true : false
        }
        tempRunwayListDataWithChecked = tempRunwayListDataWithChecked.concat(tempRunwayDataWithChecked);
      })
      if (-1 !== props.selectedRunwaysList.indexOf("no_runways")) {
        setShowNoRunways(true);
        setInitialLoad(true);
      }
      /**Set the list with the RunwaysList and checked to false */
      setTotalRunwayListDatawithChecked(tempRunwayListDataWithChecked);
    }
  }, [loadedRunwayList, totalRunwayListData, props.selectedRunwaysList]);

  useEffect(() => {
    if (loadedRunwayList) {
      let filteredSelectedRunwaysList: string[] = [];
      /**Only add the Runway's nodeId which are Active */
      if (-1 !== props.selectedRunwaysList.indexOf("no_runways")) {
        filteredSelectedRunwaysList = filteredSelectedRunwaysList.concat("no_runways");
      }
      totalRunwayListData.forEach((runway: RunwayModel) => {
        if (-1 !== props.selectedRunwaysList.indexOf(runway.nodeId)) {
          filteredSelectedRunwaysList = filteredSelectedRunwaysList.concat(runway.nodeId);
        }
      });
      props.setSelectedRunwaysList(filteredSelectedRunwaysList);
    }
  }, [loadedRunwayList, totalRunwayListData]);

  /**Checks/unchecks the List of data when "Show/Hide All" is checked */
  useEffect(() => {
    let tempCheckedRunwayData: RunwayListWithChecked[] = [...totalRunwayListDatawithChecked];
    /**Checks every Checkboxes and push the nodeId of every runways into the selectedRunwaysList */
    if (showAll && checkshowAll) {
      let tempCheckedRunwaysList: string[] = [];
      tempCheckedRunwaysList = tempCheckedRunwaysList.concat("no_runways");
      totalRunwayListData.forEach((runway) => {
        tempCheckedRunwaysList = tempCheckedRunwaysList.concat(runway.nodeId);
      });
      tempCheckedRunwayData.forEach((runway) => {
        runway.checked = showAll;
      });
      setTotalRunwayListDatawithChecked(tempCheckedRunwayData);
      props.setSelectedRunwaysList(tempCheckedRunwaysList);
    }
    else if (showAll && !checkshowAll) {
      setShowAll(false);
    }
    /**UnChecks every Checkboxes and set the CheckedRunwaysList to empty array */
    else if (!showAll && !checkshowAll && initialLoad) {
      tempCheckedRunwayData.forEach((runway) => {
        runway.checked = showAll;
      })
      setShowNoRunways(false);
      setTotalRunwayListDatawithChecked(tempCheckedRunwayData);
      props.setSelectedRunwaysList([]);
    }
  }, [checkshowAll]);

  /**Changes the state of showAll, checkshowALl when "Show/Hide All" check box is clicked */
  const handleShowAll = () => {
    setShowAll(!checkshowAll);
    setCheckShowAll(!checkshowAll);
  };

  /**Changes the state of showNoRunways, checkshowALl when "No Runways" checkbox is clicked */
  const handleShowNoRunways = () => {
    setShowNoRunways(!showNoRunways);
    setInitialLoad(true);
  };

  /**Adds "no_runways" to the selectedRunwaysList to display the Business Goals with No Runways*/
  useEffect(() => {
    let tempCheckedRunwaysList: string[] = [...props.selectedRunwaysList];
    if (showNoRunways && tempCheckedRunwaysList.indexOf("no_runways") === -1) {
      tempCheckedRunwaysList = tempCheckedRunwaysList.concat("no_runways");
    }
    else if (!showNoRunways && tempCheckedRunwaysList.indexOf("no_runways") != -1 && initialLoad) {
      tempCheckedRunwaysList.splice(tempCheckedRunwaysList.indexOf("no_runways"), 1);
    }
    props.setSelectedRunwaysList(tempCheckedRunwaysList);
    /**If this check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
    if (!showNoRunways && checkshowAll) {
      setShowAll(true);
      setCheckShowAll(false);
    }
  }, [showNoRunways]);

  /**Changes the checked propety of particular Runway whenever a checkbox is checked/unchecked */
  const handleChecked = (index: number) => {
    let tempCheckedRunwayData: RunwayListWithChecked[] = [...totalRunwayListDatawithChecked];
    tempCheckedRunwayData[index] = {
      runwayDetails: totalRunwayListDatawithChecked[index].runwayDetails,
      checked: !totalRunwayListDatawithChecked[index].checked
    }
    let tempCheckedRunwaysList: string[] = [...props.selectedRunwaysList];
    /**If a Runway is checked add the nodeId to checkedRunwaysList array */
    if (tempCheckedRunwayData[index].checked) {
      tempCheckedRunwaysList = tempCheckedRunwaysList.concat(tempCheckedRunwayData[index].runwayDetails.nodeId);
      props.setSelectedRunwaysList(tempCheckedRunwaysList);
    }
    /**If a Runway is unchecked remove the nodeId from checkedRunwaysList array */
    else {
      tempCheckedRunwaysList.splice(tempCheckedRunwaysList.indexOf(tempCheckedRunwayData[index].runwayDetails.nodeId), 1);
      props.setSelectedRunwaysList(tempCheckedRunwaysList);
    }
    setTotalRunwayListDatawithChecked(tempCheckedRunwayData);
    /**If every check box is checked, check the "Show/Hide All" */
    if (tempCheckedRunwaysList.length - 1 === totalRunwayListData.length) {
      setCheckShowAll(true);
    }
    /**If a check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
    if (!totalRunwayListDatawithChecked[index].checked === false && checkshowAll) {
      setShowAll(true);
      setCheckShowAll(false);
    }
  };

  return (
    <Accordion defaultExpanded className={FilterSubMenuStyleClasses.accordionRoot}>
      <FilterAccordionSummary>
        <Typography className={FilterSubMenuStyleClasses.accordionTitleText}>
          {RUNWAY_FILTER_TEXT}
        </Typography>
      </FilterAccordionSummary>
      <AccordionDetails>
        {showLoadingIcon ? <CircularProgress className={RunwayFilterStyleClass.LoadingIconClass} /> :
          !showLoadingIcon && totalRunwayListData.length === 0 ?
            <h5 className={RunwayFilterStyleClass.NoRunwaysMessageClass}>{NO_RUNWAYS_ADDED_TEXT}</h5> :
            <ThemeProvider theme={RunwayFilterTheme}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox
                      name={""}
                      checked={checkshowAll}
                      onChange={handleShowAll}
                      inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                    label={<p className={RunwayFilterStyleClass.ShowOrHideAllClass}>{SHOW_OR_HIDE_ALL}</p>}
                    className={props.view && -1 === noRunwaysViews.indexOf(props.view) ? RunwayFilterStyleClass.ShowAllCheckBoxClass : RunwayFilterStyleClass.ShowAllCheckBoxClassWithoutNoRunways}
                  />
                  {props.view && -1 === noRunwaysViews.indexOf(props.view) ?
                    <FormControlLabel
                      control={<Checkbox
                        name={""}
                        checked={showNoRunways}
                        onChange={handleShowNoRunways}
                        inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                      label={"No Runways"}
                      className={RunwayFilterStyleClass.NoRnwaysCheckBoxClass}
                    /> : null
                  }
                  <div>
                    {totalRunwayListDatawithChecked.map((runway, index) => (
                      <ListItem key={runway.runwayDetails.nodeId} value={runway.runwayDetails.runwayName}>
                        <CheckBoxItem
                          itemName={runway.runwayDetails.runwayName}
                          isChecked={runway.checked}
                          index={index}
                          onChange={handleChecked}
                          itemId={runway.runwayDetails.nodeId}></CheckBoxItem>
                      </ListItem>
                    ))}
                  </div>
                </FormGroup>
              </FormControl>
            </ThemeProvider>
        }
      </AccordionDetails>
    </Accordion>
  );
}
