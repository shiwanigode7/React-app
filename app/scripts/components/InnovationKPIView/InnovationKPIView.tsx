import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import Links from "../../Links";
import { Redirect, Route, Switch } from "react-router-dom";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { OnTimeDeliveryView } from "../ReleaseView/OnTimeDelivery/OnTimeDeliveryView";
import { ReleaseViewStyle } from "../ReleaseView/ReleaseViewStyle";
import { RevenueAchivementsView } from "../ReleaseView/RevenueAchievements/RevenueAchievementsView";
import { IncrementalPipelineValueView } from "./IncrementalPipelineValueView/IncrementalPipelineValueView";

export default function InnovationKPIView() {

    const lInnovationData = useContext(InnovationAppContext);

    const ReleaseViewStyleClasses = ReleaseViewStyle();

    return (
        <Grid container className={ReleaseViewStyleClasses.releaseView}>
            <Grid item className={ReleaseViewStyleClasses.releaseContent}>
                <Switch>
                    <Route exact path={`/home/innovation-kpi/${lInnovationData.eskoAccountDetail.repoid}`} render={() => <Redirect to={Links.innovationKPIOnTimeDeliveryView(lInnovationData.eskoAccountDetail.repoid)} />} />
                    <Route exact path={Links.innovationKPIOnTimeDeliveryView(":repoId")} component={OnTimeDeliveryView} />
                    <Route exact path={Links.innovationKPIRevenueAchivementView(":repoId")} component={RevenueAchivementsView} />
                    <Route exact path={Links.innovationKPIIncrementalPipelineValueView(":repoId")} component={IncrementalPipelineValueView} />
                </Switch>
            </Grid>
        </Grid>
    )
}