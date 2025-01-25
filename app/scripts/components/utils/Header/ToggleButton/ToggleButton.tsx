import React from "react";
import { FormControlLabel, Grid, Switch, ThemeProvider } from "@material-ui/core";
import ToggleButtonModel from "./ToggleButtonModel";
import { ToggleButtonStyles, ToggleButtonTheme } from "./ToggleButtonStyles";

export default function ToggleButton(toggleButtonProps: ToggleButtonModel) {
    const toggleButtonStyleClasses = ToggleButtonStyles();
    return (
        <Grid item className={undefined !== toggleButtonProps.hasNextComponent ? 
                    (toggleButtonProps.hasNextComponent ? toggleButtonStyleClasses.toggleButtonGridWIthNextComponent : toggleButtonStyleClasses.toggleButton) 
                    : toggleButtonStyleClasses.toggleButton}>
            <ThemeProvider theme={ToggleButtonTheme}>
                <FormControlLabel
                    control={ <Switch
                                onChange={toggleButtonProps.handleChange}
                                disableRipple={true}
                                color={"primary"} />
                            }
                                label={toggleButtonProps.label}
                />
            </ThemeProvider>
        </Grid>                           
    )
}