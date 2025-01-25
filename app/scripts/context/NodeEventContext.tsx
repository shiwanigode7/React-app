import { createContext } from "react";

const businessGoalsUpdated: boolean = false;
const setBusinessGoalsUpdated = (isBusinessGoalsUpdated: boolean) => {
    console.log("businessGoalsUpdated");
};

const FTEUpdated: boolean = false;
const setFTEUpdated = (isFTEUpdated: boolean) => {
    console.log("FTEUpdated");
};

const heroFeaturesUpdated: boolean = false;
const setHeroFeaturesUpdated = (isHeroFeaturesUpdated: boolean) => {
    console.log("heroFeaturesUpdated");
};

const IPVUpdated: boolean = false;
const setIPVUpdated = (isIPVUpdated: boolean) => {
    console.log("IPVUpdated");
};

const innovationEquationsUpdated: boolean = false;
const setInnovationEquationsUpdated = (isInnovationEquationsUpdated: boolean) => {
    console.log("innovationEquationsUpdated");
};

const OTDUpdated: boolean = false;
const setOTDUpdated = (isOTDUpdated: boolean) => {
    console.log("OTDUpdated");
};

const RAUpdated: boolean = false;
const setRAUpdated = (isRAUpdated: boolean) => {
    console.log("RAUpdated");
};

const businessLinesUpdated: boolean = false;
const setBusinessLinesUpdated = (isBusinessLinesUpdated: boolean) => {
    console.log("businessLinesUpdated");
};

const PPGUpdated: boolean = false;
const setPPGUpdated = (isPPGUpdated: boolean) => {
    console.log("PPGUpdated");
};

const PPGActionsUpdated: boolean = false;
const setPPGActionsUpdated = (isPPGActionsUpdated: boolean) => {
    console.log("PPGActionsUpdated");
};

const SIRUpdated: boolean = false;
const setSIRUpdated = (isSIRUpdated: boolean) => {
    console.log("SIRUpdated");
};

const SIRActionsUpdated: boolean = false;
const setSIRActionsUpdated = (isSIRActionsUpdated: boolean) => {
    console.log("SIRActionsUpdated");
};

const productsUpdated: boolean = false;
const setProductsUpdated = (isProductsUpdated: boolean) => {
    console.log("productsUpdated");
};

const releasesUpdated: boolean = false;
const setReleasesUpdated = (isReleasesUpdated: boolean) => {
    console.log("releasesUpdated");
};

const resourcesUpdated: boolean = false;
const setResourcesUpdated = (isResourcesUpdated: boolean) => {
    console.log("resourcesUpdated");
};

const runwaysUpdated: boolean = false;
const setRunwaysUpdated = (isRunwaysUpdated: boolean) => {
    console.log("runwaysUpdated");
};

export const NodeEventContext = createContext({
    "businessGoalsUpdated": businessGoalsUpdated,
    "setBusinessGoalsUpdated": setBusinessGoalsUpdated,
    "FTEUpdated": FTEUpdated,
    "setFTEUpdated": setFTEUpdated,
    "heroFeaturesUpdated": heroFeaturesUpdated,
    "setHeroFeaturesUpdated": setHeroFeaturesUpdated,
    "IPVUpdated": IPVUpdated,
    "setIPVUpdated": setIPVUpdated,
    "innovationEquationsUpdated": innovationEquationsUpdated,
    "setInnovationEquationsUpdated": setInnovationEquationsUpdated,
    "OTDUpdated": OTDUpdated,
    "setOTDUpdated": setOTDUpdated,
    "RAUpdated": RAUpdated,
    "setRAUpdated": setRAUpdated,
    "businessLinesUpdated": businessLinesUpdated,
    "setBusinessLinesUpdated": setBusinessLinesUpdated,
    "PPGUpdated": PPGUpdated,
    "setPPGUpdated": setPPGUpdated,
    "PPGActionsUpdated": PPGActionsUpdated,
    "setPPGActionsUpdated": setPPGActionsUpdated,
    "SIRUpdated": SIRUpdated,
    "setSIRUpdated": setSIRUpdated,
    "SIRActionsUpdated": SIRActionsUpdated,
    "setSIRActionsUpdated": setSIRActionsUpdated,
    "productsUpdated": productsUpdated,
    "setProductsUpdated": setProductsUpdated,
    "releasesUpdated": releasesUpdated,
    "setReleasesUpdated": setReleasesUpdated,
    "resourcesUpdated": resourcesUpdated,
    "setResourcesUpdated": setResourcesUpdated,
    "runwaysUpdated": runwaysUpdated,
    "setRunwaysUpdated": setRunwaysUpdated
});