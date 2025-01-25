import Service from "../../utils/util/Service";

export default class InnovationEquationService extends Service {

    /**
     * Function to call innovation backend to get the Innovation Equation for last quarter
     * @param inRepoId - Repo id of the account
     * @returns - Innovation Equation
     */
    public static getInnovationEquationForLastQuarter(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "innovationEquation", "getLastQuarter", repoId, ""])
                .then((innovationEquationResponse: any) => {
                    const innovationEquation : string = innovationEquationResponse.result;
                    resolve(innovationEquation);
                })
                .catch((InnovationEquationServiceError: any) => {
                    reject(InnovationEquationServiceError);
                });
        });
    }

}