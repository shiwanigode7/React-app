import React from "react";
import { Dialog, Divider } from "@material-ui/core";
import AddReleasePopUpModel from "./AddReleasePopUpModel";
import ActionButtons from "../../../utils/Popup/ActionButtons/ActionButtons";
import Header from "../../../utils/Popup/Header/Header";
import Content from "./Content/Content";

export default function AddReleasePopUp(AddReleasePopUpProps: AddReleasePopUpModel) {
    return (
        <Dialog open={AddReleasePopUpProps.isOpen} maxWidth={"xs"} fullWidth={true} >
            <Header
                titleText={AddReleasePopUpProps.header.titleText}
                handleCloseButtonClick={AddReleasePopUpProps.header.handleCloseButtonClick} />
            <Content
                inputTextField={AddReleasePopUpProps.inputTextField}
                datePickerField={AddReleasePopUpProps.datePickerField}
                textAreaField={AddReleasePopUpProps.textAreaField} />

            <Divider light style={{margin: "0px"}} />

            <ActionButtons
                handleCancelButtonClick={AddReleasePopUpProps.actionButtons.handleCancelButtonClick}
                successButtonText={AddReleasePopUpProps.actionButtons.successButtonText}
                handleSuccessButtonClick={AddReleasePopUpProps.actionButtons.handleSuccessButtonClick}
                loading={AddReleasePopUpProps.actionButtons.loading} />
        </Dialog>
    )
}
