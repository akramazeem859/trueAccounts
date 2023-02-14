import { Brand } from "./brand.model";

export interface Product{
    id: number;
    productName: string;
    unit: string;
    image: string;
    salePrice : number;
    purchasePrice : number;
    brandId: number;
    brand: Brand;
    
}