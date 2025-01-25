export const HALIGNMENT_ON_COLLAPSE: "left" | "right" | "inherit" | "center" | "justify" | undefined = "left";
export const HALIGNMENT_ON_EXPAND: "left" | "right" | "inherit" | "center" | "justify" | undefined = "left";
export const VALIGNMENT_ON_COLLAPSE: string = "top";
export const VALIGNMENT_ON_EXPAND: string = "top";

export const ACTIVE_HEADING_TEXT: string = "Active";
export const NAME_HEADING_TEXT: string = "Name";
export const PRODUCT_HEADING_TEXT: string = "Product(s)";
export const BUSINESS_GOAL_HEADING_TEXT: string = "Business Goal(s)";

export const EMPTY_BUSINESS_LINE_NAME_ERROR:string = "Business Line Name cannot be empty";
export const DELETE_TEXT: string = "Delete";
export const DELETE_CONFIRMATION_TITLE: string = "Delete Business Line";

export const deleteBusinessLineConfirmationContent = (inBusinessLineName: string) => {
    return `Are you sure you want to delete Business Line "${inBusinessLineName}"?`
};

export const maxLimitCrossText = (inDataType: string, inMaxNumber:number) => {
    return `You can add only ${inMaxNumber} ${inDataType}`;
}

export const BUSINESS_LINE_UPDATE_SUCCESS:string = "Business Line updated successfully.";
export const BUSINESS_LINE_UPDATE_ERROR: string = "Error in updating the Business Line Data.";
export const DELETE_SUCCESS_MESSAGE: string = "Business Line was deleted successfully";
export const DELETE_ERROR_MESSAGE: string = "Error in deleting Business Line";
export const BUSINESS_LINE_NAME_ALREADY_EXISTS: string = "Business Line of the same name already exists.";
export const BUSINESS_LINE_CREATION_SUCCESS: string = "Business Line added successfully";
export const BUSINESS_LINE_CREATION_ERROR: string = "Error in adding new Business Line.";
export const EMPTY_WARNING_TEXT: string = "Minimum one product needs to be assigned";
export const EMPTY_PRODUCTS_WARNING: string = "There are no products in the organization. Please create products before creating Business Line";
export const SELECT_VALUE_MESSAGE: string = "Please select a product.";