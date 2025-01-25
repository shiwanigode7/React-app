import { ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";

export default interface ReleaseTypeIconModel {
    releaseTimelineData: ReleaseTimelineModel;
    isActiveRelease: boolean;
    isEditable?: boolean;
}