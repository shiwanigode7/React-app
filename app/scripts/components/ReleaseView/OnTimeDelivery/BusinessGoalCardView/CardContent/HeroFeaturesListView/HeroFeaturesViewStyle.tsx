import { makeStyles } from "@material-ui/core";
import { COLOR_BLACK, COLOR_EMERALD_2, COLOR_GRAPHITE_5, COLOR_WHITE, SCHEDULED_COLOR } from "../../../../../../constant/Colors";

const milestone = {
    width: "fit-content",
    height: "fit-content",
    fontSize: "14px",
    margin: "0px",
    padding: "4px",
    color: COLOR_WHITE
};

export const HeroFeatureListViewStyle = makeStyles(({
    milestoneNameGrid: {
        display: "inline-flex",
        alignItems: "center"
    },
    defaultMilestone: {
        ...milestone,
        background: COLOR_GRAPHITE_5,
    },
    productChip: {
        maxWidth: "235px",
        height: "20px",
        textAlign: "left",
        whiteSpace: "nowrap",
        textOverflow: "ellipse",
        overflow: "hidden",
        marginLeft: "4px",
        marginRight: "6px",
        minWidth: "90px",
        color: COLOR_BLACK
    },
    completeMilestone: {
        ...milestone,
        background: COLOR_EMERALD_2
    },
    incompleteMilestone: {
        ...milestone,
        background: SCHEDULED_COLOR,
    },
    heroFeatureRootGrid: {
        display: "inline-flex",
        flexWrap: "nowrap",
        alignItems: "center",
        marginTop: "4px",
        marginLeft: "4px"
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
    heroFeatureName: {
        fontSize: "12px",
        whiteSpace: "nowrap",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    heroFeatureNameGrid: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center"
    },
    checkBox: {
        padding: 0
    }
}));