import { ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";

export default interface ReleaseTimelineBarModel {
    releaseTimelineData: ReleaseTimelineModel[];
    fiveUnarchivedReleases: ReleaseModel[];
}