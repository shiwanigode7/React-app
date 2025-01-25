import { makeStyles } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_EMERALD_2, COLOR_GRAPHITE_5, COLOR_GREY_1, COLOR_WHITE, SCHEDULED_COLOR } from "../../../../../../constant/Colors";

const milestone = {
    width: "fit-content",
    height: "fit-content",
    fontSize: "14px",
    margin:  "4px",
    padding: "4px",
    color: COLOR_WHITE
}

export const MileStoneAccordionDetailsStyle = makeStyles(({
    displayText: {
        marginRight: "auto",
        marginLeft: "6px"
    },
    milestoneRow: {
        display: "flex",
        width: "100%"
    },
    milestoneNameGrid :{
        display: "inline-flex" ,
        alignItems : "center"
    },
    heroFeatureInputFieldContainer: {
        width: "94%",
        paddingTop: "inherit"
    },
    milestones: {
        marginBottom: "5px",
        padding: "1px",
        display: "inline",
        maxHeight: "300px",
        overflowY: "auto"
    },
    
    // Styling for the milestone chip
    defaultMilestone: {
        ...milestone,
        background :  COLOR_GRAPHITE_5,
    },
    
    completeMilestone: {
        ...milestone,
        background : COLOR_EMERALD_2
    },

    incompleteMilestone: {
        ...milestone,
        background : SCHEDULED_COLOR,

    },

    // Styling for the delete icon
    deleteButtonGrid: {
        display: "inline-flex",
        alignSelf: "flex-start"
    },
    deleteButton: {
        padding: "8px",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    deleteSVG: {
        fontSize: "24px"
    },

    heroFeatureRootGrid: {
        display: "inline-flex", 
        flexWrap: "nowrap",
        justifyContent: "space-around"
    },

    tooltip: {
        fontSize: "10px"
    },

    // Styling for the check box
    checkbox: {
        color: `${COLOR_AZURE_2} !important`,
        padding: 0,
    },
    svgRootChecked: {
        color: COLOR_AZURE_2,
        fontSize: "36px"
    },
    svgRootUnchecked: {
        color: COLOR_GREY_1,
        fontSize: "36px"
    }
}))