import { BusinessGoalType } from "../../MPLView";

export default interface HealthChapterModel {
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}