import { BusinessGoalTableType, ReleaseHeroFeatureModelWithMilestone, UserListWithEmailModel } from "../../../../interfaces/InnovationInterface";
import { ProductModel } from "../../../settings/ProductView/ProductModel";

export default interface BusinessGoalCardViewModel {
    businessGoal: BusinessGoalTableType;
    heroFeatureList: ReleaseHeroFeatureModelWithMilestone[];
    selectedReleaseId: string;
    productsList: ProductModel[];
    userList: UserListWithEmailModel[];
    openFilterMenu : boolean;
}