import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import InnovationEquationWidget from "../components/DashboardWidget/InnovationEquationWidget/InnovationEquationWidget";
import IPVWidget from "../components/DashboardWidget/IPVWidget/IPVWidget";
import OTDWidget from "../components/DashboardWidget/OTDWidget/OTDWidget";
import { PredictionIPVWidget } from "../components/DashboardWidget/PredictionIPVWidget/PredictionIPVWidget";
import RevenueAchievementWidget from "../components/DashboardWidget/RevenueAchievementWidget/RevenueAchievementWidget";
import { StatusFilterButton, StatusFilterButtonInterface } from "../components/StatusFilterButton";
import { MY_DASHBOARD_TITLE } from "../constant/DashboardViewTexts";
import { InnovationStatus } from "../constant/InnovationEnums";
import { InnovationAppContext } from "../context/InnovationAppContext";
import { NodeEventContext } from "../context/NodeEventContext";
import SearchService from "../services/SearchService";
import { DashboardViewStyles } from "../themes/DashboardViewTheme";
import UpcomingMeetingWidget from "./DashboardWidgets/UpcomingMeetingWidget";

export default function DashboardView() {

    /**Get the styles */
    const DashboardViewStyleClass = DashboardViewStyles();

    const lInnovationStatus: any = InnovationStatus;

    /**Importing context */
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    /**Variables to hold the count of business goal under a given status */
    const [ideationBGCount, setIdeationBGCount] = useState<number>(0);
    const [scheduledBGCount, setScheduledBGCount] = useState<number>(0);
    const [activeBGCount, setActiveBGCount] = useState<number>(0);
    const [completedBGCount, setCompletedBGCount] = useState<number>(0);
    const [selectedStatusValues, setSelectedStatusValues] = useState<string[]>([lInnovationStatus.IDEATION, lInnovationStatus.SCHEDULED, lInnovationStatus.ACTIVE, lInnovationStatus.COMPLETED]);

    /**Defining the list of buttons to be viewed on DashBoard */
    const inListOfButtons: StatusFilterButtonInterface[] = [
        {
            BGCount: ideationBGCount,
            buttonTitle: lInnovationStatus.IDEATION
        },
        {
            BGCount: scheduledBGCount,
            buttonTitle: lInnovationStatus.SCHEDULED
        },
        {
            BGCount: activeBGCount,
            buttonTitle: lInnovationStatus.ACTIVE
        },
        {
            BGCount: completedBGCount,
            buttonTitle: lInnovationStatus.COMPLETED
        }
    ];

    /** Function to set status counts */
    const setStatusCount = (inStatus: string, statusCount: any) => {
        switch (inStatus) {
            case lInnovationStatus.IDEATION:
                setIdeationBGCount(statusCount);
                break;
            case lInnovationStatus.ACTIVE:
                setActiveBGCount(statusCount);
                break;
            case lInnovationStatus.SCHEDULED:
                setScheduledBGCount(statusCount);
                break;
            case lInnovationStatus.COMPLETED:
                setCompletedBGCount(statusCount);
                break;
        }
    };

    /**Function to make service call and update the status count */
    const getBGStatusCount = () => {
        for (let lStatus in lInnovationStatus) {
            SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, lInnovationStatus[lStatus])
                .then((statusCount) => {
                    setStatusCount(lInnovationStatus[lStatus], statusCount);
                })
                .catch((statusCountError) => {
                    setStatusCount(lInnovationStatus[lStatus], statusCountError);
                })
        }
    };

    useEffect(() => {
        /**set the count of the business goal status */
        getBGStatusCount();
    }, [lNodeEventData.businessGoalsUpdated]);

    return (
        <Box className={DashboardViewStyleClass.rootBox}>
            <Grid container className={DashboardViewStyleClass.rootGridContainer}>
                {/* The Title and the status count grid */}
                <Grid item spacing={2} className={DashboardViewStyleClass.titleStatusGridContainerRoot} >
                    <Grid item>
                        <Typography className={DashboardViewStyleClass.TitleClass} >
                            {MY_DASHBOARD_TITLE}
                        </Typography>
                    </Grid>
                    <Grid item className={DashboardViewStyleClass.StatusGridClass}>
                        <StatusFilterButton
                            listOfButtons={inListOfButtons}
                            selectedStatusValues={selectedStatusValues}
                            setSelectedStatusValues={setSelectedStatusValues}
                            viewPage={MY_DASHBOARD_TITLE}
                        />
                    </Grid>
                </Grid>
                {/* Growth equation and the upcoming meeting grid */}
                <Grid item spacing={2} className={DashboardViewStyleClass.growthAndMeetingGrid} >
                    {/* Component for the growth equation */}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <InnovationEquationWidget />
                    </Grid>
                    {/* Component for the upcoming meeting */}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <UpcomingMeetingWidget />
                    </Grid>
                </Grid>
                {/* IPV Widgets Current and Prediction */}
                <Grid item spacing={2} className={DashboardViewStyleClass.ipvGrid}>
                    {/* Component for the IPV widget */}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <IPVWidget />
                    </Grid>
                    {/* Component for the IPV Prediction */}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <PredictionIPVWidget />
                    </Grid>
                </Grid>
                {/* Revenue Achievement and On time delivery grid */}
                <Grid item spacing={2} className={DashboardViewStyleClass.revenueAndDeliveryGrid}>
                    {/* Component for Revenue Achievement */}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <RevenueAchievementWidget />
                    </Grid>
                    {/* Component for On Time delivery*/}
                    <Grid item className={DashboardViewStyleClass.cardWidgetGrid}>
                        <OTDWidget />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}