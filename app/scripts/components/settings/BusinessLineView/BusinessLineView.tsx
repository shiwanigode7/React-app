/**TSX file for displaying view for Products */
import { Checkbox, CircularProgress, Grid, IconButton, Tooltip } from "@material-ui/core";
import CheckBoxOutlineBlankRoundedIcon from "@material-ui/icons/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@material-ui/icons/CheckBoxRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useContext, useEffect, useState } from "react";
import { COLOR_AZURE_2, COLOR_GREY_1 } from "../../../constant/Colors";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { BusinessGoalTableType } from "../../../interfaces/InnovationInterface";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import BusinessLineService from "../../../services/service/BusinessLineService";
import ProductService from "../../../services/service/ProductService";
import ConfirmationDialog from "../../../view/ConfirmationDialog";
import { CollapsibleTable, CollapsibleTableHeadInterface } from "../../../view/tables/CollapsibleTable";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import AddButtonModel from "../../utils/Header/AddButton/AddButtonModel";
import Header from "../../utils/Header/Header";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import { ProductModel } from "../ProductView/ProductModel";
import { BusinessLineAvatar } from "./BusinessLineAvatar/BusinessLineAvatar";
import { BusinessLineMenuDataModel, BusinessLineModel } from "./BusinessLineModel";
import { BusinessLineMultiSelect } from "./BusinessLineMultiSelect/BusinessLineMultiSelect";
import { BusinessLineNameTextField } from "./BusinessLineNameTextField/BusinessLineNameTextField";
import { BusinessLineStyles } from "./BusinessLineStyles";
import { ACTIVE_HEADING_TEXT, BUSINESS_GOAL_HEADING_TEXT, BUSINESS_LINE_CREATION_ERROR, BUSINESS_LINE_CREATION_SUCCESS, BUSINESS_LINE_NAME_ALREADY_EXISTS, BUSINESS_LINE_UPDATE_ERROR, BUSINESS_LINE_UPDATE_SUCCESS, deleteBusinessLineConfirmationContent, DELETE_CONFIRMATION_TITLE, DELETE_ERROR_MESSAGE, DELETE_SUCCESS_MESSAGE, DELETE_TEXT, EMPTY_BUSINESS_LINE_NAME_ERROR, EMPTY_PRODUCTS_WARNING, EMPTY_WARNING_TEXT, HALIGNMENT_ON_COLLAPSE, HALIGNMENT_ON_EXPAND, maxLimitCrossText, NAME_HEADING_TEXT, PRODUCT_HEADING_TEXT, SELECT_VALUE_MESSAGE, VALIGNMENT_ON_COLLAPSE, VALIGNMENT_ON_EXPAND } from "./BusinessLineViewText";

