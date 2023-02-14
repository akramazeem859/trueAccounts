export interface sInvoiceDTO {

    id?:number;
    code?:string;
    payable?:number;
    paid?:number;
    supplierId?:number;
    branchId? : number;
    freight? : number;
    accountId?: number;
    sInvDet? : sInvoiceDTO[];
}