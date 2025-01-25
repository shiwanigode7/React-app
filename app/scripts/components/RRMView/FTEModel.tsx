export default interface FTEModel {
    nodeId?: string;
    number: string;
    percentageNumber: string;
    releaseNodeId: string;
    runwayNodeId: string;
    bgNodeId: string;
    notes: string;
}

export interface FTENotesModel {
    nodeId?: string;
    releaseNodeId: string;
    runwayNodeId: string;
    bgNodeId: string;
    notes: string
}