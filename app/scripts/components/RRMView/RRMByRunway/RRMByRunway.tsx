import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, ThemeProvider } from "@material-ui/core";
import FilterSubmenu from "../../FilterSubmenu";
import AlertPopupModel from "../../utils/AlertPopup/AlertPopupModel";
import Header from "../../utils/Header/Header";
import ToggleSelectFieldModel from "../../utils/Header/ToggleSelectField/ToggleSelectFieldModel";
import { RRMByRunwayStyles } from "./RRMByRunwayStyles";
import { LightTheme } from "@esko/cloud-ui-components/dist/esm/themes";
import RRMTable from "./RRMTable/RRMTable";
import RunwayService from "../../../services/service/RunwayService";
import { BusinessGoalTableType, RunwayModel } from "../../../interfaces/InnovationInterface";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import OverAllocationLogic from "../../utils/OverAllocationLogic"
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import { InnovationStatus } from "../../../constant/InnovationEnums";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import RunwayRowModel from "./RRMTable/RunwayRow/RunwayRowModel";
import BusinessGoalRowModel from "./RRMTable/BusinessGoalRow/BusinessGoalRowModel";
import images from "../../../../Icons/images";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { INTERNAL_SERVER_ERROR } from "../../../constant/InnovationMessages";
import FTEModel, { FTENotesModel } from "../FTEModel";
import RRMService from "../../../services/service/RRMService";
import ResourceService from "../../../services/service/ResourceService";
import ResourceModel from "../../settings/ResourceManagementView/ResourceModel";
import { isFloatingNumber, parseInt, parseFloat } from "../../../utils/Utilities";
import OverallocationWarning from "../../OverallocationWarning";
import ReleaseService from "../../../services/service/ReleaseService";
import { prepareAndSetFiveUnarchivedReleases } from "../../../utils/ReleaseUtils";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import { RRMbyRunwayWarningMessage } from "../RRMViewText";
import { NodeEventContext } from "../../../context/NodeEventContext";

