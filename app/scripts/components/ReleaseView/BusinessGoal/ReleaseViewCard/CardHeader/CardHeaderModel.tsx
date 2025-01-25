import { BGCoreTeam } from "../../../../../interfaces/InnovationInterface";

export default interface CardHeaderModel {
    BGThumbnail : string;
    businessGoalName : string;
    userAvatar: string;
    isLaunchRelease: boolean;
    coreTeam: BGCoreTeam;
    openFilterMenu : boolean;
}

export interface OwnerAvatarThemeProps {
    ownerFirstName: string;
    ownerLastName: string;
}