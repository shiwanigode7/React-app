/**TSX File listing all the services related to Innovation backend Service
 * and function that are used for handling Innovation Specific data
 */
import { EskoCloudAccount } from "../interfaces/IAMInterface";
import { getLocalStorageData } from "../utils/LocalStorageManagement";

/**
 * Function that reads the cookie data of user's last selected organization
 * @param data - the details of all the Esko Cloud account that user belongs to
 * @returns - return the esko cloud account detail of the user
 */
export function readSavedAccountDetails(data: EskoCloudAccount[]) {
    /**Variable to hold esko cloud account detail to be returned */
    let lCloudAccountDetail: EskoCloudAccount = data[0];
    /**read the repo id in the url
     * Note: here there might be a chance that the last pathname might
     * have some other string, but since we are comparing the value to 
     * the repo-id from the list, assuming it won't cause any issue.
     */
    let lHoldRepoId = window.location.pathname.split("/").pop();

    /**if the repo-id (or the string found) is not undefined or empty */
    if (lHoldRepoId !== undefined && lHoldRepoId !== "") {
        for (const accountData of data) {
            if (lHoldRepoId === accountData.repoid) {
                return accountData
            }
        }
    }
    /**read the account data from the cookie */
    let holdData: string = getLocalStorageData("defaultInnovationAccountDetail");

    /**if data is found, iterate the account list */
    if ("" !== holdData) {
        /**Variable to hold the number of elements that were checked and 
         * did not match the account detail from the cookie
         */
        let count: number = 0;

        for (const accountData of data) {
            /**Check if any of the account id matched the one saved in the cache */
            if (accountData.organizationID === holdData) {
                /**If organization id is matched save the account  */
                lCloudAccountDetail = accountData;
                break;
            }
            ++count;
        }
        /**If no value is matched return the first account in the list */
        if (count === data.length) {
            lCloudAccountDetail = data[0];
        }
    }
    return lCloudAccountDetail;
}