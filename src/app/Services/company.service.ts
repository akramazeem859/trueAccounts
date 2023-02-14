import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Company } from '../Models/component';
import { Observable } from 'rxjs';
import { Company } from '../Models/company.model';
import { Branch } from '../Models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseApiUrl:string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<Company[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/Companies');
  }

  getAllBranches(): Observable<Branch[]>{
    return this.http.get<Branch[]>(this.baseApiUrl+ '/api/Branches');
  }

  getCompany(id:string){
    return this.http.get<Company>(this.baseApiUrl + '/api/Companies/' + id);
  }

  getBranch(id:string){
    return this.http.get<Branch>(this.baseApiUrl + '/api/Branches');
  }

  addBranch(branchRequest: Branch):Observable<Branch>{
    return this.http.post<Branch>(this.baseApiUrl + '/api/Branches', branchRequest);
  }

  addCompany(companyRequest: Company): Observable<Company>{
    return this.http.post<Company>(this.baseApiUrl + '/api/Companies' , companyRequest);
  }

  

  editCompany(id: number , companyEditRequest : Company):Observable<Company>{
    return this.http.put<Company>(this.baseApiUrl + '/api/Companies/' + id , companyEditRequest);
  }

  deleteCompany(id: number):Observable<Company>{
    return this.http.delete<Company>(this.baseApiUrl + '/api/Companies/' + id);
  }
}
