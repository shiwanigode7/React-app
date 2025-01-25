import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1 } from "../../../../../constant/Colors";

export const MileStoneAccordionStyle = makeStyles(({
    businessGoalStyle :{
        fontSize: '16px', 
        fontWeight: 'bold', 
        color: COLOR_GRAPHITE_1 
    },
    accordionDetail: {
        display: "flex",
        flexDirection: "column"
    }
}))