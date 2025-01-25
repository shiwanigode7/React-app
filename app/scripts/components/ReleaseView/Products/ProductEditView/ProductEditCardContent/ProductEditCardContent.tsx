import { Grid, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BusinessGoalTableType } from "../../../../../interfaces/InnovationInterface";
import { OutlinedInputTheme } from "../../../../../view/theme";
import ProductEditCardContentModel from "./ProductEditCardContentModel";
import { ProductEditCardContentStyle } from "./ProductEditCardContentStyle";
import { MileStoneAccordion } from "../MilestoneAccordion/MileStoneAccordion";

export function ProductEditCardContent(productEditContentProps: ProductEditCardContentModel) {

    const MAX_CHARACTER_LIMIT: number = 1000;

    const ProductEditContentStyleClass = ProductEditCardContentStyle();

    const [descriptionText, setDescriptionText] = useState<string>(productEditContentProps.description);

    const [moreDetailsText, setMoreDetailsText] = useState<string>(productEditContentProps.moreDetails);

    useEffect(() => {
        setDescriptionText(productEditContentProps.description);
    }, [productEditContentProps.description])

    useEffect(() => {
        setMoreDetailsText(productEditContentProps.moreDetails);
    }, [productEditContentProps.moreDetails])

    const handleDiscriptionBlurEvent = () => {
        productEditContentProps.handleDescriptionChange(descriptionText,
            productEditContentProps.releaseId, productEditContentProps.productId
        );
    }
    const handleDescriptionChange = ((event: any) => {
        if (MAX_CHARACTER_LIMIT >= event.target.value.length) {
            setDescriptionText(event.target.value);
        }
    });

    const handleMoreDetailsBlurEvent = (() => {
        productEditContentProps.handleMoreDetailsChange(moreDetailsText,
            productEditContentProps.releaseId, productEditContentProps.productId
        );
    });

    const handleMoreDetailsChange = ((event: any) => {
        setMoreDetailsText(event.target.value);
    });

    return (
        <Grid container direction="column" spacing={1} className={ProductEditContentStyleClass.cardContentContainer}>
            <Grid item className={ProductEditContentStyleClass.descriptionGrid}>
                <Typography className={ProductEditContentStyleClass.headings}>
                    Description
                </Typography>
                <ThemeProvider theme={OutlinedInputTheme}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        value={descriptionText}
                        onChange={handleDescriptionChange}
                        onBlur={handleDiscriptionBlurEvent}
                        helperText={(
                            MAX_CHARACTER_LIMIT <= productEditContentProps.description.length &&
                            `Maximum limit is ${MAX_CHARACTER_LIMIT} characters`
                        )}
                        inputProps={{
                            className: ProductEditContentStyleClass.descriptionTextArea
                        }}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item className={ProductEditContentStyleClass.milestonesAccordianGrid}>
                {productEditContentProps.businessGoals.map((businessGoal: BusinessGoalTableType) => {
                    if (0 <= businessGoal.productsList.indexOf(productEditContentProps.productId)) {
                        return (
                            <MileStoneAccordion
                                setHeroFeatureList={productEditContentProps.setHeroFeatureList}
                                businessGoal={businessGoal}
                                productId={productEditContentProps.productId}
                                selectedReleaseId={productEditContentProps.releaseId}
                                heroFeatures={productEditContentProps.heroFeatures}
                                setIsHeroFeatureChanged={productEditContentProps.setIsHeroFeatureChanged}
                            />
                        )
                    }
                })}
            </Grid>
            <Grid item>
                <Typography className={ProductEditContentStyleClass.headings}>
                    More Details
                </Typography>
                <ThemeProvider theme={OutlinedInputTheme}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        value={moreDetailsText}
                        onChange={handleMoreDetailsChange}
                        onBlur={handleMoreDetailsBlurEvent}
                        inputProps={{
                            className: ProductEditContentStyleClass.moreDetailsTextArea
                        }}
                    />
                </ThemeProvider>
            </Grid>
        </Grid>
    )
}