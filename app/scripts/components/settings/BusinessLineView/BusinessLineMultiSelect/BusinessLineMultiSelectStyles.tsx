import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GREY_2, COLOR_WHITE } from "../../../../constant/Colors";

export const BusinessLinesMultiSelectStyles = makeStyles(() => ({
    rootDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    chipRoot: {
        backgroundColor: COLOR_GREY_2,
        height: "24px",
        margin: "2px",
        verticalAlign: "inherit",
        maxWidth: "450px",
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
        fontSize: "0px",
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
        height: "0px",
        width: "0px",
    },
    selectDropdown: {
        margin: "0px",
        whiteSpace: "normal",
        width: "0px",
        height: "0px",
        fontSize: "0px"
    },
    menuList: {
        maxHeight: "200px",
        height: "fit-content",
        marginTop: "0px"
    },
    tooltip: {
        fontSize: "10px"
    },

    // button
    buttonRoot: {
        textTransform: "none",
        margin: "4px",
        height: "100%",
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: "1.4px solid rgba(0, 0, 0, 0.38)",
        borderRadius: "3px",
        padding: "4px 8px",
        fontWeight: 700
    }
}));