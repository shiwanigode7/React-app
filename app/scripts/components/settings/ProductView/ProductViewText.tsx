
export const EMPTY_PRODUCT_NAME_ERROR:string = "Product Name cannot be empty.";
export const THUMBNAIL_UPLOAD_ERROR:string = "Error in uploading thumbnail.";
export const THUMBNAIL_UPDATE_SUCCESS: string = "Thumbnail Updated.";

export const PRODUCT_UPDATE_SUCCESS: string = "Product Updated Successfully.";
export const PRODUCT_UPDATE_ERROR: string = "Error in updating the Product.";
export const DELETE_CONFIRMATION_TITLE: string = "Delete Product";
export const DELETE_TEXT:string = "Delete";

export const PRODUCT_NAME_ALREADY_EXISTS: string = "Product with the same name already exists.";

export const PRODUCT_CREATION_SUCCESS: string = "Product Created Successfully.";
export const PRODUCT_CREATION_ERROR: string = "Error in creating Product.";

export const DELETE_SUCCESS_MESSAGE:string = "Product deleted successfully.";
export const DELETE_ERROR_MESSAGE:string = "Error in deleting product.";

export const deleteProductConfirmationContent = (inProductName: string) => (`Are you sure you want to delete product "${inProductName}"?`)