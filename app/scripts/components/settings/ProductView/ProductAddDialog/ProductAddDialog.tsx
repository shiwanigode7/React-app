
import { Button } from "@esko/cloud-ui-components/dist/esm";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import React from "react";
import { AvatarUpload } from "../../../../upload/AvatarUploadComponent";
import SelectMultipleValues from "../../../SelectMultipleValues";
import { ProductNameTextField } from "../ProductNameTextField/ProductNameTextField";
import { ProductAddDialogModel } from "./ProductAddDialogModel";
import { ProductAddDialogStyles } from "./ProductAddDialogStyles";

export function ProductAddDialog(ProductAddDialogProps: ProductAddDialogModel) {

    const ProductAddDialogClasses = ProductAddDialogStyles();

    const MAX_CHARACTER_LIMIT: number = 140;

    const handleInvalidFile = () => {
        /**Set the alert message */
        ProductAddDialogProps.setOpenAlert(true);
        ProductAddDialogProps.setAlertSeverity("error");
        ProductAddDialogProps.setAlertContent("File type not Supported.");
    };

    const handleProductNameChange = (inNewValue: string, inFieldId: string) => {
        ProductAddDialogProps.setProductValue({
            ...ProductAddDialogProps.productValue,
            productName: inNewValue,
            nodeId: inFieldId
        });
    };

    const handleManagerListChange = (inNewManagerList: string[], inProductId: string) => {
        ProductAddDialogProps.setProductValue({
            ...ProductAddDialogProps.productValue,
            managers: inNewManagerList,
            nodeId: inProductId
        });
    };

    /**Function to handle thumbnail updates */
    const handleThumbnailChange = (data: any) => {
        /**Save the selected image/thumbnail data */
        ProductAddDialogProps.setThumbnailData(data);
    };

    return (
        <Dialog
            open={ProductAddDialogProps.openDialog}
            classes={{
                paper: ProductAddDialogClasses.dialog
            }}
        >
            <DialogTitle className={ProductAddDialogClasses.dialogTitle}>
                {/**Using grid to align the dialog title text and the x button */}
                <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                    {/**Title of the dialog */}
                    <Grid item >
                        <Typography className={ProductAddDialogClasses.dialogTitleText}>
                            {ProductAddDialogProps.dialogTitle}
                        </Typography>
                    </Grid>
                    {/**the close icon */}
                    <Grid item >
                        <IconButton
                            onClick={() => { ProductAddDialogProps.handleDialogClose() }}
                            className={ProductAddDialogClasses.dialogCrossIconButton}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container direction="row" className={ProductAddDialogClasses.dialogContentContainerGrid}>
                    {/* To display product name field and users list */}
                    <Grid item className={ProductAddDialogClasses.productNameAndManagerGrid}>
                        <Grid item className={ProductAddDialogClasses.productNameAndManagerSubGrid}>
                            <Typography classes={{ body1: ProductAddDialogClasses.label }}>Product Name <span className={ProductAddDialogClasses.labelSpan}>*</span></Typography>
                            <ProductNameTextField
                                errorLabel={`Maximum limit is ${MAX_CHARACTER_LIMIT} characters`}
                                fieldId={ProductAddDialogProps.productValue.nodeId}
                                maxCharacters={MAX_CHARACTER_LIMIT}
                                onBlur={handleProductNameChange}
                                onIncorrectValue={() => { /* TODO: document why this arrow function is empty */ }}
                                value={ProductAddDialogProps.productValue.productName}
                                isDialogField={true}
                                fieldRequiredLabel={"This field is required"}
                                isFormValid={ProductAddDialogProps.isFormValid}
                                setIsFormValid={ProductAddDialogProps.setIsFormValid}
                            />
                        </Grid>
                        <Grid item className={ProductAddDialogClasses.productNameAndManagerSubGrid}>
                            <Typography classes={{ body1: ProductAddDialogClasses.label }}>Manager <span className={ProductAddDialogClasses.labelSpan}>*</span></Typography>
                            <SelectMultipleValues
                                managerList={ProductAddDialogProps.managerList}
                                productData={ProductAddDialogProps.productValue}
                                callBackOnListChange={handleManagerListChange}
                            />
                        </Grid>
                    </Grid>
                    {/* To display thumnbnail */}
                    <Grid item className={ProductAddDialogClasses.thumnailGrid}>
                        <AvatarUpload
                            sizeOfAvatar={"large"}
                            callBackForRejectedFiles={handleInvalidFile}
                            callBackForAcceptedFiles={handleThumbnailChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            {/**Dialog Action button components */}
            <Divider light />
            {/**Cancel button to close the dialog */}
            <DialogActions >
                <Button
                    color={"secondary"}
                    onClick={() => { ProductAddDialogProps.handleDialogClose() }}
                    className={ProductAddDialogClasses.dialogCancelButton}
                    startIcon={undefined}
                    endIcon={undefined}
                    pullDown={undefined}
                >
                    {"Cancel"}
                </Button>

                <Button
                    color={"primary"}
                    onClick={() => { ProductAddDialogProps.handleDialogSubmit() }}
                    className={ProductAddDialogClasses.dialogSubmitButton}
                    startIcon={undefined}
                    endIcon={undefined}
                    pullDown={undefined}
                >
                    {"Create"}
                    {ProductAddDialogProps.loading ?
                        <CircularProgress size={15} className={ProductAddDialogClasses.circularProgress} /> :
                        null
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}