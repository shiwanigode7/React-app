import { RunwayModel } from "../../../../../interfaces/InnovationInterface";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../../FTEModel";

export default interface RunwayRowModel {
    businessGoalNodeId : string;
    fteList : FTEModel[];
    runway : RunwayModel;
    releases : ReleaseModel[];
    isPercentageView : boolean;
}