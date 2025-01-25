import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GREY_1 } from "../../../constant/Colors";

export const ReleaseTypeIconStyles = makeStyles({
    noReleaseIconBarView: {
        color: COLOR_GREY_1
    },
    activeColor: {
        color: ACTIVE_COLOR
    },
    iconsContainer: {
        display: "inline-flex",
        paddingTop: "3px",
        justifyContent: "center"
    },
    iconButton: {
        padding: "0px"
    },
    nonEditableIconButton: {
        padding: "0px",
        cursor: "auto"
    }
});