import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../../Icons/images";
import { InnovationStatus } from "../../../constant/InnovationEnums";
import { INTERNAL_SERVER_ERROR } from "../../../constant/InnovationMessages";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { BusinessGoalTableType, RunwayModel } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import ResourceService from "../../../services/service/ResourceService";
import RRMService from "../../../services/service/RRMService";
import RunwayService from "../../../services/service/RunwayService";
import FilterSubmenu from "../../FilterSubmenu";
import OverallocationWarning from "../../OverallocationWarning";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import ResourceModel from "../../settings/ResourceManagementView/ResourceModel";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import AlertPopupModel from "../../utils/AlertPopup/AlertPopupModel";
import Header from "../../utils/Header/Header";
import ToggleSelectFieldModel from "../../utils/Header/ToggleSelectField/ToggleSelectFieldModel";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import OverAllocationLogic from "../../utils/OverAllocationLogic";
import FTEModel from "../FTEModel";
import BusinessGoalRowModel from "../RRMByRunway/RRMTable/BusinessGoalRow/BusinessGoalRowModel";
import RunwayRowModel from "../RRMByRunway/RRMTable/RunwayRow/RunwayRowModel";
import { RRMByBusinessGoalWarningMessage } from "../RRMViewText";
import RRMByBGTable from "./RRMByBGTable/RRMByBGTable";
import { RRMByBusinessGoalStyles } from "./RRMByBusinessGoalStyles";
import ReleaseService from "../../../services/service/ReleaseService";
import { prepareAndSetFiveUnarchivedReleases } from "../../../utils/ReleaseUtils";

