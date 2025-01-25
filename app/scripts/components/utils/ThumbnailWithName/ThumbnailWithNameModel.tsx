export default interface ThumbnailWithNameModel {
    thumbnailAltText: string;
    src: string;
    name: string;
    tooltipText: string;
    tooltipPlacement: "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end"
    | "right-start" | "right" | "top-end" | "top-start" | "top";
    isNameBold: boolean;
    nameGridItemMaxWidth: string;
}