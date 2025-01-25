import React from "react";

export interface ProductNameTextFieldModel {
    value: string;
    fieldId: string;
    errorLabel: string;
    fieldRequiredLabel: string;
    maxCharacters: number;
    isDialogField: boolean;
    onIncorrectValue: () => void;
    onBlur: (inNewValue: string, inFieldId: string) => void;
    isFormValid: boolean;
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}