export default function RRMByBusinessGoal() {

  const lInnovationData = useContext(InnovationAppContext);
  const lNodeEventData = useContext(NodeEventContext);
  const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);
  const [selectedBusinessGoalsList, setSelectedBusinessGoalsList] = useState<string[]>([]);
  const [runwayList, setRunwaysList] = useState<RunwayModel[]>([]);
  const [allActiveScheduledBGs, setAllActiveScheduledBGs] = useState<BusinessGoalTableType[]>([]);
  const [ftesList, setFTEsList] = useState<FTEModel[]>([]);
  const [filteredActiveScheduledBGs, setFilteredActiveScheduledBGs] = useState<BusinessGoalTableType[]>([]);
  const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
  const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
  const [showBGList, setShowBGList] = useState<string[]>([]);
  const [isPercentageView, setIsPercentageView] = useState<boolean>(false);
  const [fiveReleasesList, setFiveReleasesList] = useState<ReleaseModel[]>([]);
  const [allActiveRunways, setAllActiveRunways] = useState<RunwayModel[]>([]);
  const [runwayRowData, setRunwayRowData] = useState<RunwayRowModel[]>([]);
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [isRunwayOverAllocated, setIsRunwayOverAllocated] = useState<boolean>(false);
  // Fetching the style classes.
  const rrmByBusinessGoalStyleClasses = RRMByBusinessGoalStyles({
    isLeftNavExpanded: openFilterMenu
  });

  function showWarningComponent() {
    if (OverAllocationLogic(fiveReleasesList, runwayRowData, ftesList)) {
      setIsRunwayOverAllocated(true);
    } else {
      setIsRunwayOverAllocated(false);
    }
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

  const handleArrowClick = (nodeId: string) => {
    const shownRunwayList = showBGList.slice();
    const index = shownRunwayList.indexOf(nodeId);
    if (index >= 0) {
      shownRunwayList.splice(index, 1)
      setShowBGList(shownRunwayList);
    } else {
      shownRunwayList.push(nodeId);
      setShowBGList(shownRunwayList);
    }
  };

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

  //getting all runway resources and sets to props to check overllocation
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
        setSelectedBusinessGoalsList(tempCheckedBusinessGoalsList);
        setAllActiveScheduledBGs(activeScheduledBGs);
        setMainPageLoading(false);
        let lholdBGS = window.sessionStorage.getItem("RRMViewByBGFilter");
        if (null !== lholdBGS && undefined !== lholdBGS.split(",")) {
          setSelectedBusinessGoalsList(lholdBGS.split(","));
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lInnovationData, lNodeEventData.businessGoalsUpdated]);

  useEffect(() => {
    setMainPageLoading(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((runwaysListResponse: RunwayModel[]) => {
        setRunwaysList(runwaysListResponse);
        setMainPageLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [lInnovationData, lNodeEventData.runwaysUpdated]);

  useEffect(() => {
    setMainPageLoading(true);
    RRMService.getFTEs(lInnovationData.eskoAccountDetail.repoid)
      .then((ftesResponse: FTEModel[]) => {
        setFTEsList(ftesResponse);
        setMainPageLoading(false);
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });

  }, [lInnovationData, lNodeEventData.FTEUpdated]);

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
    let resourcesList: ResourceModel[] = [];
    const matchedResourcesList = resources.filter((resource: ResourceModel) => resource.runwayNodeId === runwayNodeId);
    if (matchedResourcesList.length > 0) {
      resourcesList = matchedResourcesList;
    }
    return resourcesList;
  }

  useEffect(() => {
    window.sessionStorage.setItem("RRMViewByBGFilter", selectedBusinessGoalsList.toString());
  }, [selectedBusinessGoalsList]);

  //setting the runwayrowData to check for overallocation
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
  }, [allActiveRunways, allActiveScheduledBGs, resources, fiveReleasesList]);

  //getting the all runways
  useEffect(() => {
    setMainPageLoading(true);
    RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
      .then((runwaysResponse: RunwayModel[]) => {
        if (null === runwaysResponse) {
          showError(INTERNAL_SERVER_ERROR);
        } else {
          setAllActiveRunways(runwaysResponse);
          setMainPageLoading(false);
        }
      })
      .catch(() => {
        showError(INTERNAL_SERVER_ERROR);
      });
  }, [lNodeEventData.runwaysUpdated]);

  useEffect(() => {
    const lFilteredBusinessGoalList: BusinessGoalTableType[] = [];

    selectedBusinessGoalsList.forEach((selectedBusinessGoal: string) => {
      allActiveScheduledBGs.forEach((businessGoal: BusinessGoalTableType) => {
        if (selectedBusinessGoal === businessGoal.nodeId) {
          lFilteredBusinessGoalList.push(businessGoal);
        }
      });
    });

    lFilteredBusinessGoalList.sort((firstBG: BusinessGoalTableType, secondBG: BusinessGoalTableType) => {
      return (firstBG.PPLPriority.toLowerCase() > secondBG.PPLPriority.toLowerCase() ? 1 : -1);
    });
    setFilteredActiveScheduledBGs([... new Set(lFilteredBusinessGoalList)]);
  }, [selectedBusinessGoalsList]);

  //to call warning component whenver there is change in dependency 
  useEffect(() => {
    showWarningComponent();
  }, [lInnovationData, ftesList, runwayRowData, fiveReleasesList])
  return (
    <Grid container direction="column" className={rrmByBusinessGoalStyleClasses.rootGrid}>
      <Grid item className={rrmByBusinessGoalStyleClasses.filterMenuGrid}>
        <FilterSubmenu
          view="RRM"
          openFilterMenu={openFilterMenu}
          setOpenFilterMenu={setOpenFilterMenu}
          selectedBusinessGoalsList={selectedBusinessGoalsList}
          setSelectedBusinessGoalsList={setSelectedBusinessGoalsList}
        />
      </Grid>
      <Grid item
        className={rrmByBusinessGoalStyleClasses.rrmViewGrid} >
        <Grid className={rrmByBusinessGoalStyleClasses.headerGridItem}>
          <Header
            currentPageHeading="RRM by Business Goal"
            toggleSelectField={toggleSelectFieldData}
          />
        </Grid>
        {isRunwayOverAllocated &&
          <OverallocationWarning
            warningMessage={RRMByBusinessGoalWarningMessage}
            widthValue={"auto"}
            marginBottomBox={"20px"}
          />}
        <Grid item className={rrmByBusinessGoalStyleClasses.tableGridItem}>
          <RRMByBGTable
            fteList={ftesList}
            releases={fiveReleasesList}
            runwayList={runwayList}
            businessGoalList={filteredActiveScheduledBGs}
            handleClick={handleArrowClick}
            isPercentageView={isPercentageView}
          />
        </Grid>
      </Grid>
      {
        alertPopupData.isOpen &&
        <AlertPopup
          isOpen={alertPopupData.isOpen}
          severity={alertPopupData.severity}
          content={alertPopupData.content}
          handleCloseButtonClick={alertPopupData.handleCloseButtonClick} />
      }
      {mainPageLoading && <LoadingIcon />}
    </Grid>
  )
}
