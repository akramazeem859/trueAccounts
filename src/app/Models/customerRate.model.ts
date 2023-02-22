import { Product } from './product.model';
import { Customer } from './customer.model';
export interface customerRates{
    
    id?:number;
    customerId?: number;
    customer?:Customer;
    productId?:number;
    Product?: Product;
    rate?:number;
    
}