export default interface ActiveReleaseTableCellContentModel {
    text: string;
    tooltipText: string;
    isTextBold: boolean;
    tooltipPlacement: "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end"
    | "right-start" | "right" | "top-end" | "top-start" | "top";
}