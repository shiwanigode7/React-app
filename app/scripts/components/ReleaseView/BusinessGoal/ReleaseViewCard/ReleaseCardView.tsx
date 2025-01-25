import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BG_RELEASE_TYPE } from "../../../../constant/InnovationEnums";
import { MilestoneModel, ReleaseTimelineModel, UserListWithEmailModel } from "../../../../interfaces/InnovationInterface";
import { CardContentView } from "./CardContent/CardContentView";
import { CardHeader } from "./CardHeader/CardHeader";
import ReleaseCardViewModel from "./ReleaseCardViewModel";
import { ReleaseCardViewStyle } from "./ReleaseCardViewStyle";

export function ReleaseViewCard(releaseViewCardProps: ReleaseCardViewModel) {
    const ReleaseViewCardStyleClass = ReleaseCardViewStyle();
    const [isLaunchRelease, setIsLaunchRelease] = useState<boolean>(false)
    const [ownerName, setOwnerName] = useState<string>("");
    const [mileStones, setMileStones] = useState<string[]>([]);

    const getMilestonesList = (milestoneIdList: string[]): string[] => {
        const lMilestonesList: string[] = [];
        milestoneIdList.forEach((milestone: string) => {
            releaseViewCardProps.businessGoal.milestones.forEach((BGMilestone: MilestoneModel) => {
                if (milestone === BGMilestone.milestoneId) {
                    lMilestonesList.push(BGMilestone.milestoneName);
                }
            })
        })
        return (lMilestonesList);
    }

    useEffect(() => {
        releaseViewCardProps.businessGoal.releaseTimelineData.forEach((releaseTimelineData: ReleaseTimelineModel) => {
            if ((releaseViewCardProps.selectedReleaseId === releaseTimelineData.releaseNodeId) && (BG_RELEASE_TYPE.LAUNCH_RELEASE === releaseTimelineData.releaseType)) {
                setIsLaunchRelease(true);
            }
        })

        releaseViewCardProps.businessGoal.releaseTimelineData.forEach((releaseTimeline) => {
            if (releaseViewCardProps.selectedReleaseId === releaseTimeline.releaseNodeId) {
                setMileStones(getMilestonesList(releaseTimeline.milestones));
            }
        })
    }, []);

    useEffect(() => {
        let lOwnerName: string = "";
        releaseViewCardProps.userList.forEach((user: UserListWithEmailModel) => {
            if (user.email === releaseViewCardProps.businessGoal.owner) {
                lOwnerName = user.displayName;
            }
        })
        setOwnerName(lOwnerName);
    }, [releaseViewCardProps.userList, releaseViewCardProps.businessGoal]);


    return (
        <Card className={ReleaseViewCardStyleClass.CardClass}>
            <CardHeader
                BGThumbnail={releaseViewCardProps.businessGoal.thumbnail.toString()}
                userAvatar={ownerName}
                businessGoalName={releaseViewCardProps.businessGoal.businessGoalName.toString()}
                isLaunchRelease={isLaunchRelease}
                coreTeam={releaseViewCardProps.businessGoal.coreTeam}
                openFilterMenu={releaseViewCardProps.openFilterMenu}
            />
            <CardContent className={ReleaseViewCardStyleClass.cardContent} >
                <CardContentView
                    description={releaseViewCardProps.businessGoal.briefDescription.toString()}
                    runways={releaseViewCardProps.runwayList}
                    milestones={mileStones}
                    selectedRelease={releaseViewCardProps.selectedRelease}
                />
            </CardContent>
        </Card>
    )
}