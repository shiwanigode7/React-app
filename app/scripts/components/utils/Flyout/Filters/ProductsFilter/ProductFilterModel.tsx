export interface ProductFilterModel {
    selectedProductList: string[];
    productFilterOptions?: ProductWithIdAndNameModel[];
    rememberSession: boolean;
    setSelectedProductList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ProductWithIdAndNameModel {
    productName: string;
    nodeId: string;
}

export interface ProductsListWithChecked {
    productDetails: ProductWithIdAndNameModel;
    checked: boolean;
}