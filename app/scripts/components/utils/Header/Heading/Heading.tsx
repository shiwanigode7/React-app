import React from "react";
import { HeadingStyles } from "./HeadingStyles";
import { Grid } from "@material-ui/core";
import HeadingModel  from "./HeadingModel"

export default function Heading(headingProps: HeadingModel) {
    const HeadingStyleClasses = HeadingStyles();

    return (    
        <Grid item className={ HeadingStyleClasses.heading } >
            { headingProps.heading } {headingProps.subHeading && <span className={ HeadingStyleClasses.subHeading}>{headingProps.subHeading}</span>}
        </Grid>
    )
} 