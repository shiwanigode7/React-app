import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE, COLOR_GRAPHITE_2 } from "../../../constant/Colors";

const BORDER_DEFAULT: string = "1px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";

export const DateRangeSelectorStyles = makeStyles(({
    textFieldOutlineRoot: {
        margin: 0,
        padding: "0px",
        width: "170px",
        height: "35px",
        marginLeft: "4px",
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: BORDER_DEFAULT,
        borderRadius: BORDER_RADIUS,
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
    textFieldNotchedOutline: {
        border: `none !important`,
        height: "35px",
        padding: "0px"
    },
    iconButton: {
        padding: 0
    },
    arrowUpIcon: {
        marginBottom:"-5px"
    },
    arrowDownIcon: {
        marginTop: "-6px"
    }
}))