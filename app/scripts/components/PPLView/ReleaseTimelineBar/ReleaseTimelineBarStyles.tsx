import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_4, COLOR_GREY_3 } from "../../../constant/Colors";

const RELEASE_CELL_STYLE: Object = {
    width: "20%",
    padding: "2px",
    display: "grid",
    justifyContent: "center"
};

const ACTIVE_CELL: Object = {
    backgroundColor: COLOR_AZURE_4
};

const INACTIVE_CELL: Object = {
    backgroundColor: COLOR_GREY_3
};

export const ReleaseTimelineBarStyles = makeStyles({
    firstReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        borderTopLeftRadius: "18px",
        borderBottomLeftRadius: "18px"
    },
    currentReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...ACTIVE_CELL
    },
    otherReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL
    },
    lastReleaseCell: {
        ...RELEASE_CELL_STYLE,
        ...INACTIVE_CELL,
        borderTopRightRadius: "18px",
        borderBottomRightRadius: "18px"
    },
    releaseContainer: {
        display: "flex",
        minWidth: "413px"
    }
});