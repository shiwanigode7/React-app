/**TSX File for the PPG presentation business goal */
import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CoreTeamComponent } from "../../components/presentationComponents/CoreTeamComponent/CoreTeamComponent";
import { CostProjectionWidget } from "../../components/presentationComponents/CostProjectionWidget/CostProjectionWidget";
import HealthComponent from "../../components/presentationComponents/HealthComponent/HealthComponent";
import { NPVComponent } from "../../components/presentationComponents/NPVComponent/NPVComponent";
import { ProfitProjectionWidget } from "../../components/presentationComponents/ProfitProjectionWidget/ProfitProjectionWidget";
import { ReleaseTimelineComponent } from "../../components/presentationComponents/ReleaseTimelineComponent/ReleaseTimeLineComponent";
import { ResourceReleaseWidget } from "../../components/presentationComponents/ResourceReleaseWidget/ResourceReleaseWidget";
import { RevenueProjectionWidget } from "../../components/presentationComponents/RevenueProjectionWidget/RevenueProjectionWidget";
import { UpcomingPPGMeeting } from "../../components/presentationComponents/UpcomingPPGMeeting";
import { PresentationHeader } from "../../components/utils/PresentationMode/PresentationHeader";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayModel } from "../../interfaces/InnovationInterface";
import RunwayService from "../../services/service/RunwayService";
import { PPGPresentationStyles } from "../../themes/PPGPresentationThemes";
import { BusinessGoalType } from "../MPLView";

/**Interface for the PPG presentations component */
declare interface PPGPresentationProps {
    /**The business goal details to be displayed  */
    businessGoalDetails: BusinessGoalType;
}

export function PPGPresentation(inputProps: PPGPresentationProps) {
    const PPGPresentationClasses = PPGPresentationStyles({});
    const lInnovationData = useContext(InnovationAppContext);
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
        <div className={PPGPresentationClasses.root}>
            <Grid>
                <PresentationHeader businessGoalData={inputProps.businessGoalDetails} />
            </Grid>
            <Grid container className={PPGPresentationClasses.gridRootContainer}>
                <Grid item container className={PPGPresentationClasses.bodyGridRoot}>
                    <Grid item className={PPGPresentationClasses.firstGrid}>
                        <Grid item className={PPGPresentationClasses.upcomingMeetingGrid}>
                            <UpcomingPPGMeeting />
                        </Grid>
                        <Grid item className={PPGPresentationClasses.coreTeamGrid}>
                            <CoreTeamComponent coreTeamDetails={inputProps.businessGoalDetails.coreTeam} businessGoal={inputProps.businessGoalDetails} />
                        </Grid>
                    </Grid>
                    <Grid item className={PPGPresentationClasses.secondGrid}>
                        <Grid item className={PPGPresentationClasses.healthAndRecycleGrid}>
                            <Grid item className={PPGPresentationClasses.healthGrid}>
                                <HealthComponent bgHealth={inputProps.businessGoalDetails.healthData} />
                            </Grid>
                            <Grid item className={PPGPresentationClasses.recycleGrid}>
                                <NPVComponent npvValue={inputProps.businessGoalDetails.businessCaseData.npvValue}/>
                            </Grid>
                        </Grid>
                        <Grid item className={PPGPresentationClasses.releaseGrid}>
                            <ReleaseTimelineComponent
                                businessGoal={inputProps.businessGoalDetails}
                                />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container className={PPGPresentationClasses.bottomGirdContainer}>
                    <Grid item className={PPGPresentationClasses.bottomGrid}>
                        <ResourceReleaseWidget 
                            businessCaseData={inputProps.businessGoalDetails.businessCaseData}
                            runwaysList={runwayList}/>
                    </Grid>
                    <Grid item className={PPGPresentationClasses.bottomGrid}>
                        <RevenueProjectionWidget businessCaseData={inputProps.businessGoalDetails.businessCaseData}/>
                    </Grid>
                    <Grid item className={PPGPresentationClasses.bottomGrid}>
                        <CostProjectionWidget businessCaseData={inputProps.businessGoalDetails.businessCaseData}/>
                    </Grid>
                    <Grid item className={PPGPresentationClasses.bottomGrid}>
                        <ProfitProjectionWidget businessCaseData={inputProps.businessGoalDetails.businessCaseData}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}