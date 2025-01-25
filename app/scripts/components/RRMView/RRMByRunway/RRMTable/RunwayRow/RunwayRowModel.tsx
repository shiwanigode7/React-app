import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import ResourceModel from "../../../../settings/ResourceManagementView/ResourceModel";
import FTEModel from "../../../FTEModel";
import BusinessGoalRowModel from "../BusinessGoalRow/BusinessGoalRowModel";

export default interface RunwayRowModel {
    handleClick?: any;
    name: string;
    nodeId: string;
    thumbnail: string;
    businessGoalList: BusinessGoalRowModel[];
    showBGList?: string[];
    handleInputFieldBlurEvent?: any;
    fteList?: FTEModel[];
    isFTEEditable: boolean;
    releases?: ReleaseModel[];
    resourceList: ResourceModel[];
    isPercentageView?: boolean;
    handleAddNotes?: any
}