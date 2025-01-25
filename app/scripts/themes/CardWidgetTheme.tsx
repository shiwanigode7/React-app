import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GRAPHITE_4, COLOR_WHITE } from "../constant/Colors";

/**Theme for Card Widget in dashboard */
export const CardWidgetStyles = makeStyles((theme: any) => ({
    CardClass: {
        backgroundColor: COLOR_GRAPHITE_2,
        color: COLOR_WHITE,
        height: "100%"
    },
    cardContent: {
        height: "100%"
    },

    cardContentGrid: {
        height: "100%",
        flexWrap: "nowrap"
    },

    HeadingClass: {
        fontSize: "17px"
    },
    DividerClass: {
        margin: "0",
        backgroundColor: COLOR_GRAPHITE_4
    },
    headingRootGrid: {
        display: "inline-flex",
        justifyContent: "space-between"
    },

    contentGrid: {
        height: "80%",
        overflow: "auto"
    }
}));