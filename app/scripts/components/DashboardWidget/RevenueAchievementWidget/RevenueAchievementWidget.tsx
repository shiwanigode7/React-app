import { CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { QUARTERS_WIDGET_SIDE_HEADING, RA_WIDGET } from "../../../constant/DashboardViewTexts";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { QuarterModel } from "../../../interfaces/InnovationInterface";
import BusinessLineService from "../../../services/service/BusinessLineService";
import RevenueAchievementService from "../../../services/service/RevenueAchievementService";
import { getLastFourQuarters } from "../../../utils/QuarterUtils";
import CardWidget from "../../../view/DashboardWidgets/CardWidget";
import { RAQuarter, RevenueAchievementModel } from "../../ReleaseView/RevenueAchievements/RevenueAchievementModel";
import { BusinessLineModel } from "../../settings/BusinessLineView/BusinessLineModel";
import RATile from "./RATile/RATile";
import { RABusinessLine, RAWidgetModel } from "./RevenueAchievementWidgetModel";
import { RevenueAchievementWidgetStyle } from "./RevenueAchievementWidgetStyles";

export default function RevenueAchievementWidget() {

    const RevenueAchievementWidgetStyleClasses = RevenueAchievementWidgetStyle();

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [allRevenueAchievements, setAllRevenueAchievements] = useState<RevenueAchievementModel[]>([]);
    const [activeBusinessLineList, setActiveBusinessLineList] = useState<BusinessLineModel[]>([]);
    const [fourQuarters, setFourQuarters] = useState<QuarterModel[]>([]);
    const [revenueAchievementWidgetData, setRevenueAchievementWidgetData] = useState<RAWidgetModel[]>([]);

    /**Loading icon component */
    const CIRCULAR_LOADING_COMPONENT = <div className={RevenueAchievementWidgetStyleClasses.LoadingIconDivClass}>
        <CircularProgress className={RevenueAchievementWidgetStyleClasses.LoadingIconClass} />
    </div>

    const RA_COMPONENT = <div className={RevenueAchievementWidgetStyleClasses.RATileRoot}>
        {revenueAchievementWidgetData.map((revenueAchievement: RAWidgetModel) => (
            <RATile revenueAchievementData={revenueAchievement} />
        ))}
    </div>


    /**Component to be displayed in Card */
    const CARD_DISPLAY_CONTENT = showLoadingIcon ? CIRCULAR_LOADING_COMPONENT : RA_COMPONENT;

    const CARD_SIDE_HEADING = <Typography>{QUARTERS_WIDGET_SIDE_HEADING}</Typography>

    const isBusinessLinePresent = (inNodeId: string): boolean => {
        let lIsBusinessLinePresent: boolean = false;

        activeBusinessLineList.forEach((businessLine: BusinessLineModel) => {
            if (businessLine.nodeId === inNodeId) {
                lIsBusinessLinePresent = true;
            }
        })

        return lIsBusinessLinePresent;
    }

    const getBusinessLineName = (inNodeId: string): string => {
        let lBusinessLineName: string = "";

        activeBusinessLineList.forEach((businessLine: BusinessLineModel) => {
            if (businessLine.nodeId === inNodeId) {
                lBusinessLineName = businessLine.name;
            }
        })

        return lBusinessLineName;
    }

    const getQuarterDetails = (inQuarter: string, inRevenueAchievement: RevenueAchievementModel): RAQuarter => {
        switch (inQuarter) {
            case "Q1": return inRevenueAchievement.Q1;
            case "Q2": return inRevenueAchievement.Q2;
            case "Q3": return inRevenueAchievement.Q3;
            default: return inRevenueAchievement.Q4;
        }

    }

    useEffect(() => {
        setShowLoadingIcon(true);
        RevenueAchievementService.getRevenueAchievements(lInnovationData.eskoAccountDetail.repoid)
            .then((raResponse: RevenueAchievementModel[]) => {
                setAllRevenueAchievements(raResponse);
                setShowLoadingIcon(false);
            })
            .catch((err: any) => {
                console.log(err);
            });

        BusinessLineService.getAllBusinessLines(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessLinesResponse: BusinessLineModel[]) => {
                const activeBusinessLines: BusinessLineModel[] =
                    getBusinessLinesResponse.filter((businessLine: BusinessLineModel) => businessLine.isActive);
                setActiveBusinessLineList(activeBusinessLines);
            })
            .catch((getBusinessLinesError: any) => {
                console.log(getBusinessLinesError);
            });
        setFourQuarters(getLastFourQuarters());
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.RAUpdated]);

    useEffect(() => {

        const lRAWidgetData: RAWidgetModel[] = [];

        fourQuarters.forEach((quarter: QuarterModel) => {
            let year: string = quarter.quarterStart.split("-")[0];
            let quarterIndex: string = quarter.quarterDetails.split(" ")[0];
            let lActual: number = 0;
            let lPlan: number = 0;
            let lPercentage: number = 0;

            const lBusinessLineList: RABusinessLine[] = [];

            allRevenueAchievements.forEach((revenueAchievement: RevenueAchievementModel) => {
                if (revenueAchievement.year === year && isBusinessLinePresent(revenueAchievement.blNodeId)) {
                    let quarterDetail: RAQuarter = getQuarterDetails(quarterIndex, revenueAchievement);
                    lActual = lActual + (parseFloat(quarterDetail.actual) || 0);
                    lPlan = lPlan + (parseFloat(quarterDetail.plan) || 0);
                    let lRAPercentage: number = parseFloat(quarterDetail.actual) / parseFloat(quarterDetail.plan) * 100;
                    let businessLinePercentage: number;
                    if (lRAPercentage > 99.50 && lRAPercentage < 100) {
                        businessLinePercentage = Math.floor(lRAPercentage);
                    }
                    else {
                        businessLinePercentage = Math.round(lRAPercentage);
                    }
                    if (100 > businessLinePercentage) {
                        let lBusinessLine: RABusinessLine = {
                            businessLineName: getBusinessLineName(revenueAchievement.blNodeId),
                            percentage: businessLinePercentage
                        }
                        lBusinessLineList.push(lBusinessLine);
                    }
                }
            })
            let RAPercentage = (lActual / lPlan) * 100;
            if (lActual == 0 || !lActual || lPlan == 0 || !lPlan) {
                lPercentage = 0;
            }
            else if (RAPercentage > 99.50 && RAPercentage < 100) {
                lPercentage = Math.floor(RAPercentage);
            }
            else {
                lPercentage = Math.round(RAPercentage);
            }
            let lRaData: RAWidgetModel = {
                quarterDetails: quarter.quarterDetails,
                percentage: (lPercentage || 0),
                BusinessLineList: lBusinessLineList
            }
            lRAWidgetData.push(lRaData);
        })
        setRevenueAchievementWidgetData(lRAWidgetData);
    }, [fourQuarters, allRevenueAchievements, activeBusinessLineList]);


    return (
        <CardWidget
            cardHeading={RA_WIDGET}
            cardContent={CARD_DISPLAY_CONTENT}
            cardSideHeadingComponent={CARD_SIDE_HEADING}
        />
    )
}

