import React from "react";
import ThumbnailWithNameModel from "./ThumbnailWithNameModel";
import { Grid } from "@material-ui/core";
import Thumbnail from "../Thumbnail/Thumbnail";
import TextWithTooltip from "../TextWithTooltip/TextWithTooltip";
import { ThumbnailWithNameStyles } from "./ThumbnailWithNameStyles";

export default function ThumbnailWithName(thumbnailWithNameProps: ThumbnailWithNameModel) {
    const thumbnailWithNameStyleClasses = ThumbnailWithNameStyles();

    return (
        <Grid container spacing={1} className={thumbnailWithNameStyleClasses.thumbnailWithNameContainer}>
            <Grid item>
                <Thumbnail
                    altText={thumbnailWithNameProps.thumbnailAltText}
                    src={thumbnailWithNameProps.src} />
            </Grid>
            <Grid item >
                <TextWithTooltip
                    text={thumbnailWithNameProps.name}
                    tooltipText={thumbnailWithNameProps.tooltipText}
                    isTextBold={thumbnailWithNameProps.isNameBold}
                    tooltipPlacement={thumbnailWithNameProps.tooltipPlacement} />
            </Grid>
        </Grid>
    )
}
