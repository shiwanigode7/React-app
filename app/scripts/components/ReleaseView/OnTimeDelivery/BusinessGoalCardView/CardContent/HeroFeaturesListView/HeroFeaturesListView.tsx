import { Checkbox, Chip, Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { ReleaseHeroFeature } from "../../../../../../interfaces/InnovationInterface";
import { ReleaseProductModel } from "../BusinessGoalCardContentViewModel";
import HeroFeatureListViewModel from "./HeroFeaturesListViewModel";
import { HeroFeatureListViewStyle } from "./HeroFeaturesViewStyle";

export function HeroFeaturesListView(heroFeatureListViewProps: HeroFeatureListViewModel) {

    const heroFeatureListViewStyleClasses = HeroFeatureListViewStyle();

    const getProductName = (inProductId: string): string => {
        let lProductName = "";

        heroFeatureListViewProps.products.forEach((product: ReleaseProductModel) => {
            if (product.productId === inProductId) {
                lProductName = product.productName
            }
        });
        return lProductName;
    }

    const getMilestoneNameClass = (): string => {
        let lClassname: string = heroFeatureListViewStyleClasses.completeMilestone;

        heroFeatureListViewProps.heroFeaturesList.forEach((heroFeature: ReleaseHeroFeature) => {
            if (!heroFeature.isCompleted) {
                lClassname = heroFeatureListViewStyleClasses.incompleteMilestone;
            }
        });
        if (0 === heroFeatureListViewProps.heroFeaturesList.length) {
            lClassname = heroFeatureListViewStyleClasses.defaultMilestone;
        }
        return lClassname;
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Chip className={getMilestoneNameClass()} label={heroFeatureListViewProps.milestoneName} />
            </Grid>
            {
                heroFeatureListViewProps.heroFeaturesList.map((heroFeature: ReleaseHeroFeature) => {
                    return (
                        <Grid item direction="row" spacing={1} className={heroFeatureListViewStyleClasses.heroFeatureRootGrid}>
                            <Grid item >
                                <Checkbox
                                    checked={heroFeature.isCompleted}
                                    color={"primary"}
                                    disabled={true}
                                    className={heroFeatureListViewStyleClasses.checkBox}
                                />
                            </Grid>
                            <Grid item className={heroFeatureListViewStyleClasses.heroFeatureNameGrid}>
                                <Grid item>
                                    <Typography className={heroFeatureListViewStyleClasses.heroFeatureName}>
                                        {heroFeature.heroFeatureName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title={getProductName(heroFeature.productId)} arrow placement="right">
                                        <Chip className={heroFeatureListViewStyleClasses.productChip} label={getProductName(heroFeature.productId)} />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}