/**TSX file with all the styles for AvatarUpload Component */
import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const AvatarUploadStyles = makeStyles(() => ({
    AvatarImage: {
        "&img": {
            backgroud: "white"
        }
    },

    avatarLarge:{
        height:"80px",
        width:"80px"
    },

    avatarSmall:{
        height:"40px",
        width:"40px"
    },

    container: {
        position: "relative",
        width: "100 %",
        display: "inline-flex",
        marginTop: "3px"
    },

    overlayLarge: {
        width: "80px",
        height: "80px",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        marginLeft: "-80px",
        alignItems: "center",
        borderRadius: "50%",
        justifyContent: "center",
        opacity: 0,
        "&:hover": {
            visibility: "visible",
            background: "black",
            opacity: 0.7,
        }
    },

    overlaySmall: {
        width: "32px",
        height: "32px",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        marginLeft: "-32px",
        alignItems: "center",
        borderRadius: "50%",
        justifyContent: "center",
        opacity: 0,
        "&:hover": {
            visibility: "visible",
            background: "black",
            opacity: 0.7,
        }
    },

    overlayNone: {
        width: "40px",
        height: "40px",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        marginLeft: "-40px",
        alignItems: "center",
        borderRadius: "50%",
        justifyContent: "center",
        opacity: 0,
        "&:hover": {
            visibility: "visible",
            background: "black",
            opacity: 0.7,
        }
    },

    cropperContainer: {
        display: "flex",
        flexDirection: "row",
    },

    cropperLarge: {
        display: "flex",
        overflow: "hidden",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },

    iconStyle: {
        color: "white",
    },

    iconContainer: {
        width: "min-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end"
    }

}));

export const AvatarThumbnailTheme = createMuiTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiAvatar: {
            img: {
                background: "white"
            }
        },
        MuiIconButton: {
            root: {
                padding: 0
            }
        },
        MuiPopover: {
            paper: {
                display: "flex"
            }
        }

    }
});

