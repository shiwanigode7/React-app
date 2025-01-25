import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../../constant/Colors";

const TEXT_AREA: Object = {
    resize: "vertical",
    minHeight: "50px",
    width: "100%",
    padding: "4px 7px 4px 7px"
};

export const ProductEditCardContentStyle = makeStyles(({
    cardContentContainer : {
        fontSize : "12px"
    },
    descriptionGrid : {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    descriptionTextArea: {
        ...TEXT_AREA,
        maxHeight: "150px"
    },
    moreDetailsTextArea: {
        ...TEXT_AREA,
        maxHeight: "500px"
    },
    headings : {
        fontWeight : "bold",
        fontSize: "12px",
        whiteSpace: "nowrap",
        width: "30%",
        overflow: "hidden",
        textOverflow: "ellipsis"
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
        width: "100%",
        minHeight: "32px",
        wordBreak: "break-all"
    },
    heroFeaturesList: {
        margin: "0px",
        padding: "0px 0px 0px 25px"
    },
    milestonesAccordianGrid : {
        height : "fit-content",
        marginBottom: "4px"
    } 
}))