import { Branch } from "./branch.model";

export interface Customer{

    id:number;
    customerCode: string;
    customerName: string;
    customerNumber: string;
    customerAddress: string;
    customerBranchId: number;
    customerBranch : Branch;
    customerOpeningbalance: number;
    customerCurrentbalance: number; 

}