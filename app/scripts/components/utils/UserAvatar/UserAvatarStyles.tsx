import { makeStyles } from "@material-ui/styles";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../../utils/UserAvatarColorFunction";
import { UserAvatarStylesPropsModel } from "./UserAvatarModel";

export const UserAvatarStyles = makeStyles(() => ({
    avatar: (themeInput: UserAvatarStylesPropsModel) => ({
        width: themeInput.avatarSize,
        height: themeInput.avatarSize,
        marginTop: "-1px",
        fontSize: undefined !== themeInput.smallFont ? themeInput.smallFont ? "14px" : "larger" : "14px",
        color: userAvatarTextColor(themeInput.userName),
        backgroundColor: userAvatarBackgroundColor(themeInput.userName)
    }),

    gridContainer: {
        display: "inline-flex",
        flexWrap: "nowrap",
        width: "auto"
    },

    unassignedAvatar: {
        color: "black"
    },

    typography: {
        marginTop: "5px",
        fontSize: "12px"
    },
}));