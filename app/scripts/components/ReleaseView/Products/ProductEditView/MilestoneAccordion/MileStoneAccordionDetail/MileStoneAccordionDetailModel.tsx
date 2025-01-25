import { HeroFeatureModel } from "../../../HeroFeatureModel";

export default interface MileStoneAccordionDetailModel {
    milestoneName: string;
    milestoneId: string;
    productId: string;
    heroFeatures: HeroFeatureModel[];
    selectedReleaseId: string;
    setHeroFeatureList :  React.Dispatch<React.SetStateAction<HeroFeatureModel[]>>;
    businessGoalId: string;
    setIsHeroFeatureChanged : React.Dispatch<React.SetStateAction<boolean>>;
}