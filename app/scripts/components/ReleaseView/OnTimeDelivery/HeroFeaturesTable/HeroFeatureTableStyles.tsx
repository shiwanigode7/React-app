import { makeStyles } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GREY_1, COLOR_WHITE, COMPLETED_COLOR, SCHEDULED_COLOR } from "../../../../constant/Colors";

export const HeroFeatureTableStyle = makeStyles(({
    paperStyles: {
        margin: "10px 0px",
        padding: "0"
    },
    tableDiv: {
        height: "100vh"
    },
    avatarSmall: {
        height: "40px",
        width: "40px"
    },
    divWrapper: {
        display: "flex !important",
        alignItems: "center !important"
    },
    completedIcon: {
        color: `${COMPLETED_COLOR} !important`,
        fontSize: "20px !important",
        marginRight: "2px !important"
    },
    incompleteIcon: {
        color: `${SCHEDULED_COLOR} !important`,
        fontSize: "20px !important",
        marginRight: "2px !important"
    },
    countChip: {
        backgroundColor: `${ACTIVE_COLOR} !important`,
        height: "16px !important",
        marginLeft: "5px !important",
        color: `${COLOR_WHITE} !important`
    },
    productManagersGrid: {
        margin: "4px 0px",
        fontSize: "12px"
    },
    multipleAvatar: {
        backgroundColor: `${COLOR_GREY_1} !important`
    },
    typographyStyle: {
        fontSize: "14px !important"
    },
    columnHeaderTypography: {
        fontSize: "14px !important",
        fontWeight: "bold"
    },
    textToolTip: {
        display: "flex",
        flexFlow: "noWrap",
        alignItems: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "initial"
    }
}))