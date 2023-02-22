import { sInvDetail } from './sInvDetail.model';
import { Branch } from "./branch.model";
import { Customer } from "./customer.model";
import { cashAccount } from "./cashAccount.model";

export interface sInvoice{
    id:number;
    code:string;
    payable:number;
    paid:number;
    customerId:number;
    customer: Customer;
    branchId : number;
    branch : Branch;
    freight : number;
    datetime: Date;
    accountId: number;
    account : cashAccount
    sInvDetail: sInvDetail[];
}