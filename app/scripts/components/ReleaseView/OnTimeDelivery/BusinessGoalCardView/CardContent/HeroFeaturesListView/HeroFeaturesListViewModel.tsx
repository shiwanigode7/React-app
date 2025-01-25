import { ReleaseHeroFeature } from "../../../../../../interfaces/InnovationInterface";
import { ReleaseProductModel } from "../BusinessGoalCardContentViewModel";

export default interface HeroFeatureListViewModel {
    milestoneId: string;
    milestoneName: string;
    heroFeaturesList: ReleaseHeroFeature[];
    products: ReleaseProductModel[];
}