import { RunwayModel } from "../../BusinessGoalViewModel";

export default interface CardContentModel {
    description : string;
    runways : RunwayModel[];
    milestones : string[];
    selectedRelease : string;
}