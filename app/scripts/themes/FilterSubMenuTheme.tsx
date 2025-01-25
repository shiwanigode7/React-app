import { DarkTheme } from "@esko/cloud-ui-components/dist/esm";
import MuiAccordionSummary, { AccordionSummaryProps } from '@material-ui/core/AccordionSummary';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import { createMuiTheme, makeStyles, styled } from "@material-ui/core";
import React from "react";
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_3 } from "../constant/Colors";

/**Styling accordion Summary to have a proper backgroundColor and Expandable Icon*/
export const FilterAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowRightRoundedIcon fontSize="large" style={{ color: "White" }} />}
        {...props}
    />
))(() => ({
    backgroundColor: COLOR_GRAPHITE_1,
    fontWeight: 'bold',
    flexDirection: 'row-reverse',
}));

/**Theme for the Outlined TextField */
export const FilterSubMenuTheme = createMuiTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...DarkTheme.overrides,
        MuiTypography: {
            h6: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        },
        MuiDrawer: {
            root: {
                transitionDuration: '0'
            },
            paperAnchorDockedLeft: {
                marginLeft: '64px',
                backgroundColor: '#22262A',
                color: 'white',
                width: 'inherit',
                overflowX: "hidden",
                transition: 'width 0ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
            },
        },
        MuiIconButton: {
            root: {
                left: "98%",
                top: "630%",
            },
            edgeEnd: {
                marginRight: "0"
            }
        },
        MuiButtonBase: {
            root: {
                borderRadius: "2px",
                borderBottom: '0',
            }
        },
        MuiPaper: {
            elevation1: {
                boxShadow: "none"
            }
        },
        MuiAccordionSummary: {
            root: {
                padding: "0px",
                minHeight: "48px",
                maxHeight: "48px",
                '&$expanded': {
                    maxHeight: "48px",
                    minHeight: "48px",
                }
            },
            content: {
                margin: "0",
                transform: "0",
                display: "block",
                padding: "0",
                '&$expanded': {
                    padding: "0",
                }
            },
            expandIcon: {
                padding: "0",
                left: "0",
                '&$expanded': {
                    transform: "rotate(90deg)",
                    padding: "0"
                }
            }
        }
    }
});

export const FilterSubMenuStyles = makeStyles(({

    root: {
        transition: "all 150ms ease 0s"
    },
    drawerPaper: {
        padding: 0,
        transition: "all 150ms ease 0s"
    },
    showSideBar: {
        marginLeft: "145px",
        padding: 0,
        transition: "all 150ms ease 0s"
    },
    button: {
        width: "85%",
        display: "flexItem",
        fontWeight: "lighter",
        position: "relative",
        fontSize: "12px",
        boxSizing: "border-box",
        textAlign: "left",
        marginLeft: "0px",
        marginBottom: "2px",
        paddingTop: "8px",
        whiteSpace: "nowrap",
        borderRadius: "4px",
        paddingBottom: "8px",
        justifyContent: "flex-Start",
        color: "white",
        "&:hover, &.Mui-focusVisible": { backgroundColor: COLOR_GRAPHITE_3 }
    },
    selectedButton: {
        width: "85%",
        display: "flexItem",
        backgroundColor: COLOR_GRAPHITE_3,
        fontWeight: "lighter",
        position: "relative",
        fontSize: "12px",
        boxSizing: "border-box",
        textAlign: "left",
        marginLeft: "0px",
        marginBottom: "2px",
        paddingTop: "8px",
        whiteSpace: "nowrap",
        borderRadius: "4px",
        paddingBottom: "8px",
        justifyContent: "flex-Start",
        color: "white",
        "&:hover, &.Mui-focusVisible": { backgroundColor: COLOR_GRAPHITE_3 }
    },
    buttonIcon: {
        marginLeft: "2px"
    },
    releaseDescription: {
        padding: "0px 20px"
    },
    checkBoxFilterGrid: {
        width: "100%"
    },
    checkboxAccordion: {
        backgroundColor: COLOR_GRAPHITE_1,
        color: "white",
        padding:"0% 4%"
    },
    checkboxAccordionTitle: {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    accordionRoot: {
        backgroundColor: COLOR_GRAPHITE_1,
        color: "white",
        padding:"0% 6%"
    },
    accordionTitleText: {
        fontSize: '16px',
        fontWeight: 'bold'
    }
}))