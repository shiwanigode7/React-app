/**Utils used in the Runway View */

import { RunwayModel } from "../interfaces/InnovationInterface"

/**
 * Function to return an default value initialized runway
 * @returns - Initialized Runway 
 */
export const defaultRunwayInitializer = () => {
    const oRunwayData: RunwayModel = {
        isActive: true,
        managerName: "",
        runwayName: "",
        thumbnail: "none",
        nodeId: ""
    }
    return oRunwayData;
}

/**
 * Function to sort the table based on the runwayName in ascending order
 * @param inListData - The table to be sorted
 * @returns - Sorted runway table data
 */
export const runwayListSorter = (inListData: RunwayModel[]) => {
    inListData.sort((lFirstElementValue: any, lSecondElementValue: any) => {
        let lReturnValue: number = 0;
        if (lFirstElementValue["runwayName"].toLowerCase() < lSecondElementValue["runwayName"].toLowerCase()) {
            lReturnValue = -1;
        }
        if (lFirstElementValue["runwayName"].toLowerCase() > lSecondElementValue["runwayName"].toLowerCase()) {
            lReturnValue = 1;
        }
        if (lFirstElementValue["runwayName"].toLowerCase() === lSecondElementValue["runwayName"].toLowerCase()) {
            lReturnValue = 0;
        }
        return lReturnValue;
    });
    return inListData;
}