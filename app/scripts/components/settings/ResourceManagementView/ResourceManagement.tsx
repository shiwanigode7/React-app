import React, { useState, useEffect, useContext } from "react";
import FilterSubmenu from "../../FilterSubmenu";
import ReleaseModel from "../InnovationCadenceView/ReleaseModel";
import ResourcesTable from "./ResourcesTable/ResourcesTable";
import { BusinessGoalTableType, RunwayModel } from "../../../interfaces/InnovationInterface";
import ResourceModel from "./ResourceModel";
import ResourceService from "../../../services/service/ResourceService";
import AlertPopupModel from "../../utils/AlertPopup/AlertPopupModel";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import RunwayService from "../../../services/service/RunwayService";
import { Grid } from "@material-ui/core";
import { ResourceManagementStyles } from "./ResourceManagementStyles";
import Header from "../../utils/Header/Header";
import RRMService from "../../../services/service/RRMService";
import { INTERNAL_SERVER_ERROR } from "../../../constant/InnovationMessages";
import FTEModel from "../../RRMView/FTEModel";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { isDigit, isEmpty, isNull, isZero, parseInt, parseFloat } from "../../../utils/Utilities";
import useFiveReleases from "../../../utils/CustomHooks/useFiveReleases";
import OverallocationWarning from "../../OverallocationWarning";
import RunwayRowModel from "../../RRMView/RRMByRunway/RRMTable/RunwayRow/RunwayRowModel";
import OverAllocationLogic from "../../utils/OverAllocationLogic";
import BusinessGoalRowModel from "../../RRMView/RRMByRunway/RRMTable/BusinessGoalRow/BusinessGoalRowModel";
import images from "../../../../Icons/images";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import { InnovationStatus } from "../../../constant/InnovationEnums";
import { ResourcePageWarningMessage } from "../../RRMView/RRMViewText";

