import { makeStyles } from "@material-ui/core";
import images from "../../../Icons/images";

export const PPLViewStyles = makeStyles({

    filterMenu: {
        position: "absolute"
    },
    pplGridItem: {
        transition: "150ms",
        marginTop: "12px",
        position: "fixed"
    },
    pplGridRoot: {
        width: "100%",
    },
    pplViewBox: {
        marginRight: "10px"
    },
    pplBodyContainer: {
        marginLeft: "8px",
        flexWrap: "nowrap",
        width: "auto",
        display: "block",
        marginRight: "10px"
    },
    name: {
        // marginLeft: "-10px"
    },
    thumbnail: {
        borderRadius: "6px",
        alignItems: "flex-start",
        width: "30px",
        height: "30px",
        marginLeft: "-16px",
        backgroundImage: images.EskoStarPng
    },
    tableWrapperContainer: {
        height: "100vh",
        marginTop: "20px",
        width: "100%"
    },
    statusHeader: {
        width: "80%",
        justifyContent: "center",
        display: "inline-flex"
    }
});