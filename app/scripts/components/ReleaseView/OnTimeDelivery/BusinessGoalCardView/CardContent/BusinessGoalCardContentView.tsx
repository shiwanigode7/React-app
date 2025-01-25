import { Chip, Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { MilestoneModel, ReleaseHeroFeature, ReleaseHeroFeatureModelWithMilestone, ReleaseTimelineModel } from "../../../../../interfaces/InnovationInterface";
import BusinessGoalCardContentViewModel, { ReleaseProductModel } from "./BusinessGoalCardContentViewModel";
import { BusinessGoalCardContentViewStyle } from "./BusinessGoalCardContentViewStyle";
import { HeroFeaturesListView } from "./HeroFeaturesListView/HeroFeaturesListView";

export function BusinessGoalCardContentView(businessGoalCardContentViewProps: BusinessGoalCardContentViewModel) {

    const BusinessGoalCardContentViewStyleClasses = BusinessGoalCardContentViewStyle();

    const getMileStoneName = (inMilestoneId: string): string => {
        let lMilestoneName: string = "";

        businessGoalCardContentViewProps.businessGoal.milestones.forEach((milestone: MilestoneModel) => {
            if (inMilestoneId === milestone.milestoneId) {
                lMilestoneName = milestone.milestoneName
            }
        });
        return lMilestoneName
    }

    const getHeroFeaturesList = (inMilestoneId: string): ReleaseHeroFeature[] => {
        let lHeroFeatureList: ReleaseHeroFeature[] = [];

        businessGoalCardContentViewProps.heroFeaturesList.forEach((heroFeature: ReleaseHeroFeatureModelWithMilestone) => {
            if (heroFeature.milestoneId === inMilestoneId) {
                lHeroFeatureList = heroFeature.heroFeaturesList;
            }
        });
        return lHeroFeatureList;
    }
    const isMilestonePresent = (milestoneId: string): boolean => {
        let lMilestonePresent: boolean = false;
        businessGoalCardContentViewProps.businessGoal.milestones.forEach((milestone: MilestoneModel) => {
            if (milestoneId === milestone.milestoneId) {
                lMilestonePresent = true;
            }
        });
        return lMilestonePresent;
    }

    return (
        <Grid container>
            <Grid item className={BusinessGoalCardContentViewStyleClasses.gridItem}>
                <Grid item className={BusinessGoalCardContentViewStyleClasses.productsGrid}>
                    <Typography className={BusinessGoalCardContentViewStyleClasses.headings}>
                        Product(s)
                    </Typography>
                </Grid>
                <Grid item className={BusinessGoalCardContentViewStyleClasses.productsChipGrid}>
                    {businessGoalCardContentViewProps.products.map((product: ReleaseProductModel) => {
                        return (
                            <Tooltip title={product.productName} arrow placement="right">
                                <Chip className={BusinessGoalCardContentViewStyleClasses.productsChip} label={product.productName} />
                            </Tooltip>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid item>
                <Grid item className={BusinessGoalCardContentViewStyleClasses.milestoneGrid}>
                    <Typography className={BusinessGoalCardContentViewStyleClasses.headings}>
                        Milestones & Hero Features
                    </Typography>
                </Grid>
                {
                    businessGoalCardContentViewProps.businessGoal.releaseTimelineData.map((releaseTimeline: ReleaseTimelineModel) => {
                        if (releaseTimeline.releaseNodeId === businessGoalCardContentViewProps.selectedReleaseId) {
                            return releaseTimeline.milestones.map((milestone: string) => {
                                if (isMilestonePresent(milestone)) {
                                    return <HeroFeaturesListView
                                        milestoneId={milestone}
                                        milestoneName={getMileStoneName(milestone)}
                                        heroFeaturesList={getHeroFeaturesList(milestone)}
                                        products={businessGoalCardContentViewProps.products}
                                    />
                                }
                            })
                        }
                    })
                }
            </Grid>
        </Grid>
    )
}