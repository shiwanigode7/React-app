import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GRAPHITE_2, COLOR_WHITE, COMPLETED_COLOR, IDEATION_COLOR, SCHEDULED_COLOR } from "../constant/Colors";

const FONT_SIZE:string = "24px";

/**Common styles used in all status styles */
const COMMON_STYLES = {
    fontSize: FONT_SIZE,
    height: "100%",
    borderRadius: "20px" 
}

/**Defining styles */
export const BGStatusChipStyles = makeStyles(() => ({
    ideation: {
        color: COLOR_GRAPHITE_2,
        background: IDEATION_COLOR,
        ...COMMON_STYLES
    },
    scheduled: {
        color: COLOR_WHITE,
        background: SCHEDULED_COLOR,
        ...COMMON_STYLES
    },
    active: {
        color: COLOR_WHITE,
        background: ACTIVE_COLOR,
        ...COMMON_STYLES
    },
    completed: {
        color: COLOR_WHITE,
        background: COMPLETED_COLOR,
        ...COMMON_STYLES
    },
    chipIcon: {
        color: COLOR_WHITE,
        fontSize: FONT_SIZE
    },
    chipIdeationIcon: {
        color: COLOR_GRAPHITE_2,
        fontSize: FONT_SIZE
    }
}));