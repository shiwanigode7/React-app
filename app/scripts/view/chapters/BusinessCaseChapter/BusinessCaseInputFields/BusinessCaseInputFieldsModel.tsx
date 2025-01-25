export interface NumberTypeInputFieldModel {
    name: string;
    defaultValue?: number;
    value?: number;
    startAdornmentText?: string;
    handleBlur?: any;
    isStartAdornmentVisible: boolean;
    maxNumberAllowed: number;
    minNumberAllowed: number;
    maxDigitsAllowed: number;
}

export interface TextTypeInputFieldModel {
    name: string;
    defaultValue?: string;
    allowNegativeValue?: boolean;
    value?: string;
    startAdornmentText?: string;
    handleBlur?: any;
    isStartAdornmentVisible: boolean;
    maxCharactersAllowed: number;
}