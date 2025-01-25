import AddButtonModel from "./AddButton/AddButtonModel";
import ToggleButtonModel from "./ToggleButton/ToggleButtonModel";
import selectMenuModel from "./SelectMenu/SelectMenuModel";
import SearchBarModel from "./SearchBar/SearchBarModel";
import ToggleSelectFieldModel from "./ToggleSelectField/ToggleSelectFieldModel";

export default interface HeaderModel {
    currentPageHeading: string;
    currentPageSubHeading?: string;
    addButton?: AddButtonModel;
    toggleButton?: ToggleButtonModel;
    selectMenu?: selectMenuModel;
    selectFieldWithScrollbar?: selectMenuModel;
    searchBar?: SearchBarModel;
    dateRangeSelector?: DateRangeSelectorModel;
    toggleSelectField?: ToggleSelectFieldModel;
    actionButtons?: EditButtonModel
    dateSelector?: DateSelectorModel;
}

export interface EditButtonModel {
    displayEditButton: boolean;
    onClickEdit: any;
    onClickRevert: any;
    onClickSave: any;
    isProductEditable: boolean;
}

export interface DateSelectorModel {
    displayDateSelector: boolean;
    meetingDateList: string[];
    selectedDate: string;
    openFilterMenu?: boolean;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export interface DateRangeSelectorModel {
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    disableUpArrow: boolean;
    disableDownArrow: boolean;
}