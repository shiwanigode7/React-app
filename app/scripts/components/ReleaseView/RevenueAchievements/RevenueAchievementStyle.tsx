import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3 } from "../../../constant/Colors";

export const RevenueAchievementStyle = makeStyles({
    rootBox: {
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        maxWidth: "100vw",
        minWidth: "1000px",
        minHeight: "800px",
        boxSizing: "border-box",
        margin: "-1px 0px 0px -29px",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: COLOR_GREY_3
    },
    rootGridContainer: {
        minWidth: "700px",
        width: "100%",
        height: "100%"
    },
    filterMenu: {
        position: "absolute"
    },
    revenueAchivementGrid: {
        transition: "300ms",
        padding: "5px 4px 24px 24px",
        height: "100vh",
    }
});