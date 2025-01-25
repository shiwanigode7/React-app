import React from "react";
import { BottomWidget } from "../BottomWidget/BottomWidget";
import { ProfitIcon } from "../../../../Icons/ProfitIcon";
import { COLOR_GRAPHITE_4 } from "../../../constant/Colors";
import { PROFIT_PROJECTIONS } from "../../../view/chapters/BusinessCaseChapter/BusinessCaseChapterText";
import { Grid, Typography } from "@material-ui/core";
import { MILLION_DOLLAR } from "../../../constant/IPVTexts";
import { BottomWidgetStyles } from "../BottomWidget/BottomWidgetStyle";
import { PERCENTAGE, FIVE_YEAR_EBIT, CURRENT_GROSS_PROFIT, GROSS_PROFIT_IMPROVEMENT, SIMPLE_PAYBACK, YEAR, MONTH } from "../PPGPresentationConstant";
import { ProjectionsField } from "../ProjectionsField/ProjectionsField";
import BusinessCaseModel from "../../../view/chapters/BusinessCaseChapter/BusinessCaseModel";
import { convertToMillionGetWithoutUnit } from "../../../utils/Utilities";
import { ProjectionsFieldStyle } from "../ProjectionsField/ProjectionsFieldStyle";

export declare interface ProfitProjectionWidgetModel {
    businessCaseData: BusinessCaseModel;
}

export function ProfitProjectionWidget(props: ProfitProjectionWidgetModel) {

    const bottomWidgetStyleClass = BottomWidgetStyles();
    const projectionsFieldStyleClasses = ProjectionsFieldStyle();
    const cardContent = <Grid container className={bottomWidgetStyleClass.cardContentGrid} direction="column">
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={MILLION_DOLLAR}
                                    title={FIVE_YEAR_EBIT}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={convertToMillionGetWithoutUnit(props.businessCaseData.fiveYearEBit)}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={CURRENT_GROSS_PROFIT}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={props.businessCaseData.currentGrossProfit}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={PERCENTAGE}
                                    title={GROSS_PROFIT_IMPROVEMENT}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={props.businessCaseData.grossProfitImprovement}/>
                            </Grid>
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <Grid container direction="row" alignItems="center" className={projectionsFieldStyleClasses.gridContainer}>
                                    <Grid item>
                                        <Typography className={projectionsFieldStyleClasses.titleAndSuffix}>{SIMPLE_PAYBACK}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <span className={projectionsFieldStyleClasses.value}>
                                                {props.businessCaseData.simplePayback.years}
                                            </span>
                                            <span className={projectionsFieldStyleClasses.titleAndSuffix}>
                                                {" " + YEAR + " "}
                                            </span>
                                            <span className={projectionsFieldStyleClasses.value}>
                                                {props.businessCaseData.simplePayback.months}
                                            </span>
                                            <span className={projectionsFieldStyleClasses.titleAndSuffix}>
                                                {" " + MONTH}
                                            </span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
    return (
        <BottomWidget 
        cardHeaderTitle={PROFIT_PROJECTIONS}
        cardHeaderIcon={<ProfitIcon size={"30"} fill={COLOR_GRAPHITE_4}/>}
        cardContent={cardContent}/>
    )
}