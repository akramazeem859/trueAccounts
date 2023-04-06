import { jvInvDetail } from "./jvInvDetail.model";

export interface jvInvoice{
    Id?:number;
    Code?:string;
    Particular?:string;
    DateTime?:Date;
    Remarks?:string;
    BranchId?:number;
    UserId?:number;
    EnterDt?:Date;
    jvInvDetail?:jvInvDetail;
}