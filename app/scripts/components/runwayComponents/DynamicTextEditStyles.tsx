import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_RED_2, COLOR_WHITE } from "../../constant/Colors";

const BORDER_RADIUS: string = "3px";
const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;

export const DynamicTextEditStyles = makeStyles(() => ({
    fieldHelperText: {
        color: COLOR_RED_2,
        marginLeft: "0px",
        fontSize: "0.75rem"
    },
    fieldNotchedOutline: {
        border: `none !important`
    },
    fieldOutlineRoot: {
        margin: 0,
        height: "42px",
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
        }
    },
    fieldOutlineError: {
        margin: 0,
        marginTop: "20px",
        color: COLOR_GRAPHITE_2,
        border: `1.4px solid ${COLOR_RED_2}`,
        borderRadius: BORDER_RADIUS,
        padding: 0
    },
    fieldInput: {
        backgroundColor: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        padding: "4px 4px"
    }
}));