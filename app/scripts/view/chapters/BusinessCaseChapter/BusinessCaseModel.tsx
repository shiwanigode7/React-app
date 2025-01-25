export default interface BusinessCaseModel {
    recurringRevenueProjections: FiveYearsBusinessCaseModel;
    nonRecurringRevenueProjections: FiveYearsBusinessCaseModel;
    totalRevenueProjections: FiveYearsBusinessCaseModel;
    recurringRatios: FiveYearsBusinessCaseModel;
    costOfSales: FiveYearsBusinessCaseModel;
    opex: FiveYearsBusinessCaseModel;
    investmentPreLaunch: number;
    recurringInvestment: number;
    npvValue: number;
    fiveYearEBit: number;
    currentGrossProfit: number;
    grossProfitImprovement: number;
    simplePayback: SimplePaybackModel;
    historicalCAGR: number;
    estimatedCAGR: number;
    estimatedFTECounts: FiveYearsBusinessCaseModel;
    estimatedDevelopmentTime: number;
}

export interface FiveYearsBusinessCaseModel {
    [key: string]: number;
    Y1: number;
    Y2: number;
    Y3: number;
    Y4: number;
    Y5: number;
}

export interface SimplePaybackModel {
    years: number;
    months: number;
}

export interface ProjectionDetailsModel {
    year: string;
    amount: number;
}