import { Branch } from "./branch.model";
import { Product } from "./product.model";

export interface Inventory{
    id : number;
    productId : number;
    product : Product;
    branchId : number;
    branch : Branch;
    quantity : number;
    
}