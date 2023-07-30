import { Branch } from "./branch.model";

export interface cashAccount{
    id?:number;
    accountCode?: string;
    accountTitle?: string;
    accountType?: string;
    accountBalance?: number;
    accountBranchId? : number;
    accountBranch?: Branch;
    accountStatus : boolean; 

}