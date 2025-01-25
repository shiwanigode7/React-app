import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5 } from "../../../constant/Colors";

export const BottomWidgetStyles = makeStyles(() => ({
    cardRoot: {
        height: "100%"
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "bold"
    },
    headerGrid: {
        margin: "0% 3%"
    },
    divider: {
        backgroundColor: COLOR_GRAPHITE_5,
        opacity: "0.3"
    },
    cardContentGrid: {
        width: "100%",
        height: "75%",
        display: "flex",
        justifyContent: "space-between"
    },
    cardContetntGridItem: {
        width: "95%",
        marginLeft: "3%",
        display: "flex",
        justifyContent: "space-between"
    }
}));