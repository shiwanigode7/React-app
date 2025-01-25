import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3 } from "../../../constant/Colors";

export const BusinessGoalViewStyle = makeStyles({
    rootContainer: {
        width: "100vw"
    },
    rootBox: {
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        maxWidth: "100vw",
        minWidth: "1000px",
        minHeight: "800px",
        boxSizing: "border-box",
        margin: "-10px 0px 0px -20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: COLOR_GREY_3
    },
    rootGridContainer: {
        width: "100%",
        height: "100%"
    },
    businessGoals: {
        marginTop: "8px",
        height: "90vh",
        overflow: "auto",
        display: "inline-flex",
        alignContent: "baseline",
       
    },
    filterMenu: {
        position: "absolute"
    },
    goalsGrid : {
        transition: "300ms", 
        padding: "24px", 
        width: "100%", 
        height: "100vh"
    },
    releaseViewCardGrid: {
        height: "35%",
        minHeight: "280px"
    }
})