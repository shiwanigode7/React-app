import { makeStyles } from "@material-ui/core";

export const SlidesUploadStyles = makeStyles({
    menuPaper: {
        padding: "0px 0px",
        margin: "0px",
        width: "fit-content"
    },
    addIconButton: {
        fill: "black"
    },
    disabledAddIconButton: {
        cursor: "not-allowed"
    },
    icon: {
        padding: "0px"
    },
    iconButton: {
        padding: "0px",
        fill: "black",
        cursor: "pointer",
        "&.Mui-disabled": {
            pointerEvents: "auto"
        }
    },
    listItem: {
        minWidth: "30px"
    }
})