import Service from "../../utils/util/Service";
import ReleaseModel from "../../components/settings/InnovationCadenceView/ReleaseModel";

export default class ReleaseService extends Service {

    public static createRelease(releaseData: ReleaseModel, repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["release", "add", repoId, ""], releaseData)
                .then((createReleaseResponse: any) => {
                    createReleaseResponse.status === "Success" ? resolve(createReleaseResponse.result) :
                        resolve(null);
                })
                .catch((createReleaseError: any) => {
                    reject(createReleaseError);
                });
        });
    }

    public static getAllReleases(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["release", "get", repoId, ""])
                .then((getReleasesResponse: any) => {
                    if (getReleasesResponse.status === "Success") {
                        const releaseDataArray: ReleaseModel[] = [];

                        const releaseArray: any[] = getReleasesResponse.result.items;
                        releaseArray.forEach((release: any) => {
                            const releaseData: ReleaseModel = {
                                id: release["name"],
                                name: release["ec_s@name"],
                                date: release["ec_s@date"],
                                description: release["ec_s@description"],
                                isArchived: release["ec_boolean@isArchived"],
                                nodeId: release["nodeId"]
                            };
                            releaseDataArray.push(releaseData);
                        });
                        resolve(releaseDataArray);
                    } else {
                        resolve(null);
                    }
                })
                .catch((getReleasesError: any) => {
                    reject(getReleasesError);
                });
        });
    }

    /**
     * Method to get the specific type of releases 
     * @param inRepoId - Repository Id of database
     * @param inSize - Number of releases required
     * @param isArchived - Boolean to decide whether the data fetched should be archived data or unarchived data
     * @returns 
     */
    public static getReleases(inRepoId: string, inSize: number, isArchived: boolean) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["release", "archived-or-unarchived", inRepoId, ""], { inSize: inSize, isArchived: isArchived })
                .then((getReleasesResponse: any) => {
                    const releaseDataArray: ReleaseModel[] = [];
                    const releaseArray: any[] = getReleasesResponse.result.items;
                    releaseArray.forEach((releaseResponse: any) => {
                        const releaseData: ReleaseModel = {
                            id: releaseResponse["name"],
                            name: releaseResponse["ec_s@name"],
                            date: releaseResponse["ec_s@date"],
                            description: releaseResponse["ec_s@description"],
                            isArchived: releaseResponse["ec_boolean@isArchived"],
                            nodeId: releaseResponse["nodeId"]
                        };
                        releaseDataArray.push(releaseData);
                    });
                    resolve(releaseDataArray);
                })
                .catch((getReleasesError: any) => {
                    reject(getReleasesError);
                });
        });
    }

    public static updateRelease(repoId: string, nodeName: string, releaseData: ReleaseModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["release", "update", repoId, nodeName, ""], releaseData)
                .then((updateReleaseResponse: any) => {
                    if (updateReleaseResponse.status === "Success") {
                        resolve(updateReleaseResponse);
                    } else {
                        resolve(null);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}