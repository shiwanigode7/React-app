/**TSX file where all the interfaces related to repo are declared */

/**Request body to send node creation request to repo */
export declare interface NodeCreationRequestBody {
    nodeType: string,
    properties: any
}

/**Bulk request body type*/
export declare interface BulkRequestBody {
    method: string,
    url: string,
    body: any
}

/**Bulk request type */
export declare interface BulkRequestCall {
    process: string,
    ops: BulkRequestBody[]
}

/**Bulk response body type */
export declare interface BulkResponseBody {
    body: any,
    status: number
}

/**Bulk response type */
export declare interface BulkCallResponse {
    results: BulkResponseBody[]
}

/**Sites and folder to be created. Sites/Folders are created sequentially*/
export const SitesFolderData = [
    { nodePath: "/InnovationSite", nodeType: "Site" },
    { nodePath: "/InnovationSite/BusinessGoals", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings", nodeType: "Folder" },
    { nodePath: "/InnovationSite/IPV", nodeType: "Folder" },
    { nodePath: "/InnovationSite/HeroFeatures", nodeType: "Folder" },
    { nodePath: "/InnovationSite/RevenueAchievements", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/Runways", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/Meetings", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/Releases", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/Products", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/Resources", nodeType: "Folder" },
    { nodePath: "/InnovationSite/FullTimeEquivalents", nodeType: "Folder" },
    { nodePath: "/InnovationSite/Settings/BusinessLines", nodeType: "Folder" }
];