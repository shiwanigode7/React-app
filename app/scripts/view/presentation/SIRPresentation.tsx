/**TSX File for the SIR presentation business goal */
import { Avatar, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { BGMilestoneList } from "../../components/presentationComponents/BGMilestoneList";
import { BGValueCardComponent } from "../../components/presentationComponents/BGValueCardComponent";
import { InvestmentComponentInputDataInterface, InvestmentProfitComponent } from "../../components/presentationComponents/InvestmentProfitComponent";
import { RunwayPresentationList } from "../../components/presentationComponents/RunwayPresentationList";
import { PresentationHeader } from "../../components/utils/PresentationMode/PresentationHeader";
import { CPD_RISK_SCORE_TEXT, CURRENT_GROSS_PROFIT_TEXT, ESTIMATED_CAGR_TEXT, ESTIMATED_COMPLETION_TEXT, FIVE_YEAR_EBIT_TEXT, GROSS_PROFIT_IMPORVEMENT_TEXT, HISTORICAL_CAGR_TEXT, INVESTMENT_PRE_LAUNCH_TEXT, INVESTMENT_PRE_LAUNCH_UNIT, PERCENTAGE_TEXT, RECURRING_INVESTMENT_TEXT, RECURRING_INVESTMENT_TEXT_UNIT, RECURRING_RATIO_TEXT, SIMPLE_PAYBACK_TEXT } from "../../constant/SIRPresentationTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayModel } from "../../interfaces/InnovationInterface";
import RunwayService from "../../services/service/RunwayService";
import { CPDRiskScoreStyles, SIRPresentationStyles } from "../../themes/SIRPresentationTheme";
import { FiveYearsBusinessCaseModel } from "../chapters/BusinessCaseChapter/BusinessCaseModel";
import { BusinessGoalType } from "../MPLView";

/**Interface for the SIR presentations component */
declare interface SIRPresentationProps {
    /**The business goal details to be displayed  */
    businessGoalDetails: BusinessGoalType
}

export function SIRPresentation(inputProps: SIRPresentationProps) {
    /**Get the Account details */
    const lInnovationData = useContext(InnovationAppContext);

    /**Import the Style classes */
    const SIRPresentationClasses = SIRPresentationStyles();
    const CPDRiskScoreClasses = CPDRiskScoreStyles({ riskScoreValue: inputProps.businessGoalDetails.riskScore });

    /**Saving values required in an array */
    const InvestmentDataArray: InvestmentComponentInputDataInterface[] = [
        {
            dataTitle: INVESTMENT_PRE_LAUNCH_TEXT,
            dataUnit: INVESTMENT_PRE_LAUNCH_UNIT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.investmentPreLaunch
        },
        {
            dataTitle: RECURRING_INVESTMENT_TEXT,
            dataUnit: RECURRING_INVESTMENT_TEXT_UNIT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.recurringInvestment
        }
    ];

    const CAGRDataArray: InvestmentComponentInputDataInterface[] = [
        {
            dataTitle: HISTORICAL_CAGR_TEXT,
            dataUnit: PERCENTAGE_TEXT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.historicalCAGR
        },
        {
            dataTitle: ESTIMATED_CAGR_TEXT,
            dataUnit: PERCENTAGE_TEXT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.estimatedCAGR
        }
    ];

    const ProfitDataArray: InvestmentComponentInputDataInterface[] = [
        {
            dataTitle: CURRENT_GROSS_PROFIT_TEXT,
            dataUnit: PERCENTAGE_TEXT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.currentGrossProfit
        },
        {
            dataTitle: GROSS_PROFIT_IMPORVEMENT_TEXT,
            dataUnit: PERCENTAGE_TEXT,
            dataValue: inputProps.businessGoalDetails.businessCaseData.grossProfitImprovement
        }
    ];

    /**Variables to hold components */
    const CAGR_ICON: any = <img src={images.CAGR} />;
    const PROFIT_ICON: any = <img src={images.Profit} />;
    const INVESTMENT_ICON: any = <img src={images.Investment} />;

    const recurringRatiosData: FiveYearsBusinessCaseModel = inputProps.businessGoalDetails.businessCaseData.recurringRatios;
    const recurringRatio: number = recurringRatiosData.Y1 + recurringRatiosData.Y2 + recurringRatiosData.Y3 +
        recurringRatiosData.Y4 + recurringRatiosData.Y5;

    /**Check if the recurring ratio is zero or not, and then update the constant */
    const RECURRING_RATIO: any = 0 === recurringRatio ? undefined :
        <div className={SIRPresentationClasses.recurringRatio}>
            {`${recurringRatio}%`}
        </div>;

    const convertToMillion = (amount: number) => {
        if (Math.abs(amount) < 1000) {
            return `${amount}K$`
        } else {
            const amountInMillion = (Math.sign(amount) * (Math.round(((Math.abs(amount) / 1000) + Number.EPSILON) * 10) / 10)).toString();
            return `${amountInMillion}M$`
        }
    };

    /**Check if simple payback value has been added or not, and then update the constant */
    const SIMPLE_PAYBACK: any = (
        (0 === inputProps.businessGoalDetails.businessCaseData.simplePayback.years) &&
        (0 === inputProps.businessGoalDetails.businessCaseData.simplePayback.months)
    ) ? undefined :
        <div className={SIRPresentationClasses.simplePayBackRootDiv}>
            <p className={SIRPresentationClasses.simplePayBackValue}>{inputProps.businessGoalDetails.businessCaseData.simplePayback.years}</p>
            <p className={SIRPresentationClasses.simplePayBackYearMonthLabel}>{"y"}&nbsp;</p>
            <p className={SIRPresentationClasses.simplePayBackValue}>{inputProps.businessGoalDetails.businessCaseData.simplePayback.months}</p>
            <p className={SIRPresentationClasses.simplePayBackYearMonthLabel}>{"m"}</p>
        </div>;

    const FIVE_YEAR_EBIT: any = (
        undefined === inputProps.businessGoalDetails.businessCaseData.fiveYearEBit ? undefined :
            <div className={SIRPresentationClasses.recurringRatio}>
                {convertToMillion(inputProps.businessGoalDetails.businessCaseData.fiveYearEBit)}
            </div>
    );

    const ESTIMATED_COMPLETION: any = (
        undefined === inputProps.businessGoalDetails.businessCaseData.estimatedDevelopmentTime ? undefined :
            <div className={SIRPresentationClasses.divItem}>
                <Typography align="right" className={SIRPresentationClasses.recurringRatio}>{inputProps.businessGoalDetails.businessCaseData.estimatedDevelopmentTime}</Typography>
                <Typography>&nbsp;</Typography>
                <Typography align="right" className={SIRPresentationClasses.yearsTypographyStyles}>yrs</Typography>
            </div>
    );

    /**CPD Risk Score Component */
    const CPD_RISK_SCORE: any = <Avatar className={CPDRiskScoreClasses.avatar}>
        {inputProps.businessGoalDetails.riskScore}
    </Avatar>

    /**Function to get the runway list data based on the Runway-id in business goal name */
    const [totalRunwayListData, setTotalRunwayListData] = useState<RunwayModel[]>([]);
    const [runwayList, setRunwayList] = useState<string[]>([]);

    /**Gets the List of Runways(id and name) present in the repo using Search */
    useEffect(() => {
        RunwayService.getActiveRunways(lInnovationData.eskoAccountDetail.repoid)
            .then((response: RunwayModel[]) => {
                setTotalRunwayListData(response);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [inputProps.businessGoalDetails])

    /**Check With the list of list of Runways that all existing selected runways are present or not, if not deletes the value */
    useEffect(() => {
        const lFilteredRunwayData: RunwayModel[] = [];
        const lHoldRunways: string[] = [];
        inputProps.businessGoalDetails.runwaysList.forEach((iRunwayId: string) => {
            lFilteredRunwayData.push(...totalRunwayListData.filter((runway: RunwayModel) => (runway.nodeId === iRunwayId)));
        });
        lFilteredRunwayData.forEach((runwayData: RunwayModel) => {
            lHoldRunways.push(runwayData.runwayName.toString());
        });
        setRunwayList(lHoldRunways);
    }, [totalRunwayListData])

    return (
        <div className={SIRPresentationClasses.root}>
            <Grid>
                <PresentationHeader businessGoalData={inputProps.businessGoalDetails} />
            </Grid>
            {/* Body Container */}
            <Grid container className={SIRPresentationClasses.bodyGridRoot}>
                {/* Runway and Milestones grid */}
                <Grid item className={SIRPresentationClasses.bodyRunwayMilestoneGridRoot}>
                    <Grid item className={SIRPresentationClasses.bodyRunwayGrid}>
                        <RunwayPresentationList runwayList={runwayList} />
                    </Grid>
                    {/* Milestone component */}
                    <Grid item className={SIRPresentationClasses.bodyMileStonesGrid}>
                        <BGMilestoneList mileStonesList={inputProps.businessGoalDetails.milestones} />
                    </Grid>
                </Grid>
                {/* Business Goal Investment related grid */}
                <Grid item className={SIRPresentationClasses.bodyInvestmentGridRoot}>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <InvestmentProfitComponent
                            dataIcon={INVESTMENT_ICON}
                            dataArray={InvestmentDataArray}
                        />
                    </Grid>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <InvestmentProfitComponent
                            dataIcon={CAGR_ICON}
                            dataArray={CAGRDataArray}
                        />
                    </Grid>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <InvestmentProfitComponent
                            dataIcon={PROFIT_ICON}
                            dataArray={ProfitDataArray}
                        />
                    </Grid>
                </Grid>
                {/* Business Goal Grid for Recurring ration and simple payback */}
                <Grid item className={SIRPresentationClasses.bodyScoreAndRatioGridRoot}>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <BGValueCardComponent dataTitle={RECURRING_RATIO_TEXT} dataValue={RECURRING_RATIO} />
                    </Grid>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <BGValueCardComponent dataTitle={SIMPLE_PAYBACK_TEXT} dataValue={SIMPLE_PAYBACK} />
                    </Grid>
                    {/* TODO: Find a way to avoid using this extra grid
                    NOTE: This grid is used to make sure that the alignment of the cards are correct.
                    Reason for not using margin-top is, with margin even if we give percentage value, during resolution change
                    it was causing the card component to be misaligned */}
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                    </Grid>
                </Grid>
                {/* Business Goal Grid for NPV, Estimated Completion and CPD Risk Score */}
                <Grid item className={SIRPresentationClasses.bodyScoreAndRatioGridRoot}>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <BGValueCardComponent dataTitle={FIVE_YEAR_EBIT_TEXT} dataValue={FIVE_YEAR_EBIT} />
                    </Grid>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <BGValueCardComponent dataTitle={ESTIMATED_COMPLETION_TEXT} dataValue={ESTIMATED_COMPLETION} />
                    </Grid>
                    <Grid item className={SIRPresentationClasses.bodyInvestmentAndScoresGrid} >
                        <BGValueCardComponent dataTitle={CPD_RISK_SCORE_TEXT} dataValue={CPD_RISK_SCORE} />
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}