import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3 } from "../../../constant/Colors";

export const OnTimeDeliveryViewStyle = makeStyles({
    filterMenu: {
        position: "absolute"
    },
    OTDGrid: {
        transition: "300ms",
        padding: "24px",
        width: "100%",
        height: "100vh"
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
        background: COLOR_GREY_3
    },
    businessGoals: {
        marginTop: "8px",
        height: "75vh",
        overflow: "auto",
        display: "inline-flex",
        alignContent: "baseline"
    },
    rootContainer: {
        width: "100vw"
    },
    overallScoreGrid: {
        justifyContent: "space-between",
        display: "flex",
        marginTop: "26px"
    },
    overallScoreItem: {
        width: "24%",
    },
    releaseViewCardGrid: {
        height: "35%",
        minHeight: "280px"
    },
    alert: {
        marginTop: "10px",
        color: "#0079D1",
        padding: "2px 10px"
    },
    alertHeading: {
        fontWeight: "bold",
        fontSize: "14px"
    },
    alertTime: {
        fontSize: "14px"
    },
    alertIcon: {
        fontSize: "44px",
        color: "#0079D1"
    }
});
