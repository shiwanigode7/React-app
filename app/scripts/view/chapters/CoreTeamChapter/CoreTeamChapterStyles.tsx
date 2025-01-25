import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1 } from "../../../constant/Colors";

export const CoreTeamChapterStyles = makeStyles(() => ({

    rootContainer: {
        height: "100%",
        width: "100%",
        flexWrap: "nowrap",
        justifyContent: "space-between"
    },

    columnGrid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "49%", //one percent for providing space between two grids
        height: "100%"
    },

    contentGrid: {
        height: "30%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },

    typography: {
        fontSize: "12px",
        fontWeight: 700,
        color: COLOR_GRAPHITE_1
    }

}));