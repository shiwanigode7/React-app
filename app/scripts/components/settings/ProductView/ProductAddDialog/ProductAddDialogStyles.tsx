import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_GRAPHITE_3, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_3, COLOR_MATERIAL_UI_BLUE, COLOR_WHITE } from "../../../../constant/Colors";

export const ProductAddDialogStyles = makeStyles(() => ({
    dialog: {
        width: "400px"
    },
    dialogTitle: {
        padding: "8px 24px",
        background: COLOR_GREY_3,
        borderRadius: "8px 8px 0px 0px"
    },
    dialogCancelButton: {
        backgroundColor: COLOR_WHITE,
        textTransform: "none",
        fontWeight: 700,
        color: COLOR_GRAPHITE_2,
        border: `1px solid ${COLOR_GREY_1}`,
        "&:hover": {
            backgroundColor: COLOR_GREY_2
        }
    },
    dialogSubmitButton: {
        backgroundColor: COLOR_AZURE_2,
        textTransform: "none",
        fontWeight: 700,
        "&:hover": {
            backgroundColor: COLOR_MATERIAL_UI_BLUE
        }
    },
    dialogTitleText: {
        fontSize: "16px",
        fontWeight: 700,
        color: COLOR_GRAPHITE_1
    },
    dialogCrossIconButton: {
        color: COLOR_GRAPHITE_3,
        padding: "4px 0px"
    },

    dialogContentContainerGrid: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },

    thumnailGrid: {
        width: "30%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },

    productNameAndManagerSubGrid: {
        width: "100%",
        height: "100%",
        marginBottom: "8px"
    },

    productNameAndManagerGrid: {
        width: "70%",
        height: "100%"
    },

    label: {
        fontSize: "14px",
        fontWeight: "bold"
    },

    labelSpan: {
        color: "#DB2436",
        display: "inline",
        fontSize: "12px"
    },
    circularProgress: {
        color: "white",
        marginLeft: "8px"
    }
}));