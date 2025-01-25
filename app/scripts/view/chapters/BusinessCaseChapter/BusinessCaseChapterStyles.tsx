import { makeStyles } from "@material-ui/styles";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_5 } from "../../../constant/Colors";

const labelGridItemWidth: string = "23%";
const ALIGN_CONTENT_CENTER: Object = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const BusinessCaseChapterStyles = makeStyles({
    accordionDetails: {
        padding: "8px 16px 16px 16px"
    },
    infoTitle:{
        fontWeight: "bold",
        fontSize: "17px"
    },
    infoIcon:{
        color: "#15c1f1",
        fontSize: "26px"
    },
    fourSections: {
        padding: "30px"
    },
    titleGridItem: {
        margin: `0px 0px 0px ${labelGridItemWidth}`,
        padding: "4px 0px"
    },
    labelGridItem: {
        width: labelGridItemWidth,
        ...ALIGN_CONTENT_CENTER,
        justifyContent: "right",
    },
    subLabelGridItem: {
        ...ALIGN_CONTENT_CENTER
    },
    textFieldGridItem: {
        width: "13%",
        ...ALIGN_CONTENT_CENTER
    },
    calculatedFieldGridContainer: {
        justifyContent: "space-between"
    },
    yearGridItem: {
        ...ALIGN_CONTENT_CENTER
    },
    calculatedValueGridItem: {
        ...ALIGN_CONTENT_CENTER,
        paddingRight: "7%"
    },
    year: {
        fontSize: "12px",
        color: COLOR_GRAPHITE_5
    },
    calculatedValue: {
        fontSize: "14px",
        color: COLOR_GRAPHITE_1
    },
    calculatedNegativeValue: {
        fontSize: "14px",
        color: "red"
    },
    unitGridItem: {
        ...ALIGN_CONTENT_CENTER
    },
    unit: {
        fontSize: "12px",
        color: COLOR_GRAPHITE_5
    },
    withoutSAWithArrowsInputFieldGridItem: {
        width: "10%",
        minWidth: "85px",
        ...ALIGN_CONTENT_CENTER
    },
    boldText: {
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1
    },
    fieldWithSAAndArrow: {
        width: "10%"
    },
    multiSelectGridItem: {
        width: "65%"
    },
    calculatedValueContainer: {
        padding: "1% 0px"
    }
});