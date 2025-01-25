import { makeStyles } from "@material-ui/core";

interface ThemePropsInterface {
    isLeftNavExpanded: boolean;
}

export const RRMByBusinessGoalStyles = makeStyles({
    rootGrid: {
        width: "100vw",
        height: "100vh",
        display: "inline-flex",
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    filterMenuGrid: (themeProps: ThemePropsInterface) => ({
        height: "100vh",
        width: themeProps.isLeftNavExpanded ? "330px" : "100px",
        minWidth: themeProps.isLeftNavExpanded ? "330px" : "100px"
    }),
    rrmViewGrid: (themeProps: ThemePropsInterface) => ({
        transition: "300ms",
        // padding left is given as 8px because there will be extra spacing from the filter menu collapse icon
        padding: "24px 24px 24px 8px",
        width: themeProps.isLeftNavExpanded ? "calc(100% - 330px)" : "calc(100% - 100px)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }),
    headerGridItem: {
        width: "100%",
        height: "5%",
        whiteSpace: "nowrap",
        minHeight: "50px"
    },
    tableGridItem: {
        width: "100%",
        // Reason for 94% and not 95% is to provide 1% gap between header and body
        height: "94%",
        minWidth: "300px",
        overflowX: "auto"
    }
});