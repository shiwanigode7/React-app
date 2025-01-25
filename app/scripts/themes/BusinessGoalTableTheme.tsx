
/**TSX file defining style to BusinessGoalTable */
import { makeStyles } from "@material-ui/styles";
import images from "../../Icons/images";

export const BusinessGoalTableStyle = makeStyles(() => ({
    thumbnail : { 
        alignItems:"flex-start",
        width: "30px",
        height:"30px",
        marginLeft:"-16px",
        backgroundImage: images.EskoStarPng
    },
    name : {
        marginLeft:"-10px"
    },
    statusHeader : {
        width : "80%",
        justifyContent : "center",
        display: "inline-flex"
    }
}));