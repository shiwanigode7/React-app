import { ECAListResponse, EskoCloudAccount } from "./interfaces/IAMInterface";
import { service } from "@esko/cloud-service-utils";

/**Defining the services */
const IAM = new service("iam");
const REPO = new service("repo");

/**Request body to send site/folder creation request to repo */
declare interface RequestBody {
    nodeType: string,
    properties: any
}

/**Define the context or class */
export class InnovationApp {

    accountDetail: EskoCloudAccount;

    constructor() {
        this.accountDetail = { "organizationID": "", "readableName": "", "repoid": "" }

        /**call to iam */
        IAM.get(["rest", "V3", "iam", "organizations"])
            .then((lIAMCallResponse: ECAListResponse) => {
                /**save the data of the first account fetched
                 * Note: Currently the code works well for one esko cloud account,
                 * For zero cloud account and more than one esko cloud account this
                 * has to be changed.
                */
                this.accountDetail = { "organizationID": lIAMCallResponse.data[0].organizationID, "readableName": lIAMCallResponse.data[0].readableName, "repoid": lIAMCallResponse.data[0].repoid }
                
                /**create Innovation site */
                let nodeTypeSite: RequestBody = { "nodeType": "Site", "properties": {} };
                let nodeTypeFolder: RequestBody = { "nodeType": "Folder", "properties": {} };
                
                /**Check if the Innovation Site exists */
                REPO.get(["NODE", "v1", lIAMCallResponse.data[0].repoid, "InnovationSite"])
                    .then((lInnovationSiteCheckResponse: any) => {
                        /**if the site exists, check for the MPL Folder */
                        REPO.get(["NODE", "v1", lIAMCallResponse.data[0].repoid, "InnovationSite", "MPL"])
                            .then((lMPLFolderCheckResponse: any) => {
                                /**MPL folder also exists */
                                console.log(lMPLFolderCheckResponse);
                            })
                            .catch((lMPLFolderExistenceCheckInRepoError: any) => {
                                /**The request failed because the folder does not exist */
                                if (lMPLFolderExistenceCheckInRepoError.status === 404) {
                                    /**Create MPL Folder in case the site already exists but the folder does not exists*/
                                    REPO.put(["NODE", "v1", lIAMCallResponse.data[0].repoid, "InnovationSite", "MPL"], nodeTypeFolder)
                                        .then((lMPLFolderCreationResponse: any) => {
                                            /**MPL folder creation successful */
                                            console.log(lMPLFolderCreationResponse);
                                        })
                                        .catch((lMPLFolderCreationInRepoError: any) => {
                                            console.log("Issue with folder creation.");
                                            console.log(lMPLFolderCreationInRepoError);
                                        })
                                }
                                else {
                                    /**Request failed for some other reason */
                                    console.log("Issue with the folder get request.");
                                    console.log(lMPLFolderExistenceCheckInRepoError);
                                }
                            })
                    })
                    .catch((lInnovationSiteExistenceCheckInRepoError: any) => {
                        /**the request failed because the site does not exist */
                        if (lInnovationSiteExistenceCheckInRepoError.status === 404) {
                            /**If the site does not exists create both the site and the MPL. First create site. */
                            REPO.put(["NODE", "v1", lIAMCallResponse.data[0].repoid, "InnovationSite"], nodeTypeSite)
                                .then((lMPLAndSiteCreationResponse: any) => {
                                    /**Create MPL Folder */
                                    REPO.put(["NODE", "v1", lIAMCallResponse.data[0].repoid, "InnovationSite", "MPL"], nodeTypeFolder)
                                        .then((lMPLFolderCreationResponse: any) => {
                                            /**MPL folder creation successful */
                                            console.log(lMPLFolderCreationResponse);
                                        })
                                        .catch((lMPLFolderCreationInRepoError: any) => {
                                            console.log("Issue with folder creation.");
                                            console.log(lMPLFolderCreationInRepoError);
                                        })
                                })
                                .catch((lInnovationSiteCreationInRepoError: any) => {
                                    console.log("Issue with site creation.");
                                    console.log(lInnovationSiteCreationInRepoError);
                                })
                        }
                        else {
                            /**The request failed with some other issue */
                            console.log("Issue with the site get request.");
                            console.log(lInnovationSiteExistenceCheckInRepoError);
                        }
                    })
            })
            .catch((error: any[]) => {
                console.log("Issue with fetching the Account details.")
                console.log(error);
            })

    }

}