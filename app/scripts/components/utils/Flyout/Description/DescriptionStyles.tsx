import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../constant/Colors";

export const DescriptionStyles = makeStyles({
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
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "12px",
        marginTop: "-4px",
        wordBreak: "break-all"
    },
    releaseDateHeading: {
        fontWeight: "bold",
        marginTop: "8px",
        fontSize: "12px"
    },
    releaseDate: {
        fontSize: "12px"
    },
});