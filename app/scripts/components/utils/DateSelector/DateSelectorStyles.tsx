import { makeStyles } from "@material-ui/core";

export const DateSelectorStyles = makeStyles({
    date: {
        fontSize: "large",
        width: "auto",
        marginTop: "2px"
    },
    downArrow: {
        marginLeft: "10px",
        padding: "0px",
        marginTop: "-10px",
    },
    arrowSize: {
        fontSize: "1.7rem",
        padding: "0px"
    },
    upArrow: {
        marginLeft: "10px",
        padding: "0px",
        marginTop: "-2px",
        marginBottom: "-3px"
    },
    arrowGrid: {
        display: "flex",
        flexDirection: "column",
        color: "grey",
        marginTop: "-2px"
    },
    textGrid: {
        paddingLeft: "5px",
        width: "110px"
    },
    iconStyle: {
        color: 'grey',
        fontSize: "35px"
    }
});