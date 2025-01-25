import { makeStyles } from "@material-ui/core";

export const BusinessGoalCardViewStyles = makeStyles(({
    CardClass: {
        height: "100%"
    },
    cardContent: {
        maxHeight: "140px",
        marginTop: "6px",
        overflow: "auto",
        wordBreak: "break-all",
        marginRight: "4px",
        paddingTop: "0px !important"
    },
    cardContentGrid: {
        height: "100%",
        flexWrap: "nowrap"
    }
}));