import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../../FTEModel";

export default interface BusinessGoalRowModel {
    name: string;
    nodeId: string | undefined;
    thumbnail: string;
    runwayNodeId: string;
    handleInputFieldBlurEvent?: any;
    fteList?: FTEModel[];
    isFTEEditable: boolean;
    releases?: ReleaseModel[];
    isPercentageView?: boolean;
    handleAddNotes?: any;
}