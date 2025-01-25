export interface ProductModel {
    productName: string;
    managers: string[];
    thumbnail: string;
    nodeId: string;
    releaseData: ProductReleaseDataModel[];
}

export interface ProductReleaseDataModel {
    releaseId: string;
    moreDetails: string;
    description: string;
}

export const isProductSameCondition = (product1: ProductModel, product2: ProductModel) => JSON.stringify(product1.managers) === JSON.stringify(product2.managers) && product1.nodeId === product2.nodeId && product1.productName === product2.productName && product1.thumbnail === product2.thumbnail && checkReleaseData(product1.releaseData, product2.releaseData);

const checkReleaseData = (releaseData1: ProductReleaseDataModel[], releaseData2: ProductReleaseDataModel[]) => {
    let lIsReleaseDataSame: boolean = true;
    if (releaseData1.length !== releaseData2.length) {
        lIsReleaseDataSame = false;
    } else {
        for (let i = 0; i < releaseData1.length; i++) {
            if (releaseData1[i].description !== releaseData2[i].description || releaseData1[i].moreDetails !== releaseData2[i].moreDetails || releaseData1[i].releaseId !== releaseData2[i].releaseId) {
                lIsReleaseDataSame = false;
            }
        }
    }
    return lIsReleaseDataSame;
}