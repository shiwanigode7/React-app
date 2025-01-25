/**TSX file listing all the calls made to IAM */

import { CurrentUserInfo, ECAListResponse, EskoCloudAccount } from "../interfaces/IAMInterface";
import Service from "../utils/util/Service";

export default class IAMService extends Service {
    
    /**
     * Function to make call to IAM to get Esko Cloud Accounts
     * @param inIsAdmin - To get the account the user is admin of.
     * @param inIsSiteCreator - To get the accounts in which user is a site creator.
     * @param inSubscriptionFree - To get the accounts which are subscription free.
     * @returns - returns a promise function which resolves array of Esko Cloud Account of 
     * type EskoCloudAccount on success and on error rejects with response of "any" type.
     */
    public static iamGetECAList(inIsAdmin: boolean = false, inIsSiteCreator: boolean = false, inSubscriptionFree: boolean = true) {
        /**calling IAM for Esko cloud account list */
        return new Promise<EskoCloudAccount[] | any>((resolve, reject) => {
            this.IAMGETCall(["rest", "V3", "iam", "organizations"], { "admin": inIsAdmin, "isSiteCreator": inIsSiteCreator, "subscriptionFree": inSubscriptionFree })
                .then((response: ECAListResponse) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });

    }

    /**
     * Function to make call to IAM to get the current logged in user information
     * @returns - a promise function that resolves the user display name 
     * on success
     */
    public static iamGetCurrentUserInfo(inRepoId : string) {
        /**Return a promise */
        return new Promise<CurrentUserInfo | any>((resolve, reject) => {
            /**Make the get request to IAM */
            this.IAMGETCall(["rest", "iam", "getCurrentUserInfo"], { repoId : inRepoId})
                .then((response: CurrentUserInfo) => {
                    /**On success take the user name and return it */
                    resolve(response);
                })
                .catch((error: any) => {
                    /**On error return the error object */
                    reject(error);
                })
        });
    }
}