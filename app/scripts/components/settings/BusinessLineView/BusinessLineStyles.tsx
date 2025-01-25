import { makeStyles } from "@material-ui/core";

export const BusinessLineStyles = makeStyles(()=>({
    rootGridContainer: {
        minWidth: "700px",
        width: "100%",
        height: "100%"
    },

    tableGrid: {
        width: "auto",
        height: "90%",
        marginLeft: "-20px",
        padding : "10px",
        marginRight : "23px"
    },

    headerGrid:{
        width: "auto",
        marginRight : "53px",
        height: "5%",
        marginLeft : "8px"
    },

    circularLoading: {
        color: "black",
        position: "absolute",
        left: "45%",
        top: "40%",
        zIndex: 1
    },
}));