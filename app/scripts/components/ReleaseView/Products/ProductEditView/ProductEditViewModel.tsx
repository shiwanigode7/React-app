import { BusinessGoalTableType } from "../../../../interfaces/InnovationInterface";
import { ProductModel } from "../../../settings/ProductView/ProductModel";
import { HeroFeatureModel } from "../HeroFeatureModel";

export default interface ProductEditViewModel {
    product: ProductModel,
    selectedReleaseId : string;
    heroFeatures : HeroFeatureModel[];
    businessGoalList : BusinessGoalTableType[];
    setIsHeroFeatureChanged : React.Dispatch<React.SetStateAction<boolean>>;
    setHeroFeatureList :  React.Dispatch<React.SetStateAction<HeroFeatureModel[]>>;
    handleDescriptionChange : (inDescription: string, inReleaseId: string, inProductId: string) => void;
    handleMoreDetailsChange : (inMoreDetails: string, inReleaseId: string, inProductId: string) => void;
}