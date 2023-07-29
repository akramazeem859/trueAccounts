import { cashAccount } from "./cashAccount.model"

export  interface cashRecipt{

    id:number,
    invoiceCode:string,
    invType:string,
    createdDate:Date,
    amount:number,
    account:cashAccount,
    branchId:number,
    accountId:number,
    customerId:number,
    particular:string
}


