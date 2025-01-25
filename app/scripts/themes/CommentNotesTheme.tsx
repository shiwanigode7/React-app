/**TSX file to hold the styling of the CommentNotes component */

import { makeStyles } from "@material-ui/styles";
import { COLOR_WHITE } from "../constant/Colors";

export const CommentNotesStyles = makeStyles(() => ({
    /**Styling for the input field */
    /**Button Styling */
    iconButton: {
        color: "white",
        background: "#0079D1",
        borderRadius: "4px",
        height:"30px",
        width:"30px",
        marginTop: "auto",
        "&:hover": {
            color: "white",
            background: "#0079D1",
            borderRadius: "4px",
        }
    },
    iconButtonDisabled: {
        color: "white !important",
        backgroundColor: "#91959A !important",
        borderRadius: "4px",
        marginTop: "auto",
    },
    /**note text area */
    inputMultilineRoot: {
        color: "white",
        fontSize: "12px",
        margin: 0,
    },
    /**Outline for both textfield and the drop down */
    inputOutline: {
        borderColor: "#60666D !important",
        borderWidth: "1px !important",
    },
    /**Styling for the drop down */
    dropDownContainer: {
        marginLeft: "auto"
    },
    selectDisabled: {
        "&.Mui-disabled": {
            color: "#91959A",
            cursor: "not-allowed",
        }
    },
    selectOutlined: {
        width: "58px",
        color: COLOR_WHITE
    },
    selectIcon: {
        color: "white",
        paddingTop: "3px"
    },
    selectRoot: {
        marginTop: "0px"
    },
    listItemIconRoot: {
        color: "white",
        minWidth: "25px"
    },
    selctIconDisabled: {
        "&.Mui-disabled": {
            color: "#91959A"
        }
    },
    listItem: {
        padding: 0, 
        margin: 0 
    }
}));