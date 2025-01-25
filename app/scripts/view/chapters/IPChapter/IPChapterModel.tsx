import { BusinessGoalType } from "../../MPLView";

export default interface IPChapterModel {
    isFormInvalid: boolean;
    setIsFormInvalid: (isFormInvalid: boolean) => void;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}