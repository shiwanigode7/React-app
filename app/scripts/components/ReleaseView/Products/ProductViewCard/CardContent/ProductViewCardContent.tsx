import { Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { BusinessGoalTableType, MilestoneModel, ReleaseTimelineModel } from "../../../../../interfaces/InnovationInterface";
import { HeroFeatureElementModel, HeroFeatureModel } from "../../HeroFeatureModel";
import ProductViewCardContentModel from "./ProductViewCardContentModel";
import { ProductCardViewContentStyle } from "./ProductViewCardContentStyle";

export function getMileStoneName(inBusinessGoalMilestones: MilestoneModel[], inMilestoneId: string): string {
    let lMilestoneName: string = "";
    inBusinessGoalMilestones.forEach((businessGoalMilestone: MilestoneModel) => {
        if (inMilestoneId === businessGoalMilestone.milestoneId) {
            lMilestoneName = businessGoalMilestone.milestoneName;
        }
    })
    return (lMilestoneName);
}

export function ProductCardViewContent(productCardViewContentProps: ProductViewCardContentModel) {
    const CardContentStyleClasses = ProductCardViewContentStyle();

    return (
        <Grid container direction="column" spacing={1} className={CardContentStyleClasses.cardContentContainer}>
            <Grid item className={CardContentStyleClasses.descriptionGrid}>
                <Typography className={CardContentStyleClasses.headings}>
                    Description:
                </Typography>
                <Tooltip
                    title={productCardViewContentProps.description}
                    placement={"bottom-start"}
                    classes={{
                        tooltip: CardContentStyleClasses.tooltip,
                        popper: CardContentStyleClasses.tooltipPopper
                    }}
                >
                    <Typography className={CardContentStyleClasses.descriptionTypography}>
                        {productCardViewContentProps.description}
                    </Typography>
                </Tooltip>
            </Grid>
            {/* Iterating over all the active business goals */}
            {productCardViewContentProps.businessGoals.map((businessGoal: BusinessGoalTableType) => {
                // if the product passed is listed/added in the business goal
                if (-1 < businessGoal.productsList.indexOf(productCardViewContentProps.productId)) {
                    // Start iterating over each hero feature list
                    return productCardViewContentProps.heroFeaturesList.map((heroFeature: HeroFeatureModel) => {
                        // if hero feature matched the business goal id, the release id and the product id enter
                        if ((heroFeature.businessGoalId === businessGoal.nodeId) && (heroFeature.productId === productCardViewContentProps.productId) && (heroFeature.releaseId === productCardViewContentProps.selectedReleaseId)) {
                            // Now iterate over each milestone from Business Goal
                            return businessGoal.releaseTimelineData.map((releaseTimeLine: ReleaseTimelineModel) => {
                                if (releaseTimeLine.releaseNodeId === productCardViewContentProps.selectedReleaseId) {
                                    return releaseTimeLine.milestones.map((milestone: string) => {
                                        // If the above filtered hero feature's milestone id matches the milestone id 
                                        if (heroFeature.milestoneId === milestone && 0 < heroFeature.heroFeatureList.length) {
                                            // Return the list of HeroFeature as element
                                            return (
                                                <Grid item className={CardContentStyleClasses.mileStoneGrid}>
                                                    <Typography className={CardContentStyleClasses.headings}>
                                                        Milestone: {getMileStoneName(businessGoal.milestones, milestone)}
                                                    </Typography>
                                                    {
                                                        heroFeature.heroFeatureList.map((heroFeatureElement: HeroFeatureElementModel) => {
                                                            return (
                                                                <li className={CardContentStyleClasses.heroFeaturesList}>
                                                                    {heroFeatureElement.heroFeatureName}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                            )
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })}
            <Grid item className={CardContentStyleClasses.moreDetailsGrid}>
                <Typography className={CardContentStyleClasses.headings}>
                    More Details:
                </Typography>
                <Typography className={CardContentStyleClasses.moredetialsTypography}>
                    {productCardViewContentProps.moreDetails}
                </Typography>
            </Grid>
        </Grid>
    )
}