import { cashAccount } from "./cashAccount.model"

export  interface cashPayment{

    id:number,
    invoiceCode:string,
    invType:string,
    createdDate:Date,
    amount:number,
    account:cashAccount,
    branchId:number,
    accountId:number,
    supplierId:number,
    particular:string
}


