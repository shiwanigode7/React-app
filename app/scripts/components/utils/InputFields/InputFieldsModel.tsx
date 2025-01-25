export default interface InputFieldsModel {
    hasLabel: boolean;
    label?: string;
    isMandatory: boolean;
    name: string;
    defaultValue?: string;
    key?: any;
    value?: string;
    handleInput?: any;
    handleBlur?: any;
    isEmpty: boolean;
    title?: string;
}