import { Dialog, Divider, ThemeProvider } from "@material-ui/core";
import React from "react";
import ActionButtons from "../Popup/ActionButtons/ActionButtons";
import Header from "../Popup/Header/Header";
import ConfirmationPopupModel from "./ConfirmationPopupModel";
import { ConfirmationDialogTheme, ConfirmationPopupStyles } from "./ConfirmationPopupStyles";
import Content from "./Content/Content";

export default function ConfirmationPopup(confirmationPopupProps: ConfirmationPopupModel) {
  const confirmationPopupStyleClasses = ConfirmationPopupStyles();

  return (
    <ThemeProvider theme={ConfirmationDialogTheme}>
      <Dialog open={confirmationPopupProps.isOpen} fullWidth maxWidth='xs'>
        <Header                  
          titleText={confirmationPopupProps.header.titleText}
          handleCloseButtonClick={confirmationPopupProps.header.handleCloseButtonClick} />                
                
        <Content
          text={confirmationPopupProps.confirmationMessage.text}/>
                
        <Divider light className={confirmationPopupStyleClasses.divider} />

        <ActionButtons
          handleCancelButtonClick={confirmationPopupProps.actionButtons.handleCancelButtonClick}
          handleSuccessButtonClick={confirmationPopupProps.actionButtons.handleSuccessButtonClick}
          successButtonText={confirmationPopupProps.actionButtons.successButtonText}
          loading={confirmationPopupProps.actionButtons.loading} />
      </Dialog>            
    </ThemeProvider>
  )
}