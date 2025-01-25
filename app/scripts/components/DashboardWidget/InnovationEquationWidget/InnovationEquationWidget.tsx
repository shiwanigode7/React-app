import { CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { INNOVATION_EQUATION_FORMULA, INNOVATION_EQUATION_HEADING, LAST_QUARTER_WIDGET_SIDE_HEADING } from "../../../constant/DashboardViewTexts";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import InnovationEquationService from "../../../services/service/InnovationEquationService";
import CardWidget from "../../../view/DashboardWidgets/CardWidget";
import { InnovationEquationWidgetStyle } from "./InnovationEquationWidgetStyles";

export default function InnovationEquationWidget() {

    const InnovationEquationWidgetStyleClasses = InnovationEquationWidgetStyle();

    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);

    const [innovationEquationValue, setInnovationEquationValue] = useState<string>("");

    const [innovationEquation, setInnovationEquation] = useState<string>("");

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    useEffect(() => {
        setShowLoadingIcon(true);
        InnovationEquationService.getInnovationEquationForLastQuarter(lInnovationData.eskoAccountDetail.repoid)
            .then((innovationEquationResponse: string) => {
                console.log(innovationEquationResponse);
                setInnovationEquationValue(innovationEquationResponse.split("=")[0]);
                setInnovationEquation("= " + innovationEquationResponse.split("=")[1]);
                setShowLoadingIcon(false);
            })
            .catch((innovationEquationError: any) => {
                console.log(innovationEquationError);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.OTDUpdated, lNodeEventData.IPVUpdated, lNodeEventData.RAUpdated]);

    /**Innovation Equation content to be displayed */
    const INNOVATION_EQUATION_COMPONENT = <div>
        <div className={InnovationEquationWidgetStyleClasses.innovationEquationDivClass}>
            <Typography className={InnovationEquationWidgetStyleClasses.innovationEquationValueClass}>{innovationEquationValue}</Typography>
            <Typography>&nbsp;</Typography>
            <Typography className={InnovationEquationWidgetStyleClasses.innovationEquationClass}>{innovationEquation}</Typography>
        </div>
        <Typography className={InnovationEquationWidgetStyleClasses.innovationEquationFormulaClass}>{INNOVATION_EQUATION_FORMULA}</Typography>
    </div>

    /**Loading icon component */
    const CIRCULAR_LOADING_COMPONENT = <div className={InnovationEquationWidgetStyleClasses.LoadingIconDivClass}>
        <CircularProgress className={InnovationEquationWidgetStyleClasses.LoadingIconClass} />
    </div>

    /**Component to be displayed in Card */
    const CARD_DISPLAY_CONTENT = showLoadingIcon ? CIRCULAR_LOADING_COMPONENT : INNOVATION_EQUATION_COMPONENT;

    const CARD_SIDE_HEADING = <Typography>{LAST_QUARTER_WIDGET_SIDE_HEADING}</Typography>

    return (
        <CardWidget
            cardHeading={INNOVATION_EQUATION_HEADING}
            cardContent={CARD_DISPLAY_CONTENT}
            cardSideHeadingComponent={CARD_SIDE_HEADING}
        />
    );
}