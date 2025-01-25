import { makeStyles } from "@material-ui/core";
import { COLOR_DARK_YELLOW, COLOR_GRAPHITE_5, COLOR_WHITE, COMPLETED_COLOR, IDEATION_COLOR, SCHEDULED_COLOR } from "../../../../constant/Colors";

const overallScoreCard = {
    height: "100%",
    width: "100%",
};

const overallDivider = {
    marginLeft: "0",
    height: "50px",
    marginRight: "25px"
};

const OTDDivider = {
    ...overallDivider,
    background: COLOR_DARK_YELLOW,
}

const overallHeadingGrid = {
    width: "45%",
    fontWeight: 500
}

export const OverallScoreCardStyle = makeStyles(({
    OTDCard: {
        ...overallScoreCard,
        backgroundColor: IDEATION_COLOR,
        color: COLOR_DARK_YELLOW,
        textAlign: "center"
    },
    completedCard: {
        ...overallScoreCard,
        backgroundColor: COLOR_WHITE,
        color: COMPLETED_COLOR,
        textAlign: "center"
    },
    notCompleted: {
        ...overallScoreCard,
        backgroundColor: COLOR_WHITE,
        color: SCHEDULED_COLOR,
        textAlign: "center"
    },
    businessGoal: {
        ...overallScoreCard,
        backgroundColor: COLOR_WHITE,
        color: COLOR_GRAPHITE_5,
        textAlign: "center"
    },
    cardValue: {
        fontSize: "32px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    cardContent: {
        height: "50%",
        padding: "0px",
        width: "100%"
    },
    iconGridContainer: {
        width: "100%",
        padding: "5px",
        display: "inline-flex",
        alignItems: "center"
    },
    headingGrid: {
        ...overallHeadingGrid,
        fontSize: "16px",
        overflowWrap: "break-word",
        textAlign: "left",
    },
    OTDHeadingGrid: {
        ...overallHeadingGrid,
        width: "30%",
        fontSize: "32px",
        overflowWrap: "break-word",
        textAlign: "center",
    },
    iconGrid: {
        textAlign: "right",
    },
    OTDDivider: {
        ...OTDDivider,
        marginLeft: "14px",
        marginRight: "22px"
    },
    OTDDivider1: {
        ...OTDDivider,
        marginLeft: "11px",
        marginRight: "19px"

    },
    OTDDivider2: {
        ...OTDDivider,
        marginLeft: "5px",
        marginRight: "6px"
    },
    completedDivider: {
        ...overallDivider,
        background: COMPLETED_COLOR
    },
    notCompletedDivider: {
        ...overallDivider,
        background: SCHEDULED_COLOR
    },
    businessGoalDivider: {
        ...overallDivider,
        background: COLOR_GRAPHITE_5
    }
}));