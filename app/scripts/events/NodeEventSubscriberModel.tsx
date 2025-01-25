export declare interface NodeEventSubscriberModel {
    node: string;
    callback: (isNodeUpdated: boolean) => void;
    isNodeUpdated: boolean;
}

export declare interface EventListenerInputModel {
    nodePath: string;
    filter: string;
    processEvents: (event: MessageEvent) => void;
}

export enum RepoEventPayloadType {
    Unknown = "Unknown",
    PropertiesSet = "PropertiesSet",
    PropertiesRemoved = "PropertiesRemoved",
    PropertyValuesRemoved = "PropertyValuesRemoved",
    Removed = "Removed",
    Renamed = "Renamed",
    ValuesAdded = "ValuesAdded",
    ChildAdded = "ChildAdded",
    ChildrenAdded = "ChildrenAdded",
    ChildRemoved = "ChildRemoved",
    ChildRenamed = "ChildRenamed",
    ContentSet = "ContentSet",
    ContentRemoved = "ContentRemoved",
}

export interface RepoEventData {
    eventNumber: number,
    indexed: boolean,
    nodeId: string,
    path: string,
    payload: any[],
    payloadType: RepoEventPayloadType,
    publisher: string,
    time: number,
    topic: string,
    userId: string
}