import { BusinessGoalTableType } from "../../../../../interfaces/InnovationInterface";

export default interface ProductEditCardContentModel {
    description : string;
    productId : string;
    releaseId : string;
    businessGoals: BusinessGoalTableType[];
}