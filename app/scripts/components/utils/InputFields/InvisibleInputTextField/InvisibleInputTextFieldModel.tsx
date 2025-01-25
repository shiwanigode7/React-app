export default interface InvisibleInputTextFieldModel {
    name: string;
    value?: string;
    defaultValue?: string;
    handleInput?: any;
    handleBlur?: any;
    backgroundColor?: string;
    maxCharactersAllowed?: number;
    isPercentageView?: boolean;
    color?: string;
    disabled? : boolean;
}