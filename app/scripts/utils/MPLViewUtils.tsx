/**Utils used in the MPL view */

import images from "../../Icons/images";
import { BG_HEALTH_STATUS } from "../constant/InnovationEnums";
import { NoteInterface, BusinessGoalTableType, YealryIPVModel } from "../interfaces/InnovationInterface";
import ThumbnailWithName from "../components/utils/ThumbnailWithName/ThumbnailWithName";
import React from "react";

/**Util function for initializing default business goal data */
export const defaultBusinessGoalInitializer = () => {
    const lBusinessGoalData: BusinessGoalTableType = {
        nodeId: "",
        MPLPriority: "",
        PPLPriority: "",
        nodePath: "",
        runwaysCount: 0,
        briefDescription: "",
        businessGoalName: "",
        businessUnit: "Brands",
        channelPartnerScore: 1,
        goalType: "Strategic Alignment",
        ideaTypeScore: 1,
        owner: "",
        thumbnail: images.EskoStarPng,
        positioningScore: 1,
        problemDefinition: "",
        riskScore: 4,
        runwaysList: [],
        productsList: [],
        status: "Ideation",
        targetMarketScore: 1,
        freedomToOperate: false,
        potentialIp: false,
        potentialIpDescription: "",
        milestones: [],
        businessCaseData: {
            recurringRevenueProjections: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            nonRecurringRevenueProjections: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            totalRevenueProjections: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            recurringRatios: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            costOfSales: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            opex: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            investmentPreLaunch: 0,
            recurringInvestment: 0,
            npvValue: 0,
            fiveYearEBit: 0,
            currentGrossProfit: 0,
            grossProfitImprovement: 0,
            simplePayback: { years: 0, months: 0 },
            historicalCAGR: 0,
            estimatedCAGR: 0,
            estimatedFTECounts: { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0 },
            estimatedDevelopmentTime: 0
        },
        releaseTimelineData: [],
        slides: [],
        coreTeam: {
            marketing: "",
            productManager: "",
            projectManager: "",
            researchAndDevelopment: "",
            sales: ""
        },
        healthData: {
            technical: {
                comment: "",
                status: BG_HEALTH_STATUS.NO_STATUS
            },
            schedule: {
                comment: "",
                status: BG_HEALTH_STATUS.NO_STATUS
            },
            businessCase: {
                comment: "",
                status: BG_HEALTH_STATUS.NO_STATUS
            },
            IP: {
                comment: "",
                status: BG_HEALTH_STATUS.NO_STATUS
            },
            resources: {
                comment: "",
                status: BG_HEALTH_STATUS.NO_STATUS
            }
        }
    }
    return lBusinessGoalData;
}

/**Util function for initializing default business goal note data */
export const defaultBusinessNoteInitializer = () => {
    const lBusinessNote: NoteInterface = {
        data: "",
        date: new Date(""),
        noteName: "",
        noteView: "Public",
        owner: ""
    }
    return lBusinessNote;
}

/**Util function fro initializing default yearly IPV data */
export const defaultYealryIPVInitializer = (inYear: string) => {
    const lYearlyIPVData: YealryIPVModel = {
        year: inYear,
        softwareIPV: 0,
        hardwareIPV: 0,
        activeBusinessGoals: []
    }
    return lYearlyIPVData;
}

/**Util function to update a given business goal with the changed fields */
export const businessGoalTableSorter = (inTableData: BusinessGoalTableType[]) => {
    inTableData.sort((lFirstElementValue: any, lSecondElementValue: any) => {
        let lReturnValue: number = 0;
        if (lFirstElementValue["MPLPriority"].toLowerCase() < lSecondElementValue["MPLPriority"].toLowerCase()) {
            lReturnValue = -1;
        }
        if (lFirstElementValue["MPLPriority"].toLowerCase() > lSecondElementValue["MPLPriority"].toLowerCase()) {
            lReturnValue = 1;
        }
        if (lFirstElementValue["MPLPriority"].toLowerCase() === lSecondElementValue["MPLPriority"].toLowerCase()) {
            lReturnValue = 0;
        }
        return lReturnValue;
    });
    return inTableData;
}

export const getBGThumbnailAndName = (thumbnail: string, name: string) => {
    return <ThumbnailWithName
        thumbnailAltText="Business Goal Thumbnail"
        src={thumbnail}
        name={name}
        isNameBold={false}
        tooltipText={name}
        tooltipPlacement="bottom"
        nameGridItemMaxWidth="160px" />;
}