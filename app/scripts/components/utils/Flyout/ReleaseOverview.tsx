import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BusinessGoalIcon, ProductsIcon } from "../../../../Icons/ReleaseViewIcons";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import Links from "../../../Links";
import { FlyoutStyles } from "./FlyoutStyles";

export default function ReleaseOverview() {
    const flyoutStyleClasses = FlyoutStyles();

    const lInnovationData = useContext(InnovationAppContext);
    const history = useHistory();

    const handleButtonNavigation = (view: string) => {
        switch (view) {
            case "BusinessGoals": history.push(Links.releaseBusinessGoalsView(lInnovationData.eskoAccountDetail.repoid));
                break;
            case "Products": history.push(Links.releaseProductsView(lInnovationData.eskoAccountDetail.repoid));
                break;
        }
    };

    return (
        <Grid container direction="column">
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4>Release Overview </h4>
            </Grid>
            <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<BusinessGoalIcon />}
                    className={window.location.pathname.includes("/home/release/businessGoals/")
                        ? flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleButtonNavigation("BusinessGoals")}>
                    Business Goals
                </Button>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<ProductsIcon />} className={window.location.pathname.includes("/home/release/products/")
                        ? flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleButtonNavigation("Products")}>
                    Products
                </Button>
            </Grid>
        </Grid>
    )
}
