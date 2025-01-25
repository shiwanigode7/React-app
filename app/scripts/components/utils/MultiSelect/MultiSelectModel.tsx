import { DropDownInterface } from "../../../interfaces/InnovationInterface";

export interface MultiSelectPropsModel {
    dataList: DropDownInterface[];
    defaultValues: string[];
    onSelectCallBack: (inSelectedValues: string[]) => void;
    tooltipTitle: string;
    disableEdit: boolean;
}