import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_GREY_1, COLOR_GREY_2, COLOR_GREY_3, COLOR_LIGHT, COLOR_MATERIAL_UI_BLUE } from "../../constant/Colors";

export const BusinessGoalEditDialogStyle = makeStyles(() => ({
    bgName: {
        fontSize: "16px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1
    },
    dialogTitle: {
        backgroundColor: COLOR_GREY_3
    },
    dialog: {
        height: "100vh"
    },
    dialogContent: {
        height: "700px"
    },
    closeIcon: {
        color: "black"
    },
    iconButton: {
        position: "absolute",
        right: 8,
        top: 8
    },
    divider: {
        margin: 0
    },
    deleteButton: {
        color: COLOR_GRAPHITE_2,
        border: "1px solid",
        padding: "5px 15px",
        borderColor: COLOR_GREY_1,
        backgroundColor: COLOR_LIGHT,
        boxShadow: "none",
        "&:hover": {
            borderColor: COLOR_GREY_2,
            backgroundColor: COLOR_GREY_2
        }
    },
    saveButton: {
        backgroundColor: COLOR_AZURE_2,
        color: COLOR_LIGHT,
        boxShadow: "none",
        "&:hover": {
            backgroundColor: COLOR_MATERIAL_UI_BLUE,
            color: COLOR_LIGHT,
            boxShadow: "none"
        }
    }
}))