import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import Links from "../../Links";
import RRMByBusinessGoal from "./RRMByBusinessGoal/RRMByBusinessGoal";
import RRMByRunway from "./RRMByRunway/RRMByRunway";
import { RRMViewStyles } from "./RRMViewStyles";

export default function RRMView() {

    const lInnovationData = useContext(InnovationAppContext);
    const rrmViewStyleClasses = RRMViewStyles();

    return (
        <Grid container className={rrmViewStyleClasses.rrmView}>
            <Switch>
                <Route exact path={`/home/rrm/${lInnovationData.eskoAccountDetail.repoid}`} render={() => <Redirect to={Links.rrmByBusinessGoalView(lInnovationData.eskoAccountDetail.repoid)} />} />
                <Route exact path={Links.rrmByBusinessGoalView(":repoId")} component={RRMByBusinessGoal} />
                <Route exact path={Links.rrmByRunwayView(":repoId")} component={RRMByRunway} />
            </Switch>
        </Grid>
    )
}
