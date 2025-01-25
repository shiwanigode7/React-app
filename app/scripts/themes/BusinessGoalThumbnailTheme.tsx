import { makeStyles } from "@material-ui/core";

/**Styling declaration */
export const BusinessGoalThumbnailStyles = makeStyles(() => ({
    avatar: {
        width: "12vw",
        height:"12vw", //vw is given for height to make sure the avatar remains circular
        minHeight: "150px",
        minWidth: "150px"
    }
}));