import { Company } from "./company.model";

export interface Branch{
    id: number;
    branchName :string;
    supervisor :string;
    contactNumber : string;
    companyId :number;
    company: Company;
}