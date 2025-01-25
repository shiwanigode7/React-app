import React from "react";
import LabelModel from "./LabelModel";
import { Typography } from "@material-ui/core";
import { LabelStyles } from "./LabelStyles";

export default function Label(labelProps: LabelModel) {
    const labelStyleClasses = LabelStyles();

    return (
        <Typography className={labelStyleClasses.label}>
            {labelProps.text}
        </Typography>
    )
}