import ActionButtonsModel from "../Popup/ActionButtons/ActionButtonsModel";
import HeaderModel from "../Popup/Header/HeaderModel";
import ContentModel from "./Content/ContentModel";

export default interface ConfirmationPopupModel {
    isOpen: boolean;
    header: HeaderModel;
    confirmationMessage: ContentModel;
    actionButtons: ActionButtonsModel;
}