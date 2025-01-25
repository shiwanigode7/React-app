import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_3, COLOR_GRAPHITE_4, COLOR_RED_2 } from "../../../constant/Colors";

export const GeneralChapterStyles = makeStyles(() => ({
    fieldLabelTypography: {
        fontSize: "12px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1,
        padding: "0px",
        margin: "0px"
    },
    fieldLabelSpanTag: {
        color: COLOR_RED_2,
        display: "inline",
        fontSize: "12px"
    },
    fieldDescriptionTypography: {
        fontSize: "12px",
        color: COLOR_GRAPHITE_4,
        padding: "0px",
        margin: "0px"
    },
    selectDownArrowIcon: {
        color: COLOR_GRAPHITE_3,
        fontSize: "22px"
    },
    textarea: {
        resize: "vertical",
        minHeight: "50px",
        maxHeight: "100px",
        padding: "4px 7px 4px 7px"
    },
    fieldRootGridItem: {
        display: "inline-flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "100%"
    },
    fieldGridItem: {
        width: "48%"
    },
    textField: {
        width: "100%"
    },
    tooltip: {
        fontSize: "10px"
    }
}));
