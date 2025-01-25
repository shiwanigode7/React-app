import { makeStyles } from "@material-ui/core";
import { BORDER_GRAPHITE_5_OPACITY_02, COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_RED_2, COLOR_RED_3 } from "../constant/Colors";


/**Theme props */
declare interface ThemeProps {
    isDataValid: boolean;
    totalRunway: number;
}

/**Style definition for the component */
export const RunwayPresentationListStyles = makeStyles(() => ({
    cardRoot: (themeProps: ThemeProps) => ({
        border: themeProps.isDataValid ? `1px solid ${BORDER_GRAPHITE_5_OPACITY_02}` : `1px solid ${COLOR_RED_2}`,
        background: themeProps.isDataValid ? "" : COLOR_RED_3,
        height: "100%",
        width: "100%",
    }),
    cardContent: (themeProps: ThemeProps) => ({
        color: themeProps.isDataValid ? COLOR_GRAPHITE_1 : COLOR_RED_2,
        fontWeight: themeProps.isDataValid ? "bold" : "unset",
        margin: "2px",
        lineBreak: "anywhere",
        fontSize: "14px",
        height: "60%",
        width: "90%",
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        textAlign: "center",
        overflowX: "auto",
        overflowY: "hidden"
    }),
    runwayTitleHeader: (themeProps: ThemeProps) => ({
        fontWeight: "bold",
        color: themeProps.isDataValid ? COLOR_GRAPHITE_2 : COLOR_RED_2
    }),
    avatarDiv: (themeProps: ThemeProps) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "4px",
        minWidth: `calc(90% /${themeProps.totalRunway} )`,
        overflow: "hidden"
    }),
    avatar: {
        height: "auto",
        width: "65px",
        display: "flex",
        alignSelf: "center"
    },
    label: {
        padding: 0,
        margin: 0,
        width: "calc(100%)",
        textOverflow: "ellipsis",
        overflow: "hidden"
    }
}));