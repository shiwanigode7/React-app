import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ProductReleaseDataModel } from "../../../settings/ProductView/ProductModel";
import { ProductCardViewContent } from "./CardContent/ProductViewCardContent";
import { ProductCardViewHeader } from "./CardHeader/ProductCardViewHeader";
import ProductCardViewModel from "./ProductCardViewModel";
import { ProductCardViewStyle } from "./ProductCardViewStyle";

export function ProductCardView(productCardViewProps: ProductCardViewModel) {

    const ProductViewCardStyleClass = ProductCardViewStyle();

    const [description, setDescription] = useState<string>("");
    const [moreDetails, setMoreDetails] = useState<string>("");

    useEffect(() => {
        let lDescription: string = "";
        let lMoreDetails: string = "";
        productCardViewProps.product.releaseData.forEach((releaseData: ProductReleaseDataModel) => {
            if (productCardViewProps.selectedReleaseId == releaseData.releaseId) {
                lDescription = releaseData.description;
                lMoreDetails = releaseData.moreDetails;
            }
        })
        setDescription(lDescription);
        setMoreDetails(lMoreDetails);
    }, [productCardViewProps.selectedReleaseId]);

    return (
        <Card className={ProductViewCardStyleClass.CardClass} >
            <ProductCardViewHeader
                productThumbnail={productCardViewProps.product.thumbnail}
                userAvatars={productCardViewProps.product.managers}
                productName={productCardViewProps.product.productName}
                openFilterMenu={productCardViewProps.openFilterMenu}
            />
            <CardContent className={ProductViewCardStyleClass.cardContent}>
                <ProductCardViewContent
                    description={description}
                    businessGoals={productCardViewProps.businessGoalList}
                    moreDetails={moreDetails}
                    selectedReleaseId={productCardViewProps.selectedReleaseId}
                    productId={productCardViewProps.product.nodeId}
                    heroFeaturesList={productCardViewProps.heroFeatures}
                />
            </CardContent>
        </Card>
    )
}