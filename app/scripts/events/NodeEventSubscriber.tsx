import React from "react";
import { EventListener } from "./EventListener";
import { NodeEventSubscriberModel, RepoEventData } from "./NodeEventSubscriberModel";

export declare interface NodeEventSubscriberInputModel {
    nodePath: string;
    filter: string;
    nodeAndCallbacks: NodeEventSubscriberModel[];
}

// Subscribes to "Events"
export default function NodeEventSubscriber(input: NodeEventSubscriberInputModel) {

    const processEvents = (event: MessageEvent) => {
        const repoEvent: RepoEventData = JSON.parse(event?.data) as RepoEventData;
        for (const nodeAndCallback of input.nodeAndCallbacks) {
            if (repoEvent.path.includes(nodeAndCallback.node)) {
                nodeAndCallback.isNodeUpdated = !nodeAndCallback.isNodeUpdated
                nodeAndCallback.callback(nodeAndCallback.isNodeUpdated);
            }
        }
    };

    return 0 !== input.nodePath.length ? <EventListener
        nodePath={input.nodePath}
        filter={input.filter}
        processEvents={processEvents}
    /> : <div></div>
}