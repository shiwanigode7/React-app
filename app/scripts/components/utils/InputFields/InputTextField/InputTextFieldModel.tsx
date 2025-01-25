import InputFieldsModel from "../InputFieldsModel";

export default interface InputTextFieldModel extends InputFieldsModel {
    maxCharactersAllowed: number;
    isTextArea?: boolean;
    minRows?: number;
    maxRows?: number;
    doesAlreadyExist?: boolean;
    alreadyExistsText?: string;
    isBlockCharacterEntry?: boolean;
    maxWidth?: number;
    isShowMaxCharactersAllowedErrorMsg?: boolean;
    placeholderText?: string
    disabled?: boolean;
}