export default function ResourceManagement() {

  const resourceManagementStyleClasses = ResourceManagementStyles();
  const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);
  const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);
  const [fiveReleasesList, setFiveReleasesList] = useState<ReleaseModel[]>([]);
  const [runwaysList, setRunwaysList] = useState<RunwayModel[]>([]);
  const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [resourcesList, setResourcesList] = useState<ResourceModel[]>([]);
  const [ftesList, setFTEsList] = useState<FTEModel[]>([]);
  const [isRunwayOverAllocated, setIsRunwayOverAllocated] = useState<boolean>(false);
  const lInnovationData = useContext(InnovationAppContext);
  const [runwayRowData, setRunwayRowData] = useState<RunwayRowModel[]>([]);
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [allActiveRunways, setAllActiveRunways] = useState<RunwayModel[]>([]);
  const [allActiveScheduledBGs, setAllActiveScheduledBGs] = useState<BusinessGoalTableType[]>([]);

  let releasesList: ReleaseModel[] = [];
  let isError: boolean = false;
  let isLoading: boolean = false;
  [releasesList, isLoading, isError] = useFiveReleases(lInnovationData.eskoAccountDetail.repoid);
  useEffect(() => {
    if (releasesList) {
      setFiveReleasesList(releasesList);
    }
    setMainPageLoading(isLoading);
  }, [releasesList, isLoading, isError]);

  useEffect(() => {
    setMainPageLoading(true);
    ResourceService.getResources(lInnovationData.eskoAccountDetail.repoid)
      .then((resourcesResponse: ResourceModel[]) => {
        if (isNull(resourcesResponse)) {
          setResourcesList([]);
        } else {
          setMainPageLoading(false);
          setResourcesList(resourcesResponse);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, []);

  useEffect(() => {
    setMainPageLoading(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((runwaysResponse: RunwayModel[]) => {
        setRunwaysList(runwaysResponse);
        setCheckedRunways(runwaysResponse);
        setMainPageLoading(false);
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, []);

  useEffect(() => {
    setMainPageLoading(true);
    RRMService.getFTEs(lInnovationData.eskoAccountDetail.repoid)
      .then((ftesResponse: FTEModel[]) => {
        if (null === ftesResponse) {
          setFTEsList([]);
        } else {
          setFTEsList(ftesResponse);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, []);

  //getting BG list which has the runways allocated
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

  //get the model VFM data
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

  //get resource list based on runwaynode id
  function getResourcesList(runwayNodeId: string) {
    let lresourcesList: ResourceModel[] = [];
    const matchedResourcesList = resourcesList.filter((resource: ResourceModel) => resource.runwayNodeId === runwayNodeId);
    if (matchedResourcesList.length > 0) {
      lresourcesList = matchedResourcesList;
    }
    return lresourcesList;
  }

  //getting all runway resources and sets to props to check overllocation
  useEffect(() => {
    setMainPageLoading(true);
    ResourceService.getResources(lInnovationData.eskoAccountDetail.repoid)
      .then((resourcesResponse: ResourceModel[]) => {
        if (null === resourcesResponse) {
          setResources([]);
        } else {
          setMainPageLoading(false);
          setResources(resourcesResponse);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [resourcesList]);

  //to set the runwaysList based on runwayresponse
  function setCheckedRunways(runwaysResponse: RunwayModel[]) {
    const cashedCheckedRunways = window.localStorage.getItem("resourceManagementViewRunwaysFilter");
    if (null !== cashedCheckedRunways && undefined !== cashedCheckedRunways.split(",") && !isEmpty(cashedCheckedRunways)) {
      setSelectedRunwaysList(cashedCheckedRunways.split(","));
    } else {
      const checkedRunwaysArray: string[] = [];
      checkedRunwaysArray.push("no_runways");
      runwaysResponse.forEach((runway: RunwayModel) => {
        checkedRunwaysArray.push(runway.nodeId);
      });
      setSelectedRunwaysList([...checkedRunwaysArray]);
    }
  }

  useEffect(() => {
    if (isEmpty(selectedRunwaysList[0])) {
      selectedRunwaysList.splice(0, 1);
    }
    if (0 !== runwaysList.length && 0 !== selectedRunwaysList.length) {
      window.localStorage.setItem("resourceManagementViewRunwaysFilter", selectedRunwaysList.toString());
    }
  }, [selectedRunwaysList]);

  const handleInputFieldBlurEvent = ((evt: any) => {
    evt.preventDefault();
    const enteredValue: string = evt.target.value;
    const inputTextFieldName: string = evt.target.name;
    const splitedStrings: string[] = inputTextFieldName.split("-#&&*#-");
    const runwayNodeId: string = splitedStrings[0];
    const releaseNodeId: string = splitedStrings[1];

    if (isResourceDataAlreadyPresent(releaseNodeId, runwayNodeId)) {
      validateBeforeUpdatingResource(evt, enteredValue, releaseNodeId, runwayNodeId);
    } else {
      validateBeforeCreatingResource(evt, enteredValue, releaseNodeId, runwayNodeId);
    }
  });

  function validateBeforeUpdatingResource(evt: any, enteredValue: string, releaseNodeId: string, runwayNodeId: string) {
    const oldNumber: string = resourcesList[getResourceIndex(releaseNodeId, runwayNodeId)].number;
    if (!isEmpty(enteredValue) && !isDigit(enteredValue)) {
      showError("Only Digits Allowed.");
      evt.target.value = oldNumber;
    } else if (enteredValue !== oldNumber) {
      setMainPageLoading(true);
      ftesList.forEach((fte: FTEModel) => {
        if (fte.releaseNodeId === releaseNodeId && fte.runwayNodeId === runwayNodeId && fte.number) {
          fte.percentageNumber = getPercentageNumber(fte.number, enteredValue);
          RRMService.createFTE(lInnovationData.eskoAccountDetail.repoid, fte)
            .then().catch(() => {
              showError(INTERNAL_SERVER_ERROR);
            });
        }
      });
      updateResource(enteredValue, releaseNodeId, runwayNodeId);
    }
  }

  function validateBeforeCreatingResource(evt: any, enteredValue: string, releaseNodeId: string, runwayNodeId: string) {
    if (!isEmpty(enteredValue)) {
      setMainPageLoading(true);
      if (isEmpty(releaseNodeId)) {
        showError("No Release.");
        evt.target.value = "";
      } else if (!isDigit(enteredValue)) {
        showError("Only Digits Allowed.");
        evt.target.value = "";
      } else {
        createResource(enteredValue, releaseNodeId, runwayNodeId);
      }
      setMainPageLoading(false);
    }
  }

  function isResourceDataAlreadyPresent(releaseNodeId: string, runwayNodeId: string) {
    let isPresent: boolean = false;
    const resourceObjectIndex = resourcesList.findIndex((resource: ResourceModel) => resource.releaseNodeId === releaseNodeId && resource.runwayNodeId === runwayNodeId);
    if (-1 !== resourceObjectIndex) {
      isPresent = true;
    }
    return isPresent;
  }

  function getResourceIndex(releaseNodeId: string, runwayNodeId: string) {
    return resourcesList.findIndex((resource: ResourceModel) => resource.releaseNodeId === releaseNodeId && resource.runwayNodeId === runwayNodeId);
  }

  function updateResource(resourceNumber: string, releaseNodeId: string, runwayNodeId: string) {
    createResource(resourceNumber, releaseNodeId, runwayNodeId);
  }

  function getPercentageNumber(fteNumber: string, enteredNumber: string) {
    let percentageNumberString: string = "";
    if (enteredNumber && !isZero(enteredNumber)) {
      let percentageNumber: number = (parseFloat(fteNumber) * 100) / parseInt(enteredNumber);
      percentageNumberString = (Math.round((percentageNumber + Number.EPSILON) * 10) / 10).toString();
    }
    return percentageNumberString;
  }

  function createResource(resourceNumber: string, releaseNodeId: string, runwayNodeId: string) {
    const resourceData: ResourceModel = {
      number: resourceNumber,
      releaseNodeId: releaseNodeId,
      runwayNodeId: runwayNodeId
    };
    ResourceService.createResource(lInnovationData.eskoAccountDetail.repoid, resourceData)
      .then((resourceResponse: any) => {
        if (isNull(resourceResponse)) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          const resourceIndex: number = getResourceIndex(releaseNodeId, runwayNodeId);
          if (-1 === resourceIndex) {
            setResourcesList([...resourcesList, resourceData]);
          } else {
            resourcesList[resourceIndex].number = resourceNumber;
          }
          setMainPageLoading(false);
          setAlertPopupData({
            isOpen: true,
            content: resourceResponse.message,
            severity: "success",
            handleCloseButtonClick: () => {
              setAlertPopupData({ isOpen: false });
            }
          });
        }
      }).catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }

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
  function showWarningComponent() {
    if (OverAllocationLogic(fiveReleasesList, runwayRowData, ftesList)) {
      setIsRunwayOverAllocated(true);
    } else {
      setIsRunwayOverAllocated(false);
    }
  }

  //get all BG to set the the schedule and active BG
  useEffect(() => {
    BusinessGoalService.getAllBusinessGoals(lInnovationData.eskoAccountDetail.repoid)
      .then((allBGsResponse: BusinessGoalTableType[]) => {

        allBGsResponse.sort((firstBG: BusinessGoalTableType, secondBG: BusinessGoalTableType) => {
          return (firstBG.PPLPriority.toLowerCase() > secondBG.PPLPriority.toLowerCase() ? 1 : -1);
        });
        const activeScheduledBGs: BusinessGoalTableType[] = allBGsResponse.filter((bg: BusinessGoalTableType) =>
          (bg.status === InnovationStatus.ACTIVE || bg.status === InnovationStatus.SCHEDULED)
        );

        let tempCheckedBusinessGoalsList: string[] = [];
        activeScheduledBGs.forEach((businessGoal: BusinessGoalTableType) => {
          tempCheckedBusinessGoalsList = tempCheckedBusinessGoalsList.concat(businessGoal.nodeId ? businessGoal.nodeId : "");
        });
        setAllActiveScheduledBGs(activeScheduledBGs);
        setMainPageLoading(false);
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lInnovationData, resourcesList]);

  //to create runwayrow data for checking overallocation
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
  }, [allActiveRunways, allActiveScheduledBGs, resources, fiveReleasesList, resourcesList]);

  //get all active runways 
  useEffect(() => {
    setMainPageLoading(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((runwaysResponse: RunwayModel[]) => {
        if (null === runwaysResponse) {
          setAllActiveRunways([]);
        } else {
          setAllActiveRunways(runwaysResponse);
          setCheckedRunways(runwaysResponse);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [resourcesList]);

  //to call warning component whenver there is change in dependency 
  useEffect(() => {
    showWarningComponent();
  }, [lInnovationData, ftesList, runwayRowData, resourcesList, mainPageLoading]);

  return (
    <Grid container className={resourceManagementStyleClasses.root} direction="column">
      <Grid item className={resourceManagementStyleClasses.filterMenuGridItem}>
        <FilterSubmenu
          view="ResourceManagement"
          openFilterMenu={openFilterMenu}
          setOpenFilterMenu={setOpenFilterMenu}
          selectedRunwaysList={selectedRunwaysList}
          setSelectedRunwaysList={setSelectedRunwaysList}
          hideFlyoutOpeningIcon={true} />
      </Grid>
      <Grid container item spacing={1} direction="row" className={resourceManagementStyleClasses.headerTableGridContainer}>
        <Grid item className={resourceManagementStyleClasses.headerGridItem}>
          <Header currentPageHeading="Resources" />
        </Grid>

        <Grid item className={resourceManagementStyleClasses.tableGridItem}>
          {isRunwayOverAllocated &&
            <OverallocationWarning
              warningMessage={ResourcePageWarningMessage}
              widthValue={"83.25%"}
              marginLeftBox={"19.5px"}
            />}
          <ResourcesTable
            releasesList={fiveReleasesList}
            runwaysList={runwaysList}
            resourcesList={resourcesList}
            handleInputFieldBlurEvent={handleInputFieldBlurEvent}
            showRunwayList={selectedRunwaysList}
            isRunwayOverAllocated={isRunwayOverAllocated} />
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