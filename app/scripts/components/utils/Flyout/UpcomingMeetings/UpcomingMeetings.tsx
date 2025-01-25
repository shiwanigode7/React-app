import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { UpcomingMeetingsStyles } from "./UpcomingMeetingsStyles";
import { InnovationAppContext } from "../../../../context/InnovationAppContext";
import { BusinessGoalWithIdType, MeetingInterface } from "../../../../interfaces/InnovationInterface";
import Links from "../../../../Links";
import { useHistory } from "react-router-dom";
import { getTimeAndDate } from "../../../../utils/MeetingUtils";
import SearchService from "../../../../services/SearchService";
import { convertDateIntoDDMMMYYYYFormat } from "../../../../utils/Utilities";
import { FlyoutStyles } from "../FlyoutStyles";
import MeetingService from "../../../../services/service/MeetingService";
import { NodeEventContext } from "../../../../context/NodeEventContext";
export default function UpcomingMeetings() {
    const upcomingMeetingsStyleClasses = UpcomingMeetingsStyles();
    const flyoutStyleClasses = FlyoutStyles();

    const [upcomingMeetingsList, setUpcomingMeetingsList] = useState<MeetingInterface[]>([]);
    const [bgName, setBGName] = useState<string>("");
    const [enableLoadingIcon, setEnableLoadingIcon] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const lInnovationData = useContext(InnovationAppContext);
    const history = useHistory();

    const lNodeEventData = useContext(NodeEventContext);
    useEffect(() => {
        setEnableLoadingIcon(true);
        MeetingService.innovationGetMeetingsList(lInnovationData.eskoAccountDetail.repoid)
            .then((meetingListResponse: MeetingInterface[]) => {
                sortAndSetMeetingsList(meetingListResponse);
                setEnableLoadingIcon(false);
            })
            .catch((err: any) => {
                console.error(err);
                setEnableLoadingIcon(false);
                setIsError(true);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.SIRUpdated, lNodeEventData.PPGUpdated]);

    useEffect(() => {
        if (upcomingMeetingsList.length > 0 && upcomingMeetingsList[0].discussionTopics.length > 0
            && "Business Goal" === upcomingMeetingsList[0].discussionTopics[0].topicType) {
            SearchService.searchGetBGListWithID(lInnovationData.eskoAccountDetail.repoid)
                .then((bgListResponse: BusinessGoalWithIdType[]) => {
                    findAndSetBG(bgListResponse);
                    setEnableLoadingIcon(false);
                })
                .catch((err: any) => {
                    console.error(err);
                    setEnableLoadingIcon(false);
                });
        }
    }, [upcomingMeetingsList]);

    function findAndSetBG(bgListResponse: BusinessGoalWithIdType[]): void {
        const foundBG: BusinessGoalWithIdType | undefined = bgListResponse.find((bg: BusinessGoalWithIdType) =>
            upcomingMeetingsList[0].discussionTopics.length > 0
            && bg.nodeId === upcomingMeetingsList[0].discussionTopics[0].topic);
        undefined === foundBG ? setBGName("") : setBGName(foundBG.businessGoalName);
    }

    function sortAndSetMeetingsList(meetingListResponse: MeetingInterface[]): void {
        if (meetingListResponse.length >= 1) {
            const todaysDate = getTimeAndDate()[0];
            setUpcomingMeetingsList(meetingListResponse.filter(meeting => meeting.date >= todaysDate));
        } else {
            setUpcomingMeetingsList([]);
        }
    }

    function prepareUpcomingMeetingsWidgetContent(): JSX.Element {
        if (isError) {
            return (
                <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                    <Typography>No results found.</Typography>
                </Grid>
            );
        } else if (0 === upcomingMeetingsList.length) {
            return (
                <>
                    <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                        <Typography>No meeting scheduled.</Typography>
                    </Grid>
                    {lInnovationData.userPermission.leftNav.isSettingEnabled && prepareLink("Schedule meeting...")}
                </>
            );
        }
        return (
            <>
                {prepareUpComingMeetingsGridContainerList().map((gridContainer: JSX.Element) => gridContainer)}
                {upcomingMeetingsList.length > 3 && lInnovationData.userPermission.leftNav.isSettingEnabled ? prepareLink("See more...") : null}
            </>
        );
    }

    function prepareUpComingMeetingsGridContainerList(): JSX.Element[] {
        const numberOfMeetingsToBeDisplayed: number = upcomingMeetingsList.length > 3 ? 3 : upcomingMeetingsList.length;
        return upcomingMeetingsList.slice(0, numberOfMeetingsToBeDisplayed).map((meeting: MeetingInterface) => {
            return (
                <Grid item container direction="row" className={upcomingMeetingsStyleClasses.meetingsListGridContainer}>
                    <Grid item className={upcomingMeetingsStyleClasses.meetingDateGridItem}>
                        {convertDateIntoDDMMMYYYYFormat(meeting.date)}
                    </Grid>
                    <Grid item className={upcomingMeetingsStyleClasses.meetingTypeGridItem}>{meeting.meetingType}</Grid>
                </Grid>
            );
        });
    }

    function prepareLink(label: string): JSX.Element {
        return (
            <Grid item className={upcomingMeetingsStyleClasses.linkGridItem}>
                <Button
                    disableFocusRipple
                    disableRipple
                    onClick={() => history.push(Links.meetingView(lInnovationData.eskoAccountDetail.repoid))}
                    classes={{
                        root: upcomingMeetingsStyleClasses.linkRoot,
                        label: upcomingMeetingsStyleClasses.linkLabel
                    }}>
                    {label}
                </Button>
            </Grid>
        );
    }

    return (
        <Grid container direction="column">
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4> Upcoming Meetings </h4>
            </Grid>
            {
                enableLoadingIcon ? <CircularProgress className={upcomingMeetingsStyleClasses.loadingIcon} /> :
                    prepareUpcomingMeetingsWidgetContent()
            }
        </Grid>
    )
}
