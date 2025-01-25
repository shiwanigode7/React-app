
import { makeStyles } from "@material-ui/core";
import { BORDER_GRAPHITE_5_OPACITY_02, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_RED_2, COLOR_RED_3 } from "../constant/Colors";

/**Theme props */
declare interface ThemeProps {
    isDataValid: boolean;
}

/**Styling definition for the component Investment Profit component*/
export const InvestmentProfitComponentStyles = makeStyles(() => ({
    cardRoot: (themeProps: ThemeProps) => ({
        height: "100%",
        width: "100%",
        backgroundColor: themeProps.isDataValid ? "" : COLOR_RED_3,
        border: themeProps.isDataValid ? `1px solid ${BORDER_GRAPHITE_5_OPACITY_02}` : `1px solid ${COLOR_RED_2}`,
    }),
    gridRoot: {
        width: "100%",
        height: "100%",
        display: "inline-flex",
        justifyContent: "center"
    },
    iconGrid: {
        width: "30%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    valueGrid: {
        width: "60%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
}));

/**Styling for the Sub component of InvestmentProfitComponent */
export const IndividualValueComponentStyles = makeStyles(() => ({
    individualValuesRootGrid: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: "50%",
    },
    individualDataValueGrid: (themeProps: ThemeProps) => ({
        width: "26%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: themeProps.isDataValid ? "48px" : "12px",
        textAlign: "center",
        fontWeight: "bold",
        color: themeProps.isDataValid ? COLOR_GRAPHITE_1 : COLOR_RED_2
    }),
    individualLabelAndUnitRootGrid: {
        width: "75%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    individualDataUnitGrid: (themeProps: ThemeProps) => ({
        width: "100%",
        height: "50%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        color: themeProps.isDataValid ? COLOR_GRAPHITE_4 : COLOR_RED_2,
        fontSize: "24px"
    }),
    individualDataLabelGrid: (themeProps: ThemeProps) => ({
        width: "100%",
        height: "50%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        color: themeProps.isDataValid ? COLOR_GRAPHITE_4 : COLOR_RED_2,
        fontSize: "16px"
    }),
    divider: {
        height: "75%",
        backgroundColor: COLOR_GRAPHITE_4,
        opacity: "0.2",
        display: "flex",
        alignSelf: "center"
    },
    dividerGrid: {
        width: "10%",
        height: "100%",
        display: "flex"
    }
}));