import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { COLOR_GREY_AVATAR } from "../constant/Colors";

export function userAvatarTextColor(inUserName: string) {
    return LightTheme.palette.getContrastText(LightTheme.palette.getUserColor ?
        LightTheme.palette.getUserColor(
            (
                inUserName.split(", ")[1] !== undefined ?
                    inUserName.split(", ")[1].charAt(0) :
                    ""
            ) +
            (
                inUserName.split(", ")[0] !== undefined ?
                    inUserName.split(", ")[0].charAt(0) :
                    ""
            )
        ) :
        LightTheme.palette.grey[400] || COLOR_GREY_AVATAR
    );
}

export function userAvatarBackgroundColor(inUserName: string) {
    return LightTheme.palette.getUserColor ?
        LightTheme.palette.getUserColor(
            (
                inUserName.split(", ")[1] !== undefined ?
                    inUserName.split(", ")[1].charAt(0) :
                    ""
            ) +
            (
                inUserName.split(", ")[0] !== undefined ?
                    inUserName.split(", ")[0].charAt(0) :
                    ""
            )
        ) :
        COLOR_GREY_AVATAR;
}