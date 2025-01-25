import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { ProjectionsFieldModel } from "./ProjectionsFieldModel";
import { ProjectionsFieldStyle } from "./ProjectionsFieldStyle";

export function ProjectionsField(projectFieldProps: ProjectionsFieldModel) {

    const projectionsFieldStyleClasses = ProjectionsFieldStyle();

    return (
        <Grid container direction="row" alignItems="center" className={projectionsFieldStyleClasses.gridContainer}>
            <Grid item xs={projectFieldProps.titleXS}>
                <Typography className={projectionsFieldStyleClasses.titleAndSuffix}>{projectFieldProps.title}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography className={ 0 > projectFieldProps.value ? projectionsFieldStyleClasses.negativeValue : projectionsFieldStyleClasses.value}>
                    {projectFieldProps.value}
                </Typography>
            </Grid>
            <Grid item xs={projectFieldProps.suffixXS} className={projectFieldProps.isAllowMaxWidth ? projectionsFieldStyleClasses.maxwidthClass : undefined}>
                <Typography className={projectionsFieldStyleClasses.titleAndSuffix}>
                    &nbsp;{projectFieldProps.suffix}
                </Typography>
            </Grid>
        </Grid>
    )
}