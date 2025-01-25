import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProfitIcon } from "../../../../Icons/ProfitIcon";
import { COLOR_WHITE } from "../../../constant/Colors";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import Links from "../../../Links";
import { InvestmentIcon } from "../../Icons/InvestmentIcon";
import { TruckIcon } from "../../Icons/TruckCheckIcon";
import { FlyoutStyles } from "./FlyoutStyles";

export default function InnovationKPIOverview() {
    const flyoutStyleClasses = FlyoutStyles();

    const lInnovationData = useContext(InnovationAppContext);
    const history = useHistory();

    const otd: string = "OTD";
    const revenueAchievements = "RevenueAchievements";
    const ipv: string = "IPV";

    const handleButtonNavigation = (view: string) => {
        switch (view) {
            case otd: history.push(Links.innovationKPIOnTimeDeliveryView(lInnovationData.eskoAccountDetail.repoid));
                break;
            case revenueAchievements: history.push(Links.innovationKPIRevenueAchivementView(lInnovationData.eskoAccountDetail.repoid));
                break;
            case ipv: history.push(Links.innovationKPIIncrementalPipelineValueView(lInnovationData.eskoAccountDetail.repoid));
                break;
        }
    };

    return (
        <Grid container direction="column">
            <Grid item className={flyoutStyleClasses.headingGridItem}>
                <h4>Innovation KPIs</h4>
            </Grid>
            <Grid item className={flyoutStyleClasses.widgetContentGridItem}>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<TruckIcon size="24" fill={COLOR_WHITE} />} className={window.location.pathname.includes("/home/innovation-kpi/otd/")
                        ? flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleButtonNavigation(otd)}>
                    On-Time Delivery
                </Button>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<InvestmentIcon size={"24"} />} className={window.location.pathname.includes("/home/innovation-kpi/revenueAchievements/")
                        ? flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleButtonNavigation(revenueAchievements)}>
                    Revenue Achievement
                </Button>
                <Button
                    classes={{ startIcon: flyoutStyleClasses.buttonIcon }}
                    startIcon={<ProfitIcon size={"24"} />} className={window.location.pathname.includes("/home/innovation-kpi/ipv/")
                        ? flyoutStyleClasses.selectedButton : flyoutStyleClasses.button}
                    onClick={() => handleButtonNavigation(ipv)}>
                    Incremental Pipeline Value
                </Button>
            </Grid>
        </Grid>
    )
}
