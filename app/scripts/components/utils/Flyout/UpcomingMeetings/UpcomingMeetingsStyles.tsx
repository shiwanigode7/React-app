import { makeStyles } from "@material-ui/styles";
import { COLOR_AZURE_1, COLOR_AZURE_2, IDEATION_COLOR } from "../../../../constant/Colors";

const MEETINGS_LIST_FONT_SIZE: string = "14px";

export const UpcomingMeetingsStyles = makeStyles({
    upcomingMeetingInfoGridItem: {
        border: `${IDEATION_COLOR} solid 2px`,
        borderRadius: "10px",
        padding: "10px",
        width: "200px",
        overflowWrap: "break-word"
    },
    meetingsListGridContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "200px",
        paddingTop: "0px"
    },
    meetingDateGridItem: {
        fontSize: MEETINGS_LIST_FONT_SIZE
    },
    meetingTypeGridItem: {
        fontWeight: "bold",
        fontSize: MEETINGS_LIST_FONT_SIZE
    },
    linkGridItem: {
        width: "200px"
    },
    linkLabel: {
        color: COLOR_AZURE_1,
        fontSize: "small",
        textDecoration: "underline",
        "&:hover, &.Mui-focusVisible": { color: COLOR_AZURE_2 }
    },
    linkRoot: {
        padding: "0px"
    },
    loadingIcon: {
        color: "white",
        marginLeft: "85px",
        height: "30px",
        width: "30px"
    },
});