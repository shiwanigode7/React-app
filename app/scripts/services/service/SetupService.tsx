import Service from "../../utils/util/Service";

export default class SetupService extends Service {

    public static innovationIndexMeetingNodes(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "setup", "index-meetings", inRepoId])
                .then((outResponse: any) => {
                    resolve(outResponse);
                })
                .catch((indexError: any) => {
                    reject(indexError);
                });
        })
    }

    public static innovationUpdateBusinessCaseNPV(inRepoId: string, inUpdatedFields: any) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(
                ["api", "v0", "setup", "update-npv-value", inRepoId], //url
                inUpdatedFields, //json request body
                {}, //headers
            )
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })
    }
}