export default interface TextWithTooltipModel {
    text: string;
    tooltipText: string;
    isTextBold: boolean;
    textAlign?: "center" | "right" | "left";
    tooltipPlacement: "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end"
    | "right-start" | "right" | "top-end" | "top-start" | "top";
}