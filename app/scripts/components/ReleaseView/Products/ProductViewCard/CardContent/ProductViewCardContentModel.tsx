import { BusinessGoalTableType } from "../../../../../interfaces/InnovationInterface";
import { HeroFeatureModel } from "../../HeroFeatureModel";

export default interface ProductViewCardContentModel {
    description: string;
    businessGoals: BusinessGoalTableType[];
    moreDetails: string;
    selectedReleaseId: string;
    productId: string;
    heroFeaturesList : HeroFeatureModel[];
}