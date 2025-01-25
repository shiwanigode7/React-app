import React from "react";
import { BusinessGoalType } from "../../../MPLView";

export interface ReleaseTypeSelectPropsModel{
    releaseIndex: number;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}