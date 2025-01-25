import { BusinessGoalType } from "../../MPLView";

export interface ReleaseTimelineChapterModel {
    businessGoal: BusinessGoalType;
    setBusinessGoal: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    bgNodePath: string;
}