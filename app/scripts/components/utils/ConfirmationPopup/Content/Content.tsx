import { DialogContent, Typography } from "@material-ui/core";
import React from "react";
import ContentModel from "./ContentModel";
import { ContentStyles } from "./ContentStyles";

export default function Content(contentProps: ContentModel) {
    const contentStyleClassess = ContentStyles();
    
    return (
        <DialogContent className={contentStyleClassess.content}>
            <Typography className={contentStyleClassess.text}>
                {contentProps.text }
            </Typography>
        </DialogContent>
    )
}