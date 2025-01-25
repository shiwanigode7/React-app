export interface RAWidgetModel {
    quarterDetails: string;
    percentage: number;
    BusinessLineList: RABusinessLine[];
}

export interface RABusinessLine {
    businessLineName: string;
    percentage: number;
}