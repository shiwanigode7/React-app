import { makeStyles } from "@material-ui/styles";

export const TextWithTooltipStyles = makeStyles({
    text: {
        margin: "0",
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 1,
        wordBreak: "break-all",
        overflow: "hidden",
        fontSize: "inherit",
        fontFamily: "inherit"
    }
});