import { pInvoice } from "./pInvoice.model";
import { Product } from "./product.model";

export interface pInvDetail{

    id?:number;
    productId?: number;
    product?: Product;
    purchasePrice?: number;
    quantity?: number;
    pInvoiceId?: number;
    
}