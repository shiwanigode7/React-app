import { makeStyles } from "@material-ui/styles";
import { BORDER_GRAPHITE_5_OPACITY_02, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_RED_2, COLOR_RED_3 } from "../constant/Colors";

/**Make Styles interface */
declare interface BGValueCardStylesProps {
    isValueMissing: boolean;
}

const VALUE_HUNDRED_PERCENT_TEXT: string = "100%";

/**Styling definitions */
export const BGValueCardComponentStyle = makeStyles(() => ({
    cardStyle: (themeProps: BGValueCardStylesProps) => ({
        height: VALUE_HUNDRED_PERCENT_TEXT,
        width: VALUE_HUNDRED_PERCENT_TEXT,
        maxHeight: VALUE_HUNDRED_PERCENT_TEXT,
        maxWidth: VALUE_HUNDRED_PERCENT_TEXT,
        border: themeProps.isValueMissing ? `1px solid ${COLOR_RED_2}` : `1px solid ${BORDER_GRAPHITE_5_OPACITY_02}`,
        background: themeProps.isValueMissing ? COLOR_RED_3 : ""
    }),
    cardContentStyle: (themeProps: BGValueCardStylesProps) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50%",
        textAlign: "center",
        color: themeProps.isValueMissing ? COLOR_RED_2 : COLOR_GRAPHITE_1
    }),
    cardActionStyle: (themeProps: BGValueCardStylesProps) => ({
        color: themeProps.isValueMissing ? COLOR_RED_2 : COLOR_GRAPHITE_4,
        height: "50%",
        flexDirection: "column",
        justifyContent: "flex-start",
        textAlign: "center"
    })
}));
