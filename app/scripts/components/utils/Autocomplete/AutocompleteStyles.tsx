import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_GREY_1, COLOR_WHITE } from "../../../constant/Colors";

const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";
const AVATAR:any = {
    height: "30px",
    width: "30px",
    fontSize: "12px"
}

export const AutocompleteStyles = makeStyles(() => ({

    inputRoot: {
        margin: 0,
        padding: "0px !important",
    },

    input: {
        margin: 0,
        padding: "8px !important",
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_1,
        borderRadius: "4px"
    },

    endAdornment: {
        right: "4px !important",
    },

    popupIndicator: {
        color: COLOR_GRAPHITE_2
    },

    svgRoot: {
        fontSize: "24px"
    },

    notchedOutline: {
        border: "none !important"
    },

    fieldOutlineRoot: {
        margin: 0,
        width: "100%",
        minWidth: "0",
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: BORDER_DEFAULT,
        borderColor: COLOR_GREY_1,
        borderRadius: BORDER_RADIUS,
        flexWrap: "nowrap",
        "&:focus": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&:hover": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        }
    },

    avatar: {
        ...AVATAR
    },

    startAdornmentAvatar: {
        ...AVATAR,
        margin: "4px"
    },

    menuListTypography: {
        marginTop: "5px",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: 400
    },

    userMenuListGrid: {
        display: "inline-flex",
        flexWrap: "nowrap"
    },

}));