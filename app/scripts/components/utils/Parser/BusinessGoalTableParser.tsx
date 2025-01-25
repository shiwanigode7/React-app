import { BusinessGoalTableType } from "../../../interfaces/InnovationInterface";
import { defaultBusinessGoalInitializer } from "../../../utils/MPLViewUtils";

export function BusinessGoalTableParser(inBusinessGoalData: any[]) {

    const lBusinessGoalList: BusinessGoalTableType[] = [];

    inBusinessGoalData.forEach((lBusinessGoal) => {
        /**Save the required fields. If a field is undefined then save with a custom value
         * For strings it is "", for numbers it is zero
         */
        const lBusinessGoalHolder: BusinessGoalTableType = {
            nodeId: lBusinessGoal["nodeId"] === undefined ? "" : lBusinessGoal["nodeId"],
            MPLPriority: lBusinessGoal["ec_s@MPLPriority"] === undefined ? "" : lBusinessGoal["ec_s@MPLPriority"],
            PPLPriority: undefined === lBusinessGoal["ec_s@PPLPriority"] ? "" : lBusinessGoal["ec_s@PPLPriority"],
            businessGoalName: lBusinessGoal["ec_s@businessGoalName"] === undefined ? "" : lBusinessGoal["ec_s@businessGoalName"],
            problemDefinition: lBusinessGoal["ec_s@problemDefinition"] === undefined ? "" : lBusinessGoal["ec_s@problemDefinition"],
            briefDescription: lBusinessGoal["ec_s@briefDescription"] === undefined ? "" : lBusinessGoal["ec_s@briefDescription"],
            goalType: lBusinessGoal["ec_s@goalType"] === undefined ? "" : lBusinessGoal["ec_s@goalType"],
            owner: lBusinessGoal["ec_s@owner"] === undefined ? "" : lBusinessGoal["ec_s@owner"],
            thumbnail: lBusinessGoal["ec_s@thumbnail"] === undefined ? "" : lBusinessGoal["ec_s@thumbnail"],
            businessUnit: lBusinessGoal["ec_s@businessUnit"] === undefined ? "" : lBusinessGoal["ec_s@businessUnit"],
            status: lBusinessGoal["ec_s@status"] === undefined ? "" : lBusinessGoal["ec_s@status"],
            runwaysList: lBusinessGoal["ec_nio@runwaysList"] === undefined ? [] : lBusinessGoal["ec_nio@runwaysList"],
            productsList: undefined == lBusinessGoal["ec_nio@productsList"] ? [] : lBusinessGoal["ec_nio@productsList"],
            runwaysCount: lBusinessGoal["ec_nio@runwaysList"] === undefined ? 0 : lBusinessGoal["ec_nio@runwaysList"].length,
            targetMarketScore: lBusinessGoal["ec_f@targetMarketScore"] === undefined ? 1 : lBusinessGoal["ec_f@targetMarketScore"],
            channelPartnerScore: lBusinessGoal["ec_f@channelPartnerScore"] === undefined ? 1 : lBusinessGoal["ec_f@channelPartnerScore"],
            positioningScore: lBusinessGoal["ec_f@positioningScore"] === undefined ? 1 : lBusinessGoal["ec_f@positioningScore"],
            ideaTypeScore: lBusinessGoal["ec_f@ideaTypeScore"] === undefined ? 1 : lBusinessGoal["ec_f@ideaTypeScore"],
            riskScore: lBusinessGoal["ec_f@riskScore"] === undefined ? 4 : lBusinessGoal["ec_f@riskScore"],
            nodePath: lBusinessGoal["path"] === undefined ? "" : lBusinessGoal["path"],
            freedomToOperate: undefined === lBusinessGoal["ec_boolean@freedomToOperate"] ? false : lBusinessGoal["ec_boolean@freedomToOperate"],
            potentialIp: undefined === lBusinessGoal["ec_boolean@potentialIp"] ? false : lBusinessGoal["ec_boolean@potentialIp"],
            potentialIpDescription: undefined === lBusinessGoal["ec_s@potentialIpDescription"] ? "" : lBusinessGoal["ec_s@potentialIpDescription"],
            milestones: undefined == lBusinessGoal["ec_nio@milestones"] ? [] : lBusinessGoal["ec_nio@milestones"],
            businessCaseData: undefined === lBusinessGoal["ec_nio@businessCaseData"] ? defaultBusinessGoalInitializer().businessCaseData : lBusinessGoal["ec_nio@businessCaseData"],
            releaseTimelineData: undefined === lBusinessGoal["ec_nio@releaseTimelineData"] ? defaultBusinessGoalInitializer().releaseTimelineData : lBusinessGoal["ec_nio@releaseTimelineData"],
            slides: undefined == lBusinessGoal["ec_nio@slides"] ? [] : lBusinessGoal["ec_nio@slides"],
            coreTeam: undefined === lBusinessGoal["ec_nio@coreTeam"] ? defaultBusinessGoalInitializer().coreTeam : lBusinessGoal["ec_nio@coreTeam"],
            healthData: undefined === lBusinessGoal["ec_nio@healthData"] ? defaultBusinessGoalInitializer().healthData : lBusinessGoal["ec_nio@healthData"]
        };
        /**Add the business goal to the return array */
        lBusinessGoalList.push(lBusinessGoalHolder);
    })

    return lBusinessGoalList;
} 