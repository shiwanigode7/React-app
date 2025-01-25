import { DarkTheme, LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';
import { hexColor } from "@esko/cloud-ui-components/dist/esm/utils/strings";
import { createTheme, makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_WHITE } from '../constant/Colors';

declare module '@material-ui/core/styles/createPalette' {
    // Augmentation for cloud-ui components
    interface Palette {
        leftNavBackground?: React.CSSProperties['color'],
        getUserColor?: (colorKey: string) => string
    }
    interface PaletteOptions {
        leftNavBackground?: React.CSSProperties['color'],
        getUserColor?: (colorKey: string) => string
    }
}

const kLeftNavBGColor = "#33383E";
const kLeftNavFontColor = "white";
const kLeftNavHoverColor = "#22262A";
const kLeftNavSelectedColor = "#22262A";
const kLeftNavDividerColor = "#60666D";

/**Theme for the Outlined TextField */
export const OutlinedInputTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...LightTheme.overrides,
        MuiOutlinedInput: {
            root: {
                marginTop: 5,
                borderRadius: '5px',
                '&$focused $notchedOutline': {
                    borderColor: "#91959A",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
                '&$error $notchedOutline': {
                    borderColor: "#DB2436",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
            },
            multiline: {
                padding: "3px 3px"
            },
            input: {
                padding: "6px 12px 6px",
                fontSize: 14,
                backgroundColor: "#FFFFFF",
                color: "#22262A",
            },
            notchedOutline: {
                borderColor: "#E3E4E5",
                borderRadius: "4px",
                boxSizing: "border-box",
                borderStyle: "solid",
                borderWidth: "1px"
            },
            adornedStart: {
                paddingLeft: "9px",
                backgroundColor: "#e2e3e4"
            },
            inputAdornedStart: {
                paddingLeft: "6px"
            }
        },
        MuiFormHelperText: {
            root: {
                color: "#DB2436",
                '&$error': {
                    color: "#DB2436"
                }
            },
            contained: {
                marginLeft: "0px"
            }
        }
    }
});

/**Theme for the Outlined TextField */
export const SearchBarTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...LightTheme.overrides,
        MuiOutlinedInput: {
            root: {
                marginTop: 5,
                borderRadius: '5px',
                '&$focused $notchedOutline': {
                    borderColor: "#91959A",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
                '&$error $notchedOutline': {
                    borderColor: "#DB2436",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
            },
            multiline: {
                padding: "3px 3px"
            },
            input: {
                padding: "6px 12px 6px",
                fontSize: 14,
                backgroundColor: "#FFFFFF",
                color: "#22262A",
            },
            notchedOutline: {
                borderColor: "#E3E4E5",
                borderRadius: "4px",
                boxSizing: "border-box",
                borderStyle: "solid",
                borderWidth: "1px"
            }
        }
    }
});


/**Theme for the Outlined TextField */
export const EditOutlinedInputTheme = createTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiButton: {
            root: {
                marginTop: '4px',
                textTransform: "none",
                fontSize: '13px',
                borderRadius: '5px',
                height: '40px',
                backgroundColor: "#60666D",
                "&:hover": {
                    backgroundColor: "#60666D"
                }

            },
            outlined: {
                borderColor: "#91959A"
            },
            outlinedPrimary: {
                color: "white",
                backgroundColor: "#60666D",
                border: "1px solid #91959A",
                "&:hover": {
                    border: "1px solid #91959A",
                }
            },
        },
        MuiMenu: {
            paper: {
                backgroundColor: "#33383E",
                color: "white",
                width: '118px'
            }
        }
    },
    typography: {
        fontSize: 14,
    }
});

/**Theme for Confirmation Dialog*/
export const ConfirmationDialogTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...LightTheme.overrides,
        MuiDialog: {
            paperWidthXs: {
                maxWidth: "360px"
            }
        }
    }
});

