/**TSX file to handle all the functions that call Repo service */

import { service } from "@esko/cloud-service-utils";
import { BulkCallResponse, BulkRequestBody, BulkRequestCall, BulkResponseBody, NodeCreationRequestBody, SitesFolderData } from "../interfaces/RepoInterface";

const REPO = new service("repo");

/**
 * Function to create a site under given repo id
 * @param inRepoId - Repo id where the site has to be created
 * @param inSiteName - Name of the site to be created
 * @returns - returns/resolves the response from the repo. Need to use a then/catch block to use the data
 */
export function repoCreateSite(inRepoId: string, inSiteName: string) {
    /**creating request body for site creation */
    const lRequestBody: NodeCreationRequestBody = {
        "nodeType": "Site",
        "properties": {}
    }

    return new Promise((resolve, reject) => {
        /**request site creation to repo */
        REPO.put(["NODE", "v1", inRepoId, inSiteName], lRequestBody)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            })
    });
}

/**
 * Function to create a folder
 * @param inRepoId - Repo Id where folder has to be created
 * @param inSiteName - Name of the site under which the folder is to be created
 * @param inFolderName - name of the folder to be created
 * @returns returns/resolves the response from the repo. Need to use a then/catch block to use the data
 */
export function repoCreateFolder(inRepoId: string, inSiteName: string, inFolderName: string) {
    /**creating folder creation request body */
    const lRequestBody: NodeCreationRequestBody = {
        "nodeType": "Folder",
        "properties": {}
    }

    return new Promise((resolve, reject) => {
        REPO.put(["NODE", "v1", inRepoId, inSiteName, inFolderName], lRequestBody)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            })
    });
}

/**
 * Function to setup all the required Sites and folder for Innovation
 * @param inRepoId - The repo id where the setup is to be done
 */
export function repoSiteSetup(inRepoId: string) {
    /**Build the request for the get request */
    /**Declare variable to hold the bulk request */
    const holdGetBulkRequest: BulkRequestCall = {
        process: "sequential",
        ops: []
    }

    /**To get the list of sites and folder to be created and create
     * request body based on the data
     */
    SitesFolderData.forEach((individualNodes: any) => {
        /**Build the get request body for individual nodes */
        const holdGetBulkRequestBody: BulkRequestBody = {
            method: "get",
            url: "NODE/v1/" + inRepoId + individualNodes.nodePath,
            /**Since it is a get request for node, no need to pass a request body */
            body: {}
        }
        holdGetBulkRequest.ops.push(holdGetBulkRequestBody);
    });

    /**Make the bulk request */
    REPO.post(["BULK", "v1", inRepoId], holdGetBulkRequest)
        .then((bulkCallResponse: BulkCallResponse) => {
            /**Variable to Check which requests failed */
            let count: number = 0;
            /**Array to hold the data folder data of the failed requests */
            const tempSiteFolderNodes: any[] = []
            /**Iterate over the response and check for the status */
            bulkCallResponse.results.forEach((individualResponse: BulkResponseBody) => {
                /**Check for not found error.
                 * Note: In "get" you won't get 409 error and we don't have to 
                 * worry about 403 error because if the user had no permission the call
                 * would have entered the catch block, not the "then" block.
                 * Same for 500 error.
                 */
                if (individualResponse.status === 404) {
                    /**Note: The logic assumed is as follow.
                     * If the third request failed push the detail of the third node. 
                     * */
                    tempSiteFolderNodes.push(SitesFolderData[count]);
                }
                ++count;
            });
            /**Build the put request if there some of the request failed */
            if (tempSiteFolderNodes.length !== 0) {
                const holdPutBulkRequest: BulkRequestCall = {
                    process: "sequential",
                    ops: []
                }
                /**For each node build the put request */
                tempSiteFolderNodes.forEach((individualNodes: any) => {
                    /**Build put request body for failed nodes */
                    const holdPutBulkRequestBody: BulkRequestBody = {
                        method: "put",
                        url: "NODE/v1/" + inRepoId + individualNodes.nodePath,
                        /**Since it is a get request for node, no need to pass a request body */
                        body: {
                            properties: {},
                            nodeType: individualNodes.nodeType
                        }
                    }
                    holdPutBulkRequest.ops.push(holdPutBulkRequestBody);
                });
                /**make the bulk request to create the missing nodes */
                REPO.post(["BULK", "v1", inRepoId], holdPutBulkRequest)
                    .then((bulkServiceResponse: any) => {
                        console.log(bulkServiceResponse);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            }
        })
        .catch((error: any) => {
            console.log(error);
        });
}

/**
 * Function to update the thumbnail of the node given in the nodepath
 * @param inNodePath - Node path where the thumbnail must be updated
 * @returns - Promise function that resolves/reject the response/error from the 
 * repo service
 */
export function repoUpdateThumbnail(inNodePath: string, inVersionNumber?: number) {
    /**building the request body */
    const lUrl = window.location.origin;
    const lRepoUrl = `${lUrl.replace("innovation", "repo")}/CONTENT/v0/${inNodePath}?contentid=thumbnail`;
    const lThumbnailURL: string = lRepoUrl + (undefined === inVersionNumber ? "" : `&version=${inVersionNumber}`);
    const lRequestBody = {
        "properties": {
            "thumbnail": lThumbnailURL
        }
    }
    /**Split the node path based on / */
    const lNodePath = inNodePath.split("/");
    /**Return a promise of the update call to repo */
    return new Promise((resolve, reject) => {
        REPO.patch(["NODE", "v1", ...lNodePath], lRequestBody)
            .then((response: any) => {
                resolve(response);
            })
            .catch((error: any) => {
                reject(error);
            })
    });
}

/**
 * Function to give permission to the Innovation Application
 * @param inRepoId - Id of the database where the permission is to be provided
 * @returns 
 */
export function repoInnovationAppPermissionSetup(inRepoId: string) {

    const lRequestBody: Object = {
        "aces": [
            {
                "principal": "esi:dbs-innovation",
                "ace": "allow-full-access"
            }
        ]
    };

    return new Promise((resolve, reject) => {
        REPO.patch(["ACL", "v1", inRepoId], lRequestBody)
            .then((response: any) => { resolve(response) })
            .catch((error: any) => { reject(error) });
    });
}