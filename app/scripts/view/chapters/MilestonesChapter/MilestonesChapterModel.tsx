import { BusinessGoalType } from "../../MPLView";

export default interface MilestonesChapterModel {
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    duplicateMilestoneIndices: number[];
    setDuplicateMilestoneIndices: React.Dispatch<React.SetStateAction<number[]>>;
    formValid: any;
}