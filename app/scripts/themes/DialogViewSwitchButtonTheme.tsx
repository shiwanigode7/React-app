import { makeStyles } from "@material-ui/core";

declare interface ThemeProps {
    isWide: boolean
}

/**Styles for the dialog view switch button */
export const DialogViewSwitchButtonStyles = makeStyles(() => ({
    paper: (themeInput: ThemeProps) => ({
        width: themeInput.isWide ? "18vw" : "10vw",
        maxWidth: themeInput.isWide ? "18vw" : "10vw",
        maxHeight: "30%",
        overflow: "auto",
        top: "50px !important"
    }),
    menuList: {
        overflow: "unset"
    },
    button: (themeInput: ThemeProps) => ({
        width: themeInput.isWide ? "18vw" : "10vw"
    }),
    buttonLabel: {
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-between"
    },
    typography: {
        fontSize: "14px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    }
}));