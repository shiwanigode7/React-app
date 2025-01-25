import { Snackbar } from "@material-ui/core";
import React from "react";
import AlertModel from "./AlertPopupModel";
import { Alert } from "@material-ui/lab";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { AlertPopupStyles } from "./AlertPopupStyles";

export default function AlertPopup(alertProps: AlertModel) {
    const alertPopupStyleClasses = AlertPopupStyles();

    return (
        <>
            <Snackbar
                open={ alertProps.isOpen }
                anchorOrigin={ { vertical: "top", horizontal: "center" } }
                className={alertPopupStyleClasses.snackbarPosition}
                key={'top' + 'left'}
                autoHideDuration={3000}
                onClose={ alertProps.handleCloseButtonClick } >
                    <Alert
                        icon={ alertProps.severity === "success" ?
                            <CheckCircleOutlineIcon fontSize="medium" />
                            : <ErrorOutlineIcon fontSize="medium" /> }
                        severity={ alertProps.severity }
                        className={ alertPopupStyleClasses.alert }>
                        { alertProps.content }
                    </Alert>
            </Snackbar>
        </>
    )
}
