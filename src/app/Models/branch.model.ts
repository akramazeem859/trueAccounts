import { Company } from "./company.model";

export interface Branch{
    id: number;
    branchName :string;
    supervisor :string;
    contactNumber : string;
    uan:string;
    address:string;
    status:boolean;
    companyId :number;
    company: Company;
}