/**Initializing the contents for the Confirmation Dialog */
export const saveDialogTitle: string = "Create Business Goal";
export const saveDialogContent: string = "Are you sure you wish to save your changes and create this new Business Goal?"
export const cancelDialogTitle: string = "Unsaved Changes";
export const cancelDialogContent: string = "There are unsaved changes. Are you sure you want to close this window without saving those changes?";
export const cancelActionContent: string = "Close Without Saving";
export const deleteDialogTitle: string = "Delete Business Goal";
export const deleteDialogContent: string = "Are you sure you want to delete this Business Goal?";
export const deleteActionContent: string = "Delete";
export const updateDialogTitle: string = "Update Business Goal";
export const updateDialogContent: string = "Are you sure you want to update this Business Goal?";
export const updateActionContent: string = "Update";
export const SWITCH_VIEW_DIALOG_MESSAGE = "There are unsaved changes. Are you sure you want to switch from this view without saving those changes?";
export const SWITCH_VIEW_ACTION_MESSAGE: string = "Switch View";
export const INTERNAL_SERVER_ERROR: string = "Internal server error.";
export const DELETE_BUSINESSGOAL_NOTE_CONTENT: string = "Are you sure you want to delete this note?";
export const DELETE_BUSINESS_GOAL_NOTE_TITLE: string = "Delete Business Goal Note";

/**Runway Messages */
export const defaultRunwayError = "The Requested Runway Operation Could not be performed. Please Try again later.";
export const emptyRunwayNameError = "Runway Name cannot be empty";
export const forbiddenToRunwayMessages = (action: "Create" | "Delete" | "Update") => {
    return `You do not have permission to ${action} Runways`;
}
export const getRunwayCreationSuccessMessage = (inRunwayName: string) => {
    return `Runway "${inRunwayName}" created Successfully`;
}
export const conflictingRunway = (inRunwayName: string) => {
    return `Runway "${inRunwayName}" Already Exists`;
}
export const deleteRunwaySuccess = (inRunwayName: string) => {
    return `"${inRunwayName}" Deleted Successfully."`;
}
export const updateRunwaySuccessMessages = (field: "Status" | "Manager" | "Thumbnail", inRunwayName: string) => {
    return `${field} of the Runway "${inRunwayName}" was Updated`;
}
export const updateRunwayNameSuccess = (inOldRunwayName: string, inNewRunwayName: string) => {
    return `Name of the Runway was updated from "${inOldRunwayName}" to "${inNewRunwayName}"`;
}
export const deleteRunwayConfirmation = (inRunwayName: string) => {
    return `Are you sure you want to delete the Runway "${inRunwayName}" ? 
    Set it to Inactive instead to keep historical data.`
}