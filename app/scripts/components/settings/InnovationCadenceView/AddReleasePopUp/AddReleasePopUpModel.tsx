import DatePickerFieldModel from "../../../utils/InputFields/DatePickerField/DatePickerFieldModel";
import InputTextFieldModel from "../../../utils/InputFields/InputTextField/InputTextFieldModel";
import TextAreaFieldModel from "../../../utils/InputFields/TextAreaField/TextAreaFieldModel";
import ActionButtonsModel from "../../../utils/Popup/ActionButtons/ActionButtonsModel";
import HeaderModel from "../../../utils/Popup/Header/HeaderModel";

export default interface AddReleasePopUpModel {
    isOpen: boolean;
    header: HeaderModel;
    actionButtons: ActionButtonsModel;
    inputTextField?: InputTextFieldModel;
    datePickerField?: DatePickerFieldModel;
    textAreaField?: TextAreaFieldModel;
}