/** TSX file for the context for MPL view */
import { createContext } from "react";
import { BusinessGoalTableType } from "../interfaces/InnovationInterface";
import { defaultBusinessGoalInitializer } from "../utils/MPLViewUtils";
import { BusinessGoalType } from "../view/MPLView";

/**Place holder value for the business goal data and the setter function */
const modifiedBusinessGoal: BusinessGoalType = defaultBusinessGoalInitializer();
const setModifiedBusinessGoal = (inBusinessGoal: BusinessGoalType) => {
    console.log(inBusinessGoal);
};

/**Place holder value to remember the operation performed */
const businessGoalOperation: string = "NONE";

/**Place holder value to update the operation performed */
const setBusinessGoalOperation = (inValue: string) => {
    console.log(inValue);
};
/**Place holder value for the business goal and business notes length */
const totalBusinessGoals: number = 0;
const totalBusinessNotes: number = 0;

/**Place holder function to update the business goal and notes length */
const setTotalBusinessGoals = (inNumber: number) => {
    console.log(inNumber);
};
const setTotalBusinessNotes = (inNumber: number) => {
    console.log(inNumber);
};

/**Place holder function to modify the search response based on the operation performed */
const handleBGDataChange = (inTableData: BusinessGoalTableType[]) => {
    console.log(inTableData);
    return inTableData;
};

/**Place holder for existing business goal name */
const previousBGName: string = "";
const setPreviousBGName = (inValue: string) => {
    console.log(inValue);
};

/**Array to hold all the status filter set by the user */
const selectedStatusValues: string[] = [];
const setSelectedStatusValues = (inValue: string[]) => {
    console.log(inValue);
};

/**Array to hold all the runway filter set by the user */
const selectedRunwaysList: string[] = [];
const setSelectedRunwaysList = (inValue: string[]) => {
    console.log(inValue);
};

/**Array to hold all the Business Unit filter set by the user */
const selectedBusinessUnitsList: string[] = [];
const setSelectedBusinessUnitsList = (inValue: string[]) => {
    console.log(inValue);
};

/**Define context with place holder value */
export const MPLViewContext = createContext({
    "modifiedBusinessGoal": modifiedBusinessGoal,
    "setModifiedBusinessGoal": setModifiedBusinessGoal,
    "businessGoalOperation": businessGoalOperation,
    "setBusinessGoalOperation": setBusinessGoalOperation,
    "handleBGDataChange": handleBGDataChange,
    "totalBusinessGoals": totalBusinessGoals,
    "totalBusinessNotes": totalBusinessNotes,
    "setTotalBusinessGoals": setTotalBusinessGoals,
    "setTotalBusinessNotes": setTotalBusinessNotes,
    "previousBGName": previousBGName,
    "setPreviousBGName": setPreviousBGName,
    "selectedStatusValues": selectedStatusValues,
    "setSelectedStatusValues": setSelectedStatusValues,
    "selectedRunwaysList": selectedRunwaysList,
    "setSelectedRunwaysList": setSelectedRunwaysList,
    "selectedBusinessUnitsList": selectedBusinessUnitsList,
    "setSelectedBusinessUnitsList": setSelectedBusinessUnitsList
});

