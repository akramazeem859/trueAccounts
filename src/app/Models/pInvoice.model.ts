
import { Branch } from "./branch.model";
import { pInvDetail } from "./pInvDetail.model";
import { Supplier } from "./supplier.model";

export interface pInvoice{
    id:number;
    code:string;
    payable:number;
    paid:number;
    supplierId:number;
    supplier : Supplier;
    branchId : number;
    branch : Branch;
    freight : number;
    datetime: Date;
    accountId: number;
    pInvDetails: pInvDetail[];
}