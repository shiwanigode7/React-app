import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../../constant/Colors";
export const ProductCardViewContentStyle = makeStyles(({
    cardContentContainer : {
        fontSize : "12px"
    },
    descriptionGrid : {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    mileStoneGrid : {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    moreDetailsGrid : {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    headings : {
        fontWeight : "bold",
        fontSize: "12px",
        whiteSpace: "nowrap",
        marginBottom: "4px",
        overflow: "hidden"
    },
    description : {
        fontSize: "12px"
    },
    tooltip: {
        background: COLOR_GRAPHITE_5,
        color: COLOR_WHITE,
        fontSize: "14px",
        margin: "0px",
        maxWidth: "55%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    },
    tooltipPopper: {
        maxWidth: "55%",
        whiteSpace: "nowrap"
    },
    descriptionTypography: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "12px",
        paddingRight: "12px",
        minHeight: "32px",
    },
    moredetialsTypography: {
        fontSize: "12px",
        paddingRight: "12px"
    },
    heroFeaturesList: {
        margin: "0px",
        padding: "0px 12px 0px 25px"
    }
}))