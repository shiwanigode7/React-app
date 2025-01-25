import { BGCoreTeam } from "../../../../../interfaces/InnovationInterface";

export default interface BusinessGoalCardHeaderModel {
    businessGoalThumbnail: string;
    userAvatar: string;
    businessGoalName: string;
    overallScore: number;
    coreTeam: BGCoreTeam;
    openFilterMenu : boolean;
}