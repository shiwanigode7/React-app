import { BusinessGoalTableType, RunwayModel } from "../../../../../interfaces/InnovationInterface";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../../FTEModel";

export default interface BusinessGoalRowModel {
    businessGoal : BusinessGoalTableType;
    handleClick: any;
    releases : ReleaseModel[];
    isPercentageView : boolean;
    fteList : FTEModel[];
    runwayList : RunwayModel[];
}