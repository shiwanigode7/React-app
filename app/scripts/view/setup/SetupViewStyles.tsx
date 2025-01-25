import { makeStyles } from "@material-ui/core";

export const SetupViewStyles = makeStyles({
    headerGridContainer: {
        display: "flex",
        flexDirection: "column"
    },
    headerGridItem: {
        marginLeft: "20px"
    },
    bodyGridContainer: {
        padding: "1% 0% 0% 1%",
        marginLeft: "30px",
        display: "flex",
        flexDirection: "column"
    },
    itemGridContainer: {
        display: "flex",
        padding: "1% 0% 0% 1%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    typography: {
        fontSize: "14px",
        fontWeight: "bold"
    }
});