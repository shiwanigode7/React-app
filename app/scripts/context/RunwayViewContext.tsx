/** TSX file for the context of Runway View */

import { createContext } from "react";
import { RunwayModel } from "../interfaces/InnovationInterface";
import { defaultRunwayInitializer } from "../utils/RunwayViewUtils";

export const runwayView = "Runway View";

/**To hold the runway data that was modified */
const modifiedRunway: RunwayModel = defaultRunwayInitializer();
const setModifiedRunway = (inRunway: RunwayModel) => {
    console.log(inRunway)
}

/**To set the length of the existing runway list */
const totalRunways: number = 0;
const setTotalRunways = (inValue: number) => {
    console.log(inValue);
}

/**To set the operation that was performed recently in the runway view */
const runwayOperationPerformed: string = "";
const setRunwayOperationPerformed = (inValue: string) => {
    console.log(inValue);
}

/**Function to update the search response based on the runway data that was modified */
const handleRunwaysDataModification = (inRunwaysList: RunwayModel[]) => {
    console.log(inRunwaysList);
    return inRunwaysList;
}

/**To remember the last modified runway name */
const previousRunwayName:string = "";
const setPreviousRunwayName = (inRunwayName: string) => {
    console.log(inRunwayName);
}

/**Define context with placeholder values */
export const RunwayViewContext = createContext({
    "modifiedRunway": modifiedRunway,
    "setModifiedRunway": setModifiedRunway,
    "totalRunways": totalRunways,
    "setTotalRunways": setTotalRunways,
    "runwayOperationPerformed": runwayOperationPerformed,
    "setRunwayOperationPerformed": setRunwayOperationPerformed,
    "handleRunwaysDataModification": handleRunwaysDataModification,
    "previousRunwayName": previousRunwayName,
    "setPreviousRunwayName": setPreviousRunwayName
})