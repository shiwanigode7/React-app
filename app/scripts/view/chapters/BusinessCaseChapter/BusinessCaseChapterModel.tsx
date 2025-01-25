import { BusinessGoalType } from "../../MPLView";

export default interface BusinessCaseChapterModel {
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}