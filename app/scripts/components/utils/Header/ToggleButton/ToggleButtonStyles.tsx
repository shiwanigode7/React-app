import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createTheme, makeStyles } from "@material-ui/core";

export const ToggleButtonTheme = createTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiTypography: {
            root: {
                marginLeft: "12px",
            },
            body1: {
                fontSize: "14px"
            }
        },
        MuiFormControlLabel: {
            root: {
                marginRight: "0px"
            }
        },
        MuiSwitch: {
            root: {
                width: "40px",
                height: "24px",
                padding: 0,
            },
            switchBase: {
                padding: "4px",
            },
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
            thumb: {
                boxSizing: "border-box",
                width: "16px",
                height: "16px",
                top: "4px",
                left: "4px",
            },
            track: {
                width: "40px",
                borderRadius: "48px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #91959a",
                boxSizing: "border-box",
                "$checked$checked + &": {
                    backgroundColor: "#EEF8FF",
                    border: "1px solid #0079D1",
                    boxSizing: "border-box"
                }
            }
        }
    }
});

export const ToggleButtonStyles = makeStyles({
    toggleButton: {
        marginTop: "5px",
        whiteSpace: "nowrap"
    },
    toggleButtonGridWIthNextComponent: {
        marginTop: "5px",
        whiteSpace: "nowrap",
        marginLeft: "auto"
    }
});