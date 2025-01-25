import FTEModel from "../RRMView/FTEModel";
import BusinessGoalRowModel from "../RRMView/RRMByRunway/RRMTable/BusinessGoalRow/BusinessGoalRowModel";
import RunwayRowModel from "../RRMView/RRMByRunway/RRMTable/RunwayRow/RunwayRowModel";
import ReleaseModel from "../settings/InnovationCadenceView/ReleaseModel";
import ResourceModel from "../settings/ResourceManagementView/ResourceModel";

function filterFTEList(runwayNodeId: string, releases: ReleaseModel[], ftesList: FTEModel[]) {
  const lfteList: FTEModel[] = [];
  releases.forEach((release: ReleaseModel) => {
    const filteredFTEList: FTEModel[] = ftesList.filter((fte: FTEModel) => fte.runwayNodeId === runwayNodeId
      && fte.releaseNodeId === release.nodeId);
    lfteList.push(...filteredFTEList);
  });
  return lfteList;
}
/* overallocation check when given FTE and available runway resource  */
export default function OverallocationLogic(fiveReleasesList: ReleaseModel[], runwayRowData: RunwayRowModel[], fteList: FTEModel[]) {

  let lisRunwayOverallocated: boolean = false;
  fiveReleasesList.forEach((release: ReleaseModel, index: number) => {
    runwayRowData.forEach((runwayRow) => {
      let totalFTE: number = 0;
      let totalResource: number = 0;
      runwayRow.businessGoalList.forEach((bg: BusinessGoalRowModel) => {
        const foundFTE: FTEModel | undefined = filterFTEList(runwayRow.nodeId, fiveReleasesList, fteList).find((fte: FTEModel) =>
          fte.releaseNodeId === release.nodeId && fte.runwayNodeId === runwayRow.nodeId && fte.bgNodeId === bg.nodeId
        );
        if (undefined !== foundFTE && "" !== foundFTE.number) {
          totalFTE = totalFTE + parseFloat(foundFTE.number);
        }
      });
      if (runwayRow.resourceList.length > 0) {
        const foundResource: ResourceModel | undefined = runwayRow.resourceList.find((resource: ResourceModel) =>
          resource.releaseNodeId === release.nodeId);
        if (undefined !== foundResource) {
          totalResource = parseFloat(foundResource.number);
        }
      }
      if (totalFTE > totalResource) {
        lisRunwayOverallocated = true;
        return lisRunwayOverallocated;
      }
    });
    if (lisRunwayOverallocated)
      return lisRunwayOverallocated;
  }
  );
  return lisRunwayOverallocated;
}