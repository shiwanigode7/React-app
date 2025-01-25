import { Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useEffect, useState } from "react";
import { generateRandomUUID } from "../../../../../../utils/UUIDGenerator";
import InputTextField from "../../../../../utils/InputFields/InputTextField/InputTextField";
import { HeroFeatureElementModel, HeroFeatureModel } from "../../../HeroFeatureModel";
import MileStoneAccordionDetailModel from "./MileStoneAccordionDetailModel";
import { MileStoneAccordionDetailsStyle } from "./MileStoneAccordionDetailStyle";

export function MileStoneAccordionDetail(mileStoneAccordionDetailprops: MileStoneAccordionDetailModel) {
    const mileStoneAccordionDetailStyleClass = MileStoneAccordionDetailsStyle();

    const [heroFeatureList, setHeroFeatureList] = useState<HeroFeatureModel[]>([]);

    const handleHeroFeatureNameChange = (event: any, inIndex: number) => {
        // Variable to hold the individual hero feature list of a given hero feature
        let duplicateHeroFeatureArray: HeroFeatureElementModel[] = [];
        // Variable to save the entire hero feature
        let lHeroFeaturesList: HeroFeatureModel[] = [...mileStoneAccordionDetailprops.heroFeatures];
        // Iterate over each hero features and get the hero features of a given index under given milestone
        lHeroFeaturesList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                duplicateHeroFeatureArray = [...heroFeature.heroFeatureList];
            }
        });
        // Update the entered value in the hero feature name of the specific hero feature
        duplicateHeroFeatureArray[inIndex].heroFeatureName = event.target.value;
        // Iterate over hero feature and save back the update hero feature list
        heroFeatureList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                heroFeature.heroFeatureList = duplicateHeroFeatureArray;
            }
        });
        // Set the updated value in the actual hero feature list
        mileStoneAccordionDetailprops.setHeroFeatureList([...lHeroFeaturesList]);
        mileStoneAccordionDetailprops.setIsHeroFeatureChanged(true);
    };

    const handleDeleteHeroFeature = (index: number) => {
        let duplicateHeroFeatureArray: HeroFeatureElementModel[] = [];

        let lHeroFeaturesList: HeroFeatureModel[] = [...mileStoneAccordionDetailprops.heroFeatures];
        lHeroFeaturesList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                duplicateHeroFeatureArray = [...heroFeature.heroFeatureList];
            }
        });

        duplicateHeroFeatureArray.splice(index, 1);
        heroFeatureList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                heroFeature.heroFeatureList = duplicateHeroFeatureArray;
            }
        });

        mileStoneAccordionDetailprops.setHeroFeatureList([...lHeroFeaturesList]);
        mileStoneAccordionDetailprops.setIsHeroFeatureChanged(true);
    };

    const isHeroFeature = (heroFeature: HeroFeatureModel): boolean => {
        if (mileStoneAccordionDetailprops.businessGoalId === heroFeature.businessGoalId &&
            mileStoneAccordionDetailprops.milestoneId === heroFeature.milestoneId &&
            mileStoneAccordionDetailprops.productId === heroFeature.productId &&
            mileStoneAccordionDetailprops.selectedReleaseId === heroFeature.releaseId) {
            return true;
        }
        return false;
    }

    const handleAddMilestoneButtonClick = () => {
        let duplicateHeroFeatureArray: HeroFeatureElementModel[] = [];
        let lHeroFeaturesList: HeroFeatureModel[] = [...mileStoneAccordionDetailprops.heroFeatures];
        let isHeroFeaturePresent: boolean = false;

        lHeroFeaturesList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                duplicateHeroFeatureArray = [...heroFeature.heroFeatureList];
            }
        });
        duplicateHeroFeatureArray[duplicateHeroFeatureArray.length] = {
            heroFeatureName: "",
            heroFeatureId: generateRandomUUID()
        };

        lHeroFeaturesList.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                heroFeature.heroFeatureList = duplicateHeroFeatureArray;
                isHeroFeaturePresent = true;
            }
        })

        // If there is no pre-existing hero feature just create a new hero feature model
        if (!isHeroFeaturePresent) {
            const newHeroFeature: HeroFeatureModel = {
                businessGoalId: mileStoneAccordionDetailprops.businessGoalId,
                milestoneId: mileStoneAccordionDetailprops.milestoneId,
                productId: mileStoneAccordionDetailprops.productId,
                releaseId: mileStoneAccordionDetailprops.selectedReleaseId,
                nodeId: "",
                heroFeatureList: duplicateHeroFeatureArray
            }

            lHeroFeaturesList.push(newHeroFeature);
        }
        mileStoneAccordionDetailprops.setHeroFeatureList([...lHeroFeaturesList]);
        mileStoneAccordionDetailprops.setIsHeroFeatureChanged(true);

    };

    const isAddHeroFeatureEnabled = (): boolean => {
        let isAddEnabled: boolean = true;
        mileStoneAccordionDetailprops.heroFeatures.forEach((heroFeature: HeroFeatureModel) => {
            if (isHeroFeature(heroFeature)) {
                heroFeature.heroFeatureList.forEach((heroFeatureElement: HeroFeatureElementModel) => {
                    if ("" === heroFeatureElement.heroFeatureName) {
                        isAddEnabled = false;
                    }
                })
            }
        })
        return isAddEnabled;
    };

    /**
     * Function to check if a given hero feature is duplicated or not.
     * @param inHeroFeature - The hero feature to be considered for comparing the data 
     * @param inIndex - The index of the text field
     * @returns 
     */
    const checkForHeroFeatureDuplication = (inHeroFeature: HeroFeatureModel, inIndex: number): boolean => {
        let outIsDuplicate: boolean = false;

        inHeroFeature.heroFeatureList.forEach((heroFeatureElement: HeroFeatureElementModel, index: number) => {
            // if the hero feature matches any other string and if the index is greater than the iteration index set the value to true
            // Note: Index is considered for the condition because we want to show the duplicate error text only for one of the two
            // hero features preferably the second one in the list.
            if (
                (heroFeatureElement.heroFeatureName.toLowerCase().trim() ===
                    inHeroFeature.heroFeatureList[inIndex].heroFeatureName.toLowerCase().trim()
                )
                && index < inIndex
            ) {
                outIsDuplicate = true;
            }
        });

        return outIsDuplicate;
    };

    useEffect(() => {
        setHeroFeatureList(mileStoneAccordionDetailprops.heroFeatures);
    }, [mileStoneAccordionDetailprops.heroFeatures]);

    return (
        <Grid container direction="column">
            {/* Milestone chip */}
            <Grid item className={mileStoneAccordionDetailStyleClass.milestoneNameGrid}>
                <Grid item>
                    <Chip className={mileStoneAccordionDetailStyleClass.defaultMilestone} label={mileStoneAccordionDetailprops.milestoneName} />
                </Grid>
                <Grid item>
                    <Tooltip title="Add Hero Feature" arrow placement="right" classes={{ tooltipPlacementRight: mileStoneAccordionDetailStyleClass.tooltip }}>
                        <IconButton onClick={handleAddMilestoneButtonClick} disabled={!isAddHeroFeatureEnabled()}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            {/* Hero features list */}
            {
                mileStoneAccordionDetailprops.heroFeatures.map((heroFeature: HeroFeatureModel) => {
                    if (isHeroFeature(heroFeature)) {
                        return heroFeature.heroFeatureList.map((heroFeatureElement: HeroFeatureElementModel, index: number) => {
                            return (
                                <Grid item direction="row" spacing={1} className={mileStoneAccordionDetailStyleClass.heroFeatureRootGrid}>
                                    <Grid item className={mileStoneAccordionDetailStyleClass.heroFeatureInputFieldContainer}>
                                        {
                                            <InputTextField
                                                handleInput={(event: any) => handleHeroFeatureNameChange(event, index)}
                                                hasLabel={false}
                                                isEmpty={false}
                                                placeholderText={"Enter Hero Feature"}
                                                doesAlreadyExist={checkForHeroFeatureDuplication(heroFeature, index)}
                                                alreadyExistsText={"Duplicate Hero feature."}
                                                maxCharactersAllowed={32}
                                                isBlockCharacterEntry={true}
                                                value={heroFeatureElement.heroFeatureName}
                                                name={heroFeatureElement.heroFeatureName}
                                                isMandatory={false}
                                                key={index}
                                                isShowMaxCharactersAllowedErrorMsg={true} />
                                        }
                                    </Grid>
                                    <Grid item className={mileStoneAccordionDetailStyleClass.deleteButtonGrid}>
                                        <Tooltip title="Delete Hero Feature" placement="right" arrow>
                                            <IconButton onClick={() => handleDeleteHeroFeature(index)} className={mileStoneAccordionDetailStyleClass.deleteButton}>
                                                <DeleteForeverRoundedIcon
                                                    color="action"
                                                    className={mileStoneAccordionDetailStyleClass.deleteSVG}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                })
            }
        </Grid>
    )
}