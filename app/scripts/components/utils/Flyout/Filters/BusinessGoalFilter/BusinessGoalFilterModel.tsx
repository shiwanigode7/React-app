import { BusinessGoalWithIdType } from "../../../../../interfaces/InnovationInterface";

export interface BusinessGoalFilterModel {
    selectedBusinessGoalsList: string[];
    setSelectedBusinessGoalsList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface BusinessGoalsListWithChecked {
    businessGoalDetails: BusinessGoalWithIdType;
    checked: boolean;
}

export interface BGModel {
    nodeId: string;
    businessGoalName: string;
    thumbnail: string;
    status: string;
    PPLPriority: string;
}