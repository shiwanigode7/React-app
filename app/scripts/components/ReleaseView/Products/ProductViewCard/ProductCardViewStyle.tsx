import { makeStyles } from "@material-ui/core";

export const ProductCardViewStyle = makeStyles(({
    CardClass: {
        height: "100%"
    },
    cardContent: {
        maxHeight: "140px",
        overflow: "auto",
        wordBreak: "break-all",
        paddingTop: "0px !important"
    },
}))