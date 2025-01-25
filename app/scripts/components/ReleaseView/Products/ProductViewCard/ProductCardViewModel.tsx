import { BusinessGoalTableType } from "../../../../interfaces/InnovationInterface";
import { ProductModel } from "../../../settings/ProductView/ProductModel";
import { HeroFeatureModel } from "../HeroFeatureModel";

export default interface ProductCardViewModel {
    product: ProductModel,
    selectedReleaseId : string;
    businessGoalList : BusinessGoalTableType[];
    heroFeatures : HeroFeatureModel[];
    openFilterMenu : boolean
}