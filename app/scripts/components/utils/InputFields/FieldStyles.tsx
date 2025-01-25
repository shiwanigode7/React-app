import { createTheme } from "@material-ui/core";
import { LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';

export const OutlinedInputTheme = createTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiTypography: {
            body1: {
                fontSize: "11px",
                fontWeight: 'bold',
                color: "#22262A"
            },
            h6: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        },
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
                }
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