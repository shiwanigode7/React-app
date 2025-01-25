import { BusinessGoalTableType, UserListWithEmailModel } from "../../../../interfaces/InnovationInterface";
import { RunwayModel } from "../BusinessGoalViewModel";

export default interface ReleaseCardViewModel {
    businessGoal : BusinessGoalTableType;
    selectedReleaseId : string;
    selectedRelease : string;
    runwayList : RunwayModel[];
    userList: UserListWithEmailModel[];
    openFilterMenu : boolean;
}