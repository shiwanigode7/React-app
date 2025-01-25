import { makeStyles } from "@material-ui/styles";
import { COLOR_WHITE, COLOR_GRAPHITE_2, COLOR_GREY_1 } from "../../../../constant/Colors";

const BORDER_DEFAULT: string = `1px solid ${COLOR_GREY_1}`;
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
};

export const ToggleSelectFieldStyles = makeStyles(({
    selectIcon: {
        top: "4px",
        right: "7px"
    },
    selectFieldOutlineRoot: {
        padding: "0px",
        width: "65px",
        height: "28px",
        margin: "4px 0px 0px 4px",
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
    selectedItem: {
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
        padding: "0px",
        margin: "1px 0px 0px 8px",
        height: "25px",
        width: "55px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        overflow: "hidden",
        fontSize: "small",
        fontWeight: "bold"
    },
    menuList: {
        maxHeight: "200px",
        height: "fit-content"
    },
    menuItemRoot: {
        padding: "0px 0px 0px 0px"
    }
}));