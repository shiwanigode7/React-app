import InputFieldsModel from "../InputFieldsModel";

export default interface TextAreaFieldModel extends InputFieldsModel {
    minRows: number;
    maxRows: number;
    maxCharactersAllowed: number;
    isBlockCharacterEntry?: boolean;
    isShowMaxCharactersAllowedErrorMsg?: boolean;
}