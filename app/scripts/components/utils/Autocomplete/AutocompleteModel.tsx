export interface AutocompleteModel{
    dataList: string[];
    selectedValue: string;
    onChange: (inChangedValue: string, inKeyValue:string) => void;
    noOptionText: string;
    keyValue: string;
}