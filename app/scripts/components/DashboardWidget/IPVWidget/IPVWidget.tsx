import { CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { IPV_WIDGET_HEADING, QUARTERS_WIDGET_SIDE_HEADING } from "../../../constant/DashboardViewTexts";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { IPVNodeModel } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import CardWidget from "../../../view/DashboardWidgets/CardWidget";
import IPVTile from "./IPVTile/IPVTile";
import { IPVWidgetStyle } from "./IPVWidgetStyles";

export default function IPVWidget() {

    const IPVWidgetStyleClasses = IPVWidgetStyle();

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [ipvArray, setIPVArray] = useState<IPVNodeModel[]>([]);

    /**IPV tiles to be displayed */
    const IPV_COMPONENT = <div className={IPVWidgetStyleClasses.ipvTileRoot}>
        {ipvArray.map((ipvNode: IPVNodeModel, index: number) => (
            <IPVTile ipvData={ipvNode} quarterNumber={index + 1} />
        ))}
    </div>

    /**Loading icon component */
    const CIRCULAR_LOADING_COMPONENT = <div className={IPVWidgetStyleClasses.LoadingIconDivClass}>
        <CircularProgress className={IPVWidgetStyleClasses.LoadingIconClass} />
    </div>

    /**Component to be displayed in Card */
    const CARD_DISPLAY_CONTENT = showLoadingIcon ? CIRCULAR_LOADING_COMPONENT : IPV_COMPONENT;

    const CARD_SIDE_HEADING = <Typography>{QUARTERS_WIDGET_SIDE_HEADING}</Typography>

    useEffect(() => {
        setShowLoadingIcon(true);
        BusinessGoalService.innovationGetIPV(lInnovationData.eskoAccountDetail.repoid)
            .then((ipvResponse: IPVNodeModel[]) => {
                setIPVArray(ipvResponse);
                setShowLoadingIcon(false);
            })
            .catch((ipvError: any) => {
                console.log(ipvError);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.IPVUpdated]);

    return (
        <CardWidget
            cardHeading={IPV_WIDGET_HEADING}
            cardContent={CARD_DISPLAY_CONTENT}
            cardSideHeadingComponent={CARD_SIDE_HEADING}
        />
    );
}