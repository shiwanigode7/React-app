import FTEModel, { FTENotesModel } from "../../components/RRMView/FTEModel";
import Service from "../../utils/util/Service";

export default class RRMService extends Service {

    public static createFTE(repoId: string, fteData: FTEModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["fte", "updateFTE", repoId, ""], fteData)
                .then((updateFTEResponse: any) => {
                    if ("Success" === updateFTEResponse.status) {
                        resolve(updateFTEResponse);
                    } else {
                        resolve(null);
                    }
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    public static updateFTENotes(repoId: string, fteNotesData: FTENotesModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["fte", "updateFTE", repoId, ""], fteNotesData)
                .then((updateFTEResponse: any) => {
                    if ("Success" === updateFTEResponse.status) {
                        resolve(updateFTEResponse);
                    } else {
                        resolve(null);
                    }
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    public static getFTEs(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["fte", "getFTEs", repoId, ""])
                .then((getFTEsResponse: any) => {
                    if ("Success" === getFTEsResponse.status) {
                        const ftesList: FTEModel[] = [];
                        const fteArray: any[] = getFTEsResponse.result.items;
                        fteArray.forEach((fte: any) => {
                            const fteData: FTEModel = {
                                nodeId: fte["nodeId"],
                                number: fte["number"],
                                percentageNumber: fte["percentageNumber"],
                                releaseNodeId: fte["releaseNodeId"],
                                bgNodeId: fte["bgNodeId"],
                                runwayNodeId: fte["runwayNodeId"],
                                notes: fte["notes"]
                            };
                            ftesList.push(fteData);
                        });
                        resolve(ftesList);
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
