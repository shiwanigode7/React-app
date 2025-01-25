import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import Links from "../../Links";
import { Redirect, Route, Switch } from "react-router-dom";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { BusinessGoalView } from "./BusinessGoal/BusinessGoalsView";
import { ProductsView } from "./Products/ProductsView";
import { ReleaseViewStyle } from "./ReleaseViewStyle";

export default function ReleaseView() {

    const lInnovationData = useContext(InnovationAppContext);

    const ReleaseViewStyleClasses = ReleaseViewStyle();

    return (
        <Grid container className={ReleaseViewStyleClasses.releaseView}>
            <Grid item className={ReleaseViewStyleClasses.releaseContent}>
                <Switch>
                    <Route exact path={`/home/release/${lInnovationData.eskoAccountDetail.repoid}`} render={() => <Redirect to={Links.releaseBusinessGoalsView(lInnovationData.eskoAccountDetail.repoid)} />} />
                    <Route exact path={Links.releaseBusinessGoalsView(":repoId")} component={() => <BusinessGoalView/>} />
                    <Route exact path={Links.releaseProductsView(":repoId")} component={ProductsView} />
                </Switch>
            </Grid>
        </Grid>
    )
}