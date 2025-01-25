import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GREY_2, COLOR_WHITE } from "../../../constant/Colors";

export const MultiSelectStyles = makeStyles(() => ({
    rootDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    chipRoot: {
        backgroundColor: COLOR_GREY_2,
        height: "24px",
        margin: "2px",
        verticalAlign: "inherit",
        maxWidth: "100%",
        width: "100%",
        justifyContent: "space-between"
    },
    chipLabel: {
        fontSize: "14px"
    },
    chipDeleteIcon: {
        color: COLOR_GRAPHITE_2
    },
    // Select field styles
    selectIcon: {
        bottom: "0",
        top: "auto",
        right: "auto",
        left: "auto",
        fontSize: "30px",
        color: COLOR_GRAPHITE_2
    },
    selectNotchedOutline: {
        border: `none !important`,
    },
    selectOutlineRoot: {
        margin: 0,
        background: `${COLOR_WHITE} !important`,
        color: `${COLOR_WHITE} !important`,
        padding: "0px !important",
        height: "30px",
        width: "30px",
    },
    selectDropdown: {
        margin: "0px",
        whiteSpace: "normal",
        width: "30px",
        height: "30px",
    },
    menuList: {
        maxHeight: "200px",
        height: "fit-content",
        marginTop: "30px"
    },
    tooltip:{
        fontSize: "10px"
    }
}));