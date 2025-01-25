export interface HeroFeatureModel {
    productId: string;
    releaseId: string;
    milestoneId: string;
    businessGoalId: string;
    nodeId: string;
    heroFeatureList: HeroFeatureElementModel[];
}

export interface HeroFeatureElementModel {
    heroFeatureName: string;
    heroFeatureId: string;
}

const checkHeroFeaturesList = (heroFeatureList1: HeroFeatureElementModel[], heroFeatureList2: HeroFeatureElementModel[]) => {
    let lIsHeroFeaturesSame: boolean = true;
    if (heroFeatureList1.length !== heroFeatureList2.length) {
        lIsHeroFeaturesSame = false;
    } else {
        for (let i = 0; i < heroFeatureList1.length; i++) {
            if (heroFeatureList1[i].heroFeatureName !== heroFeatureList2[i].heroFeatureName || heroFeatureList1[i].heroFeatureId !== heroFeatureList2[i].heroFeatureId) {
                lIsHeroFeaturesSame = false;
            }
        }
    }
    return lIsHeroFeaturesSame;
}

export const isHeroFeatureSameCondition = (heroFeature1: HeroFeatureModel, heroFeature2: HeroFeatureModel) => heroFeature1.productId === heroFeature2.productId && heroFeature1.releaseId === heroFeature2.releaseId && heroFeature1.milestoneId === heroFeature2.milestoneId && heroFeature1.businessGoalId === heroFeature2.businessGoalId && heroFeature1.nodeId === heroFeature2.nodeId && checkHeroFeaturesList(heroFeature1.heroFeatureList, heroFeature2.heroFeatureList);