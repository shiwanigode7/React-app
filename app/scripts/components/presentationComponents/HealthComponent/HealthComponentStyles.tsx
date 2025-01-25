import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GREY_3, COLOR_GREY_AVATAR, COLOR_WHITE, COMPLETED_COLOR, IDEATION_COLOR, SCHEDULED_COLOR } from "../../../constant/Colors";

const commonChipStyles = {
    fontSize: "75%",
    width: "100%",
    padding: "0px"
}
export const HealthComponentStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelStyles: {
        paddingLeft: "1px",
        paddingRight: "1px",
        width: "100%",
        textAlign: "center"
    },
    cardRoot: {
        width: "100%",
        height: "100% ",
    },
    ipGrid: {
        width: "calc(20% - 16px)",
    },
    bgCaseGrid: {
        width: "calc(20% + 20px)"
    },
    resourcesGrid: {
        width: "calc(20% - 4px)",
    },
    cardContent: {
        width: "96%",
        marginTop: "10px"
    },
    itemGrid: {
        width: "calc(20% - 10px)",
    },
    cardHeaderStyles: {
        fontWeight: "bold",
        paddingTop: "5px"
    },
    chip: {
        ...commonChipStyles,
        color: COLOR_GRAPHITE_2,
    },
    chipOk: {
        ...commonChipStyles,
        color: COLOR_WHITE,
        background: COMPLETED_COLOR
    },
    chipAtRisk: {
        ...commonChipStyles,
        color: COLOR_GRAPHITE_2,
        background: IDEATION_COLOR
    },
    chipNotOk: {
        ...commonChipStyles,
        color: COLOR_WHITE,
        background: SCHEDULED_COLOR
    },
    chipNotApplicable: {
        ...commonChipStyles,
        color: COLOR_GRAPHITE_2,
        background: COLOR_GREY_AVATAR
    },
    chipNoStatus: {
        ...commonChipStyles,
        color: COLOR_GRAPHITE_2,
        background: COLOR_GREY_3,
        border: "0.1px solid",
        borderColor: COLOR_GREY_AVATAR
    }
})