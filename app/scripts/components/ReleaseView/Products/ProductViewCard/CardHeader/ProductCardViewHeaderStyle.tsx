import { makeStyles } from "@material-ui/core";

export const ProductCardViewHeaderStyle = makeStyles(({
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "5px",
        width: "100%"
    },
    productNameItem: {
        maxWidth: "82%"
    },
    productNameGridForFourUserAvatars: {
        width: "65%"
    },
    userAvatarGridForFourUserAvatars: {
        width: "35%"
    },
    productNameGridForThreeUserAvatars: {
        width: "73%"
    },
    userAvatarGridForThreeUserAvatars: {
        width: "27%"
    },
    productNameGridForTwoUserAvatars: {
        width: "83%"
    },
    userAvatarGridForTwoUserAvatars: {
        width: "17%"
    },
    productNameGridForOneUserAvatars: {
        width: "90%"
    },
    userAvatarGridForOneUserAvatars: {
        width: "10%"
    },
    avatar: {
        padding: "8px"
    },
    productName: {
        fontSize: "14px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    avatarGrid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    productManagersGrid: {
        margin: "4px 0px",
        fontSize: "12px"
    }
}));