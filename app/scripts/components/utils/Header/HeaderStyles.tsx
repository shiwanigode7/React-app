import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GREY_2, COLOR_WHITE } from "../../../constant/Colors";

export const HeaderStyles = makeStyles(({
    header: {
        margin: "0px 0px 0px 0px",
        display: "flex",
        width: "auto",
        justifyContent: "space-between",
        flexWrap: "nowrap"
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    actionButtons: {
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        width: "50%",
        display: "inline-flex",
        justifyContent: "flex-end"
    },
    revertButtons: {
        width: "fit-content",
        height: "30px",
        fontWeight: "bold",
        borderRadius: "4px",
        fontSize: "12px",
        textTransform: "none",
        marginBottom: "0%",
        marginRight: "2px",
        marginLeft: "2px",
        marginTop: "2px",
        "&:hover": {
            background: COLOR_GREY_2
        },
        "&:disabled": {
            background: COLOR_GREY_2,
            color: COLOR_WHITE
        }
    },
    editButtons: {
        width: "fit-content",
        height: "30px",
        fontWeight: "bold",
        borderRadius: "4px",
        fontSize: "12px",
        textTransform: "none",
        marginBottom: "0%",
        marginRight: "2px",
        marginLeft: "2px",
        marginTop: "2px",
        background: ACTIVE_COLOR,
        color: COLOR_WHITE,
        "&:hover": {
            background: ACTIVE_COLOR
        },
        "&:disabled": {
            background: ACTIVE_COLOR,
            color: COLOR_WHITE
        }
    },
    searchBar: {
        marginLeft: "auto"
    },
    toggleSelectField: {
        margin: "0px 0px 0px 20px",
        paddingRight: "0px"
    }
}));