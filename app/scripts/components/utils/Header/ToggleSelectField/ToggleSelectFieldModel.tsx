export default interface ToggleSelectFieldModel {
    handleChange: any;
    defaultValue: string;
    menuOptions: {
        value: any, 
        option: any
    }[];
}