import { DarkTheme } from "@esko/cloud-ui-components/dist/esm";
import { createTheme, makeStyles } from "@material-ui/core";

/**Theme for the scroll bar */
export const RunwayFilterStyles = makeStyles(() => ({
    LoadingIconClass: {
        color: "white",
        marginLeft: "85px",
        height: "30px",
        width: "30px"
    },
    ShowOrHideAllClass: {
        fontWeight: "bold",
        margin: 0
    },
    NoRunwaysMessageClass: {
        marginLeft: "40px"
    },
    NoRnwaysCheckBoxClass: {
        padding: "5px 0px"
    },
    ShowAllCheckBoxClass: {
        padding: "0px 0px 11px 0px"
    },
    ShowAllCheckBoxClassWithoutNoRunways: {
        padding: "0px 0px 8px 0px"
    },
    FormControlLabelClass: {
        wordBreak: "break-word",
        // Reason for 200px is because the filter width was already set to 200px 
        // in one of the filter menu parent class - widgetContentGridItem. 
        maxWidth: "200px"
    },
    RunwayTitle: {
        margin: "0",
        wordBreak: "break-all",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        // The width of the filter menu is already hardcoded in the parent class, 
        // that is the reason for hardcoding the value here.
        maxWidth: "160px"
    },
    RunwayTitleTooltip: {
        background: "white",
        color: "black",
        // Reason for "!important" is to handle the issue with material ui where the
        // style classes passed is updated by the internal material ui style class that 
        // cannot be overwritten.
        fontSize: "10px !important",
        margin: "0px !important",
        maxWidth: "170px",
        textAlign: "justify",
        whiteSpace: "pre-line"
    },
    headingGridItem: {
        maxHeight: "60px"
    },
    runwaysListGridItem: {
        width: "200px"
    }
}));

/**Theme for the Outlined TextField */
export const RunwayFilterTheme = createTheme({
    typography: {
        fontSize: 11,
    },
    overrides: {
        ...DarkTheme.overrides,
        MuiTypography: {
            root: {
                marginLeft: "9px"
            },
            h6: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        },
        MuiIconButton: {
            root: {
                left: "0%",
                padding: "0px",
            },
            label: {
                left: 4,
                top: 4,
                height: 12,
                width: 12,
                backgroundColor: "white"
            }
        },
        MuiListItem: {
            gutters: {
                paddingLeft: "0px"
            }
        },
        MuiCheckbox: {
            root: {
                padding: "0px",
                color: "white",
            },
            colorSecondary: {
                "&.Mui-checked": {
                    color: "#0079D1",
                    backgroundColor: "white"
                }
            }
        },
        MuiFormControl: {
            root: {
                marginLeft: "20px"
            }
        }
    }
});