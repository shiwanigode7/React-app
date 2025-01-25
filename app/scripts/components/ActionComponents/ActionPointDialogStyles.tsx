import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GREY_3 } from "../../constant/Colors";


export const AddActionDialogTheme = createMuiTheme({
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

export const ActionDialogStyles = makeStyles((theme: any) => ({
    selectIcon: {
        top: "4px",
        right: "7px"
    },
    HeadingClass: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: COLOR_GRAPHITE_1,
        padding: "0",
        margin: "0"
    },
    DateFieldClass: {
        width: "160px"
    },
    TopicTypeFieldClass: {
        width: "395px"
    },
    DividerClass: {
        margin: '0'
    },
    LoadingIconClass: {
        color: "white",
        marginLeft: "8px"
    },
    CancelIconClass: {
        flexBasis: "auto"
    },
    DialogContentClass: {
        paddingRight: "12px"
    },
    GridContainerClass: {
        flexWrap: "nowrap"
    },
    ownerDropdownGridClass: {
        width: "97%"
    },
    textarea: {
        resize: "vertical",
        minHeight: "50px",
        maxHeight: "100px",
        padding: "4px 7px 4px 7px"
    }
}));