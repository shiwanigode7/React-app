import { CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { OTD_WIDGET_HEADING, MONTHS_WIDGET_SIDE_HEADING } from "../../../constant/DashboardViewTexts";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import CardWidget from "../../../view/DashboardWidgets/CardWidget";
import OTDTile from "./OTDTile/OTDTile";
import { OTDWidgetStyle } from "./OTDWidgetStyles";
import ProductService from "../../../services/service/ProductService";
import { OTDMonthData } from "./OTDWidgetModel";
import { NodeEventContext } from "../../../context/NodeEventContext";

export default function OTDWidget() {

    const OTDWidgetStyleClasses = OTDWidgetStyle();

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(true);
    const [otdMonthDataList, setOTDMonthDataList] = useState<OTDMonthData[]>([]);
    /**OTD tiles to be displayed */
    const OTD_COMPONENT = <div className={OTDWidgetStyleClasses.otdTileRoot}>
        {otdMonthDataList.map(otdMonthData => (
            <OTDTile
                otdPercentage={Math.round(otdMonthData.otdPercentage)}
                incompleteMilestones={otdMonthData.incompleteMilestones}
                month={otdMonthData.month} />
        ))}
    </div>

    /**Loading icon component */
    const CIRCULAR_LOADING_COMPONENT = <div className={OTDWidgetStyleClasses.loadingIconDivClass}>
        <CircularProgress className={OTDWidgetStyleClasses.loadingIconClass} />
    </div>

    /**Component to be displayed in Card */
    const CARD_DISPLAY_CONTENT = showLoadingIcon ? CIRCULAR_LOADING_COMPONENT : OTD_COMPONENT;

    const CARD_SIDE_HEADING = <Typography>{MONTHS_WIDGET_SIDE_HEADING}</Typography>


    useEffect(() => {
        setShowLoadingIcon(true);
        //Call to get the OTD month data list
        ProductService.getOTDForLastFourMonths(lInnovationData.eskoAccountDetail.repoid)
            .then((otdMonthDataListResponse: OTDMonthData[]) => {
                setOTDMonthDataList(otdMonthDataListResponse);
                setShowLoadingIcon(false);
            })
            .catch((error: any) => {
                console.log(error);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.OTDUpdated]);

    return (
        <CardWidget
            cardHeading={OTD_WIDGET_HEADING}
            cardContent={CARD_DISPLAY_CONTENT}
            cardSideHeadingComponent={CARD_SIDE_HEADING}
        />
    );
}