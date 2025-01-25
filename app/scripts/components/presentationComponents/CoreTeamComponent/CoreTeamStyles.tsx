import { makeStyles } from "@material-ui/core";

export const CoreTeamStyles = makeStyles(() => ({
    cardRoot: {
        height: "100%"
    },
    cardHeaderStyles: {
        fontWeight: "bold",
        paddingTop: "5px"
    },
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        },
        height: "82%"
    },
    typographyUnassigned: {
        fontSize: " 13px",
        fontStyle: "italic",
        marginTop: "6px",
        paddingLeft: "10px"
    },
    typographyTeam: {
        fontSize: "13px",
        paddingLeft: "10px"
    },
    typographyNames: {
        fontSize: "13px",
        fontWeight: "bold",
        marginTop: "6px",
        paddingLeft: "10px"
    },
    rootGrid: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: "15px",
        paddingBottom: "12px",
        height: "100%"
    },
    avatarStyles: {
        width: "20%"
    },
    columnFlex: {
        display: "flex",
        width: "50%",
        flexDirection: "column"
    },
    rowFlex: {
        display: "flex",
        flexDirection: "row",
        height: "33.33%",
        width: "100%"
    },
    textGrid: {
        display: "flex",
        width: "80%",
        flexDirection: "column"
    },
    marketingGrid: {
        display: "flex",
        flexDirection: "row",
        height: "33.33%",
        width: "100%"
    },
    secondColumnGrid:
    {
        display: "flex",
        flexDirection: "column",
        width: "50%",
    }
}));