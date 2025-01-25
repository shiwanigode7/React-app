import { HeroFeatureForOTDModel } from "../../components/ReleaseView/OnTimeDelivery/HeroFeaturesTable/HeroFeatureTableModel";
import { ProductModel } from "../../components/settings/ProductView/ProductModel";
import { ReleaseProductUpdateRequestModel } from "../../interfaces/InnovationInterface";
import Service from "../../utils/util/Service";

export default class ProductService extends Service {

    /**
     * Method to add product to the database
     * @param inProductData - The product data to be added
     * @param repoId - Database id
     * @returns 
     */
    public static createProduct(inProductData: ProductModel, repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["api", "v0", "product", repoId, ""], inProductData)
                .then((createProductResponse: any) => {
                    resolve(createProductResponse.result);
                    // TODO: To return the value of node id to the and save it to the product data and push it to table
                })
                .catch((createProductError: any) => {
                    reject(createProductError);
                });
        });
    }

    /**
     * Method to get all the products detail in the database
     * @param repoId - Database ID/location
     * @returns 
     */
    public static getAllProducts(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "product", repoId, ""])
                .then((getProductsResponse: any) => {
                    resolve(getProductsResponse.result);
                })
                .catch((getProductsError: any) => {
                    reject(getProductsError);
                });
        });
    }

    /**
     * Method to update existing product details in database
     * @param inProductId - ID of the product to be updated
     * @param inProductName - The previous name of the product
     * @param inProductData - the latest product data
     * @returns 
     */
    public static updateProduct(inProductId: string, inProductName: string, inProductData: ProductModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["api", "v0", "product", inProductId, inProductName, ""], inProductData)
                .then((updateProductResponse: any) => {
                    resolve(updateProductResponse);
                })
                .catch((updateProductError: any) => {
                    reject(updateProductError);
                });
        });
    }

    /**
     * Method to delete a product from database
     * @param inProductId - The id of the product to be deleted from the database
     * @returns 
     */
    public static deleteProduct(inProductId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["api", "v0", "product", inProductId, ""])
                .then((deleteProductResponse: any) => {
                    resolve(deleteProductResponse);
                })
                .catch((deleteProductError: any) => {
                    reject(deleteProductError);
                });
        });
    }

    /**
    * 
    * Method to delete herofeatures from database
    * @param inMilestoneID - The id of the milestone whose herofeatures have to be deleted from the database
    * @returns 
    */
    public static deleteHerofeatures(inMilestoneID: string, repoId: string, inReleaseID: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["api", "v0", "product", inMilestoneID, repoId, ""],
                null,
                {},
                { "releaseID": inReleaseID })
                .then((handleMilestoneDeletionResponse: any) => {
                    resolve(handleMilestoneDeletionResponse);
                })
                .catch((handleMilestoneDeletiontError: any) => {
                    reject(handleMilestoneDeletiontError);
                });
        })
    }

    /**

  * Method to update the product and the hero features for a given release.

  * @param inUpdateRequestBody - The request body with list of all the products and the hero features to be updated

  * @returns Response body with status code and result with a appropriate message based on the operation's status

  */

    public static updateReleaseProducts(inRepoId: string, inUpdateRequestBody: ReleaseProductUpdateRequestModel) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["api", "v0", "product", "release-product-update", inRepoId, ""], inUpdateRequestBody)
                .then((updateProductResponse: any) => {
                    resolve(updateProductResponse);
                })
                .catch((updateProductError: any) => {
                    reject(updateProductError);
                });
        })
    }

    /**
     * Method to fetch the list of all the hero features in a given organization
     * @param inRepoId - Id of the database
     * @returns 
     */
    public static getHeroFeaturesList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "product", "hero-feature", inRepoId, ""])
                .then((getHeroFeatureResponse: any) => {
                    resolve(getHeroFeatureResponse.result);
                })
                .catch((getHeroFeatureError: any) => {
                    console.log(getHeroFeatureError);
                    reject([]);
                })
        })
    }
    /**
    * Method to fetch the list of OTD for last four months including current month
    * @param inRepoId - Id of the database
    * @returns 
    */
    public static getOTDForLastFourMonths(inRepoId: string) {
        const lQueryParam: any = {
            numberOfMonths: 4
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "product", "last-months-OTD", inRepoId, ""], lQueryParam)
                .then((getOTDResponse: any) => {
                    resolve(JSON.parse(JSON.stringify(getOTDResponse.result)));
                })
                .catch((getOTDError: any) => {
                    console.log(getOTDError);
                    reject([]);
                })
        })
    }

    /**
    * Method to fetch the list of OTD for a month
    * @param inRepoId - Id of the database
    * @param inMonthYear - Month and Year
    * @returns 
    */
    public static getOTDForMonth(inRepoId: string, inMonthYear: string) {
        const lQueryParam: any = {
            monthYear: inMonthYear
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "product", "OTD", inRepoId, ""], lQueryParam)
                .then((getOTDResponse: any) => {
                    const lOTDNode: HeroFeatureForOTDModel[] = getOTDResponse.result;
                    resolve(JSON.parse(JSON.stringify(lOTDNode)));
                })
                .catch((getOTDError: any) => {
                    console.log(getOTDError);
                    reject([]);
                })
        })
    }

    /**
    * Method to get first month with OTD data
    * @param inRepoId - Id of the database
    * @returns 
    */
    public static getFirstOTDMonth(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "product", "first-OTD-month", inRepoId, ""])
                .then((getOTDResponse: any) => {
                    const lFirstMonth: string = getOTDResponse.message;
                    resolve(lFirstMonth);
                })
                .catch((getOTDError: any) => {
                    console.log(getOTDError);
                    reject([]);
                })
        })
    }

    /**
    * Method to update the OTD Hero Feature status
    * @param inRepoId - Id of the database
    * @param inMonthYear - Month and Year
    * @param inHeroFeatureId - Hero Feature Id
    * @param inHeroFeatureNodeId - Hero Feature Node Id
    * @param inStatus - New status
    * @returns 
    */
    public static innovationUpdateHeroFeatureStatus(inRepoId: string, inMonthYear: string,
        inHeroFeatureId: string, inHeroFeatureNodeId: string, inStatus: string) {
        const lQueryParam: any = {
            monthYear: inMonthYear,
            heroFeatureId: inHeroFeatureId,
            heroFeatureNodeId: inHeroFeatureNodeId,
            status: inStatus
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["api", "v0", "product", "OTD", inRepoId, ""], {}, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}