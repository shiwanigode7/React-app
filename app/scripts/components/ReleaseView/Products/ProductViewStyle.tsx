import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_3 } from "../../../constant/Colors";

export const ProductViewStyle = makeStyles({
    filterMenu: {
        position: "absolute"
    },
    productsGrid: {
        transition: "300ms",
        padding: "24px",
        paddingLeft: "48px",
        width: "100vw",
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
    rootContainer: {
        width: "100vw"
    }
});
