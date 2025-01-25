import { UserListWithEmailModel } from "../../../interfaces/InnovationInterface";
import { BusinessGoalType } from "../../MPLView";

export interface CoreTeamChapterModel{
    businessGoal: BusinessGoalType;
    setBusinessGoal: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    usersList: UserListWithEmailModel[];
}