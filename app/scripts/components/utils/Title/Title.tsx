import React from "react";
import TitleModel from "./TitleModel";
import { Typography } from "@material-ui/core";
import { TitleStyles } from "./TitleStyles";

export default function Title(titleProps: TitleModel) {
    const titleStyleClasses = TitleStyles();

    return (
        <Typography className={titleStyleClasses.label}>
            {titleProps.text}
        </Typography>
    )
}