import { Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { FormatDate } from "../../../../utils/Utilities";
import { FlyoutStyles } from "../FlyoutStyles";
import DescriptionModel from "./DescriptionModel";
import { DescriptionStyles } from "./DescriptionStyles";

export default function Description(descriptionProps: DescriptionModel) {
    const flyoutStyleClasses = FlyoutStyles();
    const descriptionStyleClasses = DescriptionStyles();

    return (
        <Grid container>
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4> Description </h4>
            </Grid>
            {
                descriptionProps.selectedReleaseObject &&
                <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                    <Tooltip
                        title={descriptionProps.selectedReleaseObject.description}
                        placement={"bottom-start"}
                        classes={{
                            tooltip: descriptionStyleClasses.tooltip,
                            popper: descriptionStyleClasses.tooltipPopper
                        }}
                    >
                        <Typography className={descriptionStyleClasses.descriptionTypography}>
                            {descriptionProps.selectedReleaseObject.description}
                        </Typography>
                    </Tooltip>
                    <Typography className={descriptionStyleClasses.releaseDateHeading}>
                        Expected release date:
                    </Typography>
                    <Typography className={descriptionStyleClasses.releaseDate}>
                        {FormatDate(descriptionProps.selectedReleaseObject.date)}
                    </Typography>
                </Grid>
            }
        </Grid>
    )
}