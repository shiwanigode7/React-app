/**TSX File listing all the text and hardcoded value used in BusinessGoalComponent and BusinessGoalDialogComponent */

import { DropDownInterface } from "../interfaces/InnovationInterface";
import { BUSINESS_GOAL_DISPLAY_MODE } from "./InnovationEnums";

/**Constant array with the display and key values for the business goal display mode drop down  */
export const BG_DISPLAY_MODE_DROP_DOWN: DropDownInterface[] = [
    {
        dataKey: BUSINESS_GOAL_DISPLAY_MODE.SIR_PRESENTATION,
        displayName: "SIR View"
    },
    {
        dataKey: BUSINESS_GOAL_DISPLAY_MODE.PPG_PRESENTATION,
        displayName: "PPG View"
    }
];

export const BG_ORDERING_DISABLED_TOOLTIP: string = "Changing priorities is only enabled when all Statuses are displayed and Business Goals are sorted by Priority";

export const BG_ORDERING_DISABLED_TOOLTIP_PPL_VIEW: string = "Changing priorities is enabled when only Scheduled and Active (not Completed) Business Goals are displayed and Business Goals are sorted by Priority";

export const BG_ORDERING_NO_PERMISSION: string = "No permission to change Priority";

export const BG_EDIT_NO_PERMISSION: string = "No permission to edit Business Goal";