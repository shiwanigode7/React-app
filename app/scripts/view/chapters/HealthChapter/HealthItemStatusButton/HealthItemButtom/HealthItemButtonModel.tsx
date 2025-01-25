export default interface HealthItemButtonModel {
    item: string;
    isDisabled : boolean;
    handleClick: (event: any) => void;
    startIcon: any;
    rootClass: any;
    containedPrimaryClass: any;
    endIconClass: any;
    startIconClass: any;
    toolTipClass: any;
}