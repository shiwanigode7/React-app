import { service } from "@esko/cloud-service-utils";

export default class Service {
    /*Declaring service for INNOVATION, IAM, SEARCH */
    protected static INNOVATION: any = new service("innovation");
    protected static IAM: any = new service("iam");
    protected static SEARCH: any = new service("search");

    /**
     * Method to call GET api in Innovation service
     * @param apiURL - API URL which needs to be called 
     * @returns 
     */
    public static InnovationGETCall(apiURL: string[], inputParameters?: any) {
        return new Promise<any>((resolve, reject) => {
            this.INNOVATION.get(apiURL, inputParameters)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call POST api in Innovation service
     * @param apiURL - API URL which needs to be called 
     * @param requestBody - parameters to be passed into the request body 
     * @returns 
     */
    public static InnovationPOSTCall(apiURL: string[], requestBody: any, headers?: any, inputParameter?: any) {
        return new Promise<any>((resolve, reject) => {
            this.INNOVATION.post(apiURL, requestBody, headers, inputParameter)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call PUT api in Innovation service
     * @param apiURL - API URL which needs to be called 
     * @param requestBody - parameters to be passed into the request body 
     * @returns 
     */
    public static InnovationPUTCall(apiURL: string[], requestBody: any, headers?: any, inputParameters?: any) {
        return new Promise<any>((resolve, reject) => {
            this.INNOVATION.put(apiURL, requestBody, headers, inputParameters)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call DELETE api in Innovation service
     * @param apiURL - API URL which needs to be called
     * @returns 
     */
    public static InnovationDELETECall(apiURL: string[], requestBody?: any, headers?: any, inputParameters?: any) {
        return new Promise<any>((resolve, reject) => {
            this.INNOVATION.delete(apiURL, requestBody, headers, inputParameters)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call PATCH api in Innovation service
     * @param apiURL - API URL which needs to be called 
     * @param requestBody - parameters to be passed into the request body 
     * @returns 
     */
    public static InnovationPATCHCall(apiURL: string[], requestBody: any, headers?: any, inputParameter?: any) {
        return new Promise<any>((resolve, reject) => {
            this.INNOVATION.patch(apiURL, requestBody, headers, inputParameter)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call GET api in IAM service
     * @param apiURL - API URL which needs to be called 
     * @returns 
     */
    public static IAMGETCall(apiURL: string[], inputParameters?: any) {
        return new Promise<any>((resolve, reject) => {
            this.IAM.get(apiURL, inputParameters)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

    /**
     * Method to call POST api in Innovation service
     * @param apiURL - API URL which needs to be called 
     * @param requestBody - parameters to be passed into the request body 
     * @returns 
     */
    public static SearchPOSTCall(apiURL: string[], requestBody: any) {
        return new Promise<any>((resolve, reject) => {
            this.SEARCH.post(apiURL, requestBody)
                .then((serviceCallResponse: any) => {
                    resolve(serviceCallResponse);
                })
                .catch((serviceCallError: any) => {
                    if (401 == serviceCallError.status) {
                        window.location.reload();
                    }
                    else {
                        reject(serviceCallError);
                    }
                });
        });
    }

}
