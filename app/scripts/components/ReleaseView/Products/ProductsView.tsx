/**TSX file for displaying view for Release - Products */
import { Box, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { BusinessGoalTableType } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import ProductService from "../../../services/service/ProductService";
import ReleaseService from "../../../services/service/ReleaseService";
import ConfirmationDialog from "../../../view/ConfirmationDialog";
import FilterSubmenu from "../../FilterSubmenu";
import ReleaseModel from "../../settings/InnovationCadenceView/ReleaseModel";
import { isProductSameCondition, ProductModel, ProductReleaseDataModel } from "../../settings/ProductView/ProductModel";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import Header from "../../utils/Header/Header";
import { EditButtonModel } from "../../utils/Header/HeaderModel";
import selectMenuModel from "../../utils/Header/SelectMenu/SelectMenuModel";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import { BusinessGoalViewStyle } from "../BusinessGoal/BusinessGoalsViewStyle";
import { HeroFeatureElementModel, HeroFeatureModel, isHeroFeatureSameCondition } from "./HeroFeatureModel";
import { ProductEditView } from "./ProductEditView/ProductEditView";
import { ProductCardView } from "./ProductViewCard/ProductCardView";
import { ProductViewStyle } from "./ProductViewStyle";

export function ProductsView() {
    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;

    const lInnovationData = useContext(InnovationAppContext);
    const productViewStylesClass = ProductViewStyle();

    const BusinessGoalsViewStylesClass = BusinessGoalViewStyle();

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true);

    /**Alert related state variables */
    const [openAlertPopup, setOpenAlertPopup] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "info" | "warning" | "error">("info");
    const [alertPopupContent, setAlertPopupContent] = useState<string>("");

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth);

    const [productsList, setProductsList] = useState<ProductModel[]>([]);
    const [heroFeatureList, setHeroFeatureList] = useState<HeroFeatureModel[]>([]);
    const [existingProductList, setExistingProductList] = useState<ProductModel[]>([]);
    const [existingHeroFeatureList, setExistingHeroFeatureList] = useState<HeroFeatureModel[]>([]);
    const [selectedProductsList, setSelectedProductsList] = useState<string[]>([]);

    const [selectedReleaseId, setSelectedReleaseId] = useState<string>("");
    const [selectedReleaseObject, setSelectedReleaseObject] = useState<ReleaseModel>();
    const [releaseList, setReleaseList] = useState<ReleaseModel[]>([]);
    const [activeBusinessGoalList, setActiveBusinessGoalList] = useState<BusinessGoalTableType[]>([]);
    const [displayEditButton, setDisplayEditButton] = useState<boolean>(true);
    const [filteredProductList, setFilteredProductsList] = useState<ProductModel[]>([]);
    const [isHeroFeatureChanged, setIsHeroFeatureChanged] = useState<boolean>(false);
    const [isProductPresent, setIsProductPresent] = useState<boolean>(false);
    const [showOnlyMyProducts, setShowOnlyMyProducts] = useState<boolean>(false);

    /**Confirmation dialog related state variables */
    const [confirmationDialogActionContent, setConfirmationDialogActionContent] = useState<string>("");
    const [confirmationDialogContent, setConfirmationDialogContent] = useState<string>("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [confirmationDialogLoadingIcon, setConfirmationDialogLoadingIcon] = useState<boolean>(false);
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState<string>("");
    const [isRevertRequest, setIsRevertRequest] = useState<boolean>(false);

     const toggleButtonData: ToggleButtonModel = {
        label: "Show only my Products",
        handleChange: (changeEvent: any) => {
            setShowOnlyMyProducts(changeEvent.target.checked);
        }
    };
    
    const selectMenuData: selectMenuModel = {
        items: releaseList,
        selectedValue: selectedReleaseId,
        setSelectedValue: setSelectedReleaseId
    };

    const editButtonClick = () => {
        setDisplayEditButton(false);
    };

    const filterModifiedHeroFeatureList = (heroFeatureList1: HeroFeatureModel[], heroFeatureList2: HeroFeatureModel[], compareFunction: any) =>
        heroFeatureList1.filter(heroFeature1 =>
            !heroFeatureList2.some(heroFeature2 =>
                compareFunction(heroFeature1, heroFeature2)));

    const filterModifiedProductList = (productList1: ProductModel[], productList2: ProductModel[], compareFunction: any) =>
        productList1.filter(product1 =>
            !productList2.some(product2 =>
                compareFunction(product1, product2)));

    const saveChangesButtonClick = () => {
        // If data remains unchanged go back to the Release card view (Read only mode)
        if ((JSON.stringify(productsList) === JSON.stringify(existingProductList)) && !isHeroFeatureChanged) {
            setDisplayEditButton(true);
        }
        // If a duplicate data is present just show a warning 
        else if (isDuplicateDataPresent()) {
            setAlertSeverity("warning");
            setAlertPopupContent("Duplicate Hero Features present.");
            setOpenAlertPopup(true);
        }
        // If the data is modified and there are no duplicate hero features, update the data 
        else {
            setIsRevertRequest(false);
            setOpenConfirmationDialog(true);
            setConfirmationDialogActionContent("Update");
            setConfirmationDialogContent("Are you sure you want to update the Product List ?");
            setConfirmationDialogTitle("Update Product List");
        }
    };

    /**
     * Function to check if a duplicate hero feature, under a given milestone, is present or not.
     * @returns True if there is a duplicate data in the hero feature
     */
    const isDuplicateDataPresent = (): boolean => {
        let outIsDataDuplicated: boolean = false;
        heroFeatureList.forEach((heroFeature: HeroFeatureModel) => {
            heroFeature.heroFeatureList.forEach((firstHeroFeatureElement: HeroFeatureElementModel, firstElementIndex: number) => {
                heroFeature.heroFeatureList.forEach((secondHeroFeatureElement: HeroFeatureElementModel, secondElementIndex: number) => {
                    if (
                        (firstHeroFeatureElement.heroFeatureName.toLowerCase().trim() ===
                            secondHeroFeatureElement.heroFeatureName.toLowerCase().trim()
                        ) &&
                        (firstElementIndex !== secondElementIndex)
                    ) {
                        outIsDataDuplicated = true;
                    }
                });
            });
        });
        return outIsDataDuplicated
    };

    /**Function called when user clicks on the cancel button in the confirmation dialot */
    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        setConfirmationDialogLoadingIcon(false);
    };

    const revertButtonClick = () => {
        if ((JSON.stringify(productsList) === JSON.stringify(existingProductList)) && !isHeroFeatureChanged) {
            setDisplayEditButton(true);
        } else {
            setIsRevertRequest(true);
            setOpenConfirmationDialog(true);
            setConfirmationDialogActionContent("Revert");
            setConfirmationDialogContent("There are unsaved changes. Are you sure you want to close this window without saving those changes?");
            setConfirmationDialogTitle("Unsaved Changes");
        }
    };

    const handleRevertConfirmation = () => {
        setProductsList(existingProductList);
        setIsHeroFeatureChanged(false);
        setHeroFeatureList(JSON.parse(JSON.stringify(existingHeroFeatureList)));
        setTimeout(() => {
            setOpenConfirmationDialog(false);
            setDisplayEditButton(true);
        }, 500);
    };

    const handleSaveConfirmation = () => {
        setConfirmationDialogLoadingIcon(true);

        let lHeroFeatureList: HeroFeatureModel[] = [...heroFeatureList];
        lHeroFeatureList.forEach((heroFeature: HeroFeatureModel) => {
            heroFeature.heroFeatureList = heroFeature.heroFeatureList.filter((heroFeatureElement: HeroFeatureElementModel) => heroFeatureElement.heroFeatureName.trim());
        });

        let lModifiedHeroFeatureList: HeroFeatureModel[] = filterModifiedHeroFeatureList(lHeroFeatureList, existingHeroFeatureList, isHeroFeatureSameCondition);

        let lModifiedProductList: ProductModel[] = filterModifiedProductList(productsList, existingProductList, isProductSameCondition);

        // Filter out the edited data
        ProductService.updateReleaseProducts(lInnovationData.eskoAccountDetail.repoid, {
            heroFeaturesList: lModifiedHeroFeatureList,
            productList: lModifiedProductList
        })
            .then(() => {
                setAlertSeverity("success");
                setAlertPopupContent("Product List Updated Successfully.");
                setOpenAlertPopup(true);
                setDisplayEditButton(true);
                setExistingProductList(productsList);
                setOpenConfirmationDialog(false);
                setExistingHeroFeatureList(JSON.parse(JSON.stringify(lHeroFeatureList)));
                setIsHeroFeatureChanged(false);
                setDisplayEditButton(true);
                setConfirmationDialogLoadingIcon(false);

            })
            .catch((updateError: any) => {
                console.log(updateError);
                setProductsList(existingProductList);
                setIsHeroFeatureChanged(false);
                setOpenConfirmationDialog(false);
                setHeroFeatureList(JSON.parse(JSON.stringify(existingHeroFeatureList)));
                setConfirmationDialogLoadingIcon(false);
                setDisplayEditButton(true);
            });

    }


    const editButtonData: EditButtonModel = {
        displayEditButton: displayEditButton,
        onClickEdit: editButtonClick,
        onClickRevert: revertButtonClick,
        onClickSave: saveChangesButtonClick,
        isProductEditable: lInnovationData.userPermission.releaseView.isProductEditable
    }

    const handleDescriptionChange = (inDescription: string, inReleaseId: string, inProductId: string) => {
        let isReleasePresent: boolean = false;
        const lProductsList: ProductModel[] = JSON.parse(JSON.stringify(productsList));
        lProductsList.forEach((product: ProductModel) => {
            if (inProductId === product.nodeId) {
                product.releaseData.forEach((productReleaseData: ProductReleaseDataModel) => {
                    if (inReleaseId === productReleaseData.releaseId) {
                        isReleasePresent = true;
                        productReleaseData.description = inDescription;
                    }
                })
                if (!isReleasePresent) {
                    const lReleaseData: ProductReleaseDataModel = {
                        description: inDescription,
                        moreDetails: "",
                        releaseId: inReleaseId
                    }
                    product.releaseData.push(lReleaseData);
                }
            }
        });
        setProductsList(lProductsList);
    };

    const handleMoreDetailsChange = (inMoreDetails: string, inReleaseId: string, inProductId: string) => {
        const lProductsList: ProductModel[] = JSON.parse(JSON.stringify(productsList));
        let isReleasePresent: boolean = false;
        lProductsList.forEach((product: ProductModel) => {
            if (inProductId === product.nodeId) {
                product.releaseData.forEach((productReleaseData: ProductReleaseDataModel) => {
                    if (inReleaseId === productReleaseData.releaseId) {
                        isReleasePresent = true;
                        productReleaseData.moreDetails = inMoreDetails;
                    }
                })
                if (!isReleasePresent) {
                    const lReleaseData: ProductReleaseDataModel = {
                        description: "",
                        moreDetails: inMoreDetails,
                        releaseId: inReleaseId
                    }
                    product.releaseData.push(lReleaseData);
                }
            }
        });
        setProductsList(lProductsList);
    };

    const isProductExist = (inProductId: string): boolean => {
        let lIsproductExist: boolean = false;
        activeBusinessGoalList.forEach((businessGoal: BusinessGoalTableType) => {
            if (0 <= businessGoal.productsList.indexOf(inProductId)) {
                lIsproductExist = true;
            }
        });
        return lIsproductExist;
    }

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth);
        }
        else {
            setMarginContentView(leftNavWidth);
        }
    }, [openFilterMenu]);

    useEffect(() => {
        let lholdProducts = window.sessionStorage.getItem("releaseViewProductsFilter");
        //Call to get the List of active business goals
        BusinessGoalService.innovationGetBusinessGoalListofStatus(lInnovationData.eskoAccountDetail.repoid, "Active")
            .then((businessGoalListofStatusResponse: BusinessGoalTableType[]) => {
                setActiveBusinessGoalList(businessGoalListofStatusResponse);
            })
            .catch((error: any) => {
                console.log(error);
            });

        //Release Call to get all the Unarchived Releases
        ReleaseService.getReleases(lInnovationData.eskoAccountDetail.repoid, 999, false)
            .then((releaseResponse: ReleaseModel[]) => {
                setReleaseList(releaseResponse);
                setSelectedReleaseObject(releaseResponse[0]);
                setSelectedReleaseId(releaseResponse[0].nodeId ? releaseResponse[0].nodeId : "");
            })
            .catch((error: any) => {
                console.log(error);
            });

        ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
            .then((productsResponse: ProductModel[]) => {
                setProductsList(productsResponse);
                setExistingProductList(JSON.parse(JSON.stringify(productsResponse)));
                let tempCheckedBProductssList: string[] = [];
                productsResponse.forEach((product: ProductModel) => {
                    tempCheckedBProductssList = tempCheckedBProductssList.concat(product.nodeId);
                });
                if (lholdProducts !== null && lholdProducts.split(",") !== undefined && lholdProducts !== "") {
                    setSelectedProductsList(lholdProducts.split(","));
                } else {
                    setSelectedProductsList(tempCheckedBProductssList);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });

        ProductService.getHeroFeaturesList(lInnovationData.eskoAccountDetail.repoid)
            .then((getHeroFeaturesResponse: HeroFeatureModel[]) => {
                setHeroFeatureList(getHeroFeaturesResponse);
                setExistingHeroFeatureList(JSON.parse(JSON.stringify(getHeroFeaturesResponse)));
            })
            .catch((getHeroFeaturesError: HeroFeatureModel[]) => {
                setHeroFeatureList(getHeroFeaturesError);
            })
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        const lFilteredProductsList: ProductModel[] = [];

        selectedProductsList.forEach((item: string) => {
            productsList.forEach((product: ProductModel) => {
                const lIsMyProduct: boolean = !showOnlyMyProducts || (showOnlyMyProducts && -1 !== product.managers.indexOf(lInnovationData.currentUserInfo.displayName))
                if (item == product.nodeId && lIsMyProduct) {
                    lFilteredProductsList.push(product);
                }
            })
        });
        setFilteredProductsList(lFilteredProductsList);
    }, [selectedProductsList, productsList, showOnlyMyProducts]);

    useEffect(() => {
        let lIsProductPresent: boolean = false;
        filteredProductList.forEach((product: ProductModel) => {
            if(isProductExist(product.nodeId)) {
                lIsProductPresent = true;
            }
        });
        setIsProductPresent(lIsProductPresent);
    }, [filteredProductList, activeBusinessGoalList]);

    useEffect(() => {
        window.sessionStorage.setItem("releaseViewProductsFilter", selectedProductsList.toString());
    }, [selectedProductsList]);

    useEffect(() => {
        releaseList.forEach((release: ReleaseModel) => {
            if (selectedReleaseId === release.nodeId) {
                setSelectedReleaseObject(release);
            }
        })
    }, [selectedReleaseId]);

    return (
        <Grid container className={productViewStylesClass.rootContainer}>
            <Grid item className={productViewStylesClass.filterMenu}>
                <FilterSubmenu
                    view="Release"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    selectedProductsList={selectedProductsList}
                    rememberSessionForProductFilter={true}
                    setSelectedProductsList={setSelectedProductsList}
                    selectedReleaseObject={selectedReleaseObject}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView }} className={productViewStylesClass.productsGrid} >
                <Box className={productViewStylesClass.rootBox}>
                    <Header
                        currentPageHeading="Release Overview"
                        currentPageSubHeading="for"
                        selectMenu={selectMenuData}
                        toggleButton={toggleButtonData}
                        actionButtons={editButtonData}
                    />
                    <Grid container spacing={4} className={BusinessGoalsViewStylesClass.businessGoals}>
                        {!isProductPresent &&
                            <Grid item>
                                No Products
                            </Grid>
                        }
                        {filteredProductList.map((product: ProductModel) => {
                            if (isProductExist(product.nodeId)) {
                                return (
                                    <>
                                        {
                                            displayEditButton ?
                                                <Grid item xs={12} sm={6} md={6} className={BusinessGoalsViewStylesClass.releaseViewCardGrid}>
                                                    <ProductCardView
                                                        key={selectedReleaseId}
                                                        product={product}
                                                        selectedReleaseId={selectedReleaseId}
                                                        businessGoalList={activeBusinessGoalList}
                                                        heroFeatures={heroFeatureList}
                                                        openFilterMenu={openFilterMenu}
                                                    />
                                                </Grid> :
                                                <Grid item className={BusinessGoalsViewStylesClass.releaseViewCardGrid} style={{ width: "100%", height: "auto" }}>
                                                    <ProductEditView
                                                        key={selectedReleaseId}
                                                        product={product}
                                                        selectedReleaseId={selectedReleaseId}
                                                        businessGoalList={activeBusinessGoalList}
                                                        handleDescriptionChange={handleDescriptionChange}
                                                        handleMoreDetailsChange={handleMoreDetailsChange}
                                                        heroFeatures={heroFeatureList}
                                                        setHeroFeatureList={setHeroFeatureList}
                                                        setIsHeroFeatureChanged={setIsHeroFeatureChanged}
                                                    />
                                                </Grid>
                                        }
                                    </>
                                );
                            }
                        })}
                    </Grid>
                </Box>
            </Grid>
            <ConfirmationDialog
                closeConfirmationDialog={handleConfirmationDialogClose}
                confirmationActionContent={confirmationDialogActionContent}
                confirmationDialogContent={confirmationDialogContent}
                confirmationDialogTitle={confirmationDialogTitle}
                handleSubmit={isRevertRequest ? handleRevertConfirmation : handleSaveConfirmation}
                loading={confirmationDialogLoadingIcon}
                open={openConfirmationDialog}
            />
            <AlertPopup
                isOpen={openAlertPopup}
                severity={alertSeverity}
                content={alertPopupContent}
                handleCloseButtonClick={() => { setOpenAlertPopup(false) }}
            />
        </Grid>
    )
}