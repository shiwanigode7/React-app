import React from "react";
import { BottomWidget } from "../BottomWidget/BottomWidget";
import { InvestmentIcon } from "../../Icons/InvestmentIcon";
import { COLOR_GRAPHITE_4 } from "../../../constant/Colors";
import { COST_PROJECTIONS } from "../../../view/chapters/BusinessCaseChapter/BusinessCaseChapterText";
import { BottomWidgetStyles } from "../BottomWidget/BottomWidgetStyle";
import { Grid } from "@material-ui/core";
import { MILLION_DOLLAR } from "../../../constant/IPVTexts";
import { PERCENTAGE, INVESTMENT_PRE_LAUNCH, MILLION_DOLLAR_PER_YEAR, HISTORICAL_CAGR, ESTIMATED_CAGR, RECURRING_INVESTMENT } from "../PPGPresentationConstant";
import { ProjectionsField } from "../ProjectionsField/ProjectionsField";
import BusinessCaseModel from "../../../view/chapters/BusinessCaseChapter/BusinessCaseModel";
import { convertToMillionGetWithoutUnit } from "../../../utils/Utilities";

export declare interface CostProjectionWidgetModel {
    businessCaseData: BusinessCaseModel;
}

export function CostProjectionWidget(props: CostProjectionWidgetModel) {

    const bottomWidgetStyleClass = BottomWidgetStyles();
    const cardContent = <Grid container className={bottomWidgetStyleClass.cardContentGrid} direction="column">
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={MILLION_DOLLAR}
                                    title={INVESTMENT_PRE_LAUNCH}
                                    titleXS={7}
                                    suffixXS={2}
                                    isAllowMaxWidth={true}
                                    value={convertToMillionGetWithoutUnit(props.businessCaseData.investmentPreLaunch)}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={MILLION_DOLLAR_PER_YEAR}
                                    title={RECURRING_INVESTMENT}
                                    titleXS={7}
                                    suffixXS={2}
                                    isAllowMaxWidth={true}
                                    value={convertToMillionGetWithoutUnit(props.businessCaseData.recurringInvestment)}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={HISTORICAL_CAGR}
                                    titleXS={7}
                                    suffixXS={2}
                                    isAllowMaxWidth={true}
                                    value={props.businessCaseData.historicalCAGR}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={ESTIMATED_CAGR}
                                    titleXS={7}
                                    suffixXS={2}
                                    isAllowMaxWidth={true}
                                    value={props.businessCaseData.estimatedCAGR}/>
                            </Grid>
                        </Grid>
                        
    return (
        <BottomWidget 
        cardHeaderTitle={COST_PROJECTIONS}
        cardHeaderIcon={<InvestmentIcon size={"30"} fill={COLOR_GRAPHITE_4}/>}
        cardContent={cardContent}/>
    )
}