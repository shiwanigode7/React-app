import { makeStyles } from "@material-ui/core";
import { BORDER_GRAPHITE_5_OPACITY_02, COLOR_GRAPHITE_2, COLOR_GRAPHITE_4, COLOR_RED_2, COLOR_RED_3 } from "../constant/Colors";

/**Theme props */
declare interface ThemeProps {
    isDataValid: boolean;
}

/**Style definition for the component */
export const BGMilestoneListStyles = makeStyles(() => ({
    cardRoot: (themeProps: ThemeProps) => ({
        border: themeProps.isDataValid ? `1px solid ${BORDER_GRAPHITE_5_OPACITY_02}` : `1px solid ${COLOR_RED_2}`,
        background: themeProps.isDataValid ? "" : COLOR_RED_3,
        maxheight: "100%",
        width: "100%",
        height: "100%"
    }),
    cardContent: (themeProps: ThemeProps) => ({
        color: themeProps.isDataValid ? COLOR_GRAPHITE_4 : COLOR_RED_2,
        margin: "2px",
        lineBreak: "anywhere",
        fontSize: "14px",
        height: "100%",
        overflowY: "auto"
    }),
    mileStoneHeader: (themeProps: ThemeProps) => ({
        fontWeight: "bold",
        color: themeProps.isDataValid ? COLOR_GRAPHITE_2 : COLOR_RED_2
    }),
}));