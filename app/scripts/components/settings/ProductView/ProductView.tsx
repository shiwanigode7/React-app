/**TSX file for displaying view for Products */
import { CircularProgress, Grid, IconButton, Tooltip } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../../Icons/images";
import { getProductThumbnailPath } from "../../../constant/InnovationAPI";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { UserListWithEmailModel } from "../../../interfaces/InnovationInterface";
import { repoUpdateThumbnail } from "../../../services/RepoService";
import ProductService from "../../../services/service/ProductService";
import UserService from "../../../services/UserService";
import { AvatarUpload } from "../../../upload/AvatarUploadComponent";
import { uploadAvatar } from "../../../upload/UploaderFunction";
import ConfirmationDialog from "../../../view/ConfirmationDialog";
import { ColumnFieldData, TableWrapper } from "../../../view/tables/TableWrapper";
import SelectMultipleValues from "../../SelectMultipleValues";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import AddButtonModel from "../../utils/Header/AddButton/AddButtonModel";
import Header from "../../utils/Header/Header";
import { ProductAddDialog } from "./ProductAddDialog/ProductAddDialog";
import { ProductModel } from "./ProductModel";
import { ProductNameTextField } from "./ProductNameTextField/ProductNameTextField";
import { ProductViewStyles } from "./ProductViewStyles";
import { deleteProductConfirmationContent, DELETE_CONFIRMATION_TITLE, DELETE_ERROR_MESSAGE, DELETE_SUCCESS_MESSAGE, DELETE_TEXT, EMPTY_PRODUCT_NAME_ERROR, PRODUCT_CREATION_ERROR, PRODUCT_CREATION_SUCCESS, PRODUCT_NAME_ALREADY_EXISTS, PRODUCT_UPDATE_ERROR, PRODUCT_UPDATE_SUCCESS, THUMBNAIL_UPDATE_SUCCESS, THUMBNAIL_UPLOAD_ERROR } from "./ProductViewText";

