import { RABusinessLineModel, RABusinessLineWithHistoricalDataModel, RevenueAchievementModel } from "../RevenueAchievementModel";

export default interface RevenueAchievementTableModel {
    handleJOPFieldBlur: any;
    handleGOALFieldBlur: any;
    handleQuarterFieldBlur: any;
    raBusinessLinesList: RABusinessLineModel[];
    allRevenueAchievements: RevenueAchievementModel[];
    selectedYear: string;
    showBusinessLineList: string[];
    isRAEditable: boolean;
}

export interface RATableForHistoricalDataModel {
    raBusinessLinesWithHistoricalDataList: RABusinessLineWithHistoricalDataModel[];
    showBusinessLineList: string[];
}