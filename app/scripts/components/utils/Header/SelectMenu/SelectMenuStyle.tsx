import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_2, COLOR_WHITE } from "../../../../constant/Colors";

const BORDER_DEFAULT: string = "1px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";
const SELECT_FIELD_OUTLINE = {
    background: COLOR_WHITE,
    color: COLOR_GRAPHITE_2,
    borderRadius: BORDER_RADIUS,
    "&.Mui-disabled": {
        opacity: "0.5",
        cursor: "not-allowed"
    }
}

export const SelectMenuStyles = makeStyles(({
    selectIcon: {
        top: "4px",
        right: "7px"
    },
    /**Common theme for the fields in list view */
    selectFieldOutlineRoot: {
        margin: 0,
        padding: "0px",
        width: "90px",
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
    selectedItem : {
        padding: 0,
        background: "transparent !important",
        height: "30px !important",
        margin: "2px 0px 0px 2px"
    },
    selectFilterDropDownOutlined: {
        width: "90px",
        height: "35px",
        ...SELECT_FIELD_OUTLINE
    },
    selectFieldNotchedOutline: {
        border: `none !important`,
        height: "35px",
        padding: "0px"
    },
    listItem: {
        padding: 0,
        margin: "1px 0px 0px 8px",
        height: "25px",
        width: "90%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        overflow: "hidden"
    },
    menuList : {
        maxHeight: "200px",
        height: "fit-content"
    }
}))