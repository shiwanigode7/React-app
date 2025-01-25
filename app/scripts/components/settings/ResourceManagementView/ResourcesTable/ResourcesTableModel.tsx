import { RunwayModel } from "../../../../interfaces/InnovationInterface";
import ReleaseModel from "../../InnovationCadenceView/ReleaseModel";
import ResourceModel from "../ResourceModel";

export default interface ResourcesTableModel {
    releasesList: ReleaseModel[];
    runwaysList: RunwayModel[];
    resourcesList: ResourceModel[];
    handleInputFieldBlurEvent: any;
    showRunwayList: string[];
    isRunwayOverAllocated: boolean;
}