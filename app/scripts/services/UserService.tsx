import { UserPermissionResponseModel } from "../interfaces/InnovationInterface";
import Service from "../utils/util/Service";

export default class UserService extends Service {

    /**
     * Method to get all the user's display name for a given organization
     * @param inCloudAccountNumber - Organization ID
     * @returns 
     */
    public static getAllUsers(inCloudAccountNumber: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "user", "users-list", inCloudAccountNumber, ""])
                .then((getUsersResponse: any) => {
                    resolve(getUsersResponse.result);
                })
                .catch((getUsersError: any) => {
                    reject(getUsersError);
                });
        });
    }

    /**
     * Method to get all the user's belong to "Adminstrator" and "Project Manager" group details for a given organization
     * @param inCloudAccountNumber - Organization ID
     * @returns 
     */
    public static getAdminAndProjectManagerUsers(inCloudAccountNumber: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "user", "admin-and-project-managers-list", inCloudAccountNumber, ""])
                .then((getUsersResponse: any) => {
                    resolve(getUsersResponse.result);
                })
                .catch((getUsersError: any) => {
                    reject(getUsersError);
                });
        });
    }

    /**
     * Method to check the user is assigned to Presenter role in that meeting node
     * @param repoId - repository ID of Organization
     * @param meetingName - Name of the meeting
     * @param meetingType - Type of the meeting SIR/PPG
     * @param userEmail - mail ID of the users
     * @returns 
     */
    public static isUserPresenter(repoId: string, meetingName: string, meetingType: string, userEmail: string) {
        const params = {
            userEmail: userEmail
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["api", "v0", "user", "isPresenter", repoId, meetingType, meetingName], params)
                .then((isUserPresenterResponse: any) => {
                    resolve(isUserPresenterResponse.result);
                })
                .catch((isUserPresenterError: any) => {
                    reject(isUserPresenterError);
                });
        });
    }

    
    /**
     * Method to get all the user's belonging to the groups passed
     * @param inCloudAccountNumber - Organization ID
     * @param inGroupName - Name of the groups whose users are to be fetched
     * @returns 
     */
     public static getGroupUsers(inCloudAccountNumber: string, inGroupName: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "user", "get-group-users", inCloudAccountNumber, ""],{"groupName":inGroupName})
                .then((getUsersResponse: any) => {
                    resolve(getUsersResponse.result);
                })
                .catch((getUsersError: any) => {
                    reject(getUsersError);
                });
        });
    }

    public static innovationApplicationSetup(inRepoId: string, inCloudAccountNumber: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "setup", inRepoId], { "cloudAccountNumber": inCloudAccountNumber })
                .then((setupResponse: UserPermissionResponseModel) => {
                    resolve(setupResponse.result);
                })
                .catch((setupError: any) => {
                    reject(setupError);
                });
        })
    }
}