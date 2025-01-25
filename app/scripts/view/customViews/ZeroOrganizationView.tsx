/**TSX file to display the zero organization pop-up */
import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

/**Creating styles for the dialog */
const ZeroOrganizationViewStyles = makeStyles(() => ({
    dialogContainer: {
        background: "#F8F8F9"
    },
    dialogTitle: {
        backgroundColor: "#F8F8F9",
        textAlign: "center"
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogTypography: {
        fontSize: '14px',
        color: "#22262A"
    }
}));

export function ZeroOrganizationView() {

    /**Get the styles */
    const ZeroOrganizationStyleClasses = ZeroOrganizationViewStyles();
    /**Site creation URL for redirection */
    const approveCreateSiteUrl = window.location.origin.replace("innovation", "approve") + "/createNewSite.html";
    /**Error message to be displayed */
    const zeroOrganizationDialogMessage = <div>
        You have no organization assigned to you.
        Please create an organization using <a href={approveCreateSiteUrl} target="_blank" rel="noopener noreferrer">Share & Approve</a>, and refresh the page.
    </div>

    return (
        <Dialog
            open={true}
            fullWidth maxWidth='xs'
            classes={{
                container: ZeroOrganizationStyleClasses.dialogContainer
            }}
        >
            <DialogTitle className={ZeroOrganizationStyleClasses.dialogTitle}>
                <Typography>{"Error"}</Typography>
            </DialogTitle>
            <DialogContent className={ZeroOrganizationStyleClasses.dialogContent}>
                <Typography className={ZeroOrganizationStyleClasses.dialogTypography}>
                    {zeroOrganizationDialogMessage}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}