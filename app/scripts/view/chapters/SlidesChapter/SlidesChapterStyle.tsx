import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_GRAPHITE_2, COLOR_LIGHT, COLOR_MATERIAL_UI_BLUE, COLOR_WHITE } from "../../../constant/Colors";

export const SlidesChapterStlyes = makeStyles(() => ({
    addButton: {
        backgroundColor: COLOR_AZURE_2,
        color: COLOR_LIGHT,
        boxShadow: "none",
        "&:hover": {
            backgroundColor: COLOR_MATERIAL_UI_BLUE,
            color: COLOR_LIGHT,
            boxShadow: "none"
        }
    },
    slidesGrid: {
        margin: "8px",
    },
    icon: {
        padding: "0px",
        minWidth: "32px"
    },
    slideChip: {
        backgroundColor: COLOR_WHITE
    },
    listItemIcon: {
        minWidth: "32px"
    },
    listItem: {
        paddingLeft: "4px"
    },
    slidesContainer: {
        paddingTop: "20px"
    },
    chipDeleteIcon: {
        color: COLOR_GRAPHITE_2,
        height: "18px"
    },
    chipLabel: {
        paddingLeft: "5px",
        fontSize: "15px"
    }
}))