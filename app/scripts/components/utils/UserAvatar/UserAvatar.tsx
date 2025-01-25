import { Avatar, Grid, Tooltip, Typography } from "@material-ui/core"
import React from "react";
import { UserAvatarPropsModel } from "./UserAvatarModel";
import { UserAvatarStyles } from "./UserAvatarStyles";

export function UserAvatar(UserAvatarProps: UserAvatarPropsModel) {

    const UserAvatarClasses = UserAvatarStyles({
        userName: UserAvatarProps.userName,
        avatarSize: UserAvatarProps.avatarSize,
        smallFont: UserAvatarProps.smallFont
    });

    const USER_NAME_TEXT: React.ReactNode = UserAvatarProps.displayText ?
        <Typography classes={{ body1: UserAvatarClasses.typography }}>
            {UserAvatarProps.userName}
        </Typography> : null;

    function getAvatar() {
        const splitUserFullName = UserAvatarProps.userName.split(", ");
        const firstName = splitUserFullName[1];
        const surname = splitUserFullName[0];

        let avatar: React.ReactNode = <Tooltip title={"" === UserAvatarProps.userName ? "Unassigned" : UserAvatarProps.userName} arrow placement="bottom">
            <Avatar className={"" === UserAvatarProps.userName ? UserAvatarClasses.unassignedAvatar : UserAvatarClasses.avatar}>
                {"" === UserAvatarProps.userName ? "-" :(undefined !== firstName ? firstName.charAt(0) : "") + (
                    undefined !== surname ? surname.charAt(0) : ""
                )}
            </Avatar>
        </Tooltip>;

        if (UserAvatarProps.displayText) {
            avatar = <Avatar className={UserAvatarClasses.avatar}>
                {(undefined !== firstName ? firstName.charAt(0) : "") + (
                    undefined !== surname ? surname.charAt(0) : ""
                )}
            </Avatar>;
        }
        return avatar;
    }

    return (
        < Grid
            container
            direction="row"
            spacing={1}
            className={UserAvatarClasses.gridContainer}
        >
            <Grid item>
                {/* Inline styling done to avoid the definition of the props in theme which leads
             * which leads increased unused variables for other classes  */}
                {getAvatar()}
            </Grid>
            { UserAvatarProps.displayText ?
            <Grid item>
                {USER_NAME_TEXT}
            </Grid> : null }
        </Grid >
    );
}