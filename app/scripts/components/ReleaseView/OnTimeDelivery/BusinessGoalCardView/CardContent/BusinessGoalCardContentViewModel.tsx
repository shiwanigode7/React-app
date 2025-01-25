import { BusinessGoalTableType, ReleaseHeroFeatureModelWithMilestone } from "../../../../../interfaces/InnovationInterface";

export default interface BusinessGoalCardContentViewModel {
    selectedReleaseId: string;
    heroFeaturesList: ReleaseHeroFeatureModelWithMilestone[];
    releaseMilestones: string[];
    products: ReleaseProductModel[];
    businessGoal: BusinessGoalTableType;
}

export interface ReleaseProductModel {
    productName: string;
    productId: string;
}

