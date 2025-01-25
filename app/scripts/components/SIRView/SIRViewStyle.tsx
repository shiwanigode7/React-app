import { makeStyles } from "@material-ui/core";

export const SIRViewStyle = makeStyles({
    filterMenu: {
        position: "absolute"
    },
    sirViewGrid : {
        transition: "300ms", 
        padding: "1% 5% 0% 0%",
        height: "100vh",
        position : "fixed"
    },
    rootBox: {
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        maxWidth: "100vw",
        minWidth: "1000px",
        minHeight: "800px",
        boxSizing: "border-box",
        margin: "-10px 0px 0px -20px"
    },
    meetingsGrid: {
        marginTop: "8px",
        height: "90vh",
        overflow: "auto",
        display: "inline-flex",
        alignContent: "baseline",
    },
    statusHeader: {
        width: "80%",
        justifyContent: "center",
        display: "inline-flex"
    },
    headerGrid :{
        marginLeft : "8px",
        marginTop: "24px"
    }
});