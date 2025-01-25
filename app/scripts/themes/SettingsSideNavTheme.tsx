import { DarkTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme } from "@material-ui/core";

/**Theme for Setting view in wider version (opened state)*/
export const SettingsSideNavTheme = createMuiTheme({
    overrides: {
        ...DarkTheme.overrides,
        MuiDrawer: {
            root: {
                transitionDuration: '0'
            },
            paperAnchorDockedLeft: {
                marginLeft: '64px',
                backgroundColor: '#22262A',
                color: 'white',
                width: 'inherit',
                transition: 'width 0ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
            }
        },
        MuiListItem: {
            root: {
                marginLeft: "12px",
                width: "90%",
                paddingLeft: "5px",
                borderRadius: "4px",
                whiteSpace: "nowrap"
            },
            gutters: {
                marginBottom: "2px",
                marginTop: "2px"
            }
        },
        MuiListItemIcon: {
            root: {
                color: 'white'
            }
        },
        MuiListItemText: {
            root: {
                color: 'white',
                marginTop: '0',
                marginBottom: '0'
            }
        },
        MuiTypography: {
            displayBlock: {
                color: 'white'
            },
            body1: {
                fontSize: "14px"
            },
            h6: {
                fontSize: "16px"
            }
        },
        MuiIconButton: {
            root: {
                left: "98%",
                top: "700%"
            }
        }
    },
    typography: {
        fontSize: 14,
    },
    palette: {
        type: "dark",
        action: {
            hover: "#33383e",
            selected: "#33383e"
        }
    }
});

/**Theme for Setting View in narrow version (closed/collapsed state) */
export const SettingsSideNavThemeCollapsed = createMuiTheme({
    /**Note: 
     * The collapased theme is almost the same theme as the SettingsSideNavTheme.
     * Hence SettingsSideNavTheme is used for override and not DarkTheme.
     * Also the Since we are overriding the MuiListItem, few of the properties 
     * had to be re-defined to avoid the default values being set.
     */
    overrides: {
        ...SettingsSideNavTheme.overrides,
        MuiListItem: {
            root: {
                marginLeft: "12px",
                width: "70%",
                paddingLeft: "5px",
                borderRadius: "4px",
                whiteSpace: "nowrap"
            },
            gutters: {
                marginBottom: "2px",
                marginTop: "2px"
            }
        },
    },
    typography: {
        fontSize: 14,
    },
    palette: {
        type: "dark",
        action: {
            hover: "#33383e",
            selected: "#33383e",
        },

    }
});
