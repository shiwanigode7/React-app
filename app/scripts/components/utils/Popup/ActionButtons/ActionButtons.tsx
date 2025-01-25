import React from "react";
import ActionButtonsModel from "./ActionButtonsModel";
import { ThemeProvider } from "@material-ui/styles";
import { CircularProgress , DialogActions } from "@material-ui/core";
import { Button, LightTheme } from "@esko/cloud-ui-components/dist/esm";

export default function ActionButtons(actionButtonsProps: ActionButtonsModel) {
  return (
    <ThemeProvider theme={LightTheme}>
        <DialogActions>
            <Button 
                color={"secondary"}
                onClick={actionButtonsProps.handleCancelButtonClick}
                className={undefined}
                startIcon={undefined}
                endIcon={undefined}
                pullDown={undefined} >
                    Cancel
            </Button>
            
            <Button
                color="primary"  
                onClick={actionButtonsProps.handleSuccessButtonClick}            
                className={undefined}
                startIcon={undefined}
                endIcon={undefined}
                pullDown={undefined} >
                    {actionButtonsProps.successButtonText}
                    {actionButtonsProps.loading && <CircularProgress size={15} style={{ color: "white", marginLeft: "8px" }} /> }
            </Button>
        </DialogActions>
    </ThemeProvider>  
  )
}