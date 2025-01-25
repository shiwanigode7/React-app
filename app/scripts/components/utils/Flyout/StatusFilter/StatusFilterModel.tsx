import { StatusFilterButtonInterface } from "../../../StatusFilterButton";

export default interface StatusFilterModel {
    listOfButtons?: StatusFilterButtonInterface[];
    selectedStatusValues?: string[];
    setSelectedStatusValues?: React.Dispatch<React.SetStateAction<string[]>>;
}