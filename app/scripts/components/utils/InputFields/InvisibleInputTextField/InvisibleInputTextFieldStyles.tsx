import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1 } from "../../../../constant/Colors";

export const InvisibleInputTextFieldStyles = makeStyles(() => ({
    root: {
        marginTop: 5,
        borderRadius: "5px",
        paddingRight: "0px"
    },
    multiline: {
        padding: "3px 3px"
    },
    input: {
        padding: "0px 0px 0px 0px",
        fontSize: "14px",
        color: COLOR_GRAPHITE_1,
        textAlign: "right"
    },
    endAdornment: {
        marginTop: "0px",
        marginRight: "0px",
    },
    percentageText: {
        color: "black",
        fontSize: "14px"
    },
    notchedOutline: {
        border: "none"
    },
    disabled: {
        cursor: "no-drop"
    }
}));