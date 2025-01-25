import { GridSize } from "@material-ui/core";

export declare interface ProjectionsFieldModel{
    title: string;
    value: number;
    suffix: string;
    titleXS: GridSize;
    suffixXS: GridSize;
    isAllowMaxWidth?: boolean;
}