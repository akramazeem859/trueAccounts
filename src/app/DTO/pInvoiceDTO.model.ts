import { pInvDetail } from '../Models/pInvDetail.model'
import { PInvDetailDTO } from './p-inv-detail-dto';

export interface pInvoiceDTO {

    id?:number;
    code?:string;
    date?:string;
    payable?:number;
    paid?:number;
    supplierId?:number;
    branchId? : number;
    freight? : number;
    accountId?: number;
    PInvDet? : PInvDetailDTO[];
}

