import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import { MeetingInterface } from "../../../interfaces/InnovationInterface";
import MeetingService from "../../../services/service/MeetingService";
import { emptyMeetingValueInitializer } from "../../../utils/MeetingUtils";
import { convertDateIntoDDMMMYYYYFormat, convertTime } from "../../../utils/Utilities";
import { DescriptionStyles } from "./Description/DescriptionStyles";
import { FlyoutStyles } from "./FlyoutStyles";
import InfoModel from "./InfoModel";
import { UpcomingMeetingsStyles } from "./UpcomingMeetings/UpcomingMeetingsStyles";


export default function Info(InfoProps: InfoModel) {
    const flyoutStyleClasses = FlyoutStyles();
    const lInnovationData = useContext(InnovationAppContext);
    const [sirMeetingsList, setSIRMeetingsList] = useState<MeetingInterface>(emptyMeetingValueInitializer);
    const [ppgMeetingsList, setPPGMeetingsList] = useState<MeetingInterface>(emptyMeetingValueInitializer);
    const upcomingMeetingsStyleClasses = UpcomingMeetingsStyles();
    const descriptionStyleClasses = DescriptionStyles();
    const lNodeEventData = useContext(NodeEventContext);
    useEffect(() => {
        MeetingService.innovationGetUpcomingSIRMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((meetingsListResponse: MeetingInterface[]) => {
                if (0 !== (meetingsListResponse.length)) {
                    setSIRMeetingsList(meetingsListResponse[0]);
                } else {
                    setSIRMeetingsList(emptyMeetingValueInitializer);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
        MeetingService.innovationGetUpcomingPPGMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((meetingsListResponse: MeetingInterface[]) => {
                if (0 !== (meetingsListResponse.length)) {
                    setPPGMeetingsList(meetingsListResponse[0]);
                } else {
                    setPPGMeetingsList(emptyMeetingValueInitializer);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [lInnovationData, lNodeEventData.PPGUpdated, lNodeEventData.SIRUpdated]);



    return (
        <Grid container direction="column">
            <Grid item className={upcomingMeetingsStyleClasses.meetingsListGridContainer}>
                <h4>Info</h4>
            </Grid>
            {
                ("SIR" === InfoProps.view && sirMeetingsList.meetingName) &&
                <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                    <Grid>
                        <Typography className={descriptionStyleClasses.descriptionTypography}>
                            {sirMeetingsList.meetingType} meeting {convertDateIntoDDMMMYYYYFormat(sirMeetingsList.date)}
                        </Typography>

                        <Typography className={descriptionStyleClasses.descriptionTypography}>
                            {convertTime(sirMeetingsList.fromTime)} - {convertTime(sirMeetingsList.toTime)}
                        </Typography>
                    </Grid>
                </Grid>
            }
            {
                ("PPG" === InfoProps.view && ppgMeetingsList.meetingName) &&
                <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                    <Grid>
                        <Typography className={descriptionStyleClasses.descriptionTypography}>
                            {ppgMeetingsList.meetingType} meeting {convertDateIntoDDMMMYYYYFormat(ppgMeetingsList.date)}
                        </Typography>

                        <Typography className={descriptionStyleClasses.descriptionTypography}>
                            {convertTime(ppgMeetingsList.fromTime)} - {convertTime(ppgMeetingsList.toTime)}
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}


