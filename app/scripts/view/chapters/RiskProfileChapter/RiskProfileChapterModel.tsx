import { BusinessGoalType } from "../../MPLView";

export interface RiskProfileChaptersProps {
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}