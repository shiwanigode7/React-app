import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_GRAPHITE_3, COLOR_GREY_1, COLOR_WHITE } from "../../../../constant/Colors";

const BORDER_DEFAULT: string = `1px solid ${COLOR_GREY_1}`;
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";

export const SearchBarStyles = makeStyles(({
    root: {
        marginTop: 5,
        borderRadius: "6px",
        fontSize: 14,
        height: "28px",
        backgroundColor: COLOR_WHITE,
        color: COLOR_GRAPHITE_1,
        border: BORDER_DEFAULT,
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
    multiline: {
        padding: "3px 3px"
    },
    input: {
        padding: "0px 0px 0px",
        fontSize: 14,
        backgroundColor: COLOR_WHITE,
        color: COLOR_GRAPHITE_1
    },
    notchedOutline: {
        border: `none !important`
    },
    searchRoundedIcon: {
        color: COLOR_GRAPHITE_3,
        fontSize: "24px",
        marginRight: "4px"
    },
    closeRoundedIconTrue: {
        color: COLOR_GRAPHITE_3,
        fontSize: "24px"
    },
    closeRoundedIconFalse: {
        color: "transparent",
        fontSize: "24px"
    },
    IconButton: {
        padding: "0px"
    }
}));