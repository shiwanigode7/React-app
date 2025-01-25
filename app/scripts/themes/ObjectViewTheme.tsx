import { DarkTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_4, COLOR_GRAPHITE_5, COLOR_WHITE } from "../constant/Colors";

/**Interface for the ShowNotesStyle */
declare interface ShowNotesStyleProps {
    showNotes: boolean;
}

/**Theme for the Outlined TextField */
export const ObjectViewTheme = createMuiTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...DarkTheme.overrides,
        MuiPaper: {
            root: {
                backgroundColor: "#33383E",
                color: "white",
                overflowX: "hidden"
            }
        },
        MuiButton: {
            root: {
                minWidth: "30px"
            },
            containedSecondary: {
                backgroundColor: "#33383E",
                '&:hover': {
                    backgroundColor: "white",
                    color: "black"
                }
            }
        },
        MuiTypography: {
            h6: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        }
    }
});

/**Theme for the scroll bar */
export const NotesViewScrollBarTheme = makeStyles(() => ({

    ScrollBarClass: {
        /**Width */
        "&::-webkit-scrollbar": {
            width: "8px",
            height: "20px",
            border: "bold"
        },
        /* Track */
        "&::-webkit-scrollbar-track": {
            background: "#22262A",
            borderRadius: "10px",
        },
        /**Handle */
        "&::-webkit-scrollbar-thumb": {
            background: "#c4c4c4",
            borderRadius: "10px"
        },
        /**Changes for mozilla */
        /**Width */
        "&::-ms-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        /* Track */
        "&::-ms-scrollbar-track": {
            boxShadow: "inset 0 0 5px #edeeef",
            borderRadius: "10px",
        },
        /**Handle */
        "&::-moz-scrollbar-thumb": {
            background: "#e5e5e5",
            borderRadius: "10px"
        },
        scrollbarColor: "black",
        scrollBarWidth: "thin"
    }

}));

/**Styling for Object View descriptions */
export const ObjectViewStyle = makeStyles(() => ({
    /**Styles for description */
    descriptionRootContainer: {
        overflow: "overlay"
    },
    descriptionRootItem: {
        marginLeft: "5px"
    },
    descriptionHeading: {
        fontWeight: "bold",
        fontSize: "15px"
    },
    descriptionContent: {
        fontSize: "13px",
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        textAlign: "justify",
        overflow: "hidden"
    },
    descriptionTooltip: {
        background: "white",
        color: "black",
        fontSize: "12px",
        margin: "0px",
        maxWidth: "450px",
        textAlign: "justify",
        whiteSpace: "pre-line"
    },
    thumbnail: {
        fontSize: "56px",
        marginLeft: "5.5px"
    },
    actionButton: {
        width: "97%",
        marginLeft: "2px",
        height: "35px",
        color: "white",
        backgroundColor: COLOR_GRAPHITE_4,
        "&:hover": {
            backgroundColor: COLOR_GRAPHITE_4,
        },
        textTransform: "none",
        fontSize: "13px"
    },
    editButton: {
        width: "140px",
        height: "35px",
        color: "white",
        backgroundColor: COLOR_GRAPHITE_4,
        "&:disabled": {
            opacity: "50%",
            borderColor: COLOR_GRAPHITE_5,
            cursor: "not-allowed",
            color: "white",
            pointerEvents: "all"
        },
        "&:hover": {
            backgroundColor: COLOR_GRAPHITE_4,
        },
    },
    deleteIconButton: {
        border: `1px solid ${COLOR_GRAPHITE_4}`,
        width: "34px",
        height: "34Px",
        borderRadius: "4px"
    },
    deleteIcon: {
        color: COLOR_WHITE
    }
}));

/**Object View drawer styling */
export const ShowNotesStyle = makeStyles(() => ({
    objectViewIndex: (themeProps: ShowNotesStyleProps) => ({
        zIndex: themeProps.showNotes ? 2000 : 2
    })
}));