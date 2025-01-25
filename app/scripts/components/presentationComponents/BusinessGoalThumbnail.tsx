/**TSX file defining the thumbnail component used in the SIR and PPG presentation */

import { Avatar } from "@material-ui/core";
import React from "react";
import images from "../../../Icons/images";
import { BusinessGoalThumbnailStyles } from "../../themes/BusinessGoalThumbnailTheme";

declare interface BusinessGoalThumbnailProps {
    imageLink?: string;
}

export function BusinessGoalThumbnail(inputProps: BusinessGoalThumbnailProps) {
    /**Import styling */
    const BusinessGoalThumbnailClasses = BusinessGoalThumbnailStyles();
    /**Image link to be displayed */
    const imageLink:string = undefined !== inputProps.imageLink ? inputProps.imageLink : (window.location.origin + images.EskoIcon);

    return (
        <Avatar
            src={imageLink}
            className={BusinessGoalThumbnailClasses.avatar} 
        />
    );
}