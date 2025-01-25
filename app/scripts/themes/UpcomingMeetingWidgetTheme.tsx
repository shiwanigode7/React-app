import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE } from "../constant/Colors";

/**Theme for Upcoming Meetings Widget */
export const UpcomingMeetingWidgetStyles = makeStyles((theme: any) => ({
    ListClass: {
        padding: "0"
    },
    ListItemClass: {
        paddingLeft: "0px"
    },
    MeetingDateClass: {
        marginRight:"-14px"
    },
    NoMeetingsMessageClass: {
        textAlign: "center"
    },
    LoadingIconClass: {
        color: COLOR_WHITE
    },
    LoadingIconDivClass: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
    }
}));