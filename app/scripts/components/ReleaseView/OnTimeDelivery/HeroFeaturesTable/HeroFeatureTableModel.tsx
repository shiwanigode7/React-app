import { HERO_FEATURE_STATUS } from "../../../../constant/InnovationEnums";
import { MilestoneModel } from "../../../../interfaces/InnovationInterface";

export interface HeroFeatureTableProps {
    heroFeatureData: HeroFeatureForOTDModel;
    selectedStatusValue: string[];
    selectedProductValue: string[];
    showOnlyMyProducts: boolean;
    updateStatusCallback: (inNewStatus: string, inHeroFeatureId: string, inHeroFeatureNodeId: string) => void;
}

export declare interface HeroFeatureForOTDModel {
    monthYear: string;
    freezeDate: string;
    otdPercentage: number;
    completedMilestones: number;
    incompleteMilestones: number;
    activeBusinessGoals: BusinessGoalForOTDModel[];
    products: ProductForOTDModel[];
    heroFeatures: HeroFeatureTableModel[];
}

export interface BusinessGoalForOTDModel {
    businessGoalName: string;
    businessGoalId: string;
    thumbnail: string;
    milestones: MilestoneModel[];
}

export interface ProductForOTDModel {
    productName: string;
    productId: string;
    managers: string[];
    thumbnail: string;
}

export interface HeroFeatureTableModel {
    milestoneId: string;
    milestoneStatus: string;
    businessGoalId: string;
    heroFeatureNodeId: string;
    heroFeatureList: HeroFeatureListForOTDModel[];
}

export interface HeroFeatureListForOTDModel {
    heroFeatureName: string;
    currentStatus: string;
    productId: string;
    heroFeatureId: string;
}

export function defaultOTDInitializer() {
    const defaultOTDData: HeroFeatureForOTDModel = {
        otdPercentage: 0,
        completedMilestones: 0,
        incompleteMilestones: 0,
        activeBusinessGoals: [],
        freezeDate: "",
        monthYear: "",
        heroFeatures: [],
        products: []
    }
    return defaultOTDData;
}

export const heroFeatureStatusDropDownValue: string[] = [HERO_FEATURE_STATUS.ON_TRACK, HERO_FEATURE_STATUS.BEHIND, HERO_FEATURE_STATUS.WAITING_FOR_INPUT];