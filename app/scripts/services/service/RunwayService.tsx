import { RunwayModel } from "../../interfaces/InnovationInterface";
import Service from "../../utils/util/Service";

export default class RunwayService extends Service {

    public static getRunways(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "runway", repoId, ""])
                .then((runwaysResponse: any) => {
                    resolve(runwaysResponse.result);
                })
                .catch((getRunwayServiceError: any) => {
                    console.log(getRunwayServiceError);
                    reject([]);
                });
        });
    }

    public static getActiveRunways(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0","runway", "get-active-runways", repoId, ""])
                .then((runwaysResponse: any) => {
                    resolve(runwaysResponse.result);
                })
                .catch((getRunwayServiceError: any) => {
                    console.log(getRunwayServiceError);
                    reject([]);
                });
        });
    }

    public static innovationCreateRunway(inRepoId: string, inRunwayData: RunwayModel) {
        return new Promise((resolve, reject) => {
            this.InnovationPUTCall(["api", "v0", "runway", inRepoId, ""], inRunwayData)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * Function to update an existing runway 
     * @param inRepoId - Repo id of the database
     * @param inRunwayNewData - the new runway data to be updated
     * @param inRunwayDataName - the name of the existing runway
     * @returns - a promise function
     */
    public static innovationUpdateRunway(inRepoId: string, inRunwayDataName: string, inRunwayNewData: any) {
        return new Promise((resolve, reject) => {
            this.InnovationPATCHCall(["api", "v0", "runway", inRepoId, inRunwayDataName, ""], inRunwayNewData)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * Function to delete the runway an existing runway
     * @param inRunwayId - Id of the Runway to be deleted
     * @returns Promise function that resolves Id of the runway deleted on success. On error, rejects error response.
     */
    public static innovationDeleteRunway(inRunwayId: string) {
        return new Promise((resolve, reject) => {
            this.InnovationDELETECall(["api", "v0", "runway", inRunwayId, ""])
                .then((response: any) => {
                    resolve(response.result[0].id);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
    /**
     * Function to call innovation backend to get the Runway data
     * @param inRepoId - Repo id of the database
     * @returns - List of Runways
     */
    public static innovationGetRunwayForListView(inRepoId: string) {
        return new Promise<RunwayModel | any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "runway", inRepoId, ""])
                .then((response: any) => {
                    resolve(response.result);
                })
                .catch(() => {
                    reject([]);
                });
        });
    }
}