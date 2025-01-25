import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import "core-js/stable";
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import "regenerator-runtime/runtime";
import MPLNavigation from './components/MPLNavigation';
import ReleaseView from './components/ReleaseView/ReleaseView';
import { InnovationAppContext } from "./context/InnovationAppContext";
import './index.css';
import Links from './Links';
import DashboardView from './view/DashboardView';
import MPLView from './view/MPLView';
import PPLView from "./components/PPLView/PPLView";
import PPGView from './components/PPGView/PPGView';
import RRMView from "./components/RRMView/RRMView";
import SettingsView from './view/settings/SettingsView';
import SIRView from "./components/SIRView/SIRView";
import InnovationEventHandler from './events/InnovationEventHandler';
import { NodeEventContext } from './context/NodeEventContext';
import InnovationKPIView from './components/InnovationKPIView/InnovationKPIView';

export function App() {
    const theme = createTheme(
        {
            palette: {
                type: 'light',
            }
        }
    );

    /**Saving the details for local use */
    const lInnovationData = useContext(InnovationAppContext);

    /**Hook to take care of updating URL based on the repo-id change */
    useEffect(() => {
        /**force updating url without reloading the page */
        let holdPath = window.location.pathname.toString().split("/");
        /**removing the old repo id */
        holdPath.pop();
        /**pushing the latest repo id */
        holdPath.push(lInnovationData.eskoAccountDetail.repoid);
        /**merge the path into a single string */
        let holdNewPath = holdPath.join("/");
        /**Replace the path name with the new url path */
        window.history.replaceState(null, "", holdNewPath);
    }, [lInnovationData])

    /** States for all nodes */
    const [businessGoalsUpdated, setBusinessGoalsUpdated] = useState<boolean>(false);
    const [FTEUpdated, setFTEUpdated] = useState<boolean>(false);
    const [heroFeaturesUpdated, setHeroFeaturesUpdated] = useState<boolean>(false);
    const [IPVUpdated, setIPVUpdated] = useState<boolean>(false);
    const [innovationEquationsUpdated, setInnovationEquationsUpdated] = useState<boolean>(false);
    const [OTDUpdated, setOTDUpdated] = useState<boolean>(false);
    const [RAUpdated, setRAUpdated] = useState<boolean>(false);
    const [businessLinesUpdated, setBusinessLinesUpdated] = useState<boolean>(false);
    const [PPGUpdated, setPPGUpdated] = useState<boolean>(false);
    const [PPGActionsUpdated, setPPGActionsUpdated] = useState<boolean>(false);
    const [SIRUpdated, setSIRUpdated] = useState<boolean>(false);
    const [SIRActionsUpdated, setSIRActionsUpdated] = useState<boolean>(false);
    const [productsUpdated, setProductsUpdated] = useState<boolean>(false);
    const [releasesUpdated, setReleasesUpdated] = useState<boolean>(false);
    const [resourcesUpdated, setResourcesUpdated] = useState<boolean>(false);
    const [runwaysUpdated, setRunwaysUpdated] = useState<boolean>(false);

    /**Setting All the fields of the context variable */
    const contextSettings = {
        "businessGoalsUpdated": businessGoalsUpdated,
        "setBusinessGoalsUpdated": setBusinessGoalsUpdated,
        "FTEUpdated": FTEUpdated,
        "setFTEUpdated": setFTEUpdated,
        "heroFeaturesUpdated": heroFeaturesUpdated,
        "setHeroFeaturesUpdated": setHeroFeaturesUpdated,
        "IPVUpdated": IPVUpdated,
        "setIPVUpdated": setIPVUpdated,
        "innovationEquationsUpdated": innovationEquationsUpdated,
        "setInnovationEquationsUpdated": setInnovationEquationsUpdated,
        "OTDUpdated": OTDUpdated,
        "setOTDUpdated": setOTDUpdated,
        "RAUpdated": RAUpdated,
        "setRAUpdated": setRAUpdated,
        "businessLinesUpdated": businessLinesUpdated,
        "setBusinessLinesUpdated": setBusinessLinesUpdated,
        "PPGUpdated": PPGUpdated,
        "setPPGUpdated": setPPGUpdated,
        "PPGActionsUpdated": PPGActionsUpdated,
        "setPPGActionsUpdated": setPPGActionsUpdated,
        "SIRUpdated": SIRUpdated,
        "setSIRUpdated": setSIRUpdated,
        "SIRActionsUpdated": SIRActionsUpdated,
        "setSIRActionsUpdated": setSIRActionsUpdated,
        "productsUpdated": productsUpdated,
        "setProductsUpdated": setProductsUpdated,
        "releasesUpdated": releasesUpdated,
        "setReleasesUpdated": setReleasesUpdated,
        "resourcesUpdated": resourcesUpdated,
        "setResourcesUpdated": setResourcesUpdated,
        "runwaysUpdated": runwaysUpdated,
        "setRunwaysUpdated": setRunwaysUpdated
    }

    return (
        <React.StrictMode>
            <NodeEventContext.Provider value={contextSettings}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter >
                        <MPLNavigation />
                        {0 !== lInnovationData.eskoAccountDetail.repoid.length ?
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                                <Route exact path={Links.mplView(":repoId")} component={MPLView} />
                                <Route exact path={Links.pplView(":repoId")} component={PPLView} />
                                <Route exact path={Links.sirView(":repoId")} render={() => lInnovationData.userPermission.meetingModel.isSIRViewable ? <SIRView /> : <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                                <Route exact path={Links.ppgView(":repoId")} component={PPGView} />
                                <Route path={Links.rrmView(":repoId")} component={RRMView} />
                                <Route exact path={Links.dashboard(":repoId")} component={DashboardView} />
                                <Route path={Links.releaseView(":repoId")} component={ReleaseView} />
                                <Route path={Links.innovationKPIView(":repoId")} component={InnovationKPIView} />
                                <Route path={Links.settingsView(":repoId")} component={SettingsView} />
                            </Switch>
                            : null
                        }
                    </BrowserRouter>
                </ThemeProvider>
                <InnovationEventHandler></InnovationEventHandler>
            </NodeEventContext.Provider>
        </React.StrictMode>
    )
}