export default function RRMByRunway() {

  const rRMByRunwayStyleClasses = RRMByRunwayStyles();
  const maxDrawerWidth: number = 240;
  const leftNavWidth: number = 73;
  const lInnovationData = useContext(InnovationAppContext);
  const lNodeEventData = useContext(NodeEventContext);

  const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);
  const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);
  const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth);
  const [isPercentageView, setIsPercentageView] = useState<boolean>(false);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
  const [allActiveRunways, setAllActiveRunways] = useState<RunwayModel[]>([]);
  const [allActiveScheduledBGs, setAllActiveScheduledBGs] = useState<BusinessGoalTableType[]>([]);
  const [fiveReleasesList, setFiveReleasesList] = useState<ReleaseModel[]>([]);
  const [runwayRowData, setRunwayRowData] = useState<RunwayRowModel[]>([]);
  const [showBGList, setShowBGList] = useState<string[]>([]);
  const [showRunwayList, setShowRunwayList] = useState<string[]>([]);
  const [ftesList, setFTEsList] = useState<FTEModel[]>([]);
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [showOnlyMyRunways, setShowOnlyMyRunways] = useState<boolean>(false);

  const [isRunwayOverAllocated, setIsRunwayOverAllocated] = useState<boolean>(false);
  useEffect(() => {
    if (openFilterMenu) {
      setMarginContentView(maxDrawerWidth + leftNavWidth);
    }
    else {
      setMarginContentView(leftNavWidth);
    }
  }, [openFilterMenu]);

  useEffect(() => {
    setMainPageLoading(true);
    ResourceService.getResources(lInnovationData.eskoAccountDetail.repoid)
      .then((resourcesResponse: ResourceModel[]) => {
        if (null === resourcesResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          setMainPageLoading(false);
          setResources(resourcesResponse);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lNodeEventData.resourcesUpdated]);

  useEffect(() => {
    setMainPageLoading(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((runwaysResponse: RunwayModel[]) => {
        if (null === runwaysResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          setAllActiveRunways(runwaysResponse);
          setCheckedRunways(runwaysResponse);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lNodeEventData.runwaysUpdated]);

  function setCheckedRunways(runwaysResponse: RunwayModel[]) {
    const cashedCheckedRunways = window.localStorage.getItem("rrmByRunwayFilter");
    if (cashedCheckedRunways !== null && cashedCheckedRunways.split(",") !== undefined && cashedCheckedRunways) {
      setSelectedRunwaysList(cashedCheckedRunways.split(","));
    } else {
      const checkedRunwaysArray: string[] = [];
      checkedRunwaysArray.push("no_runways");
      runwaysResponse.forEach((runway) => {
        if (undefined !== runway.nodeId) {
          checkedRunwaysArray.push(runway.nodeId);
        }
      });
      setSelectedRunwaysList([...checkedRunwaysArray]);
    }
  }

  useEffect(() => {
    const showRunwayNodeIdList: string[] = [];
    allActiveRunways.forEach((activeRunway: RunwayModel) => {
      if (selectedRunwaysList.some((selectedRunway => activeRunway.nodeId === selectedRunway))
        && (!showOnlyMyRunways || isMyRunway(activeRunway.managerName))) {
        showRunwayNodeIdList.push(activeRunway.nodeId);
      }
    });
    setShowRunwayList(showRunwayNodeIdList);
  }, [showOnlyMyRunways, selectedRunwaysList]);

  useEffect(() => {
    setMainPageLoading(true);
    ReleaseService.getReleases(lInnovationData.eskoAccountDetail.repoid, 99, false)
      .then((releasesResponse: ReleaseModel[]) => {
        setFiveReleasesList(prepareAndSetFiveUnarchivedReleases(releasesResponse));
        setMainPageLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setMainPageLoading(false);
      });
  }, [lNodeEventData.releasesUpdated]);
  //to set ftelist props to sent it for checking overallocation 
  useEffect(() => {
    setMainPageLoading(true);
    RRMService.getFTEs(lInnovationData.eskoAccountDetail.repoid)
      .then((ftesResponse: FTEModel[]) => {
        if (null === ftesResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          setFTEsList(ftesResponse);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lInnovationData.eskoAccountDetail, lNodeEventData.FTEUpdated]);

  useEffect(() => {
    setMainPageLoading(true);
    BusinessGoalService.getAllBusinessGoals(lInnovationData.eskoAccountDetail.repoid)
      .then((allBGsResponse: BusinessGoalTableType[]) => {
        if (null === allBGsResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          const activeScheduledBGs: BusinessGoalTableType[] = allBGsResponse.filter((bg: BusinessGoalTableType) =>
            (bg.status === InnovationStatus.ACTIVE || bg.status === InnovationStatus.SCHEDULED) && bg.runwaysCount > 0
          );
          setAllActiveScheduledBGs(activeScheduledBGs);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lNodeEventData.businessGoalsUpdated]);

  useEffect(() => {
    const runwayRowArray: RunwayRowModel[] = [];
    allActiveRunways.forEach((runway: RunwayModel) => {
      const runwayRow: RunwayRowModel = {
        name: runway.runwayName,
        isFTEEditable: lInnovationData.userPermission.rrmView.isFTEEditable,
        nodeId: runway.nodeId,
        thumbnail: runway.thumbnail,
        businessGoalList: getBusinessGoalsList(runway.nodeId),
        resourceList: getResourcesList(runway.nodeId)
      }
      runwayRowArray.push(runwayRow);
    });
    setRunwayRowData(runwayRowArray);
    showAllActiveRunways();
  }, [allActiveRunways, allActiveScheduledBGs, resources, fiveReleasesList]);

  function getBusinessGoalsList(runwayNodeId: string) {
    const bgRowList: BusinessGoalRowModel[] = [];
    allActiveScheduledBGs.forEach((bg: BusinessGoalTableType) => {
      bg.runwaysList.forEach((nodeId: string) => {
        if (nodeId === runwayNodeId) {
          const bgRow: BusinessGoalRowModel = {
            name: bg.businessGoalName.toString(),
            nodeId: bg.nodeId,
            isFTEEditable: lInnovationData.userPermission.rrmView.isFTEEditable,
            thumbnail: bg.thumbnail.toString(),
            runwayNodeId: runwayNodeId
          };
          bgRowList.push(bgRow);
        }
      });
    });
    bgRowList.push(getVFMEmptyData(runwayNodeId));
    return bgRowList;
  }

  function getResourcesList(runwayNodeId: string) {
    let resourcesList: ResourceModel[] = [];
    const matchedResourcesList = resources.filter((resource: ResourceModel) => resource.runwayNodeId === runwayNodeId);
    if (matchedResourcesList.length > 0) {
      resourcesList = matchedResourcesList;
    }
    return resourcesList;
  }

  function getVFMEmptyData(runwayNodeId: string) {
    const vfmRow: BusinessGoalRowModel = {
      name: "VFM",
      nodeId: "vfm",
      isFTEEditable: lInnovationData.userPermission.rrmView.isFTEEditable,
      thumbnail: images.EskoStarPng,
      runwayNodeId: runwayNodeId
    };
    return vfmRow;
  }

  function showAllActiveRunways() {
    const allActiveRunwayNodeIdList: string[] = [];
    allActiveRunways.forEach((runway: RunwayModel) => {
      allActiveRunwayNodeIdList.push(runway.nodeId);
    });
    setShowRunwayList(allActiveRunwayNodeIdList);
  }

  const toggleSelectFieldData: ToggleSelectFieldModel = {
    defaultValue: "FTE",
    menuOptions: [
      { value: "FTE", option: "FTE" },
      { value: "PERCENTAGE", option: "%" }
    ],
    handleChange: (evt: any) => {
      evt.preventDefault();
      setIsPercentageView("PERCENTAGE" === evt.target.value ? true : false);
    }
  };

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

  function showWarning(message: string) {
    setMainPageLoading(false);
    setTimeout(function () {
      setAlertPopupData({
        isOpen: true,
        content: message,
        severity: "warning",
        handleCloseButtonClick: () => {
          setAlertPopupData({ isOpen: false });
        }
      });
    }, 500);
  }

  const handleArrowClick = (nodeId: string) => {
    const shownBGList = showBGList.slice();
    const index = shownBGList.indexOf(nodeId);
    if (index >= 0) {
      shownBGList.splice(index, 1)
      setShowBGList(shownBGList);
    } else {
      shownBGList.push(nodeId);
      setShowBGList(shownBGList);
    }
  };

  const handleInputFieldBlurEvent = (evt: any) => {
    evt.preventDefault();
    const inputTextFieldName: string = evt.target.name;
    const splitedStrings: string[] = inputTextFieldName.split("-#&&*#-");
    const runwayNodeId: string = splitedStrings[0];
    const bgNodeId: string = splitedStrings[1];
    const releaseNodeId: string = splitedStrings[2];

    doValidation(evt, releaseNodeId, runwayNodeId, bgNodeId);
  };

  //Function to add notes 
  const handleAddNotes = (fieldName: string, comment: string) => {
    const splitedStrings: string[] = fieldName.split("-#&&*#-");
    const runwayNodeId: string = splitedStrings[0];
    const bgNodeId: string = splitedStrings[1];
    const releaseNodeId: string = splitedStrings[2];

    const fteNotesData: FTENotesModel = prepareFTENotesData(releaseNodeId, runwayNodeId, bgNodeId, comment);

    if (!releaseNodeId) {
      showError("No Release.");
    } else if (!isFTEDataAlreadyCreated(releaseNodeId, runwayNodeId, bgNodeId)) {
      const fteData: FTEModel = prepareFTEData("0", "0", releaseNodeId, runwayNodeId, bgNodeId, fteNotesData.notes)
      createFTE(fteData)
    } else {
      updateNotes(fteNotesData);
    }
  }

  //Save notes in the repo
  const updateNotes = (fteNotesData: FTENotesModel) => {
    RRMService.updateFTENotes(lInnovationData.eskoAccountDetail.repoid, fteNotesData)
      .then((fteResponse: any) => {
        if (null === fteResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          const fteIndex = getExistingFTEIndex(fteNotesData.releaseNodeId, fteNotesData.runwayNodeId, fteNotesData.bgNodeId);
          updateFTENotesInFTEsList(fteIndex, fteNotesData.notes);
          setMainPageLoading(false);
          setAlertPopupData({
            isOpen: true,
            content: "Notes Updated Successfully",
            severity: "success",
            handleCloseButtonClick: () => {
              setAlertPopupData({ isOpen: false });
            }
          });
        }
      }).catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
    showWarningComponent();
  }

  function doValidation(evt: any, releaseNodeId: string, runwayNodeId: string, bgNodeId: string) {
    if (!releaseNodeId) {
      showError("No Release.");
      evt.target.value = "";
    } else {
      validateAndUpdateFTE(evt, releaseNodeId, runwayNodeId, bgNodeId,
        isFTEDataAlreadyCreated(releaseNodeId, runwayNodeId, bgNodeId));
    }
  }

  function isFTEDataAlreadyCreated(releaseNodeId: string, runwayNodeId: string, bgNodeId: string) {
    let isPresent: boolean = false;
    const fteIndex = ftesList.findIndex((fte: FTEModel) =>
      fte.releaseNodeId === releaseNodeId && fte.runwayNodeId === runwayNodeId && fte.bgNodeId === bgNodeId);
    if (-1 !== fteIndex) {
      isPresent = true;
    }
    return isPresent;
  }

  function validateEnteredValue(evt: any): boolean {
    let enteredValue: string = getEnteredValue(evt);
    let result: boolean = false;

    if (enteredValue && !isFloatingNumber(enteredValue)) {
      showError("Only Digits Allowed.");
    } else if (!hasOneDigitAfterDecimal(enteredValue)) {
      showError("Only one digit after decimal is Allowed.");
    } else if (!isPercentageView && !isEnteredValueBelowHundred(enteredValue)) {
      showError("FTE should be below 100.");
    } else {
      result = true;
    }
    return result;
  }

  function hasOneDigitAfterDecimal(input: string): boolean {
    const splittedInput = input.split(".");
    if (splittedInput.length === 2) {
      if (splittedInput[1].length <= 1) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return true;
    }
  }

  function validateAndUpdateFTE(evt: any, releaseNodeId: string, runwayNodeId: string, bgNodeId: string, isFTEAlreadyCreated: boolean) {
    let enteredValue: string = getEnteredValue(evt);
    let oldNumber: string = "";
    let oldPercentageNumber: string = "";
    let oldPercentageString: string = "";
    let notes: string = "";
    if (isFTEAlreadyCreated) {
      const fteIndex: number = getExistingFTEIndex(releaseNodeId, runwayNodeId, bgNodeId);
      oldNumber = ftesList[fteIndex].number;
      oldPercentageNumber = ftesList[fteIndex].percentageNumber;
      oldPercentageString = oldPercentageNumber ? oldPercentageNumber + "%" : "";
      notes = ftesList[fteIndex].notes;
    }
    const resourceNumber: string = getResourceNumber(releaseNodeId, runwayNodeId);
    const isEnteredValueValid: boolean = validateEnteredValue(evt);

    if (isResourceNotAllocated(resourceNumber)) {
      showError("Resources are not allocated.");
      evt.target.value = isPercentageView ? oldPercentageString : oldNumber;
    } else if (!isEnteredValueValid) {
      evt.target.value = isPercentageView ? oldPercentageString : oldNumber;
    } else if (doesEnteredPercentageValueExceedHundred(enteredValue)) {
      showWarning("Percentage cannot exceed 100%.");
      evt.target.value = "100%";
      enteredValue = "100";
      setMainPageLoading(true);
      const fteData: FTEModel = prepareFTEData(getNewNumber(enteredValue, resourceNumber),
        getNewPercentageNumber(enteredValue, resourceNumber), releaseNodeId, runwayNodeId, bgNodeId, notes);
      createFTE(fteData);
    } else if (isEnteredValueDifferentFromOldValue(enteredValue, oldNumber, oldPercentageNumber)) {
      setMainPageLoading(true);
      if (isEnteredValueEqualToZero(enteredValue)) {
        enteredValue = "0";
      }
      evt.target.value = isPercentageView ? enteredValue + "%" : enteredValue;
      const fteData: FTEModel = prepareFTEData(getNewNumber(enteredValue, resourceNumber),
        getNewPercentageNumber(enteredValue, resourceNumber), releaseNodeId, runwayNodeId, bgNodeId, notes);
      createFTE(fteData);
      setIsRunwayOverAllocated(false);
    }
    setMainPageLoading(false);
  }

  function isResourceNotAllocated(resourceNumber: string): boolean {
    return (!resourceNumber || 0 === parseInt(resourceNumber));
  }

  function isEnteredValueDifferentFromOldValue(enteredValue: string, oldNumber: string, oldPercentageNumber: string): boolean {
    return ((!isPercentageView && enteredValue !== oldNumber) || (isPercentageView && enteredValue !== oldPercentageNumber));
  }

  function isEnteredValueEqualToZero(enteredValue: string): boolean {
    if (0 !== enteredValue.length) {
      return (parseFloat(enteredValue) === 0);
    }
    return false;
  }

  function getExistingFTEIndex(releaseNodeId: string, runwayNodeId: string, bgNodeId: string) {
    return ftesList.findIndex((fte: FTEModel) =>
      fte.releaseNodeId === releaseNodeId && fte.runwayNodeId === runwayNodeId && fte.bgNodeId === bgNodeId);
  }

  function getEnteredValue(evt: any) {
    let enteredValue: string = evt.target.value;
    if (isPercentageView) {
      enteredValue = evt.target.value.replace("%", "");
    }
    return enteredValue;
  }

  function doesEnteredPercentageValueExceedHundred(enteredValue: string) {
    let doesExceed: boolean = false;
    if (isPercentageView && parseFloat(enteredValue) > 100) {
      doesExceed = true;
    }
    return doesExceed;
  }

  function isEnteredValueBelowHundred(enteredValue: string) {
    let isBelowHundred: boolean = false;
    if (parseFloat(enteredValue) < 100) {
      isBelowHundred = true;
    }
    return isBelowHundred;
  }

  function showWarningComponent() {
    if (OverAllocationLogic(fiveReleasesList, runwayRowData, ftesList)) {
      setIsRunwayOverAllocated(true);
    } else {
      setIsRunwayOverAllocated(false);
    }
  }

  function createFTE(fteData: FTEModel) {

    RRMService.createFTE(lInnovationData.eskoAccountDetail.repoid, fteData)
      .then((fteResponse: any) => {
        if (null === fteResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          const fteIndex = getExistingFTEIndex(fteData.releaseNodeId, fteData.runwayNodeId, fteData.bgNodeId);
          if (-1 === fteIndex) {
            addFTEDataInFTEsList(fteData);
          } else {
            updateFTEDataInFTEsList(fteIndex, fteData.number, fteData.percentageNumber);
          }
          setMainPageLoading(false);
          setAlertPopupData({
            isOpen: true,
            content: fteResponse.message,
            severity: "success",
            handleCloseButtonClick: () => {
              setAlertPopupData({ isOpen: false });
            }
          });
        }
      }).catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
    showWarningComponent();
  }

  function prepareFTENotesData(releaseNodeId: string,
    runwayNodeId: string, bgNodeId: string, notes: string) {
    const fteData: FTENotesModel = {
      releaseNodeId: releaseNodeId,
      runwayNodeId: runwayNodeId,
      bgNodeId: bgNodeId,
      notes: notes
    };
    return fteData;
  }

  function prepareFTEData(number: string, percentageNumber: string, releaseNodeId: string,
    runwayNodeId: string, bgNodeId: string, notes: string) {
    const fteData: FTEModel = {
      number: number,
      percentageNumber: percentageNumber,
      releaseNodeId: releaseNodeId,
      runwayNodeId: runwayNodeId,
      bgNodeId: bgNodeId,
      notes: notes
    };
    return fteData;
  }

  function addFTEDataInFTEsList(fteData: FTEModel) {
    const duplicateAllFTEsList = [...ftesList];
    duplicateAllFTEsList.push(fteData);
    setFTEsList(duplicateAllFTEsList);
  }

  function updateFTEDataInFTEsList(fteIndex: number, newNumber: string, newPercentageNumber: string) {
    ftesList[fteIndex].percentageNumber = newPercentageNumber;
    ftesList[fteIndex].number = newNumber;
    setFTEsList([...ftesList]);
  }

  function updateFTENotesInFTEsList(fteIndex: number, notes: string) {
    ftesList[fteIndex].notes = notes;
    setFTEsList([...ftesList]);
  }

  function getResourceNumber(releaseNodeId: string, runwayNodeId: string) {
    let resourceNumber: string = "";
    const foundResource = resources.find((resource: ResourceModel) =>
      resource.releaseNodeId === releaseNodeId && resource.runwayNodeId === runwayNodeId);
    if (undefined !== foundResource) {
      resourceNumber = foundResource.number;
    }
    return resourceNumber;
  }

  function getNewNumber(enteredNumber: string, resourceNumber: string) {
    let number: string = enteredNumber;
    if (isPercentageView && enteredNumber) {
      let actualNumber: number = parseFloat(enteredNumber) * (parseInt(resourceNumber) / 100);
      number = (Math.round((actualNumber + Number.EPSILON) * 10) / 10).toString();
    }
    return number;
  }

  function getNewPercentageNumber(enteredNumber: string, resourceNumber: string) {
    let percentageNumber: string = enteredNumber;
    if (!isPercentageView && enteredNumber) {
      let actualPercentage: number = (parseFloat(enteredNumber) * 100) / parseInt(resourceNumber);
      percentageNumber = (Math.round((actualPercentage + Number.EPSILON) * 10) / 10).toString();
    }
    return percentageNumber;
  }

  const isMyRunway = (inManagerName: string): boolean => {
    let lIsMyRunway: boolean = false;

    if (inManagerName === (lInnovationData.currentUserInfo.displayName)) {
      lIsMyRunway = true;
    }

    return lIsMyRunway;
  };

  const toggleButtonData: ToggleButtonModel = {
    label: "Show only my Runways",
    handleChange: (changeEvent: any) => {
      setShowOnlyMyRunways(changeEvent.target.checked);
    }
  };

  useEffect(() => {
    showWarningComponent();
  }, [lInnovationData, ftesList, runwayRowData])

  return (
    <Grid container>
      <Grid item className={rRMByRunwayStyleClasses.filterSubmenu}>
        <FilterSubmenu
          view="RRM"
          openFilterMenu={openFilterMenu}
          setOpenFilterMenu={setOpenFilterMenu}
          selectedRunwaysList={selectedRunwaysList}
          setSelectedRunwaysList={setSelectedRunwaysList}
        />
      </Grid>
      <Grid
        item
        className={rRMByRunwayStyleClasses.rRMByRunwayBody}
        style={{ marginLeft: marginContentView, width: openFilterMenu ? "78vw" : "92vw" }}>
        <Box ml={3} mt={3}>
          <ThemeProvider theme={LightTheme}>
            <Grid container
              spacing={2}
              alignContent="center"
              className={rRMByRunwayStyleClasses.headerContainer}>

              <Header
                currentPageHeading="RRM by Runway"
                toggleSelectField={toggleSelectFieldData}
                toggleButton={toggleButtonData} />

            </Grid>
            <Grid item className={rRMByRunwayStyleClasses.tableContainer} style={{
              opacity: mainPageLoading ? 0.5 : 1,
              pointerEvents: mainPageLoading ? "none" : "all"
            }}>
              {isRunwayOverAllocated &&
                <OverallocationWarning
                  warningMessage={RRMbyRunwayWarningMessage}
                  widthValue={"auto"}
                  marginLeftBox={"10px"}
                  marginRightBox={"-8px"}
                  marginBottomBox={"16px"}
                />}
              <RRMTable
                handleClick={handleArrowClick}
                showRunwayList={showRunwayList}
                showBGList={showBGList}
                releases={fiveReleasesList}
                runwayRowList={runwayRowData}
                fteList={ftesList}
                handleInputFieldBlurEvent={handleInputFieldBlurEvent}
                handleAddNotes={handleAddNotes}
                isFTEEditable={!lInnovationData.userPermission.rrmView.isFTEEditable}
                isPercentageView={isPercentageView}
                isRunwayOverAllocated={isRunwayOverAllocated} />
            </Grid>
          </ThemeProvider>
        </Box>
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
