export interface RABusinessLineModel {
    nodeId: string;
    name: string;
    productsList: RAProductModel[];
    businessGoalsList: RABusinessGoalModel[];
}

export interface RAProductModel {
    nodeId: string;
    name: string;
    thumbnail: string;
}

export interface RABusinessGoalModel {
    nodeId?: string;
    name: string;
}

export interface RevenueAchievementModel {
    [key: string]: string | string[] | RAQuarter;
    blNodeId: string;
    productList: string[];
    bgList: string[];
    jop: string;
    goal: string;
    Q1: RAQuarter;
    Q2: RAQuarter;
    Q3: RAQuarter;
    Q4: RAQuarter;
    year: string;
}

export interface RAQuarter {
    [key: string]: string;
    plan: string;
    actual: string;
}

export interface RABusinessLineWithHistoricalDataModel {
    [key: string]: string | RABusinessLineModel | RAQuarter;
    raBusinessLine: RABusinessLineModel;
    jop: string;
    goal: string;
    Q1: RAQuarter;
    Q2: RAQuarter;
    Q3: RAQuarter;
    Q4: RAQuarter;
}