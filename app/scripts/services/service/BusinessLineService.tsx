import { BusinessLineModel } from "../../components/settings/BusinessLineView/BusinessLineModel";
import Service from "../../utils/util/Service";

export default class BusinessLineService extends Service {

    /**
     * Method to add business line to the database
     * @param inBusinessLineData - The business line data to be added
     * @param repoId - Database id
     * @returns 
     */
    public static createBusinessLine(inBusinessLineData: BusinessLineModel, repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["api", "v0", "business-line", repoId, ""], inBusinessLineData)
                .then((createBusinessLineResponse: any) => {
                    resolve(createBusinessLineResponse.result);
                })
                .catch((createBusinessLineError: any) => {
                    reject(createBusinessLineError);
                });
        });
    }

    /**
     * Method to get all the products detail in the database
     * @param repoId - Database ID/location
     * @returns 
     */
    public static getAllBusinessLines(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "business-line", repoId, ""])
                .then((getBusinessLinesResponse: any) => {
                    resolve(getBusinessLinesResponse.result);
                })
                .catch((getBusinessLinesError: any) => {
                    reject(getBusinessLinesError);
                });
        });
    }

    /**
     * Method to update existing business line details in database
     * @param inBusinessLineId - ID of the business line to be updated
     * @param inBusinessLineName - The previous name of the business line
     * @param inBusinessLineData - the latest business line data
     * @returns 
     */
    public static updateBusinessLine(inBusinessLineId: string, inBusinessLineName: string, inBusinessLineData: BusinessLineModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["api", "v0", "business-line", inBusinessLineId, inBusinessLineName, ""], inBusinessLineData)
                .then((updateBusinessLineResponse: any) => {
                    resolve(updateBusinessLineResponse);
                })
                .catch((updateBusinessLineError: any) => {
                    reject(updateBusinessLineError);
                });
        });
    }

    /**
     * Method to delete a business line from database
     * @param inBusinessLineId - The id of the business line to be deleted from the database
     * @returns 
     */
    public static deleteBusinessLine(inBusinessLineId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["api", "v0", "business-line", inBusinessLineId, ""])
                .then((deleteBusinessLineResponse: any) => {
                    resolve(deleteBusinessLineResponse);
                })
                .catch((deleteBusinessLineError: any) => {
                    reject(deleteBusinessLineError);
                });
        });
    }
}