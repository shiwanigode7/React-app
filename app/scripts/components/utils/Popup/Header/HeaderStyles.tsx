import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3 } from "../../../../constant/Colors";

export const HeaderStyles = makeStyles(() => ({
    dialogTitle: {
        backgroundColor: COLOR_GREY_3,
        padding: "0px 10px 0px 25px",
    },
    headerContainer: {
        padding: "0px",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        padding: "0",
        fontSize: "16px",
        fontWeight: "bold"
    }
}));