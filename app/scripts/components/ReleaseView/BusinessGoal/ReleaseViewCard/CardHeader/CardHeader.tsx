import { Grid, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { LaunchIcon } from "../../../../../../Icons/ReleaseViewIcons";
import { BG_RELEASE_TYPE } from "../../../../../constant/InnovationEnums";
import { UserAvatar } from "../../../../utils/UserAvatar/UserAvatar";
import CardHeaderModel from "./CardHeaderModel";
import { CardHeaderStyle, OwnerAvatarStyles } from "./CardHeaderStyle";

export function CardHeader(cardHeaderProps: CardHeaderModel) {

    const OWNER_FIRST_NAME: string = undefined !== cardHeaderProps.userAvatar.split(", ")[1] ? cardHeaderProps.userAvatar.split(", ")[1] : "";
    const OWNER_LAST_NAME: string = undefined !== cardHeaderProps.userAvatar.split(", ")[0] ? cardHeaderProps.userAvatar.split(", ")[0] : "";

    const CardHeaderStyleClasses = CardHeaderStyle();
    const UserAvatarClasses = OwnerAvatarStyles({ ownerFirstName: OWNER_FIRST_NAME, ownerLastName: OWNER_LAST_NAME });

    const AVATAR_SIZE: string = "30px";

    /**Component to display the core team on hovering over the business goal owner avatar */
    const CORE_TEAM_TOOLTIP_COMPONENT: React.ReactNode = <Grid container direction="column">
        <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
            {"Owner"}
        </Grid>
        {
            "" !== cardHeaderProps.userAvatar &&
            <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                <UserAvatar
                    displayText={true}
                    avatarSize={AVATAR_SIZE}
                    userName={cardHeaderProps.userAvatar}
                />
            </Grid>
        }
        <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
            {"Core Team"}
        </Grid>
        {
            "" !== cardHeaderProps.coreTeam.productManager ?
                <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                    <UserAvatar
                        displayText={true}
                        avatarSize={AVATAR_SIZE}
                        userName={cardHeaderProps.coreTeam.productManager}
                    />
                </Grid> : null
        }
        {
            "" !== cardHeaderProps.coreTeam.projectManager ?
                <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                    <UserAvatar
                        displayText={true}
                        avatarSize={AVATAR_SIZE}
                        userName={cardHeaderProps.coreTeam.projectManager}
                    />
                </Grid> : null
        }
        {
            "" !== cardHeaderProps.coreTeam.marketing ?
                <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                    <UserAvatar
                        displayText={true}
                        avatarSize={AVATAR_SIZE}
                        userName={cardHeaderProps.coreTeam.marketing}
                    />
                </Grid> : null
        }
        {
            "" !== cardHeaderProps.coreTeam.researchAndDevelopment ?
                <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                    <UserAvatar
                        displayText={true}
                        avatarSize={AVATAR_SIZE}
                        userName={cardHeaderProps.coreTeam.researchAndDevelopment}
                    />
                </Grid> : null
        }
        {
            "" !== cardHeaderProps.coreTeam.sales ?
                <Grid item className={CardHeaderStyleClasses.coreTeamGrid}>
                    <UserAvatar
                        displayText={true}
                        avatarSize={AVATAR_SIZE}
                        userName={cardHeaderProps.coreTeam.sales}
                    />
                </Grid> : null
        }
    </Grid>;

    return (
        <Grid container className={CardHeaderStyleClasses.cardHeader}>
            <Grid item>
                <Grid container className={CardHeaderStyleClasses.cardHeader}>
                    <Grid item className={CardHeaderStyleClasses.avatar}>
                        <Avatar src={cardHeaderProps.BGThumbnail} />
                    </Grid>
                    <Grid item>
                        <Tooltip title={cardHeaderProps.businessGoalName} arrow placement="right-start">
                            <div className={cardHeaderProps.openFilterMenu ? CardHeaderStyleClasses.businessGoalName : CardHeaderStyleClasses.businessGoalNameFlyOutClosed}>
                                {cardHeaderProps.businessGoalName}
                            </div>
                        </Tooltip>
                    </Grid>
                    {cardHeaderProps.isLaunchRelease &&
                        <Tooltip title={BG_RELEASE_TYPE.LAUNCH_RELEASE} arrow placement="right">
                            <Grid item className={CardHeaderStyleClasses.releaseType}>
                                <LaunchIcon />
                            </Grid>
                        </Tooltip>
                    }
                </Grid>
            </Grid>
            <Grid item className={CardHeaderStyleClasses.avatar}>
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
        </Grid>
    )
}