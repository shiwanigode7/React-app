export interface CheckboxFilterModel {
    title: string;
    listOfItems: string[];
    selectedCheckboxList: string[];
    setSelectedCheckboxList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CheckboxListWithChecked {
    checkBoxValue: string;
    checked: boolean;
}