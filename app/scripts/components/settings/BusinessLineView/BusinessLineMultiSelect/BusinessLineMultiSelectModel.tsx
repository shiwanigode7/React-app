import { BusinessLineMenuDataModel } from "../BusinessLineModel";

export interface BusinessLineMultiSelectPropsModel {
    dataList: BusinessLineMenuDataModel[];
    defaultValues: string[];
    onSelectCallBack: (inSelectedValues: string[]) => void;
    selectButtonTitle: string;
    // If true then the multiselect can have no value selected
    // If false then a value must be selected no matter what
    hasEmptyValues: boolean;
    maxValues: number;
    maxValueLimitCrossCallback: () => void;
    emptyErrorCallback: () => void;
    deleteIconTooltip: string;
    // Method called when the user doesn't select a value and clicks outside the 
    // menu list when hasEmptyValues is false
    valueRequiredCallBack: () => void;
}