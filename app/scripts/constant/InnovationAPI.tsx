/**TSX file listing all the API and locations of the nodes */

export const getRunwayNodePath = (inRepoId: string, inRunwayName: string) => {
    return `${inRepoId}/InnovationSite/Settings/Runways/${inRunwayName.toLowerCase()}`;
}

export const getBusinessGoalNodePath = (inRepoId: string, inBGName: string) => {
    return `${inRepoId}/InnovationSite/BusinessGoals/${inBGName.toLowerCase()}`;
}

export const getMeetingsNodePath = (inRepoId: string, inMeetingType: string, inMeetingName: string) => {
    return `${inRepoId}/InnovationSite/Settings/Meetings/${inMeetingType}/${inMeetingName.toLowerCase()}`;
}
/** Folder name of the Innovation Site workspace*/
export const INNOVATION_SITE_LOCATION: string = "/InnovationSite";
/** Name of the folder where the business goals are saved */
export const INNOVATION_BG_LOCATION: string = "/BusinessGoals";
/**Runway location */
export const INNOVATION_RUNWAY_LOCATION: string = "/Runways";
/**Products location */
export const INNOVATION_PRODUCT_LOCATION: string = "/Products";

/**Function to return the thumbnail path of a given runway */
export const getRunwayThumbnailPath = (inRepoId: string, inRunwayName: string) => {
    return `${window.location.origin.replace("innovation", "repo")}/CONTENT/v0/${inRepoId}${INNOVATION_SITE_LOCATION}/Settings${INNOVATION_RUNWAY_LOCATION}/${inRunwayName}?contentid=thumbnail`;
}

/**Function to return the thumbnail path of a given product */
export const getProductThumbnailPath = (inProductId: string, lVersionNumber: number = 1) => {
    return `${window.location.origin.replace("innovation", "repo")}/CONTENT/v0/${inProductId}?contentid=thumbnail?version=${lVersionNumber}`;
}

/**Function to return the thumbnail path of a given business goal */
export const getBGThumbnailPath = (inRepoId: string, inBGName: string, inVersionNumber?: number) => {
    const lRepoUrl = `${window.location.origin.replace("innovation", "repo")}/CONTENT/v0/${inRepoId}${INNOVATION_SITE_LOCATION}${INNOVATION_BG_LOCATION}/${inBGName}?contentid=thumbnail`;
    const lThumbnailURL: string = lRepoUrl + (undefined === inVersionNumber ? "" : `&version=${inVersionNumber}`);
    return lThumbnailURL;
}
