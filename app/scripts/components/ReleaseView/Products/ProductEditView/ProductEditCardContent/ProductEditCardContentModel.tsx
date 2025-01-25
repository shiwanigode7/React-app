import { BusinessGoalTableType } from "../../../../../interfaces/InnovationInterface";
import { HeroFeatureModel } from "../../HeroFeatureModel";

export default interface ProductEditCardContentModel {
    description : string;
    productId : string;
    releaseId : string;
    moreDetails : string;
    heroFeatures : HeroFeatureModel[];
    businessGoals: BusinessGoalTableType[];
    setHeroFeatureList :  React.Dispatch<React.SetStateAction<HeroFeatureModel[]>>;
    setIsHeroFeatureChanged : React.Dispatch<React.SetStateAction<boolean>>;
    handleDescriptionChange : (inDescription: string, inReleaseId: string, inProductId: string) => void;
    handleMoreDetailsChange : (inMoreDetails: string, inReleaseId: string, inProductId: string) => void;
}