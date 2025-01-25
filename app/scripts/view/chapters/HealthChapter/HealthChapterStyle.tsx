import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_2, COLOR_RED_2, COLOR_WHITE} from "../../../constant/Colors";

const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "3px";

export const HealthChapterStyle = makeStyles(() => ({
    rootContainer: {
        justifyContent: "space-between"
    },
    commentTextFieldNotchedOutline: {
        border: `none !important`
    },

    commentMultiline: {
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        padding: "6px 8px",
        "&.Mui-disabled": {
            cursor: "not-allowed"
        }
    },

    commentHelperText: {
        color: COLOR_RED_2,
        marginLeft: "0px"
    },

    commentFieldOutlineRoot: {
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
    commentFieldOutLineError: {
        margin: 0,
        marginTop: "8px",
        color: COLOR_GRAPHITE_2,
        border: `1.4px solid ${COLOR_RED_2}`,
        borderRadius: BORDER_RADIUS,
        padding: 0
    },
    commentTextFieldDragStyle: {
        resize: "vertical",
        minHeight: "50px",
        maxHeight: "110px"
    },
    tooltip: {
        background: COLOR_GRAPHITE_2,
        color: COLOR_WHITE,
        fontSize: "13px",
        margin: "0px",
        maxWidth: "55%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    }
}))