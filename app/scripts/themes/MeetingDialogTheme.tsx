import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GREY_1, COLOR_WHITE } from "../constant/Colors";

/**Theme for the scroll bar */
export const MeetingDialogStyles = makeStyles((theme: any) => ({

    selectIcon: {
        top: "4px",
        right: "7px"
    },

    HeadingClass: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: "#22262A",
        padding: "0",
        margin: "0"
    },
    DateFieldClass: {
        width:"160px"
    },
    DurationFieldClass: {
        width:"70px"
    },
    TopicTypeFieldClass: {
        width:"395px"
    },
    MeetingTypeFieldClass: {
        width:"272px"
    },
    SuffixGridClass: {
        marginTop: "15px",
        padding: 0
    },
    SuffixClass: {
        fontSize: "12px",
        color: "#444B53",
        display:"inline"
    },
    TimeFieldClass: {
        width:"120px"
    },
    ErrorMessageClass: {
        fontSize:"10px",
        color:"#DB2436",
        fontWeight: 'bold',
        margin:"0px 8px"
    },
    DropDownIconClass: {
        color: "#444B53",
        fontSize: "22px"
    },
    DividerClass: {
        margin: '0'
    },
    LoadingIconClass: {
        color: "white",
        marginLeft: "8px"
    },
    CancelIconClass: {
        flexBasis: "auto"
    },
    DialogContentClass: {
        paddingRight: "12px"
    },
    GridContainerClass: {
        flexWrap: "nowrap"
    },
    addMeetingSelectDropdown: {
        backgroundColor:COLOR_WHITE, 
        paddingTop: "5px", 
        paddingRight: "5px",
        color: COLOR_GRAPHITE_1, 
        paddingLeft: "12px", 
        borderColor: COLOR_GREY_1,
        borderRadius: "4px",
        boxSizing: "border-box",
        borderStyle: "solid",
        borderWidth: "1px"
    },
    presenterDropdownGridClass: {
        width: "97%"
    }
    
}));