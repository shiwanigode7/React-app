import { makeStyles } from "@material-ui/core";

export const ProductViewStyles = makeStyles(()=>({
    rootGridContainer: {
        minWidth: "700px",
        width: "100%",
        height: "100%"
    },

    tableGrid: {
        width: "100%",
        height: "90%",
        marginLeft: "-10px"
    },

    headerGrid:{
        width: "100%",
        height: "5%",
        margin : "10px"
    },
    circularLoading: {
        color: "black",
        position: "absolute",
        left: "45%",
        top: "40%",
        zIndex: 1
    }
}));