import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_5 } from "../../../../constant/Colors";

export const HealthStyles = makeStyles({
    avatar: {
        height: "24px",
        width: "24px",
        fontSize: "12px",
        border: `${COLOR_GRAPHITE_5} solid 1px`,
        margin: "2px",
        "&:hover": {
            fontSize: "13px",
            fontWeight: "bold",
        }
    }
});