import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GRAPHITE_3, COLOR_GREY_1 } from "../../../../constant/Colors";

const BORDER_DEFAULT: string = "1.4px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1.4px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "3px";

const RELEASE_ICON_STYLE: Object = {
    color: COLOR_GRAPHITE_3,
    fontSize: "24px",
    marginRight: "4px"
}
const ICONBUTTON: Object = {
    backgroundColor: "transparent",
    background: "transparent",
    cursor: "context-menu"
}

export const ReleaseTypeIconStyles = makeStyles(() => ({
    tooltip: {
        fontSize: "10px",
        textTransform: "capitalize"
    },
    commendIconGrid:{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline"
    },
    releaseTypeIconBarView: {
        ...RELEASE_ICON_STYLE,
        marginRight: "0px"
    },
    noReleaseIconBarView: {
        ...RELEASE_ICON_STYLE,
        color: COLOR_GREY_1,
        marginRight: "0px"
    },
    iconButton: {
        ...ICONBUTTON,
        "&:hover": {
            ...ICONBUTTON
        }
    }
}))