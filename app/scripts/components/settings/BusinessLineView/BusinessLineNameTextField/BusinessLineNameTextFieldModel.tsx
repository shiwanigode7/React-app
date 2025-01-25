export interface BusinessLineNameTextFieldModel {
    value: string;
    fieldId: string;
    errorLabel: string;
    maxCharacters: number;
    onBlur: (inNewValue: string, inFieldId: string) => void;
    onEmptyValueCallback: () => void;
}