export function BusinessLineView() {

    const lInnovationData = useContext(InnovationAppContext);

    const BusinessLineStyleClasses = BusinessLineStyles();

    const MAX_CHARACTER_LIMIT: number = 32;

    const [enableLoadingIcon, setEnableLoadingIcon] = useState<boolean>(false);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);

    const [businessLineList, setBusinessLineList] = useState<BusinessLineModel[]>([]);
    const [productList, setProductList] = useState<BusinessLineMenuDataModel[]>([]);
    const [businessGoalList, setBusinessGoalList] = useState<BusinessLineMenuDataModel[]>([]);
    const [tableList, setTableList] = useState<any[]>([]);
    const [businessLineToDelete, setBusinessLineToDelete] = useState<string>("");
    const [showInActiveBusinessLine, setShowInActiveBusinessLine] = useState<boolean>(false);
    const [newBusinessLineNodeId, setNewBusinessLineNodeId] = useState<string>("");
    const [newBusinessLineName, setNewBusinessLineName] = useState<string>("");

    /**Alert related state variables */
    const [openAlertPopup, setOpenAlertPopup] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "info" | "warning" | "error">("info");
    const [alertPopupContent, setAlertPopupContent] = useState<string>("");

    /**Confirmation dialog related state variables */
    const [confirmationDialogActionContent, setConfirmationDialogActionContent] = useState<string>("");
    const [confirmationDialogContent, setConfirmationDialogContent] = useState<string>("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [confirmationDialogLoadingIcon, setConfirmationDialogLoadingIcon] = useState<boolean>(false);
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState<string>("");

    const handleAddButtonClick = () => {
        if (0 === productList.length) {
            setAlertSeverity("warning");
            setOpenAlertPopup(true);
            setAlertPopupContent(EMPTY_PRODUCTS_WARNING);
            return;
        }
        setEnableLoadingIcon(true);
        const lDate: Date = new Date();
        const lBusinessLineName: string = `_BL-${lDate.getTime()}`;
        const lNewBusinessLine: BusinessLineModel = {
            nodeId: "",
            isActive: true,
            productList: [],
            businessGoalList: [],
            name: lBusinessLineName
        };

        BusinessLineService.createBusinessLine(lNewBusinessLine, lInnovationData.eskoAccountDetail.repoid)
            .then((createBusinessLineResponse: string) => {
                handleConfirmationDialogClose();
                setEnableLoadingIcon(false);
                handleNewBusinessLineAddition(lNewBusinessLine, createBusinessLineResponse);
                setRefreshTable(!refreshTable);
                /**Setting the snackbar alert messages */
                setAlertSeverity("success");
                setOpenAlertPopup(true);
                setAlertPopupContent(BUSINESS_LINE_CREATION_SUCCESS);
                setNewBusinessLineNodeId(createBusinessLineResponse);
            })
            .catch((createBusinessLineError: any) => {
                if (409 === createBusinessLineError.status) {
                    setAlertPopupContent(BUSINESS_LINE_NAME_ALREADY_EXISTS);
                }
                else {
                    setAlertPopupContent(BUSINESS_LINE_CREATION_ERROR);
                }
                handleConfirmationDialogClose();
                /**Setting the snackbar alert messages */
                setAlertSeverity("error");
                setOpenAlertPopup(true);
                setEnableLoadingIcon(false);
            });
    };

    /**Function to add the new business line to the product list */
    const handleNewBusinessLineAddition = (inBusinessLineData: BusinessLineModel, inBusinessLineId: string) => {
        const lNewProduct: BusinessLineModel = {
            ...inBusinessLineData,
            nodeId: inBusinessLineId
        };
        setNewBusinessLineName(inBusinessLineData.name);
        businessLineList.push(lNewProduct);
        setRefreshTable(!refreshTable);
    };

    /**Function to update the business line name if valid */
    const updateBusinessLineName = (inNewValue: string, inBusinessLineId: string) => {
        // Get the index of the business line modified
        const lBusinessLineIndex: number = businessLineList.findIndex(
            (businessLine: BusinessLineModel) => (businessLine.nodeId === inBusinessLineId)
        );
        // if the index is valid read the business line data
        if (lBusinessLineIndex >= 0 && inNewValue.toLowerCase() !== businessLineList[lBusinessLineIndex].name.toLowerCase()) {
            setEnableLoadingIcon(true);
            const lPrevBusinessLineValues: BusinessLineModel = businessLineList[lBusinessLineIndex];
            const lNewBusinessLineValues: BusinessLineModel = {
                ...lPrevBusinessLineValues,
                name: inNewValue
            };
            BusinessLineService.updateBusinessLine(inBusinessLineId, lPrevBusinessLineValues.name, lNewBusinessLineValues)
                .then(() => {
                    businessLineList.splice(lBusinessLineIndex, 1, lNewBusinessLineValues);
                    setEnableLoadingIcon(false);
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("success");
                    setOpenAlertPopup(true);
                    setAlertPopupContent(BUSINESS_LINE_UPDATE_SUCCESS);
                    setRefreshTable(!refreshTable);
                })
                .catch((updateProductError: any) => {
                    if (409 === updateProductError.status) {
                        businessLineList.splice(lBusinessLineIndex, 1, lPrevBusinessLineValues);
                        setAlertPopupContent(BUSINESS_LINE_NAME_ALREADY_EXISTS);
                        setRefreshTable(!refreshTable);
                    }
                    else {
                        setAlertPopupContent(BUSINESS_LINE_UPDATE_ERROR);
                    }
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("error");
                    setOpenAlertPopup(true);
                    setEnableLoadingIcon(false);
                });
        }
    };

    const handleEmptyBusinessLineName = () => {
        setOpenAlertPopup(true);
        setAlertSeverity("error");
        setAlertPopupContent(EMPTY_BUSINESS_LINE_NAME_ERROR);
    };

    /**Function to display the alert and update the table whenever the business line is updated sucessfully.
     *  Done to avoid code duplication */
    const handleUpdateSuccess = (inBusinessLineIndex: number, inNewBusinessGoalList: BusinessLineModel) => {
        businessLineList.splice(inBusinessLineIndex, 1, inNewBusinessGoalList);
        setEnableLoadingIcon(false);
        /**Setting the snackbar alert messages */
        setAlertSeverity("success");
        setOpenAlertPopup(true);
        setAlertPopupContent(BUSINESS_LINE_UPDATE_SUCCESS);
        setRefreshTable(!refreshTable);
    };

    const handleUpdateError = () => {
        setAlertPopupContent(BUSINESS_LINE_UPDATE_ERROR);
        /**Setting the snackbar alert messages */
        setAlertSeverity("error");
        setOpenAlertPopup(true);
        setEnableLoadingIcon(false);
    };

    const handleActiveClick = (inBusinessLineId: string, inActiveStatus: boolean) => {
        // Get the index of the business line modified
        const lBusinessLineIndex: number = businessLineList.findIndex(
            (businessLine: BusinessLineModel) => (businessLine.nodeId === inBusinessLineId)
        );
        // if the index is valid read the business line data
        if (lBusinessLineIndex >= 0) {
            setEnableLoadingIcon(true);
            const lPrevBusinessLineValues: BusinessLineModel = businessLineList[lBusinessLineIndex];
            const lNewBusinessLineValues: BusinessLineModel = {
                ...lPrevBusinessLineValues,
                isActive: !inActiveStatus
            };
            BusinessLineService.updateBusinessLine(inBusinessLineId, lPrevBusinessLineValues.name, lNewBusinessLineValues)
                .then(() => {
                    handleUpdateSuccess(lBusinessLineIndex, lNewBusinessLineValues);
                })
                .catch((_updateBusinessLineError: any) => {
                    handleUpdateError();
                });
        }
    };

    const handleProductListChange = (inBusinessLineId: string, inNewProductList: string[]) => {
        // Get the index of the business line modified
        const lBusinessLineIndex: number = businessLineList.findIndex(
            (businessLine: BusinessLineModel) => (businessLine.nodeId === inBusinessLineId)
        );
        // if the index is valid read the business line data
        if (lBusinessLineIndex >= 0) {
            setEnableLoadingIcon(true);
            const lPrevBusinessLineValues: BusinessLineModel = businessLineList[lBusinessLineIndex];
            const lNewBusinessLineValues: BusinessLineModel = {
                ...lPrevBusinessLineValues,
                productList: inNewProductList
            };
            BusinessLineService.updateBusinessLine(inBusinessLineId, lPrevBusinessLineValues.name, lNewBusinessLineValues)
                .then(() => {
                    handleUpdateSuccess(lBusinessLineIndex, lNewBusinessLineValues);
                })
                .catch((_updateBusinessLineError: any) => {
                    handleUpdateError();
                });
        }
    };

    const handleBusinessGoalListChange = (inBusinessLineId: string, inNewBusinessGoalList: string[]) => {
        // Get the index of the business line modified
        const lBusinessLineIndex: number = businessLineList.findIndex(
            (businessLine: BusinessLineModel) => (businessLine.nodeId === inBusinessLineId)
        );
        // if the index is valid read the business line data
        if (lBusinessLineIndex >= 0) {
            setEnableLoadingIcon(true);
            const lPrevBusinessLineValues: BusinessLineModel = businessLineList[lBusinessLineIndex];
            const lNewBusinessLineValues: BusinessLineModel = {
                ...lPrevBusinessLineValues,
                businessGoalList: inNewBusinessGoalList
            };
            BusinessLineService.updateBusinessLine(inBusinessLineId, lPrevBusinessLineValues.name, lNewBusinessLineValues)
                .then(() => {
                    handleUpdateSuccess(lBusinessLineIndex, lNewBusinessLineValues);
                })
                .catch((_updateBusinessLineError: any) => {
                    handleUpdateError();
                });
        }
    };

    /**Function to be called when delete icon is clicked */
    const onBusinessLineDeleteRequest = (inBusinessLine: BusinessLineModel) => {
        setBusinessLineToDelete(inBusinessLine.nodeId);
        setConfirmationDialogContent(deleteBusinessLineConfirmationContent(inBusinessLine.name));
        setConfirmationDialogActionContent(DELETE_TEXT);
        setConfirmationDialogTitle(DELETE_CONFIRMATION_TITLE);
        setOpenConfirmationDialog(true);
    };

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        setConfirmationDialogLoadingIcon(false);
    };

    const onDeleteConfirmation = () => {
        setConfirmationDialogLoadingIcon(true);
        BusinessLineService.deleteBusinessLine(businessLineToDelete)
            .then(() => {
                // Close the confirmation dialog
                handleConfirmationDialogClose();
                //Update the business line list
                // Get the index of the business line modified
                const lBusinessLineIndex: number = businessLineList.findIndex(
                    (businessLine: BusinessLineModel) => (businessLine.nodeId === businessLineToDelete)
                );
                // if the index is valid read the business line data
                if (lBusinessLineIndex >= 0) {
                    businessLineList.splice(lBusinessLineIndex, 1);
                    setRefreshTable(!refreshTable);
                }
                // Display alert message
                setAlertSeverity("success");
                setOpenAlertPopup(true);
                setAlertPopupContent(DELETE_SUCCESS_MESSAGE);
                setEnableLoadingIcon(false);
            })
            .catch((deleteError: any) => {
                console.log(deleteError);
                handleConfirmationDialogClose();
                // Display alert message
                setAlertSeverity("error");
                setOpenAlertPopup(true);
                setAlertPopupContent(DELETE_ERROR_MESSAGE);
                setEnableLoadingIcon(false);
            });
    };

    const handleMaxValueLimitCrossEvent = (inDataType: string, inMaxNumber: number) => {
        setAlertSeverity("error");
        setOpenAlertPopup(true);
        setAlertPopupContent(maxLimitCrossText(inDataType, inMaxNumber));
    };

    const handleEmptyValue = () => {
        setAlertSeverity("error");
        setOpenAlertPopup(true);
        setAlertPopupContent(EMPTY_WARNING_TEXT);
    };

    const handleValueRequiredAlert = () => {
        setAlertSeverity("error");
        setOpenAlertPopup(true);
        setAlertPopupContent(SELECT_VALUE_MESSAGE);
    };

    /**Table header data to be displayed */
    const tableHeaderData: CollapsibleTableHeadInterface[] = [
        {
            dateKey: "isActive",
            displayName: ACTIVE_HEADING_TEXT,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "5%"
        },
        {
            dateKey: "name",
            displayName: NAME_HEADING_TEXT,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "20%"
        },
        {
            dateKey: "productList",
            displayName: PRODUCT_HEADING_TEXT,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "35%"
        },
        {
            dateKey: "businessGoalList",
            displayName: BUSINESS_GOAL_HEADING_TEXT,
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "30%"
        },
        {
            dateKey: "delete",
            displayName: "",
            hAlignmentOnCollapse: HALIGNMENT_ON_COLLAPSE,
            hAlignmentOnExpand: HALIGNMENT_ON_EXPAND,
            vAlignmentOnCollapse: VALIGNMENT_ON_COLLAPSE,
            vAlignmentOnExpand: VALIGNMENT_ON_EXPAND,
            cellWidth: "5%"
        }
    ];

    /**Data to be passed for the add button displayed in the header */
    const addButtonData: AddButtonModel = {
        tooltipTitle: "Create Business Line",
        addButtonAltText: "Create Business Line Icon Button",
        handleAddButtonClick: handleAddButtonClick
    };

    const toggleButtonData: ToggleButtonModel = {
        label: "Show Inactive Business Lines",
        handleChange: (changeEvent: any) => {
            setShowInActiveBusinessLine(changeEvent.target.checked);
        }
    };

    const tableComponentBuilder = (inBusinessLineList: BusinessLineModel[]) => {
        const lTableList: any[] = [];

        inBusinessLineList.forEach((businessLine: BusinessLineModel) => {
            let lTableRowData: any = {};

            // Business Line isActive component
            const lIsActiveComponent: any = <Checkbox
                checked={businessLine.isActive}
                disableRipple={true}
                onChange={() => {
                    handleActiveClick(businessLine.nodeId, businessLine.isActive)
                }}
                style={{padding:0, color: COLOR_AZURE_2 }}
                icon={<CheckBoxOutlineBlankRoundedIcon
                    style={{color: COLOR_GREY_1, fontSize: "36px"}}
                />}
                checkedIcon={<CheckBoxRoundedIcon
                    style={{color: COLOR_AZURE_2, fontSize: "36px"}}
                />}
            />;
            lTableRowData["isActive"] = {
                "collapsed": lIsActiveComponent,
                "expanded": lIsActiveComponent
            };

            // Business Line Name field
            const lBusinessLineNameFieldComponent: any = <BusinessLineNameTextField
                errorLabel={`Max character allowed ${MAX_CHARACTER_LIMIT}`}
                fieldId={businessLine.nodeId}
                maxCharacters={MAX_CHARACTER_LIMIT}
                onBlur={updateBusinessLineName}
                value={businessLine.name === newBusinessLineName ? "" : businessLine.name}
                onEmptyValueCallback={handleEmptyBusinessLineName}
            />;
            lTableRowData["name"] = {
                "collapsed": lBusinessLineNameFieldComponent,
                "expanded": lBusinessLineNameFieldComponent
            };

            // Business Line Product List
            lTableRowData["productList"] = {
                "collapsed": <BusinessLineAvatar
                    dataList={productList}
                    defaultValues={businessLine.productList}
                />,
                "expanded": <BusinessLineMultiSelect
                    key={businessLine.nodeId + "-productList"}
                    dataList={productList}
                    defaultValues={businessLine.productList}
                    hasEmptyValues={false}
                    deleteIconTooltip={"Delete Product"}
                    onSelectCallBack={(inSelectedValue: string[]) => {
                        handleProductListChange(businessLine.nodeId, inSelectedValue)
                    }}
                    selectButtonTitle={"Add Product"}
                    maxValues={10}
                    maxValueLimitCrossCallback={() => {
                        handleMaxValueLimitCrossEvent("Product", 10)
                    }}
                    emptyErrorCallback={handleEmptyValue}
                    valueRequiredCallBack={handleValueRequiredAlert}
                />
            };
            // Business Line Business Goal list
            lTableRowData["businessGoalList"] = {
                "collapsed": <BusinessLineAvatar
                    dataList={businessGoalList}
                    defaultValues={businessLine.businessGoalList}
                />,
                "expanded": <BusinessLineMultiSelect
                    key={businessLine.nodeId + "-businessGoalList"}
                    dataList={businessGoalList}
                    defaultValues={businessLine.businessGoalList}
                    hasEmptyValues={true}
                    deleteIconTooltip={"Delete Business Goal"}
                    onSelectCallBack={(inSelectedValue: string[]) => {
                        handleBusinessGoalListChange(businessLine.nodeId, inSelectedValue)
                    }}
                    selectButtonTitle={"Add Business Goal"}
                    maxValues={5}
                    maxValueLimitCrossCallback={() => {
                        handleMaxValueLimitCrossEvent("Business Goal", 5)
                    }}
                    emptyErrorCallback={() => {
                        console.log(EMPTY_WARNING_TEXT)
                    }}
                    valueRequiredCallBack={() => {
                        console.log(EMPTY_WARNING_TEXT)
                    }}
                />
            };
            // Busines Line Delete Icon
            const lDeleteIconComponent: any = <Tooltip title="Delete Buisness Line" placement="right" arrow>
                <IconButton onClick={() => { onBusinessLineDeleteRequest(businessLine) }} >
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </Tooltip>;

            lTableRowData["delete"] = {
                "collapsed": lDeleteIconComponent,
                "expanded": lDeleteIconComponent
            };

            // To expand the table row to force user to enter product
            // if user has added a new business line and updated the name
            if (businessLine.nodeId === newBusinessLineNodeId &&
                businessLine.name !== newBusinessLineName
            ) {
                lTableRowData["isExpanded"] = true;
            }

            if (showInActiveBusinessLine || businessLine.isActive) {
                lTableList.push(lTableRowData);
            }
        });
        setTableList(lTableList);
    };

    useEffect(() => {
        BusinessLineService.getAllBusinessLines(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessLinesResponse: BusinessLineModel[]) => {
                setBusinessLineList(getBusinessLinesResponse);
            })
            .catch((getBusinessLinesError: any) => {
                console.log(getBusinessLinesError);
            });
        // Call product service
        ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
            .then((getProductResponse: ProductModel[]) => {
                const lHoldProductList: BusinessLineMenuDataModel[] = [];
                getProductResponse.forEach((productData: ProductModel) => {
                    const lHoldProductData: BusinessLineMenuDataModel = {
                        dataKey: productData.nodeId,
                        displayValue: productData.productName,
                        thumbnail: productData.thumbnail
                    };
                    lHoldProductList.push(lHoldProductData);
                });
                setProductList(lHoldProductList);
                setRefreshTable(!refreshTable);
            });
        // Call business goal service
        BusinessGoalService.getNotCompleteBG(lInnovationData.eskoAccountDetail.repoid)
            .then((getBusinessGoalResponse: BusinessGoalTableType[]) => {
                const lHoldBGList: BusinessLineMenuDataModel[] = [];
                getBusinessGoalResponse.forEach((bgData: BusinessGoalTableType) => {
                    const lHoldBGData: BusinessLineMenuDataModel = {
                        dataKey: undefined === bgData.nodeId ? bgData.businessGoalName.toString() : bgData.nodeId,
                        displayValue: bgData.businessGoalName.toString(),
                        thumbnail: bgData.thumbnail.toString()
                    };
                    lHoldBGList.push(lHoldBGData);
                });
                setBusinessGoalList(lHoldBGList);
                setRefreshTable(!refreshTable);
            })
    }, [lInnovationData]);

    useEffect(() => {
        // Sort Business lines according to their name
        businessLineList.sort((firstElement, secondElement) => {
            return (firstElement.name.toLowerCase() > secondElement.name.toLowerCase() ? 1 : -1);
        });
        tableComponentBuilder(businessLineList);
    }, [businessLineList, refreshTable, showInActiveBusinessLine, newBusinessLineNodeId, productList, businessGoalList])

    return (
        <Grid container direction="column" className={BusinessLineStyleClasses.rootGridContainer}>
            {/* Header grid */}
            <Grid item className={BusinessLineStyleClasses.headerGrid}>
                <Header
                    currentPageHeading="Business Lines"
                    addButton={addButtonData}
                    toggleButton={toggleButtonData}
                />
            </Grid>
            {/* Table grid */}
            <Grid item className={BusinessLineStyleClasses.tableGrid}>
                <CollapsibleTable
                    tableBordered={true}
                    tableData={tableList}
                    tableEmptyMessage={"No Business Line Added"}
                    tableHeaderData={tableHeaderData}
                    tableMaxHeight={"100%"}
                    tableWidth={"auto"}
                />
                {/* Loading icon for the table */}
                {
                    enableLoadingIcon ?
                        <CircularProgress className={BusinessLineStyleClasses.circularLoading} /> :
                        null
                }
            </Grid>

            {/* Alert popup */}
            <AlertPopup
                isOpen={openAlertPopup}
                severity={alertSeverity}
                content={alertPopupContent}
                handleCloseButtonClick={() => { setOpenAlertPopup(false) }}
            />
            {/* Confirmation dialog for delete */}
            <ConfirmationDialog
                closeConfirmationDialog={handleConfirmationDialogClose}
                confirmationActionContent={confirmationDialogActionContent}
                confirmationDialogContent={confirmationDialogContent}
                confirmationDialogTitle={confirmationDialogTitle}
                handleSubmit={onDeleteConfirmation}
                loading={confirmationDialogLoadingIcon}
                open={openConfirmationDialog}
            />
        </Grid>
    )
}