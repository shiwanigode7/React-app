import LeftNav from '@esko/cloud-ui-components/dist/esm/components/LeftNav';
import { ComponentsDataProvider } from '@esko/cloud-ui-components/dist/esm/data/componentsContext';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import images from "../../Icons/images";
import { COLOR_WHITE } from '../constant/Colors';
import { InnovationAppContext } from '../context/InnovationAppContext';
import { EskoCloudAccount } from '../interfaces/IAMInterface';
import { AppSwitcherAccountArrayElement, AppSwitcherDataChange } from '../interfaces/InnovationInterface';
import Links from '../Links';
import { LeftNavDarkTheme } from '../view/theme';
import { TruckIcon } from './Icons/TruckCheckIcon';

export default function MPLNavigation() {

    const location = useLocation();

    /**Importing the Account data for local use */
    const lInnovationData = useContext(InnovationAppContext);

    /**setting the repoId */
    const repoId = lInnovationData.eskoAccountDetail.repoid;


    let history = useHistory();

    const adminItems = [
        {
            text: "Dashboard",
            icon: <img src={images.Home}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/dashboard/"),
            onClick: () => { history.push(Links.dashboard(repoId)) }
        },
        {
            text: "MPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/mpl/"),
            onClick: () => { history.push(Links.mplView(repoId)) },
            description: "Master Priority List"
        },
        {
            text: "RRM",
            icon: <img src={images.Tune}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/rrm/"),
            onClick: () => { history.push(Links.rrmView(repoId)) },
            description: "Rationalized Roadmap"
        },
        {
            text: "PPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppl/"),
            onClick: () => { history.push(Links.pplView(repoId)) },
            description: "Product Production Planning"
        },
        {
            text: "Release",
            icon: <img src={images.Send}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/release/"),
            onClick: () => { history.push(Links.releaseView(repoId)) }
        },
        {
            text: "Innovation KPIs",
            icon: <TruckIcon size={"24"} fill={COLOR_WHITE} />,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/innovation-kpi/"),
            onClick: () => { history.push(Links.innovationKPIView(repoId)) }
        },
        {
            text: "SIR",
            icon: <img src={images.CompassRose}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/sir/"),
            onClick: () => { history.push(Links.sirView(repoId)) },
            description: "Strategic Innovation Review"
        },
        {
            text: "PPG",
            icon: <img src={images.ImportExport}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppg/"),
            onClick: () => { history.push(Links.ppgView(repoId)) },
            description: "Product Planning Group"
        },
        {
            text: "Settings",
            icon: <img src={images.Settings}></img>,
            atBottom: true,
            isSelected: (location.pathname).includes("/home/settings/"),
            onClick: () => { history.push(Links.settingsView(repoId)) }
        }
    ];

    const userItems = [
        {
            text: "Dashboard",
            icon: <img src={images.Home}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/dashboard/"),
            onClick: () => { history.push(Links.dashboard(repoId)) }
        },
        {
            text: "MPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/mpl/"),
            onClick: () => { history.push(Links.mplView(repoId)) },
            description: "Master Priority List"
        },
        {
            text: "RRM",
            icon: <img src={images.Tune}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/rrm/"),
            onClick: () => { history.push(Links.rrmView(repoId)) },
            description: "Rationalized Roadmap"
        },
        {
            text: "PPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppl/"),
            onClick: () => { history.push(Links.pplView(repoId)) },
            description: "Product Production Planning"
        },
        {
            text: "Release",
            icon: <img src={images.Send}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/release/"),
            onClick: () => { history.push(Links.releaseView(repoId)) }
        },
        {
            text: "Innovation KPIs",
            icon: <TruckIcon size={"24"} fill={COLOR_WHITE} />,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/innovation-kpi/"),
            onClick: () => { history.push(Links.innovationKPIView(repoId)) }
        },
        {
            text: "PPG",
            icon: <img src={images.ImportExport}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppg/"),
            onClick: () => { history.push(Links.ppgView(repoId)) },
            description: "Product Planning Group"
        }
    ];

    const managementItems = [
        {
            text: "Dashboard",
            icon: <img src={images.Home}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/dashboard/"),
            onClick: () => { history.push(Links.dashboard(repoId)) }
        },
        {
            text: "MPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/mpl/"),
            onClick: () => { history.push(Links.mplView(repoId)) },
            description: "Master Priority List"
        },
        {
            text: "RRM",
            icon: <img src={images.Tune}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/rrm/"),
            onClick: () => { history.push(Links.rrmView(repoId)) },
            description: "Rationalized Roadmap"
        },
        {
            text: "PPL",
            icon: <img src={images.SortAsc}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppl/"),
            onClick: () => { history.push(Links.pplView(repoId)) },
            description: "Product Production Planning"
        },
        {
            text: "Release",
            icon: <img src={images.Send}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/release/"),
            onClick: () => { history.push(Links.releaseView(repoId)) }
        },
        {
            text: "Innovation KPIs",
            icon: <TruckIcon size={"24"} fill={COLOR_WHITE} />,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/innovation-kpi/"),
            onClick: () => { history.push(Links.innovationKPIView(repoId)) }
        },
        {
            text: "SIR",
            icon: <img src={images.CompassRose}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/sir/"),
            onClick: () => { history.push(Links.sirView(repoId)) },
            description: "Strategic Innovation Review"
        },
        {
            text: "PPG",
            icon: <img src={images.ImportExport}></img>,
            atBottom: false,
            isSelected: (location.pathname).includes("/home/ppg/"),
            onClick: () => { history.push(Links.ppgView(repoId)) },
            description: "Product Planning Group"
        }
    ];

    /**Declaration to handle the app switcher */
    let appSwitcher = {
        organization: lInnovationData.eskoAccountDetail.organizationID,
        onChange: (data: AppSwitcherDataChange) => { appSwitcherChange(data) }
    }

    /**Function to read the changed data and set the new Cloud account detail*/
    const appSwitcherChange = (inECData: AppSwitcherDataChange) => {
        inECData.orgs.forEach((singleAccount: AppSwitcherAccountArrayElement) => {
            /**If the selected cloud account id matches the current Esko cloud account
             * save the value in the context variable.
             */
            if (singleAccount.id === inECData.organization) {
                const holdAccountDetail: EskoCloudAccount = {
                    "organizationID": singleAccount.id,
                    "readableName": singleAccount.name,
                    "repoid": singleAccount.repoid
                }
                lInnovationData.accountUpdateFunction(holdAccountDetail);
            }
        })
    }

    return (
        <Box>
            <React.Fragment>
                <ComponentsDataProvider >
                    <ThemeProvider theme={LeftNavDarkTheme}>
                        <LeftNav
                            appSwitcher={appSwitcher}
                            repoId={repoId}
                            items={lInnovationData.userPermission.leftNav.isSettingEnabled ? adminItems : (lInnovationData.userPermission.businessGoal.isPriorityChangeable ? managementItems : userItems)}
                            width={64}
                            userProfile={{
                            }}
                            appBadge={{
                                title: "Esko"
                            }}
                            useEllipsis={false}
                        />
                    </ThemeProvider>
                </ComponentsDataProvider>
            </React.Fragment>
        </Box>
    );
}
