import { BusinessGoalTableType } from "../../../../../interfaces/InnovationInterface";
import { HeroFeatureModel } from "../../HeroFeatureModel";

export default interface MileStoneAccordionModel {
    businessGoal: BusinessGoalTableType;
    productId : string;
    selectedReleaseId : string;
    heroFeatures : HeroFeatureModel[];
    setHeroFeatureList :  React.Dispatch<React.SetStateAction<HeroFeatureModel[]>>;
    setIsHeroFeatureChanged : React.Dispatch<React.SetStateAction<boolean>>;
}