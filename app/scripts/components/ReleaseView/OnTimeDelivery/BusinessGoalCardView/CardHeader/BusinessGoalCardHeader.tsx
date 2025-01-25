import { Avatar, Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { UserAvatar } from "../../../../utils/UserAvatar/UserAvatar";
import { OwnerAvatarStyles } from "../../../BusinessGoal/ReleaseViewCard/CardHeader/CardHeaderStyle";
import BusinessGoalCardHeaderModel from "./BusinessGoalCardHeaderModel";
import { ProductCardViewHeaderStyle } from "./BusinessGoalCardHeaderStyle";

export function BusinessGoalCardHeader(businessGoalCardHeaderProps: BusinessGoalCardHeaderModel) {
    const OWNER_FIRST_NAME: string = undefined !== businessGoalCardHeaderProps.userAvatar.split(", ")[1] ? businessGoalCardHeaderProps.userAvatar.split(", ")[1] : "";
    const OWNER_LAST_NAME: string = undefined !== businessGoalCardHeaderProps.userAvatar.split(", ")[0] ? businessGoalCardHeaderProps.userAvatar.split(", ")[0] : "";
    const CardHeaderStyleClasses = ProductCardViewHeaderStyle();

    const UserAvatarClasses = OwnerAvatarStyles({ ownerFirstName: OWNER_FIRST_NAME, ownerLastName: OWNER_LAST_NAME });

    const AVATAR_SIZE: string = "30px";

    const CORE_TEAM_TOOLTIP_COMPONENT: React.ReactNode = <Grid container direction="column">
        <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
            {"Owner"}
        </Grid>
        {
            "" !== businessGoalCardHeaderProps.userAvatar &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.userAvatar}
                />
            </Grid>
        }
        <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
            {"Core Team"}
        </Grid>
        {
            "" !== businessGoalCardHeaderProps.coreTeam.productManager &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.coreTeam.productManager}
                />
            </Grid>
        }
        {
            "" !== businessGoalCardHeaderProps.coreTeam.projectManager &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.coreTeam.projectManager}
                />
            </Grid>
        }
        {
            "" !== businessGoalCardHeaderProps.coreTeam.marketing &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.coreTeam.marketing}
                />
            </Grid>
        }
        {
            "" !== businessGoalCardHeaderProps.coreTeam.researchAndDevelopment &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.coreTeam.researchAndDevelopment}
                />
            </Grid>
        }
        {
            "" !== businessGoalCardHeaderProps.coreTeam.sales &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={businessGoalCardHeaderProps.coreTeam.sales}
                />
            </Grid>
        }
    </Grid>;

    return (
        <Grid container className={CardHeaderStyleClasses.cardHeader}>
            <Grid item>
                <Grid container className={CardHeaderStyleClasses.cardHeader}>
                    <Grid item className={CardHeaderStyleClasses.avatar}>
                        <Avatar src={businessGoalCardHeaderProps.businessGoalThumbnail} />
                    </Grid>
                    <Grid item>
                        <Tooltip title={businessGoalCardHeaderProps.businessGoalName} arrow placement="right-start">
                            <div className={businessGoalCardHeaderProps.openFilterMenu ? CardHeaderStyleClasses.businessGoalName : CardHeaderStyleClasses.businessGoalNameFlyOutClosed}>
                                {businessGoalCardHeaderProps.businessGoalName}
                            </div>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={CardHeaderStyleClasses.avatar}>
                <Grid spacing={1} container className={CardHeaderStyleClasses.avatarGrid}>
                    <Grid item>
                        <Tooltip
                            arrow
                            placement="bottom"
                            title={CORE_TEAM_TOOLTIP_COMPONENT}
                        >
                            <Avatar className={UserAvatarClasses.avatar}>
                                {OWNER_FIRST_NAME.charAt(0) + OWNER_LAST_NAME.charAt(0)}
                            </Avatar>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip
                            arrow
                            placement="bottom"
                            title={"OTD Score"}
                        >
                            <Avatar className={UserAvatarClasses.scoreAvatar}>
                                {`${businessGoalCardHeaderProps.overallScore}%`}
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
