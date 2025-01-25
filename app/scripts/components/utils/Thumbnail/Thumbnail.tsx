import React from "react";
import { Avatar, CardHeader } from "@material-ui/core";
import { ThumbnailStyles } from "./ThumbnailStyles";
import ThumbnailModel from "./ThumbnailModel";

export default function Thumbnail(thumbnailProps: ThumbnailModel) {
    const thumbnailStyleClasses = ThumbnailStyles();
    
    return (
        <CardHeader
            avatar={
                <Avatar
                    alt={thumbnailProps.altText}
                    src={thumbnailProps.src}
                    variant="circular"
                    className={thumbnailStyleClasses.avatarRoot} />
            }
            classes={{
                root: thumbnailStyleClasses.cardHeaderRoot,
                avatar: thumbnailStyleClasses.cardHeaderAvatar
            }} />
    )
}
