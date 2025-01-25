import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ProductReleaseDataModel } from "../../../settings/ProductView/ProductModel";
import { ProductCardViewHeader } from "../ProductViewCard/CardHeader/ProductCardViewHeader";
import { ProductEditCardContent } from "./ProductEditCardContent/ProductEditCardContent";
import ProductEditViewModel from "./ProductEditViewModel";

export function ProductEditView(productEditViewProps: ProductEditViewModel) {

    const [description, setDescription] = useState<string>("");
    const [moreDetails, setMoreDetails] = useState<string>("");

    useEffect(() => {
        let lDescription: string = "";
        let lMoreDetails: string = "";

        productEditViewProps.product.releaseData.forEach((releaseData: ProductReleaseDataModel) => {
            if (productEditViewProps.selectedReleaseId == releaseData.releaseId) {
                lDescription = releaseData.description;
                lMoreDetails = releaseData.moreDetails;
            }
        })
        setDescription(lDescription);
        setMoreDetails(lMoreDetails);
    }, [productEditViewProps.selectedReleaseId, productEditViewProps.product]);

    return (
        <Card>
            <ProductCardViewHeader
                productThumbnail={productEditViewProps.product.thumbnail}
                userAvatars={productEditViewProps.product.managers}
                productName={productEditViewProps.product.productName}
            />
            <CardContent>
                <ProductEditCardContent
                    description={description}
                    setHeroFeatureList={productEditViewProps.setHeroFeatureList}
                    moreDetails={moreDetails}
                    productId={productEditViewProps.product.nodeId}
                    releaseId={productEditViewProps.selectedReleaseId}
                    businessGoals={productEditViewProps.businessGoalList}
                    heroFeatures={productEditViewProps.heroFeatures}
                    handleDescriptionChange={productEditViewProps.handleDescriptionChange}
                    handleMoreDetailsChange={productEditViewProps.handleMoreDetailsChange}
                    setIsHeroFeatureChanged={productEditViewProps.setIsHeroFeatureChanged}
                />
            </CardContent>
        </Card>
    )
}