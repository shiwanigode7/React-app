import { Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { MeetingInterface } from "../../interfaces/InnovationInterface";
import { PPGPresentationStyles } from "../../themes/PPGPresentationThemes";
import { convertDateIntoDDMMMFormat } from "../../utils/Utilities";
import TodayIcon from "@material-ui/icons/Today";
import MeetingService from "../../services/service/MeetingService";

export function UpcomingPPGMeeting() {

    const [IS_MEETING_PRESENT, setIS_MEETING_PRESENT] = useState<boolean>(false);
    const lInnovationData = useContext(InnovationAppContext);
    const [upcomingPPGMeeting, setUpcomingPPGMeeting] = useState<string>("");
    const PPGPresentationClasses = PPGPresentationStyles({ isMeetingAvailable: IS_MEETING_PRESENT });
    useEffect(() => {
        MeetingService.innovationGetUpcomingPPGMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((meetingsListResponse: MeetingInterface[]) => {
                if (0 !== (meetingsListResponse.length)) {
                    setUpcomingPPGMeeting(meetingsListResponse[0].date);
                    setIS_MEETING_PRESENT(true);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [lInnovationData]);

    return (
        <Card className={PPGPresentationClasses.meetingRootCard}>
            {
                IS_MEETING_PRESENT ?
                    <CardContent className={PPGPresentationClasses.cardcontent}>
                        <Grid container >
                            <Grid item className={PPGPresentationClasses.cardContentMeetingDate}>
                                <TodayIcon className={PPGPresentationClasses.cardContentMeetingDateIcon} />
                                <Typography className={PPGPresentationClasses.cardContentMeetingDateText}>
                                    {convertDateIntoDDMMMFormat(upcomingPPGMeeting)}
                                </Typography>
                                <Divider orientation="vertical"
                                    className={PPGPresentationClasses.divider} />
                            </Grid>
                            <Grid item> <Typography className={PPGPresentationClasses.cardContentMeetingLabel}>
                                Next PPG Slot
                            </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    :
                    <Typography className={PPGPresentationClasses.meetingTypography}>No Upcoming PPG Meetings</Typography>
            }
        </Card >
    );
}