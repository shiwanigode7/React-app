import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Grid, Tooltip } from '@material-ui/core';
import { SideNav } from '@esko/cloud-ui-components/dist/esm';
import { SettingsSideNavTheme, SettingsSideNavThemeCollapsed } from '../../themes/SettingsSideNavTheme';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Links from '../../Links';
import { InnovationAppContext } from '../../context/InnovationAppContext';
import { UserRolesView } from './UserRolesView';
import ResourceManagement from "../../components/settings/ResourceManagementView/ResourceManagement";
import { MeetingView } from './MeetingView';
import InnovationCadence from '../../components/settings/InnovationCadenceView/InnovationCadence';
import { RunwayView } from './RunwayView';
import { ProductView } from '../../components/settings/ProductView/ProductView';
import ViewListIcon from '@material-ui/icons/ViewList';
import { BusinessLineView } from '../../components/settings/BusinessLineView/BusinessLineView';
import SetupView from '../setup/SetupView';
import BuildIcon from '@material-ui/icons//Build';

export default function SettingsView() {

    /**Defining the widths of the sideNavPanel */
    const minDrawerWidth: number = 80;
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 64;

    /**State Variable to hold the theme for expanded view and collapsed view */
    const [holdTheme, setHoldTheme] = useState<any>(SettingsSideNavTheme);

    /**Variable to set the width of the drawer, by default the width is set to max width (open state) */
    const [sideNavWidth, setSideNavWidth] = useState<number>(maxDrawerWidth);

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [sideNavOpen, setSideNavOpen] = useState<boolean>(true);

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)

    /**History variable use to push the url changed data to force routing */
    let history = useHistory();

    /**Check for the drawerWidth size from the session storage */
    useEffect(() => {
        let data = window.sessionStorage.getItem("drawerWidth");
        if (data !== null) {
            let hold = Number(data);
            setSideNavOpen(hold === maxDrawerWidth);
        }
    }, []);

    /**When even the sideNavOpen changes update the drawer width */
    useEffect(() => {
        /**If sideNavOpen is true set the width to max (open the drawer) */
        if (sideNavOpen) {
            setSideNavWidth(maxDrawerWidth);
            setMarginContentView(maxDrawerWidth + leftNavWidth);
            setHoldTheme(SettingsSideNavTheme);
            window.sessionStorage.setItem("drawerWidth", maxDrawerWidth.toString());
        }
        /**If sideNavOpen is false set the width to min (close the drawer) */
        else {
            setSideNavWidth(minDrawerWidth);
            setMarginContentView(minDrawerWidth + leftNavWidth);
            setHoldTheme(SettingsSideNavThemeCollapsed);
            window.sessionStorage.setItem("drawerWidth", minDrawerWidth.toString());
        }
    }, [sideNavOpen])

    /**Function to toggle the state of side nav on click */
    const handleDrawerOpen = () => {
        setSideNavOpen(!sideNavOpen);
    }

    /**The items to be displayed in the side nav */
    const items = [
        {
            text: sideNavOpen ? "Users & Roles" : " ",
            icon: sideNavOpen ? <SupervisorAccountIcon fontSize='medium' /> :
                <Tooltip title="Users & Roles" placement="right" arrow><SupervisorAccountIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/userRoles/"),
            onClick: () => { history.push(Links.userRolesView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "Resource Management" : " ",
            icon: sideNavOpen ? <PersonAddIcon fontSize='medium' /> :
                <Tooltip title="Resource Management" placement="right" arrow><PersonAddIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/resource/"),
            onClick: () => { setSideNavOpen(false); history.push(Links.resourceManagementView(lInnovationData.eskoAccountDetail.repoid)); },
        },
        {
            text: sideNavOpen ? "Meeting Dates" : " ",
            icon: sideNavOpen ? <DateRangeIcon fontSize='medium' /> :
                <Tooltip title="Meeting Dates" placement="right" arrow><DateRangeIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/meeting/"),
            onClick: () => { history.push(Links.meetingView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "Innovation Cadence" : " ",
            icon: sideNavOpen ? <RotateRightIcon fontSize='medium' /> :
                <Tooltip title="Innovation Cadence" placement="right" arrow><RotateRightIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/cadence/"),
            onClick: () => { history.push(Links.innovationCadenceView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "Runways" : " ",
            icon: sideNavOpen ? <FormatListBulletedIcon fontSize='medium' /> :
                <Tooltip title="Runways" placement="right" arrow><FormatListBulletedIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/runway/"),
            onClick: () => { history.push(Links.runwayView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "Products" : " ",
            icon: sideNavOpen ? <StorefrontIcon fontSize='medium' /> :
                <Tooltip title="Products" placement="right" arrow><StorefrontIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/product/"),
            onClick: () => { history.push(Links.productView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "Business Lines" : " ",
            icon: sideNavOpen ? <ViewListIcon fontSize='medium' /> :
                <Tooltip title="Business Lines" placement="right" arrow><ViewListIcon fontSize='medium' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/businesslines/"),
            onClick: () => { history.push(Links.businessLinesView(lInnovationData.eskoAccountDetail.repoid)) },
        },
        {
            text: sideNavOpen ? "System Update" : " ",
            icon: sideNavOpen ? <BuildIcon fontSize='small' /> :
                <Tooltip title="System Update" placement="right" arrow><BuildIcon fontSize='small' /></Tooltip>,
            isSelected: window.location.pathname.includes("/home/settings/setup/"),
            onClick: () => { history.push(Links.setupView(lInnovationData.eskoAccountDetail.repoid)) },
        }
    ];

    /**Saving the details for local use */
    const lInnovationData = useContext(InnovationAppContext);

    return (
        <Grid container >
            {/**Settings sub panel */}
            <Grid item style={{ position: 'absolute' }}>
                <ThemeProvider theme={holdTheme}>
                    <Grid container>
                        <Grid item>
                            <SideNav
                                iconSpaceWidth={40}
                                toggleMenus={false}
                                items={items}
                                title={sideNavOpen ? 'Settings' : ' '}
                                itemsVariant={'full'}
                                width={sideNavWidth}
                                side={'left'}
                            />
                        </Grid>
                        <Grid item style={{ marginLeft: "12px" }}>
                            <IconButton
                                onClick={handleDrawerOpen}
                            >
                                <Divider orientation="vertical" flexItem style={{ height: "30px", width: "2px" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Grid>
            <Grid item style={{ marginLeft: marginContentView, transition: "300ms", padding: "24px", width: "100%", height: "100vh" }}>
                <Switch>
                    <Route exact path={`/home/settings/${lInnovationData.eskoAccountDetail.repoid}`} render={() => <Redirect to={Links.userRolesView(lInnovationData.eskoAccountDetail.repoid)} />} />
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.userRolesView(":repoId")} component={UserRolesView} /> :
                        <Route exact path={Links.userRolesView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.resourceManagementView(":repoId")} component={ResourceManagement} /> :
                        <Route exact path={Links.resourceManagementView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.meetingView(":repoId")} component={MeetingView} /> :
                        <Route exact path={Links.meetingView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.innovationCadenceView(":repoId")} component={InnovationCadence} /> :
                        <Route exact path={Links.innovationCadenceView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.runwayView(":repoId")} component={RunwayView} /> :
                        <Route exact path={Links.runwayView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.productView(":repoId")} component={ProductView} /> :
                        <Route exact path={Links.productView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.businessLinesView(":repoId")} component={BusinessLineView} /> :
                        <Route exact path={Links.businessLinesView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                    {lInnovationData.userPermission.leftNav.isSettingEnabled ?
                        <Route exact path={Links.setupView(":repoId")} component={SetupView} /> :
                        <Route exact path={Links.setupView(":repoId")} render={() => <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />} />
                    }
                </Switch>
            </Grid>
        </Grid>
    );
}