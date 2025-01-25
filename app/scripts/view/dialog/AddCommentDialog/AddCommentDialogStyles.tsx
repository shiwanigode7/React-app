import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3, COLOR_WHITE, COLOR_AZURE_2, COLOR_MATERIAL_UI_BLUE, COLOR_GRAPHITE_1, COLOR_GRAPHITE_3, COLOR_GRAPHITE_2, COLOR_RED_2 } from "../../../constant/Colors";

const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "3px";

export const AddCommentDialogStyles = makeStyles(() => ({
    commentDialog: {
        width: "400px"
    },
    commentDialogTitle: {
        padding: "8px 24px",
        background: COLOR_GREY_3,
        borderRadius: "8px 8px 0px 0px"
    },
    commentCancelButton: {
        backgroundColor: COLOR_WHITE
    },
    commentSubmitButton: {
        backgroundColor: COLOR_AZURE_2,
        "&:hover": {
            backgroundColor: COLOR_MATERIAL_UI_BLUE
        }
    },

    commentTitleText: {
        fontSize: "16px",
        fontWeight: 700,
        color: COLOR_GRAPHITE_1
    },

    commentDialogCrossIconButton: {
        color: COLOR_GRAPHITE_3,
        padding: "4px 0px"
    },

    // Text field theme
    commentFieldNotchedOutline: {
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
    commentFieldDragStyle: {
        resize: "vertical",
        minHeight: "50px",
        maxHeight: "400px"
    },
}));