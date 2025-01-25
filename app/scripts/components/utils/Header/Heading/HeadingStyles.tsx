import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1 } from "../../../../constant/Colors";

export const HeadingStyles = makeStyles(({
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1
    },
    subHeading: {
        fontWeight: 400
    }
}));