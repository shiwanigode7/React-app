import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ReleaseHeroFeature, ReleaseHeroFeatureModelWithMilestone, ReleaseTimelineModel, UserListWithEmailModel } from "../../../../interfaces/InnovationInterface";
import { ProductModel } from "../../../settings/ProductView/ProductModel";
import BusinessGoalCardViewModel from "./BusinessGoalCardViewModel";
import { BusinessGoalCardViewStyles } from "./BusinessGoalCardViewStyle";
import { BusinessGoalCardContentView } from "./CardContent/BusinessGoalCardContentView";
import { ReleaseProductModel } from "./CardContent/BusinessGoalCardContentViewModel";
import { BusinessGoalCardHeader } from "./CardHeader/BusinessGoalCardHeader";

export function BusinessGoalCardView(businessGoalCardViewProps: BusinessGoalCardViewModel) {

    const [releaseMilestones, setReleaseMilestones] = useState<string[]>([]);
    const [productsList, setProductsList] = useState<ReleaseProductModel[]>([]);
    const [businessGoalOTD, setBusinessGoalOTD] = useState<number>(0);
    const [ownerName, setOnwerName] = useState<string>("");

    const businessGoalCardViewStyleClasses = BusinessGoalCardViewStyles();

    const isMilestoneComplete = (inHeroFeatureList: ReleaseHeroFeature[]): boolean => {
        let lIsMilestoneComplete: boolean = true;

        inHeroFeatureList.forEach((heroFeature: ReleaseHeroFeature) => {
            if (false === heroFeature.isCompleted) {
                lIsMilestoneComplete = false;
            }
        });
        return lIsMilestoneComplete;
    }

    useEffect(() => {
        let lOwnerName: string = "";
        businessGoalCardViewProps.userList.forEach((user: UserListWithEmailModel) => {
            if (user.email === businessGoalCardViewProps.businessGoal.owner) {
                lOwnerName = user.displayName;
            }
        })
        setOnwerName(lOwnerName);
    }, [businessGoalCardViewProps.userList, businessGoalCardViewProps.businessGoal]);

    useEffect(() => {
        const lProductList: ReleaseProductModel[] = [];

        businessGoalCardViewProps.businessGoal.productsList.forEach((productId: string) => {
            businessGoalCardViewProps.productsList.forEach((product: ProductModel) => {
                if (productId === product.nodeId) {
                    const lProduct: ReleaseProductModel = {
                        productId: product.nodeId,
                        productName: product.productName
                    }
                    lProductList.push(lProduct);
                }
            })
        })

        setProductsList(lProductList);
    }, [businessGoalCardViewProps.businessGoal, businessGoalCardViewProps.productsList]);


    useEffect(() => {
        const lReleaseMilestones: string[] = [];

        businessGoalCardViewProps.businessGoal.releaseTimelineData.forEach((releaseTimeline: ReleaseTimelineModel) => {
            if (businessGoalCardViewProps.selectedReleaseId === releaseTimeline.releaseNodeId) {
                lReleaseMilestones.push(...releaseTimeline.milestones)
            }
        });
        setReleaseMilestones(lReleaseMilestones);
    }, [businessGoalCardViewProps.heroFeatureList, businessGoalCardViewProps.selectedReleaseId, businessGoalCardViewProps.businessGoal]);

    useEffect(() => {
        let lCompletedMilestones: number = 0;
        let lNotCompletedMilestones: number = 0;
        let lOTD: number = 0;

        businessGoalCardViewProps.heroFeatureList.forEach((heroFeature: ReleaseHeroFeatureModelWithMilestone) => {
            if (releaseMilestones.indexOf(heroFeature.milestoneId) >= 0 && 0 !== heroFeature.heroFeaturesList.length) {
                if (isMilestoneComplete(heroFeature.heroFeaturesList)) {
                    lCompletedMilestones = lCompletedMilestones + 1;
                } else {
                    lNotCompletedMilestones = lNotCompletedMilestones + 1;
                }
            }
        });
        if (0 !== lCompletedMilestones) {
            lOTD = Math.round(lCompletedMilestones / (lCompletedMilestones + lNotCompletedMilestones) * 100);
        }
        setBusinessGoalOTD(lOTD);

    }, [releaseMilestones, businessGoalCardViewProps.heroFeatureList]);

    return (
        <Card className={businessGoalCardViewStyleClasses.CardClass}>
            <BusinessGoalCardHeader
                overallScore={businessGoalOTD}
                businessGoalName={businessGoalCardViewProps.businessGoal.businessGoalName}
                businessGoalThumbnail={businessGoalCardViewProps.businessGoal.thumbnail}
                userAvatar={ownerName}
                coreTeam={businessGoalCardViewProps.businessGoal.coreTeam}
                openFilterMenu={businessGoalCardViewProps.openFilterMenu}
            />
            <CardContent className={businessGoalCardViewStyleClasses.cardContent} >
                <BusinessGoalCardContentView
                    key={businessGoalCardViewProps.businessGoal.nodeId}
                    selectedReleaseId={businessGoalCardViewProps.selectedReleaseId}
                    heroFeaturesList={businessGoalCardViewProps.heroFeatureList}
                    releaseMilestones={releaseMilestones}
                    products={productsList}
                    businessGoal={businessGoalCardViewProps.businessGoal}
                />
            </CardContent>
        </Card>
    )
}