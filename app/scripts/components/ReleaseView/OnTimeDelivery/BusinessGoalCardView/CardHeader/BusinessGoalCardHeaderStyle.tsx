import { makeStyles } from "@material-ui/core";

export const ProductCardViewHeaderStyle = makeStyles(({
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 5px 0px 5px"
    },
    avatar: {
        padding: "8px",
        width : "auto"
    },
    businessGoalName: {
        fontSize: "14px",
        fontWeight: 500,
        maxWidth: "356px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    businessGoalNameFlyOutClosed: {
        fontSize: "14px",
        fontWeight: 500,
        maxWidth: "472px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    coreTeamGrid: {
        margin: "4px 0px",
        fontSize: "12px"
    },
    avatarGrid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
}));