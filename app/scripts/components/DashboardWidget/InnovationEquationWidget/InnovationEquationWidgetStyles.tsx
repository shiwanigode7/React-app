import { makeStyles } from "@material-ui/core";
import { COLOR_WHITE } from "../../../constant/Colors";

export const InnovationEquationWidgetStyle = makeStyles(()=>({
    LoadingIconClass: {
        color: COLOR_WHITE
    },
    LoadingIconDivClass: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
    },
    innovationEquationDivClass: {
        display: "flex",
        alignItems: "center"
    },
    innovationEquationValueClass: {
        fontWeight: "bold",
        fontSize: "26px"
    },
    innovationEquationClass: {
        fontWeight: "lighter",
        fontSize: "19px"
    },
    innovationEquationFormulaClass: {
        fontSize: "12px", 
        marginTop: "12px"
    }
}));