export function ProductView() {

    const lInnovationData = useContext(InnovationAppContext);

    const ProductViewClasses = ProductViewStyles();
    const MAX_CHARACTER_LIMIT: number = 140;
    const [defaultProductValue, setDefaultProductValue] = useState<ProductModel>({
        productName: "",
        managers: [lInnovationData.currentUserInfo.displayName.toString()],
        nodeId: "",
        thumbnail: "",
        releaseData: []
    });

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [enableLoadingIcon, setEnableLoadingIcon] = useState<boolean>(false);
    const [refreshTable, setRefreshTable] = useState<boolean>(false);
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [tableList, setTableList] = useState<any[]>([]);
    const [productToDelete, setProductToDelete] = useState<string>("");
    const [newProduct, setNewProduct] = useState<ProductModel>(defaultProductValue);

    const [defaultThumbnailData, setDefaultThumbnailData] = useState<any>();
    const [thumbnailData, setThumbnailData] = useState<any>(undefined);
    const [usersList, setUsersList] = useState<string[]>([]);

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
    const [isDeleteRequest, setIsDeleteRequest] = useState<boolean>(false);

    const holdDate = new Date();
    const newVersionNumber: number = Number.parseInt(
        `${holdDate.getUTCHours().toString()}${holdDate.getUTCMinutes().toString()}${holdDate.getUTCSeconds().toString()}${holdDate.getUTCMilliseconds().toString()}`
    );
    /**State to hold the version number */
    const [thumbnailNewVersionNumber, setThumbnailNewVersionNumber] = useState<number>(newVersionNumber);

    const handleAddButtonClick = () => {
        setOpenAddDialog(true);
    };

    const handleAddDialogClose = () => {
        // if the values has been altered
        if (JSON.stringify(defaultProductValue) !== JSON.stringify(newProduct) ||
            undefined !== thumbnailData) {
            setIsDeleteRequest(false);
            setConfirmationDialogContent("There are unsaved changes. Are you sure you want to close this window without saving those changes?");
            setConfirmationDialogActionContent("Close Without Saving");
            setConfirmationDialogTitle("Unsaved Changes");
            setOpenConfirmationDialog(true);
        } else {
            setOpenAddDialog(false);
        }
        setIsFormValid(true);
    };

    const handleUnsavedChanges = () => {
        setNewProduct(defaultProductValue);
        setOpenAddDialog(false);
        handleConfirmationDialogClose();
        setThumbnailData(undefined);
    };

    const handleAddProductSubmit = () => {
        if (0 === newProduct.productName.trim().length) {
            setIsFormValid(false);
            return;
        }
        setAddLoading(true);
        const lNewProductValue: ProductModel = {
            ...newProduct,
            productName: newProduct.productName.trim()
        };
        ProductService.createProduct(lNewProductValue, lInnovationData.eskoAccountDetail.repoid)
            .then((createProductResponse: string) => {
                const dialogClose = () => {
                    handleConfirmationDialogClose();
                    setEnableLoadingIcon(false);
                    handleNewProductUpdate(lNewProductValue, createProductResponse);
                    setNewProduct(defaultProductValue);
                    setOpenAddDialog(false);
                    setRefreshTable(!refreshTable);
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("success");
                    setOpenAlertPopup(true);
                    setAlertPopupContent(PRODUCT_CREATION_SUCCESS);
                    setAddLoading(false);
                    // Clearing the uploaded image data
                    setThumbnailData(undefined);
                }
                /**Call back function to update thumbnail link after upload */
                const updateThumbnailInRepo = () => {
                    repoUpdateThumbnail(createProductResponse)
                        .then(() => {
                            // wait for the thumbnail to be updated in repo
                            setTimeout(() => { dialogClose() }, 500);
                        })
                }
                /**Upload the thumbnail, 
                 * if user has uploaded any image then the user selected image will be uploaded, 
                 * if user has not selected any image - default Esko image will be uploaded
                 */
                if (undefined === thumbnailData) {
                    uploadAvatar(createProductResponse, defaultThumbnailData, updateThumbnailInRepo, null);
                }
                else {
                    uploadAvatar(createProductResponse, thumbnailData, updateThumbnailInRepo, null);
                }
            })
            .catch((createProductError: any) => {
                if (409 === createProductError.status) {
                    setAlertPopupContent(PRODUCT_NAME_ALREADY_EXISTS);
                }
                else {
                    setAlertPopupContent(PRODUCT_CREATION_ERROR);
                }
                handleConfirmationDialogClose();
                setNewProduct(defaultProductValue);
                setOpenAddDialog(false);
                /**Setting the snackbar alert messages */
                setAlertSeverity("error");
                setOpenAlertPopup(true);
                setEnableLoadingIcon(false);
                setAddLoading(false);
            });
    };

    const handleNewProductUpdate = (inProductData: ProductModel, inProductId: string) => {
        const lNewProduct: ProductModel = {
            ...inProductData,
            nodeId: inProductId
        };
        productList.push(lNewProduct);
        setRefreshTable(!refreshTable);
    };

    /**Function to update the product name if valid */
    const updateProductName = (inNewValue: string, inProductId: string) => {
        // Get the index of the product modified
        const lProductIndex: number = productList.findIndex((product: ProductModel) => (product.nodeId === inProductId));
        // if the index is valid read the product data
        const lPrevProductValues: ProductModel = productList[lProductIndex];
        if (lProductIndex >= 0 && inNewValue.toLowerCase().trim() !== productList[lProductIndex].productName.toLowerCase().trim()) {
            setEnableLoadingIcon(true);
            const lNewProductValues: ProductModel = {
                ...lPrevProductValues,
                productName: inNewValue.trim()
            };
            ProductService.updateProduct(inProductId, lPrevProductValues.productName, lNewProductValues)
                .then(() => {
                    productList.splice(lProductIndex, 1, lNewProductValues);
                    setEnableLoadingIcon(false);
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("success");
                    setOpenAlertPopup(true);
                    setAlertPopupContent(PRODUCT_UPDATE_SUCCESS);
                    setRefreshTable(!refreshTable);
                })
                .catch((updateProductError: any) => {
                    if (409 === updateProductError.status) {
                        productList.splice(lProductIndex, 1, lPrevProductValues);
                        setAlertPopupContent(PRODUCT_NAME_ALREADY_EXISTS);
                        setRefreshTable(!refreshTable);
                    }
                    else {
                        setAlertPopupContent(PRODUCT_UPDATE_ERROR);
                    }
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("error");
                    setOpenAlertPopup(true);
                    setEnableLoadingIcon(false);
                });
        }
        else {
            setAlertSeverity("error");
            setOpenAlertPopup(true);
            productList.splice(lProductIndex, 1, lPrevProductValues);
            setAlertPopupContent(PRODUCT_NAME_ALREADY_EXISTS);
            setRefreshTable(!refreshTable);
        }
    };

    const handleEmptyProductName = () => {
        setOpenAlertPopup(true);
        setAlertSeverity("error");
        setAlertPopupContent(EMPTY_PRODUCT_NAME_ERROR);
    };

    const handleManagerListChange = (inNewManagerList: string[], inProductId: string) => {
        setEnableLoadingIcon(true);
        // Get the index of the product modified
        const lProductIndex: number = productList.findIndex((product: ProductModel) => (product.nodeId === inProductId));
        // if the index is valid read the product data
        if (lProductIndex >= 0) {
            const lPrevProductValues: ProductModel = productList[lProductIndex];
            const lNewProductValues: ProductModel = {
                ...lPrevProductValues,
                managers: inNewManagerList
            };
            ProductService.updateProduct(inProductId, lPrevProductValues.productName, lNewProductValues)
                .then(() => {
                    productList.splice(lProductIndex, 1, lNewProductValues);
                    setEnableLoadingIcon(false);
                    setRefreshTable(!refreshTable);
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("success");
                    setOpenAlertPopup(true);
                    setAlertPopupContent(PRODUCT_UPDATE_SUCCESS);
                })
                .catch(() => {
                    /**Setting the snackbar alert messages */
                    setAlertSeverity("error");
                    setOpenAlertPopup(true);
                    setAlertPopupContent(PRODUCT_UPDATE_ERROR);
                    setEnableLoadingIcon(false);
                });
        }
    };

    /**When uploading of the thumbnail is success */
    const onThumbnailUploadSuccess = (_response: any, inNodePath: string) => {

        repoUpdateThumbnail(inNodePath, thumbnailNewVersionNumber)
            .then(() => {
                const lProductIndex: number = productList.findIndex((product: ProductModel) => (product.nodeId === inNodePath));
                if (lProductIndex >= 0) {
                    const lPrevProductValues: ProductModel = productList[lProductIndex];
                    const lNewProductValues: ProductModel = {
                        ...lPrevProductValues,
                        thumbnail: getProductThumbnailPath(inNodePath, thumbnailNewVersionNumber)
                    };
                    setThumbnailNewVersionNumber(Number.parseInt(
                        `${holdDate.getUTCHours().toString()}${holdDate.getUTCMinutes().toString()}${holdDate.getUTCSeconds().toString()}${holdDate.getUTCMilliseconds().toString()}`
                    ));
                    productList.splice(lProductIndex, 1, lNewProductValues);
                }
                setEnableLoadingIcon(false);
                setRefreshTable(!refreshTable);
                /**Setting the snackbar alert messages */
                setAlertSeverity("success");
                setOpenAlertPopup(true);
                setAlertPopupContent(THUMBNAIL_UPDATE_SUCCESS);
            })
            .catch((repoUpdateThumbnailError: any) => {
                console.log(repoUpdateThumbnailError);
                /**Setting the snackbar alert messages */
                setAlertSeverity("error");
                setOpenAlertPopup(true);
                setAlertPopupContent(THUMBNAIL_UPLOAD_ERROR);
                setEnableLoadingIcon(false);
            });
    };

    /**When uploading of the thumbnail failes */
    const onThumbnailUploadFailure = (error: any, inNodePath: string) => {
        console.log(error, inNodePath);
        setAlertSeverity("error");
        setOpenAlertPopup(true);
        setAlertPopupContent(THUMBNAIL_UPLOAD_ERROR);
    };

    const thumbnailRejectedFilesCallback = () => {
        setOpenAlertPopup(true);
        setAlertSeverity("error");
        setAlertPopupContent("File type not Supported.");
    };

    /**Function to be called when delete icon is clicked */
    const onProductDeleteRequest = (inProduct: ProductModel) => {
        setProductToDelete(inProduct.nodeId);
        setConfirmationDialogContent(deleteProductConfirmationContent(inProduct.productName));
        setConfirmationDialogActionContent(DELETE_TEXT);
        setConfirmationDialogTitle(DELETE_CONFIRMATION_TITLE);
        setOpenConfirmationDialog(true);
        setIsDeleteRequest(true);
    };

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        setConfirmationDialogLoadingIcon(false);
    };

    const onDeleteConfirmation = () => {
        setConfirmationDialogLoadingIcon(true);
        ProductService.deleteProduct(productToDelete)
            .then(() => {
                // Close the confirmation dialog
                handleConfirmationDialogClose();
                //Update the product list
                // Get the index of the product modified
                const lProductIndex: number = productList.findIndex((product: ProductModel) => (product.nodeId === productToDelete));
                // if the index is valid read the product data
                if (lProductIndex >= 0) {
                    productList.splice(lProductIndex, 1);
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

    /**Defining the Column field data of Product Table */
    const columnFields: ColumnFieldData[] = [
        { dataKey: "productName", label: "Name", alignment: "left", cellWidth: "30%", isComponentColumn: true, isSortable: true, returnsRowData: false },
        { dataKey: "manager", label: "Manager", alignment: "left", cellWidth: "60%", isComponentColumn: true, isSortable: false, returnsRowData: false },
        { dataKey: "thumbnail", label: "Thumbnail", alignment: "center", cellWidth: "10%", isComponentColumn: true, isSortable: false, returnsRowData: false },
        { dataKey: "delete", label: "", alignment: "right", cellWidth: "10%", isComponentColumn: true, isSortable: false, returnsRowData: false }
    ];

    /**Data to be passed for the add button displayed in the header */
    const addButtonData: AddButtonModel = {
        tooltipTitle: "Create Product",
        addButtonAltText: "Create Product Button",
        handleAddButtonClick: handleAddButtonClick
    };

    const tableComponentBuilder = (inProductList: ProductModel[]) => {
        const lTableList: any[] = [];
        inProductList.forEach((product: ProductModel) => {
            let lTableRowData: any = {};
            lTableRowData["productName"] = {
                "displayComponent": <ProductNameTextField
                    errorLabel={`Maximum limit is ${MAX_CHARACTER_LIMIT} characters`}
                    fieldId={product.nodeId}
                    maxCharacters={MAX_CHARACTER_LIMIT}
                    onBlur={updateProductName}
                    onIncorrectValue={handleEmptyProductName}
                    value={product.productName}
                    key={product.nodeId}
                    isDialogField={false}
                    fieldRequiredLabel={"Product name is required"}
                    isFormValid={isFormValid}
                    setIsFormValid={setIsFormValid}
                />,
                "componentValue": product.productName
            }

            lTableRowData["manager"] = {
                "displayComponent": <SelectMultipleValues
                    managerList={usersList}
                    setManagerList={setUsersList}
                    productList={productList}
                    productData={product}
                    callBackOnListChange={handleManagerListChange}
                />,
                "componentValue": product.managers
            }

            lTableRowData["thumbnail"] = {
                "displayComponent": <AvatarUpload
                    sizeOfAvatar={"none"}
                    defaultImageLink={product.thumbnail}
                    nodePath={product.nodeId}
                    callBackOnSuccess={onThumbnailUploadSuccess}
                    callBackOnFailure={onThumbnailUploadFailure}
                    callBackForRejectedFiles={thumbnailRejectedFilesCallback}
                    key={product.nodeId}
                    versionNumber={thumbnailNewVersionNumber}
                />,
                "componentValue": product.thumbnail
            }

            lTableRowData["delete"] = {
                "displayComponent": <Tooltip title="Delete Product" placement="left" arrow>
                    <IconButton onClick={() => { onProductDeleteRequest(product) }} >
                        <DeleteForeverRoundedIcon />
                    </IconButton>
                </Tooltip>
            }
            lTableList.push(lTableRowData);
        });
        setTableList(lTableList);
    };

    /**To get the png from the innovation service */
    const getDefaultThumbnail = () => {
        fetch(images.EskoStarPng).then((response) => {
            response.blob().then((data) => {
                setDefaultThumbnailData(data);
            });
        });
    };

    useEffect(() => {
        getDefaultThumbnail();
        setNewProduct(defaultProductValue);
    }, []);

    useEffect(() => {
        setNewProduct(defaultProductValue);
    }, [defaultProductValue]);

    useEffect(() => {
        setDefaultProductValue({
            ...defaultProductValue,
            managers: [lInnovationData.currentUserInfo.displayName.toString()]
        });
        ProductService.getAllProducts(lInnovationData.eskoAccountDetail.repoid)
            .then((getProductResponse: ProductModel[]) => {
                setProductList(getProductResponse);
            })
            .catch((getProductError: any) => {
                console.log(getProductError);
            });

        // Get users list
        UserService.getGroupUsers(lInnovationData.eskoAccountDetail.organizationID.toString(), "Product Managers")
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersList(getUsersResponse.map(user => user.displayName));
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError);
            });
    }, [lInnovationData]);

    useEffect(() => {
        productList.sort((firstElement, secondElement) => {
            return (firstElement.productName.toLowerCase() > secondElement.productName.toLowerCase() ? 1 : -1);
        });
        tableComponentBuilder(productList);
    }, [productList, refreshTable, usersList])

    return (
        <Grid container direction="column" className={ProductViewClasses.rootGridContainer}>
            {/* Header grid */}
            <Grid item className={ProductViewClasses.headerGrid}>
                <Header
                    currentPageHeading="Products"
                    addButton={addButtonData}
                />
            </Grid>
            {/* Table grid */}
            <Grid item className={ProductViewClasses.tableGrid}>
                <TableWrapper
                    inputData={tableList}
                    inputColumn={columnFields}
                    tableHeight={"100%"}
                    zIndexValue={1}
                    tableWidth={"100%"}
                    borderedRow={true}
                    onRowClickCallBack={null}
                    customMessageOnEmpty={"No Products added yet."}
                />
                {/* Loading icon for the table */}
                {
                    enableLoadingIcon ?
                        <CircularProgress className={ProductViewClasses.circularLoading} /> :
                        null
                }
            </Grid>
            {/* Dialog component*/}
            <ProductAddDialog
                dialogProductManagerLabel="Manager"
                dialogProductNameLabel="Product Name"
                dialogTitle="Create Product"
                handleDialogClose={handleAddDialogClose}
                handleDialogSubmit={handleAddProductSubmit}
                openDialog={openAddDialog}
                productValue={newProduct}
                setProductValue={setNewProduct}
                setThumbnailData={setThumbnailData}
                thumbnailData={thumbnailData}
                managerList={usersList}
                setAlertContent={setAlertPopupContent}
                setAlertSeverity={setAlertSeverity}
                setOpenAlert={setOpenAlertPopup}
                loading={addLoading}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
            />
            {/* Alert popup */}
            <AlertPopup
                isOpen={openAlertPopup}
                severity={alertSeverity}
                content={alertPopupContent}
                handleCloseButtonClick={() => { setOpenAlertPopup(false) }}
            />
            {/* Confirmation dialog for add and delete */}
            <ConfirmationDialog
                closeConfirmationDialog={handleConfirmationDialogClose}
                confirmationActionContent={confirmationDialogActionContent}
                confirmationDialogContent={confirmationDialogContent}
                confirmationDialogTitle={confirmationDialogTitle}
                handleSubmit={isDeleteRequest ? onDeleteConfirmation : handleUnsavedChanges}
                loading={confirmationDialogLoadingIcon}
                open={openConfirmationDialog}
            />
        </Grid>
    )
}