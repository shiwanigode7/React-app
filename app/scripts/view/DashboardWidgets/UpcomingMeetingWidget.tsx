import { CircularProgress, List, ListItem, ListItemSecondaryAction, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { NO_UPCOMING_MEETINGS_MESSAGE, UPCOMING_MEETINGS_HEADING } from "../../constant/DashboardViewTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { NodeEventContext } from "../../context/NodeEventContext";
import { MeetingInterface } from "../../interfaces/InnovationInterface";
import MeetingService from "../../services/service/MeetingService";
import { UpcomingMeetingWidgetStyles } from "../../themes/UpcomingMeetingWidgetTheme";
import { getDateString } from "../../utils/MeetingUtils";
import CardWidget from "./CardWidget";

export default function UpcomingMeetingWidget() {

    /**Get the styles */
    const UpcomingMeetingStyleClass = UpcomingMeetingWidgetStyles();

    /**State to display/hide the Loading icon */
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(true);

    /**Define the context variables */
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);
    /**State to hold the meetingl list date  */
    const [upcomingMeetingDataList, setUpcomingMeetingDataList] = useState<MeetingInterface[]>([]);

    /**Gets the List of Meetings data and assign it to the state variable */
    useEffect(() => {
        if (0 !== lInnovationData.eskoAccountDetail.repoid.length) {
            MeetingService.innovationGetUpcomingMeetingsList(lInnovationData.eskoAccountDetail.repoid)
                .then((MeetingListResponse: MeetingInterface[]) => {
                    console.log(MeetingListResponse);
                    setShowLoadingIcon(false);
                    setUpcomingMeetingDataList(MeetingListResponse);
                })
                .catch((MeetingListError: any) => {
                    console.log(MeetingListError);
                    setShowLoadingIcon(false);
                    setUpcomingMeetingDataList([]);
                });
        }
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.SIRUpdated, lNodeEventData.PPGUpdated]);

    /**COmponent to be displayed in Card */
    const CardDisplayContent = (
        showLoadingIcon ?
            <div className={UpcomingMeetingStyleClass.LoadingIconDivClass}>
                <CircularProgress className={UpcomingMeetingStyleClass.LoadingIconClass} />
            </div> :
            0 !== upcomingMeetingDataList.length ?
                <List className={UpcomingMeetingStyleClass.ListClass}>
                    {upcomingMeetingDataList.map((meeting: MeetingInterface) => {
                        return (
                            <div>
                                <ListItem className={UpcomingMeetingStyleClass.ListItemClass}>
                                    <Typography>{meeting.meetingType}</Typography>
                                    <ListItemSecondaryAction className={UpcomingMeetingStyleClass.MeetingDateClass}>
                                        <Typography>{getDateString(meeting.date)}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
                        )
                    })}
                </List> :
                /** Display message when there are no meetings */
                <Typography className={UpcomingMeetingStyleClass.NoMeetingsMessageClass}>{NO_UPCOMING_MEETINGS_MESSAGE}</Typography>
    )

    return (
        <CardWidget
            cardHeading={UPCOMING_MEETINGS_HEADING}
            cardContent={CardDisplayContent}
        />
    );
}