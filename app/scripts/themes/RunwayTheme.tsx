/**Listing all the styles for Runway related components */

import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme } from "@material-ui/core";
import { COLOR_AZURE_2, COLOR_AZURE_4, COLOR_GRAPHITE_1, COLOR_GRAY_4, COLOR_GREY_1, COLOR_GREY_3, COLOR_RED_2, COLOR_WHITE } from "../constant/Colors";

/**Theme for the table and the paper container around the table */
export const RunwayDialogTheme = createMuiTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiDialogTitle: {
            root: {
                backgroundColor: COLOR_GREY_3,
                padding: "0",
                paddingLeft: "24px"
            }
        },
        MuiTypography: {
            /**Styling for the form text in dialog */
            body1: {
                fontSize: '12px',
                fontWeight: 'bold',
                color: COLOR_GRAPHITE_1,
                padding: "0",
                margin: "0"
            },
            /**Styling for the head */
            h6: {
                padding: "0",
                fontSize: "16px",
                fontWeight: "bold"
            }
        },
    }
});

/**Styling for the Thumbnail default avatar */
export const RunwayThumbnailTheme = createMuiTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiAvatar: {
            img: {
                background: "white"
            }
        }
    }
});

/**Styling for the text fields used in the RunwayListView */
export const RunwayFieldTheme = createMuiTheme({
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
                    borderColor: COLOR_GRAY_4,
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
                '&$error $notchedOutline': {
                    borderColor: COLOR_RED_2,
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
                backgroundColor: COLOR_WHITE,
                color: COLOR_GRAPHITE_1,
                minHeight: "30px",
                maxHeight: "30px"
            },
            notchedOutline: {
                borderColor: COLOR_GREY_1,
                borderRadius: "4px",
                boxSizing: "border-box",
                borderStyle: "solid",
                borderWidth: "1px"
            }
        },
        MuiFormHelperText: {
            root: {
                color: COLOR_RED_2,
                '&$error': {
                    color: COLOR_RED_2
                }
            },
            contained: {
                marginLeft: "0px"
            }
        }
    }
});

/**Styling for the switch button  */
export const RunwaySwitchTheme = createMuiTheme({
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
                color: COLOR_GRAY_4,
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
                backgroundColor: COLOR_WHITE,
                border: `1px solid ${COLOR_GRAY_4}`,
                boxSizing: "border-box",
                /**Double check to make sure that this style
                 * overwrites the default material ui styling
                 */
                "$checked$checked + &": {
                    backgroundColor: COLOR_AZURE_4,
                    border: `1px solid ${COLOR_AZURE_2}`,
                    boxSizing: "border-box"
                }
            }
        }
    }
});