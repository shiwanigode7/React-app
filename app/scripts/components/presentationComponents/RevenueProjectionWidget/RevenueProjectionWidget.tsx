import React from "react";
import { BottomWidget } from "../BottomWidget/BottomWidget";
import { ProfitIcon } from "../../../../Icons/ProfitIcon";
import { COLOR_GRAPHITE_4 } from "../../../constant/Colors";
import { REVENUE_PROJECTIONS } from "../../../view/chapters/BusinessCaseChapter/BusinessCaseChapterText";
import { ProjectionsField } from "../ProjectionsField/ProjectionsField";
import { Grid } from "@material-ui/core";
import { BottomWidgetStyles } from "../BottomWidget/BottomWidgetStyle";
import { PERCENTAGE, RECURRING_RATIO_Y1, RECURRING_RATIO_Y5, REVENUE_Y1, REVENUE_Y5 } from "../PPGPresentationConstant";
import { MILLION_DOLLAR } from "../../../constant/IPVTexts";
import BusinessCaseModel from "../../../view/chapters/BusinessCaseChapter/BusinessCaseModel";
import { convertToMillionGetWithoutUnit } from "../../../utils/Utilities";

export declare interface RevenueProjectionWidgetModel {
    businessCaseData: BusinessCaseModel;
}

export function RevenueProjectionWidget(props: RevenueProjectionWidgetModel) {

    const bottomWidgetStyleClass = BottomWidgetStyles();
    const cardContent = <Grid container className={bottomWidgetStyleClass.cardContentGrid} direction="column">
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={MILLION_DOLLAR}
                                    title={REVENUE_Y1}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={convertToMillionGetWithoutUnit(props.businessCaseData.recurringRevenueProjections.Y1)}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={MILLION_DOLLAR}
                                    title={REVENUE_Y5}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={convertToMillionGetWithoutUnit(props.businessCaseData.recurringRevenueProjections.Y5)}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={RECURRING_RATIO_Y1}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={props.businessCaseData.recurringRatios.Y1}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={RECURRING_RATIO_Y5}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={props.businessCaseData.recurringRatios.Y5}/>
                            </Grid>
                        </Grid>
    return (
        <BottomWidget 
        cardHeaderTitle={REVENUE_PROJECTIONS}
        cardHeaderIcon={<ProfitIcon size={"30"} fill={COLOR_GRAPHITE_4}/>}
        cardContent={cardContent}/>
    )
}