/**Theme for Accordion */
export const AccordionTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...LightTheme.overrides,
        MuiButtonBase: {
            root: {
                borderRadius: "2px",
                borderBottom: '0',
            }
        },
        MuiPaper: {
            elevation1: {
                boxShadow: "0px 2px 0px -4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
            }
        },
        MuiIconButton: {
            edgeEnd: {
                marginRight: "0"
            }
        },
        MuiAccordionSummary: {
            root: {
                padding: "0px",
                marginTop: "12px",
                minHeight: "48px",
                maxHeight: "48px",
                '&$expanded': {
                    maxHeight: "48px",
                    marginTop: "12px",
                    minHeight: "48px",
                    margin: "12px 0px 0px"
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
                '&$expanded': {
                    transform: "rotate(90deg)",
                }
            }
        },
    }
})

/**Theme for the Left Nav */
export const LeftNavDarkTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...DarkTheme.overrides,
        MuiDivider: {
            root: {
                backgroundColor: kLeftNavDividerColor,
                marginLeft: 8,
                marginRight: 8
            }
        },
        MuiButton: {
            containedSecondary: {
                backgroundColor: kLeftNavBGColor,
                "&:hover": {
                    backgroundColor: kLeftNavHoverColor
                }
            }
        }
    },
    palette: {
        type: 'dark',
        text: {
            secondary: kLeftNavFontColor,
        },
        action: {
            hover: kLeftNavHoverColor,
            selected: kLeftNavSelectedColor
        },
        background: {
            paper: `${kLeftNavBGColor} !important`
        },
        getUserColor: key => hexColor(key)
    }
});

/**Filter switch theme */
export const FilterSwitchTheme = createTheme({
    overrides: {
        ...LightTheme.overrides,
        /**Text size of the label */
        MuiTypography: {
            root: {
                marginLeft: "12px",
            },
            body1: {
                fontSize: "14px"
            }
        },
        /**Actual switch */
        MuiSwitch: {
            root: {
                width: "40px",
                height: "24px",
                padding: 0,
            },
            /**The switch body */
            switchBase: {
                padding: "4px",
            },
            /**Color of switch thumb */
            colorPrimary: {
                color: "#91959a",
                padding: "4px",
                background: "transparent",
                "&.Mui-checked": {
                    color: "#0079d1",
                    left: "-4px",
                    background: "transparent",
                },
            },
            /**The switch thumb */
            thumb: {
                boxSizing: "border-box",
                width: "16px",
                height: "16px",
                top: "4px",
                left: "4px",
            },
            /**The track of the switch */
            track: {
                width: "40px",
                borderRadius: "48px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #91959a",
                boxSizing: "border-box",
                /**Double check to make sure that this style
                 * overwrites the default material ui styling
                 */
                "$checked$checked + &": {
                    backgroundColor: "#EEF8FF",
                    border: "1px solid #0079D1",
                    boxSizing: "border-box"
                }
            }
        }
    }
});

const BORDER_DEFAULT: string = "1px solid rgba(0, 0, 0, 0.38)";
const BORDER_FOCUS_OR_HOVER: string = `1px solid ${COLOR_GRAPHITE_2}`;
const BORDER_RADIUS: string = "4px";

export const OutlinedTextFieldStyles = makeStyles(() => ({

    /**Theme for the text fields */
    textFieldOutlined: {
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        borderRadius: BORDER_RADIUS,
        "&.Mui-disabled": {
            opacity: "0.5",
            cursor: "not-allowed"
        }
    },
    /**Common theme for the fields*/
    textFieldOutlineRoot: {
        margin: 0,
        background: COLOR_WHITE,
        color: COLOR_GRAPHITE_2,
        border: BORDER_DEFAULT,
        borderRadius: BORDER_RADIUS,
        "&:focus": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&:hover": {
            background: COLOR_WHITE,
            border: BORDER_FOCUS_OR_HOVER,
            borderRadius: BORDER_RADIUS
        },
        "&.Mui-disabled": {
            opacity: "0.5",
            border: BORDER_DEFAULT,
            borderRadius: BORDER_RADIUS,
            cursor: "not-allowed"
        }
    },
    textFieldNotchedOutline: {
        border: `none !important`,
    }
}));