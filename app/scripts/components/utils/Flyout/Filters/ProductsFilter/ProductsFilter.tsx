import { Accordion, AccordionDetails, Checkbox, FormControl, FormControlLabel, FormGroup, ListItem, ThemeProvider, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../../../context/InnovationAppContext";
import ProductService from "../../../../../services/service/ProductService";
import { RunwayFilterTheme } from "../../../../../themes/RunwayFilterTheme";
import CheckBoxItem from "../../../../FilterComponents/CheckBoxItem";
import { ProductModel } from "../../../../settings/ProductView/ProductModel";
import { FilterStyles } from "../FilterStyles";
import { ProductFilterModel, ProductsListWithChecked, ProductWithIdAndNameModel } from "./ProductFilterModel";
import { FilterAccordionSummary, FilterSubMenuStyles } from "../../../../../themes/FilterSubMenuTheme";
import { NO_PRODUCTS_ADDED_TEXT, PRODUCTS_FILTER_TEXT, SHOW_OR_HIDE_ALL } from "../../../../../constant/SubMenuFilterTexts";

export default function ProductsFilter(productsFilterProps: ProductFilterModel) {

    const lInnovationData = useContext(InnovationAppContext);

    const productsFilterStyleClasses = FilterStyles();
    const FilterSubMenuStyleClasses = FilterSubMenuStyles();

    const [productsList, setProductsList] = useState<ProductWithIdAndNameModel[]>(productsFilterProps.productFilterOptions ? productsFilterProps.productFilterOptions : []);
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [loadedProductsList, setLoadedProductsGoalsList] = useState<boolean>(false);
    const [totalProductListDatawithChecked, setTotalProductListDatawithChecked] = useState<ProductsListWithChecked[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(false);
    const [checkshowAll, setCheckShowAll] = useState<boolean>(false);

    const handleChecked = (index: number) => {
        let tempCheckedProductlData: ProductsListWithChecked[] = [...totalProductListDatawithChecked];
        tempCheckedProductlData[index] = {
            productDetails: totalProductListDatawithChecked[index].productDetails,
            checked: !totalProductListDatawithChecked[index].checked
        }
        let tempCheckedProductsList: string[] = [...productsFilterProps.selectedProductList];
        /**If a Runway is checked add the nodeId to checkedRunwaysList array */
        if (tempCheckedProductlData[index].checked) {
            tempCheckedProductsList = tempCheckedProductsList.concat(tempCheckedProductlData[index].productDetails.nodeId);
            productsFilterProps.setSelectedProductList(tempCheckedProductsList);
        }
        /**If a Runway is unchecked remove the nodeId from checkedRunwaysList array */
        else {
            tempCheckedProductsList.splice(tempCheckedProductsList.indexOf(tempCheckedProductlData[index].productDetails.nodeId), 1);
            productsFilterProps.setSelectedProductList(tempCheckedProductsList);
        }
        setTotalProductListDatawithChecked(tempCheckedProductlData);
        /**If every check box is checked, check the "Show/Hide All" */
        if (tempCheckedProductsList.length - 1 === productsList.length) {
            setCheckShowAll(true);
        }
        /**If a check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
        if (!totalProductListDatawithChecked[index].checked === false && checkshowAll) {
            setShowAll(true);
            setCheckShowAll(false);
        }
    };

    const handleShowAll = () => {
        setShowAll(!checkshowAll);
        setCheckShowAll(!checkshowAll);
    };

    useEffect(() => {
        setShowLoadingIcon(true);
        if (undefined !== productsFilterProps.productFilterOptions && 0 !== productsFilterProps.productFilterOptions.length) {
            setProductsList(productsFilterProps.productFilterOptions);
            setShowLoadingIcon(false);
            setLoadedProductsGoalsList(true);
        } else {
            ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
                .then((productsResponse: ProductModel[]) => {
                    let tempProductList: ProductWithIdAndNameModel[] = [];
                    productsResponse.forEach((product: ProductModel) => {
                        const tempProduct: ProductWithIdAndNameModel = {
                            productName: product.productName,
                            nodeId: product.nodeId
                        }
                        tempProductList = tempProductList.concat(tempProduct);
                    })
                    setProductsList(tempProductList);
                    setShowLoadingIcon(false);
                    setLoadedProductsGoalsList(true);
                    if(!productsFilterProps.rememberSession) {
                        setShowAll(true);
                        setCheckShowAll(true);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                    setShowLoadingIcon(false);
                });
        }
    }, [lInnovationData.eskoAccountDetail, productsFilterProps.productFilterOptions]);

    useEffect(() => {
        if (loadedProductsList && 0 !== productsList.length) {
            let tempTotalProductsListData: ProductWithIdAndNameModel[] = [...productsList];
            let filteredSelectedProductsList: string[] = [];
            tempTotalProductsListData.forEach((product: ProductWithIdAndNameModel) => {
                if (-1 !== productsFilterProps.selectedProductList.indexOf(product.nodeId)) {
                    filteredSelectedProductsList = filteredSelectedProductsList.concat(product.nodeId);
                }
            });

            let tempBusinessGoalListDataWithChecked: ProductsListWithChecked[] = [];
            tempTotalProductsListData.forEach((product: ProductWithIdAndNameModel) => {
                const tempBusinessGoalDataWithChecked: ProductsListWithChecked = {
                    productDetails: product,
                    checked: productsFilterProps.selectedProductList.indexOf(product.nodeId) != -1 ? true : false
                }
                tempBusinessGoalListDataWithChecked = tempBusinessGoalListDataWithChecked.concat(tempBusinessGoalDataWithChecked);
            })
            /**Set the list with the RunwaysList and checked to false */
            setTotalProductListDatawithChecked(tempBusinessGoalListDataWithChecked);
        }
    }, [loadedProductsList, productsList, productsFilterProps.selectedProductList]);

    useEffect(() => {
        let tempCheckedProductsData: ProductsListWithChecked[] = [...totalProductListDatawithChecked];
        /**Checks every Checkboxes and push the nodeId of every runways into the selectedRunwaysList */
        if (showAll && checkshowAll) {
            let tempCheckedProductsList: string[] = [];
            productsList.forEach((businessGoal: ProductWithIdAndNameModel) => {
                tempCheckedProductsList = tempCheckedProductsList.concat(businessGoal.nodeId);
            });
            tempCheckedProductsData.forEach((businessGoal: ProductsListWithChecked) => {
                businessGoal.checked = checkshowAll;
            });
            setTotalProductListDatawithChecked(tempCheckedProductsData);
            productsFilterProps.setSelectedProductList(tempCheckedProductsList);
        }
        else if (showAll && !checkshowAll) {
            setShowAll(false);
        }
        /**UnChecks every Checkboxes and set the CheckedRunwaysList to empty array */
        else if (!showAll && !checkshowAll && initialLoad) {
            tempCheckedProductsData.forEach((businessGoal) => {
                businessGoal.checked = checkshowAll;
            })
            setTotalProductListDatawithChecked(tempCheckedProductsData);
            productsFilterProps.setSelectedProductList([]);
        }
    }, [checkshowAll]);

    useEffect(() => {
        if (productsList.length != 0 && productsFilterProps.selectedProductList.length === productsList.length) {
            setCheckShowAll(true);
        }
    }, [productsList, productsFilterProps.selectedProductList]);

    useEffect(() => {
        /**If every check box is checked, check the "Show/Hide All" */
        if (productsFilterProps.selectedProductList.length === productsList.length && productsList.length != 0) {
            setCheckShowAll(true);
            setShowAll(true);
            setInitialLoad(true);
        }
    }, [productsFilterProps.selectedProductList]);

    return (
        <Accordion defaultExpanded className={FilterSubMenuStyleClasses.accordionRoot}>
            <FilterAccordionSummary>
                <Typography className={FilterSubMenuStyleClasses.accordionTitleText}>
                    {PRODUCTS_FILTER_TEXT}
                </Typography>
            </FilterAccordionSummary>
            <AccordionDetails>
                {
                    showLoadingIcon ? <CircularProgress className={productsFilterStyleClasses.LoadingIconClass} /> :
                        !showLoadingIcon && productsList.length === 0 ?
                            <h5 className={productsFilterStyleClasses.NoBGMessageClass}>{NO_PRODUCTS_ADDED_TEXT}</h5> :
                            // TODO : Need to change the ThemeProvider to CSS styling 
                            // TODO : Checkbox is Esko UI Element so Theme Provider is required
                            <ThemeProvider theme={RunwayFilterTheme}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox
                                                name={""}
                                                checked={checkshowAll}
                                                onChange={handleShowAll}
                                                inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                                            label={<p className={productsFilterStyleClasses.ShowOrHideAllClass}>{SHOW_OR_HIDE_ALL}</p>}
                                            className={productsFilterStyleClasses.ShowAllCheckBoxClass}
                                        />
                                        <div>
                                            {totalProductListDatawithChecked.map((product: ProductsListWithChecked, index) => (
                                                <ListItem key={product.productDetails.nodeId} value={product.productDetails.productName}>
                                                    <CheckBoxItem
                                                        itemName={product.productDetails.productName}
                                                        isChecked={product.checked}
                                                        index={index}
                                                        onChange={handleChecked}
                                                        itemId={product.productDetails.nodeId}></CheckBoxItem>
                                                </ListItem>
                                            ))}
                                        </div>
                                    </FormGroup>
                                </FormControl>
                            </ThemeProvider>
                }
            </AccordionDetails>
        </Accordion>
    )
}