import { BusinessLineModel } from "../../../../settings/BusinessLineView/BusinessLineModel";

export interface BusinessLineFilterModel {
    selectedBusinessLineList: string[];
    setSelectedBusinessLineList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface BusinessLinesListWithChecked {
    businessLineDetails: BusinessLineModel;
    checked: boolean;
}