import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../context/InnovationAppContext";
import NodeEventSubscriber from "./NodeEventSubscriber";
import { NodeEventContext } from "../context/NodeEventContext";
import { NodeEventSubscriberModel, RepoEventPayloadType } from "../events/NodeEventSubscriberModel";

/** Event handler for Innovation service */
export default function InnovationEventHandler() {
    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);
    const [nodepath, setNodepath] = useState<string>("");
    const indexedEvents: string = `(
        '${RepoEventPayloadType.ChildAdded}',
        '${RepoEventPayloadType.ChildrenAdded}',
        '${RepoEventPayloadType.ChildRenamed}',
        '${RepoEventPayloadType.ChildRemoved}',
        '${RepoEventPayloadType.ContentRemoved}',
        '${RepoEventPayloadType.ContentSet}',
        '${RepoEventPayloadType.PropertiesSet}',
        '${RepoEventPayloadType.PropertiesRemoved}',
        '${RepoEventPayloadType.PropertyValuesRemoved}',
        '${RepoEventPayloadType.Renamed}',
        '${RepoEventPayloadType.ValuesAdded}')`;

    const filter = `(/payloadType in ${indexedEvents} and /indexed=true)`;

    /** List all nodes */
    const BusinessGoals = "BusinessGoals";
    const FTE = "FullTimeEquivalents";
    const Herofeatures = "HeroFeatures";
    const IPV = "IPV";
    const InnovationEquations = "InnovationEquations";
    const OTD = "OnTimeDelivery";
    const RA = "RevenueAchievements"
    const BusinessLines = "Settings/BusinessLines";
    const PPG = "Settings/Meetings/PPG";
    const PPGActions = "Settings/Meetings/PPG/Actions";
    const SIR = "Settings/Meetings/SIR";
    const SIRActions = "Settings/Meetings/SIR/Actions";
    const Products = "Settings/Products";
    const Releases = "Settings/Releases";
    const Resources = "Settings/Resources";
    const Runways = "Settings/Runways";

    const nodeAndCallbacks: NodeEventSubscriberModel[] = [
        {
            node: BusinessGoals, callback: lNodeEventData.setBusinessGoalsUpdated, isNodeUpdated: lNodeEventData.businessGoalsUpdated
        },
        {
            node: FTE, callback: lNodeEventData.setFTEUpdated, isNodeUpdated: lNodeEventData.FTEUpdated
        },
        {
            node: Herofeatures, callback: lNodeEventData.setHeroFeaturesUpdated, isNodeUpdated: lNodeEventData.heroFeaturesUpdated
        },
        {
            node: IPV, callback: lNodeEventData.setIPVUpdated, isNodeUpdated: lNodeEventData.IPVUpdated
        },
        {
            node: InnovationEquations, callback: lNodeEventData.setInnovationEquationsUpdated, isNodeUpdated: lNodeEventData.innovationEquationsUpdated
        },
        {
            node: OTD, callback: lNodeEventData.setOTDUpdated, isNodeUpdated: lNodeEventData.OTDUpdated
        },
        {
            node: RA, callback: lNodeEventData.setRAUpdated, isNodeUpdated: lNodeEventData.RAUpdated
        },
        {
            node: BusinessLines, callback: lNodeEventData.setBusinessLinesUpdated, isNodeUpdated: lNodeEventData.businessLinesUpdated
        },
        {
            node: PPG, callback: lNodeEventData.setPPGUpdated, isNodeUpdated: lNodeEventData.PPGUpdated
        },
        {
            node: PPGActions, callback: lNodeEventData.setPPGActionsUpdated, isNodeUpdated: lNodeEventData.PPGActionsUpdated
        },
        {
            node: SIR, callback: lNodeEventData.setSIRUpdated, isNodeUpdated: lNodeEventData.SIRUpdated
        },
        {
            node: SIRActions, callback: lNodeEventData.setSIRActionsUpdated, isNodeUpdated: lNodeEventData.SIRActionsUpdated
        },
        {
            node: Products, callback: lNodeEventData.setProductsUpdated, isNodeUpdated: lNodeEventData.productsUpdated
        },
        {
            node: Releases, callback: lNodeEventData.setReleasesUpdated, isNodeUpdated: lNodeEventData.releasesUpdated
        },
        {
            node: Resources, callback: lNodeEventData.setResourcesUpdated, isNodeUpdated: lNodeEventData.resourcesUpdated
        },
        {
            node: Runways, callback: lNodeEventData.setRunwaysUpdated, isNodeUpdated: lNodeEventData.runwaysUpdated
        }
    ];

    useEffect(() => {
        if (0 !== lInnovationData.eskoAccountDetail.repoid.length) {
            setNodepath(lInnovationData.eskoAccountDetail.repoid + "/InnovationSite");
        }
    }, [lInnovationData.eskoAccountDetail]);

    return <NodeEventSubscriber
        nodePath={nodepath}
        filter={filter}
        nodeAndCallbacks={nodeAndCallbacks}
    />
}