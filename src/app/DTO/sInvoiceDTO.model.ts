import { sInvDetailDTO } from "./sInvDetailDTO.model";

export interface sInvoiceDTO {

    id?:number;
    code?:string;
    date?:string;
    payable?:number;
    paid?:number;
    supplierId?:number;
    branchId? : number;
    freight? : number;
    accountId?: number;
    sInvDet? : sInvDetailDTO[];
}