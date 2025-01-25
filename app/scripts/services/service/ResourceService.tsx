import ResourceModel from "../../components/settings/ResourceManagementView/ResourceModel";
import Service from "../../utils/util/Service";

export default class ResourceService extends Service {

    public static createResource(repoId: string, resourceData: ResourceModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["resource", "update", repoId, ""], resourceData)
                .then((createResourceResponse: any) => {
                    createResourceResponse.status === "Success" ? resolve(createResourceResponse) :
                        resolve(null);
                })
                .catch((createReleaseError: any) => {
                    reject(createReleaseError);
                });
        });
    }

    public static getResources(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["resource", "get", repoId, ""])
                .then((getResourcesResponse: any) => {
                    if (getResourcesResponse.status === "Success") {
                        const resourceDataArray: ResourceModel[] = [];
                        const resourceArray: any[] = getResourcesResponse.result.items;
                        resourceArray.forEach((resource: any) => {
                            const resourceData: ResourceModel = {
                                nodeId: resource["nodeId"],
                                number: resource["ec_s@number"],
                                releaseNodeId: resource["ec_s@releaseNodeId"],
                                runwayNodeId: resource["ec_s@runwayNodeId"]
                            };
                            resourceDataArray.push(resourceData);
                        });
                        resolve(resourceDataArray);
                    } else {
                        resolve(null);
                    }
                })
                .catch((getResourcesError: any) => {
                    reject(getResourcesError);
                });
        });
    }
}