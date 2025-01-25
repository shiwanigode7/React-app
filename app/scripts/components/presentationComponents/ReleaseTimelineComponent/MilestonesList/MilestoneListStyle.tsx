import { makeStyles } from "@material-ui/core";

export const milestoneListStyles = makeStyles(() => ({
    rootDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        maxHeight: "69px",
        minHeight: "59px",
        "&::-webkit-scrollbar": {
            display: "NONE",
            width: "0px"
        }
    },
    typography: {
        width: "100%",
        height: "auto",
        minHeight: "28%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "center"
    }
}));