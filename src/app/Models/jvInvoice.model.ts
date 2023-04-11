import { jvInvDetail } from "./jvInvDetail.model";

export interface jvInvoice{
    id?:number;
    code?:string;
    particular?:string;
    dateTime?:Date;
    remarks?:string;
    branchId?:number;
    userId?:number;
    enterDt?:Date;
    jvInvDetail?:jvInvDetail[];
}