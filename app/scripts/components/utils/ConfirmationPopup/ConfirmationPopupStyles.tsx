import { LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';
import { createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

export const ConfirmationPopupStyles = makeStyles(() => ({
    divider: {
        margin:'0'
    }
}));