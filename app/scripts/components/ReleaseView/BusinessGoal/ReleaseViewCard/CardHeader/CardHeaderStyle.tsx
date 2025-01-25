import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { makeStyles } from "@material-ui/core";
import { COLOR_GREY_AVATAR, COLOR_WHITE, IDEATION_COLOR } from "../../../../../constant/Colors";
import { OwnerAvatarThemeProps } from "./CardHeaderModel";

export const CardHeaderStyle = makeStyles(({
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        marginTop: "8px",
        marginRight: "8px",
        marginLeft: "8px"
    },
    releaseType: {
        marginTop: "6px",
        marginLeft: "4px"
    },
    businessGoalName: {
        fontSize: "14px",
        fontWeight: 500,
        maxWidth: "406px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    businessGoalNameFlyOutClosed: {
        fontSize: "14px",
        fontWeight: 500,
        maxWidth: "520px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    coreTeamGrid: {
        margin: "4px 0px",
        fontSize: "12px"
    }
}));

/**Styles for the owner */
export const OwnerAvatarStyles = makeStyles(() => ({
    avatar: (themeInput: OwnerAvatarThemeProps) => ({
        color: LightTheme.palette.getContrastText(LightTheme.palette.getUserColor ?
            LightTheme.palette.getUserColor(themeInput.ownerFirstName.charAt(0) + themeInput.ownerLastName.charAt(0)) :
            LightTheme.palette.grey[400] || COLOR_GREY_AVATAR
        ),
        backgroundColor: LightTheme.palette.getUserColor ?
            LightTheme.palette.getUserColor(themeInput.ownerFirstName.charAt(0) + themeInput.ownerLastName.charAt(0)) :
            COLOR_GREY_AVATAR
    }),
    scoreAvatar: {
        color: COLOR_WHITE,
        backgroundColor: IDEATION_COLOR,
        fontSize: "small"
    }
}));