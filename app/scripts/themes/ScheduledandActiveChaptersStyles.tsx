import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1 } from "../constant/Colors";

export const ScheduledandActiveChaptersStyles = makeStyles(() => ({
    accordionTypography: {
        fontSize: "16px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1
    },
    accordionDetail: {
        height: "200px"
    },
    releaseTimelineAccordionDetail: {
        height: "fit-content",
        minHeight: "200px"
    }
}));