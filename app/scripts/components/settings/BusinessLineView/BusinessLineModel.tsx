export interface BusinessLineModel{
    name: string;
    nodeId: string;
    isActive: boolean;
    productList: string[];
    businessGoalList: string[];
}

export interface BusinessLineMenuDataModel {
    dataKey: string;
    displayValue: string;
    thumbnail: string;
}