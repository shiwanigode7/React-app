import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../constant/Colors";

const headingGrid = {
    width: "32%",
    fontWeight: 500,
    fontSize: "16px",
};

const gridContainer = {
    width: "100%",
    padding: "5px",
    display: "inline-flex",
    alignItems: "center"
};

const cardValue = {
    display: "flex",
    justifyContent: "center",
    color: `${COLOR_GRAPHITE_1}`
};

export const IPVWidgetCardsStyles = makeStyles(({
    ipvWidgetsGrid: {
        justifyContent: "space-between",
        display: "flex",
        marginTop: "26px"
    },
    quarterWidget: {
        width: "54%"
    },
    quarterGridContainer: {
        width: "20%",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "flex-start"
    },
    quarterValueContainer: {
        width: "75%",
        alignItems: "center"
    },
    ipvWidget: {
        width: "21%"
    },
    quarterWidgetContainer: {
        ...gridContainer,
        justifyContent: "space-evenly"
    },
    ipvGridContainer: {
        ...gridContainer,
        marginTop: "6px",
        justifyContent: "space-evenly"
    },
    ipvCard: {
        height: "100%",
        width: "100%",
        backgroundColor: COLOR_WHITE,
        color: COLOR_GRAPHITE_5,
        textAlign: "center"
    },
    cardValue1: {
        ...cardValue,
        fontSize: "32px",
        fontWeight: "bold",
        flexDirection: "column"
    },
    cardValue2: {
        ...cardValue,
        fontSize: "26px",
        fontWeight: "bold",
        flexDirection: "column"
    },
    cardValue3: {
        ...cardValue,
        fontSize: "18px",
        fontWeight: "bold",
        flexDirection: "column"
    },
    quarterHeadingGrid: {
        ...headingGrid,
        textAlign: "center"
    },
    ipvHeadingGrid: {
        ...headingGrid,
        textAlign: "center",
        color: COLOR_GRAPHITE_1
    },
    ipvDivider: {
        marginLeft: "0",
        height: "50px",
        marginRight: "0"
    }
}));