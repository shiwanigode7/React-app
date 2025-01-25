export const ADD_ACTION_POINT_TEXT: string = "Add Action Point";
export const EDIT_ACTION_POINT_TEXT: string = "Edit Action Point";
export const DUE_DATE_TEXT = "Due Date";
export const COMMENT_TEXT = "Comment";
export const TEXT_TITLE_TEXT = "Text";
export const OWNER_TEXT = "Owner";
export const NO_OPEN_ACTIONS: string = "No Open Actions available";
export const NO_PREVIOUS_MEETING_ACTIONS: string = "No Actions from previous meeting available";
export const NO_NEW_ACTIONS: string = "No Actions added yet";
export const PPG_MEETING_TYPE: string = "PPG";
export const SIR_MEETING_TYPE: string = "SIR";

/**
 * Delete confirmation dialog text. 
 * @param inActionTexy - The text of the action
 * @returns 
 */
export const deleteActionConfirmationContent = (inActionText: string) => {
    return `Are you sure you want to delete the Action "${inActionText}"?`
};

/**Delete confirmation dialog related text */
export const DELETE_DIALOG_TITLE_TEXT = "Delete Action";