import React from "react";
import { ProductModel } from "../ProductModel";

export interface ProductAddDialogModel {
    openDialog: boolean;
    
    // Product data for the dialog
    productValue: ProductModel;
    setProductValue: React.Dispatch<React.SetStateAction<ProductModel>>;

    // Dialog text props
    dialogTitle: string;
    dialogProductNameLabel:string;
    dialogProductManagerLabel:string;

    // Thumbnail data handle
    thumbnailData: any;
    setThumbnailData: React.Dispatch<React.SetStateAction<any>>;
    
    // Dialog submit and cancel callback
    handleDialogClose: () => void;
    handleDialogSubmit: () => void;

    // Alert popup
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertSeverity: React.Dispatch<React.SetStateAction<"success" | "info" | "warning" | "error">>;
    setAlertContent: React.Dispatch<React.SetStateAction<string>>;

    // Manager drop down related props
    managerList: string[];

    //circular progress
    loading: boolean;

    // Dialog validity
    isFormValid: boolean;
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;

}