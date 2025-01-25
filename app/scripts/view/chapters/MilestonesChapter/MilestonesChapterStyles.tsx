import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_1 } from "../../../constant/Colors";

const deleteButton: Object = {
    width: "24px",
    height: "24px"
}

export const MilestonesChapterStyles = makeStyles(() => ({
    milestoneChapterContainer: {
        borderTop: "20px",
        paddingTop: "20px"
    },
    milestones: {
        marginBottom: "5px",
        padding: "1px",
        display: "inline",
        maxHeight: "300px",
        overflowY: "auto"
    },
    milestoneRow: {
        display: "flex",
        width: "100%"
    },
    milestoneInputFieldContainer: {
        width: "calc(100% - 55px)",
        paddingTop: "inherit"
    },
    deleteButtonContainer: {
        margin: "0px 0px 0px 7px"
    },
    enabledDeleteButton: {
        ...deleteButton
    },
    disableDeleteButton: {
        ...deleteButton,
        color: COLOR_GREY_1
    },
    addMilestoneButton: {
        fontWeight: "bold"
    }
}));