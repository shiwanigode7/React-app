import { makeStyles } from "@material-ui/styles";

export const ThumbnailWithNameStyles = makeStyles({
    thumbnailWithNameContainer: {
        display: "flex",
        flexFlow: "noWrap",
        alignItems: "center",
        overflow : "hidden",
        textOverflow : "ellipsis", 
        whiteSpace : "initial"
    }
});