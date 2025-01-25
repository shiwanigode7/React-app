import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { COLOR_BLACK, COLOR_GRAPHITE_2, COLOR_GRAPHITE_1, COLOR_GREY_1, COLOR_GREY_2, COLOR_WHITE } from "../../../../constant/Colors";

const BORDER_DEFAULT: string = `1px solid ${COLOR_GREY_1}`;
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "5px";
const INPUT: object = {
    fontSize: "14px",
    backgroundColor: COLOR_WHITE,
    color: COLOR_GRAPHITE_1,
    padding: "8px",
    textAlign: "right"
};


/**Style to remove the count arrow in input field if it is a float type */
export const floatInputStyle = makeStyles(() =>
  createStyles({
    input: {
      textAlign: "right",
      "& input[type=number]": {
        "-moz-appearance": "textfield"
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
      }
    }
  })
);

export const BusinessCaseInputFieldsStyles = makeStyles({
    displayTextFieldArrows: {
        "& input[type=number]": {
            "-moz-appearance": "textfield"
        },
        "& input[type=number]::-webkit-outer-spin-button": {
            opacity: 1
        },
        "& input[type=number]::-webkit-inner-spin-button": {
            opacity: 1
        }
    },
    inputFieldWithoutSA: {
        ...INPUT,
        borderRadius: BORDER_RADIUS
    },
    inputFieldWithSAPositiveValue: {
        ...INPUT,
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS
    },
    inputFieldWithSANegativeValue: {
        ...INPUT,
        color: "red",
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS
    },
    root: {
        marginTop: "0px",
        height: "35px",
        border: BORDER_DEFAULT,
        borderRadius: BORDER_RADIUS,
        boxSizing: "border-box",
        "&:focus": {
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS,
            boxSizing: "border-box"
        },
        "&:hover": {
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS,
            boxSizing: "border-box"
        }
    },
    multiline: {
        padding: "3px 3px"
    },
    notchedOutline: {
        border: `none !important`
    },
    adornedStart: {
        backgroundColor: COLOR_GREY_2,
        padding: "0px"
    },
    startAdornmentText: {
        color: COLOR_BLACK,
        fontWeight: "bold",
        fontSize: "11px",
        margin: "8px"
    }
});