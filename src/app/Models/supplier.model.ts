import { Branch } from "./branch.model";

export interface Supplier{
    id:number;
    supplierCode: string;
    supplierName: string;
    supplierNumber: string;
    supplierAddress: string;
    supplierBranchId: number;
    supplierBranch : Branch;
    supplierOpeningbalance: number;
    supplierCurrentbalance: number; 
    supplierStatus:boolean; 

}