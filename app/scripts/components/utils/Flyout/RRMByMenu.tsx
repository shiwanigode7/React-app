import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FormatListBulletedIcon from "../../../../Icons/FormatListBulletedIcon";
import { BusinessGoalIcon } from "../../../../Icons/ReleaseViewIcons";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import Links from "../../../Links";
import { FlyoutStyles } from "./FlyoutStyles";

export default function RRMByMenu() {
    const flyoutStyleClasses = FlyoutStyles();

    const lInnovationData = useContext(InnovationAppContext);
    const history = useHistory();

    const handleRRMByButtonNavigation = (view: string) => {
        switch (view) {
            case "BG": history.push(Links.rrmByBusinessGoalView(lInnovationData.eskoAccountDetail.repoid));
                break;
            case "Runway": history.push(Links.rrmByRunwayView(lInnovationData.eskoAccountDetail.repoid));
                break;
        }
    };

    return (
        <Grid container direction="column">
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4>RRM by</h4>
            </Grid>
            <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<BusinessGoalIcon />}
                    className={window.location.pathname.includes("/home/rrm/businessGoal/") ?
                        flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleRRMByButtonNavigation("BG")}>
                    Business Goal
                </Button>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<FormatListBulletedIcon />}
                    className={window.location.pathname.includes("/home/rrm/runway/") ?
                        flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleRRMByButtonNavigation("Runway")}>
                    Runway
                </Button>
            </Grid>
        </Grid>
    )
}
