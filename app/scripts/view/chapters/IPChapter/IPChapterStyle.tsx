import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_RED_2, COLOR_WHITE } from "../../../constant/Colors";

const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "3px";

export const IPChapterStyles = makeStyles(() => ({

    IPGrid: {
        display: "inline-flex",
        alignItems: "center",
        margin: "8px",
        marginTop: "0px"
    },

    IPCheckBox: {
        color: `${COLOR_AZURE_2} !important`
    },

    IPTitle: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: COLOR_GRAPHITE_1,
        padding: "0",
        margin: "0"
    },

    IPDescriptionFieldNotchedOutline: {
        border: `none !important`
    },

    IPDescriptionMultiline: {
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        padding: "6px 8px",
        "&.Mui-disabled": {
            cursor: "not-allowed"
        }
    },

    IPDescriptionHelperText: {
        color: COLOR_RED_2,
        marginLeft: "0px"
    },

    IPDescriptionFieldOutlineRoot: {
        margin: 0,
        marginTop: "8px",
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: BORDER_DEFAULT,
        borderRadius: BORDER_RADIUS,
        padding: 0,
        "&:focus": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&:hover": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&.Mui-disabled": {
            opacity: "0.5",
            border: BORDER_DEFAULT,
            borderRadius: BORDER_RADIUS,
            cursor: "not-allowed"
        }
    },
    IPDescriptionFieldOutLineError: {
        margin: 0,
        marginTop: "8px",
        color: COLOR_GRAPHITE_2,
        border: `1.4px solid ${COLOR_RED_2}`,
        borderRadius: BORDER_RADIUS,
        padding: 0
    },
    IPTextFieldDragStyle: {
        resize: "vertical",
        minHeight: "50px",
        maxHeight: "110px"
    }
}));