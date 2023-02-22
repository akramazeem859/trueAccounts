
import { Product } from "./product.model";

export interface sInvDetail{

    id?:number;
    productId?: number;
    product?: Product;
    salePrice?: number;
    quantity?: number;
    sInvoiceId?: number;
    
}