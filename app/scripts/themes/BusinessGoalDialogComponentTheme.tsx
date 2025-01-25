/**TSX file for the theme definition for the BusinessGoalDialog Component */
import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GRAPHITE_4, COLOR_GRAPHITE_5, COLOR_WHITE } from "../constant/Colors";

/**Props for the makestyles */
declare interface ThemeProps {
    /**Condition that tell is we have to show only the object view or not */
    showOnlyObjectView: boolean;
    /**Condition to tell whether the object view should be shown on top of the dialog */
    disableShowNotes: boolean;
    /**Condition to tell if the business goal dialog is open or not */
    isBusinessGoalDialogOpen: boolean;
    /**Condition to tell if the parent dialog is opened on not. */
    openCompleteDialog: boolean;
}

export const BusinessGoalDialogComponentStyles = makeStyles(() => ({
    dialogPaperFullScreen: (themeInput: ThemeProps) => ({
        overflow: "hidden",
        backgroundColor: !themeInput.openCompleteDialog ? "transparent" : COLOR_WHITE
    }),
    dialogRoot: (themeInput: ThemeProps) => ({
        position: themeInput.showOnlyObjectView ? "unset" : "fixed"
    }),
    dialogBackdropRoot: {
        backgroundColor: "transparent"
    },
    dialogContentRoot: (themeInput: ThemeProps) => ({
        display: themeInput.isBusinessGoalDialogOpen ? "block" : "none"
    }),
    dialogTitle: {
        backgroundColor: COLOR_GRAPHITE_2,
        padding: "4px"
    },
    gridRoot: {
        display: "inline-flex",
        flexWrap: "nowrap",
        justifyContent: "space-between"
    },
    dropDownAndButtonGrid: {
        display: "inline-flex",
        flexWrap: "nowrap"
    },
    button: {
        "&:disabled": {
            background: COLOR_GRAPHITE_5,
            color: COLOR_WHITE,
            opacity: "0.5"
        },
        width: "min-content",
        height: "40px",
        backgroundColor: COLOR_GRAPHITE_4,
        color: COLOR_WHITE,
        whiteSpace: "nowrap"
    },
    menu: {
        backgroundColor: COLOR_GRAPHITE_4,
        color: COLOR_WHITE,
        whiteSpace: "nowrap",
        padding: "0px 0px",
        margin: "0px",
        width: "fit-content"
    },
    iconColor: {
        color: COLOR_WHITE
    },
    iconDisabled: {
        opacity: "0.5"
    },
    header : {
        display: "inline-flex", 
        flexWrap: "nowrap", 
        height:"50px"
    },
    objectViewRootDiv: (themeInput: ThemeProps) => ({
        height: 0,
        width: 0,
        display: themeInput.disableShowNotes ? "none" : "block"
    })
}));