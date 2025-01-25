import { BusinessGoalTableType, RunwayModel } from "../../../../interfaces/InnovationInterface";
import ReleaseModel from "../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../FTEModel";

export default interface RRMByBGModel {
    runwayList: RunwayModel[];
    releases: ReleaseModel[];
    handleClick: any;
    businessGoalList: BusinessGoalTableType[];
    fteList: FTEModel[];
    isPercentageView : boolean
}