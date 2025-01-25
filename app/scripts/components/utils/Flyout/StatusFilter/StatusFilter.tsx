import { Grid } from "@material-ui/core";
import React from "react";
import { StatusFilterButton } from "../../../StatusFilterButton";
import { FlyoutStyles } from "../FlyoutStyles";
import StatusFilterModel from "./StatusFilterModel";

export default function StatusFilter(statusFilterProps: StatusFilterModel) {
    const flyoutStyleClasses = FlyoutStyles();

    return (
        <Grid container direction="column">
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4>Status Filter</h4>
            </Grid>
            <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                {
                    (undefined !== statusFilterProps.listOfButtons && undefined !== statusFilterProps.selectedStatusValues
                        && undefined !== statusFilterProps.setSelectedStatusValues) &&
                    <StatusFilterButton
                        listOfButtons={statusFilterProps.listOfButtons}
                        selectedStatusValues={statusFilterProps.selectedStatusValues}
                        setSelectedStatusValues={statusFilterProps.setSelectedStatusValues} />
                }
            </Grid>
        </Grid>
    )
}
