/**TSX file to hold the interface declarations that are related to IAM service
 * Few Examples - EskoCloudAccount, User, Groups
 */


/**Interface declaration for the EskoCloudAccount with only three main fields.
 * Can be extended to include even the trial details if needed.
*/
export interface EskoCloudAccount {
    organizationID: string,
    repoid: string,
    readableName: string
}

/**
 * Response interface for the responses from iam
 */
export interface ECAListResponse {
    data: EskoCloudAccount[]
}

/**Response interface for User information */
export interface CurrentUserInfo {
    displayName: string,
    email: string,
    userId: string,
    groupMembership : string[]
}