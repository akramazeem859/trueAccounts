
import { cusRateDTO } from './../DTO/cusRateDTO.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Company } from '../Models/component';
import { Observable, Subject, tap } from 'rxjs';
import { Company } from '../Models/company.model';
import { Branch } from '../Models/branch.model';
import { Brand } from '../Models/brand.model';
import { Product } from '../Models/product.model';
import { Customer } from '../Models/customer.model';
import { Supplier } from '../Models/suppliet.model';
import { cashAccount } from '../Models/cashAccount.model';
import { Inventory } from '../Models/inventory.model';
import { pInvoice } from '../Models/pInvoice.model';
import { pInvoiceDTO } from '../DTO/pInvoiceDTO.model';
import { pInvDetail } from '../Models/pInvDetail.model';
import { PInvDetailDTO } from '../DTO/p-inv-detail-dto';
import { sInvoiceDTO } from '../DTO/sInvoiceDTO.model';
import { sInvoice } from '../Models/sInvoice.model';
import { sInvDetail } from '../Models/sInvDetail.model';
import { customerRates } from '../Models/customerRate.model';
import { level1 } from '../Models/COA/level1.model';
import { level2 } from '../Models/COA/level2.model';
import { level3 } from '../Models/COA/level3.model';
import { level4 } from '../Models/COA/level4.model';
import { jvInvoice } from '../Models/jvInvoice.model';
import { jvInvDetail } from '../Models/jvInvDetail.model';
import { customerLedger } from '../Models/customerLedger.model';
import { customerLedgerReq } from '../Models/customerLedgerReq.model';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  

  baseApiUrl:string = environment.baseApiUrl;
  private _refreshRequired = new Subject<void>();

  get RefreshRequired(){
    return this._refreshRequired;
  }

  private userPayLoad:any;
  constructor(private http: HttpClient, private router:Router) {
    this.userPayLoad = this.decodeToke();
   }

  login(userObj: any){
    return this.http.post<any>(this.baseApiUrl+'/api/User/authenticate',userObj)
   }
   register(userObj: any){
    return this.http.post<any>(this.baseApiUrl+'/api/User/register',userObj)
   }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  setToken(token:string){
    localStorage.setItem('Token',token);
    localStorage.setItem('session',JSON.stringify(token));
  }
  getToken(){
    return localStorage.getItem('Token');
  }
  isLoggedin():boolean{
    return !!localStorage.getItem('Token');
  }

  decodeToke(){
    const jwtHelper = new JwtHelperService();
    const token  = this.getToken();
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getNamefromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.name;
  }

  getRolefromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.role;
  }
  getBranchIdfromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.branchId;
  }


  getAllCompanies(): Observable<Company[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/Companies');
  }

  getAllBranches(): Observable<Branch[]>{
    return this.http.get<Branch[]>(this.baseApiUrl+ '/api/Branches');
  }

  getAllBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(this.baseApiUrl+'/api/Brand');
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl+'/api/Product');
  }

  getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseApiUrl+'/api/Customer');
  }

  getAllSupplier():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.baseApiUrl+'/api/Supplier/');
  }
  getAllAccounts():Observable<cashAccount[]>{
    return this.http.get<cashAccount[]>(this.baseApiUrl+'/api/CashAccount/');
  }
  getAllInventory():Observable<Inventory[]>{
    return this.http.get<Inventory[]>(this.baseApiUrl+ '/api/Inventory/');
  }
  getAllPurcInv():Observable<pInvoice[]>{
    return this.http.get<pInvoice[]>(this.baseApiUrl+ '/api/PInvoice/');
  }
  getAllPurcInvDetail(code:any):Observable<pInvDetail[]>{
    return this.http.get<pInvDetail[]>(this.baseApiUrl + '/api/PInvoice/Detail/'+ code);
  }
  getAllSaleInvDetail(code:any):Observable<sInvDetail[]>{
    return this.http.get<sInvDetail[]>(this.baseApiUrl + '/api/SInvoice/Detail/'+ code);
  }
  getAllJvInvDetail(code:any):Observable<jvInvDetail[]>{
    return this.http.get<jvInvDetail[]>(this.baseApiUrl+"/api/JVInvoice/detail/" + code);
  }
  getAllLevel1():Observable<level1[]>{
    return this.http.get<level1[]>(this.baseApiUrl+'/api/ChartAccount/coa/level1');
  }
  getAllLevel2():Observable<level2[]> {
    return this.http.get<level2[]>(this.baseApiUrl+'/api/ChartAccount/coa/level2');
  }
  getAllLevel3():Observable<level3[]> {
    return this.http.get<level3[]>(this.baseApiUrl+'/api/ChartAccount/coa/level3');
  }
  getAllLevel4():Observable<level4[]> {
    return this.http.get<level4[]>(this.baseApiUrl+'/api/ChartAccount/coa/level4');
  }
  getAllCustomerLedger(): Observable<customerLedger[]>{
    return this.http.get<customerLedger[]>(this.baseApiUrl + '/api/CustomerLedgers');
  }
  



  // Record counts calls
  getCustomerCount():Observable<number>{
    return this.http.get<number>(this.baseApiUrl+'/api/Customer/customerCount');
  }

  getSupplierCount():Observable<number>{
    return this.http.get<number>(this.baseApiUrl+'/api/Supplier/supplierCount');
  }





  getCompany(id:string){
    return this.http.get<Company>(this.baseApiUrl + '/api/Companies/' + id);
  }
  getBranch(id:string){
    return this.http.get<Branch>(this.baseApiUrl + '/api/Branches/' + id);
  }
  getBrand(id: string){
    return this.http.get<Brand>(this.baseApiUrl + '/api/Brand/' + id);
  }
  getProduct(id: string){
    return this.http.get<Product>(this.baseApiUrl + '/api/Product/' + id);
  }
  getCustomer(id: string){
    return this.http.get<Customer>(this.baseApiUrl+'/api/Customer/'+id);
  }
  getSupplier(id:string){
    return this.http.get<Supplier>(this.baseApiUrl+'/api/Supplier/'+id);
  }
  getAccount(id:string){
    return this.http.get<cashAccount>(this.baseApiUrl+'/api/CashAccount/'+ id);
  }
  getInventory(id:any){
    return this.http.get<Inventory>(this.baseApiUrl+'/api/Inventory/' + id);
  }
  getBranchInv(id:any){
    return this.http.get<Inventory>(this.baseApiUrl+'/api/Inventory/branchId/' + id);
  }
  getPurchInv(id:any){
    return this.http.get<pInvoice>(this.baseApiUrl+'/api/PInvoice/' + id);
  }

  getPurchInvByCode(id:any){
    return this.http.get<pInvoice>(this.baseApiUrl+'/api/PInvoice/code/' + id);
  }
  getProdInvt(pid:number,bid:number){
    return this.http.get<number>(this.baseApiUrl+'/api/Inventory/getProdInvt?pid='+pid+'&bid='+bid);
  }

  getSaleInvByCode(id:any){
    return this.http.get<sInvoice>(this.baseApiUrl+'/api/SInvoice/code/' + id);
  }

<<<<<<< HEAD
  getJvInvByCode(code:any){
    return this.http.get<jvInvoice>(this.baseApiUrl+'/api/JVInvoice/code/'+code);
=======
  getJvInvByCode(id:any):Observable<jvInvoice>{
    return this.http.get<jvInvoice>(this.baseApiUrl+'/api/JVInvoice/code/'+id);
>>>>>>> f89154279c0098f8e5fcf2b3e25f144b09f1597d
  }

  getCustRatebyCus(id:any){
    return this.http.get<customerRates[]>(this.baseApiUrl+'/api/CustomerRate/byCust/'+ id);
  }
  getCustRatebyProd(cusId:any, prodId:any){
    return this.http.get<customerRates>(this.baseApiUrl+'/api/CustomerRate/byProd/'+cusId+'/'+prodId);
  }

  getlevel2bylevel1(level1:any){
    return this.http.get<level2[]>(this.baseApiUrl+'/api/ChartAccount/coa/level2/'+level1);
  }
  searchCustomerLedger(cusLReq : customerLedgerReq):Observable<customerLedger[]>{
    return this.http.get<customerLedger[]>(this.baseApiUrl+'/api/CustomerLedgers/search?customerId='+cusLReq.customerId+'&branchId='+cusLReq.branchId +'&fromDate='+ cusLReq.fromDate +'&toDate='+ cusLReq.toDate);
  }




  addBranch(branchRequest: Branch):Observable<Branch>{
    return this.http.post<Branch>(this.baseApiUrl + '/api/Branches', branchRequest);
  }

  addCompany(companyRequest: Company): Observable<Company>{
    return this.http.post<Company>(this.baseApiUrl + '/api/Companies' , companyRequest);
  }

  addBrand(brandRequest: Brand): Observable<Brand>{
    return this.http.post<Brand> (this.baseApiUrl + '/api/Brand', brandRequest);
  }

  addProduct(productRequest : Product):Observable<Product>{
    return this.http.post<Product> (this.baseApiUrl + '/api/Product', productRequest).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  addCustomer(customerRequest: Customer):Observable<Customer>{
    return this.http.post<Customer> (this.baseApiUrl+'/api/Customer', customerRequest);
  }

  addSupplier(supplierRequest: Supplier):Observable<Supplier>{
    return this.http.post<Supplier>(this.baseApiUrl+'/api/Supplier', supplierRequest);
  }
  addAccount(accountRequest: cashAccount):Observable<cashAccount>{
    return this.http.post<cashAccount>(this.baseApiUrl+'/api/CashAccount',accountRequest);
  }
  addInventory(inventoryRequest : Inventory):Observable<Inventory>{
    return this.http.post<Inventory>(this.baseApiUrl+'/api/Inventory', inventoryRequest);
  }
  addPInvoice(pInvoiceRequest : pInvoiceDTO):Observable<pInvoice>{
    return this.http.post<pInvoice>(this.baseApiUrl+'/api/pInvoice', pInvoiceRequest);
  }
  addPInvDetail(pInvDetailDTO : PInvDetailDTO[] ):Observable<pInvDetail>{
    return this.http.post<pInvDetail>(this.baseApiUrl+'/api/pInvDetail', pInvDetailDTO);
  }
  addSInvoice(sInvoiceRequest : sInvoiceDTO):Observable<sInvoice>{
    return this.http.post<sInvoice>(this.baseApiUrl+'/api/sInvoice', sInvoiceRequest);
  }
  addJVInvoice(jvinvoiceRequest : jvInvoice):Observable<jvInvoice>{
    return this.http.post<jvInvoice>(this.baseApiUrl+"/api/JVInvoice",jvinvoiceRequest);
  }

  addCustomerRate(cusRateDTO : cusRateDTO[]):Observable<customerRates>{
    return this.http.post<customerRates>(this.baseApiUrl+'/api/customerRate', cusRateDTO);
  }

  addLevel1(level1txt:level1):Observable<any>{
    return this.http.post<level1>(this.baseApiUrl+'/api/ChartAccount/level1', level1txt);
  }
  addLevel2(level2req:level2):Observable<any>{
    return this.http.post<level2>(this.baseApiUrl+'/api/ChartAccount/level2', level2req);
  }
  addLevel3(level3req:level3):Observable<any>{
    return this.http.post<level3>(this.baseApiUrl+'/api/ChartAccount/level3', level3req);
  }
  addLevel4(level4req:level4):Observable<any>{
    return this.http.post<level4>(this.baseApiUrl+'/api/ChartAccount/level4', level4req);
  }
 




  uploadImage(imageData:any){
    return this.http.post(this.baseApiUrl + '/api/Product/UploadImage' , imageData);
  }




  editCompany(id: number , companyEditRequest : Company):Observable<Company>{
    return this.http.put<Company>(this.baseApiUrl + '/api/Companies/' + id , companyEditRequest);
  }

  editBranch(id:number , branchEditRequest: Branch):Observable<Branch>{
    return this.http.put<Branch>(this.baseApiUrl + '/api/Branches/' + id, branchEditRequest);
  }

  editBrand(id:number, brandEditRequest: Brand):Observable<Brand>{
    return this.http.put<Brand>(this.baseApiUrl + '/api/Brand/' + id, brandEditRequest);
  }

  editProduct(id: number , productEditRequest: Product):Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl + '/api/Product/' + id , productEditRequest);
  }
  editCustomer(id: number , customerEditRequest: Customer):Observable<Customer>{
    return this.http.put<Customer>(this.baseApiUrl + '/api/Customer/' + id , customerEditRequest);
  }
  
  editSupplier(id: number , supplierEditRequest: Supplier):Observable<Supplier>{
    return this.http.put<Supplier>(this.baseApiUrl + '/api/Supplier/' + id , supplierEditRequest);
  }
  editCashAccount(id:number, cashEditRequest: cashAccount):Observable<cashAccount>{
    return this.http.put<cashAccount>(this.baseApiUrl + '/api/CashAccount/'+id,cashEditRequest);
  }
  editInventory(id:number, inventoryEditRequest: Inventory):Observable<Inventory>{
    return this.http.put<Inventory>(this.baseApiUrl + '/api/Inventory/'+id,inventoryEditRequest);
  }
  editPurchInv(id:number, pInvoiceRequest : pInvoice):Observable<pInvoice>{
    return this.http.put<pInvoice>(this.baseApiUrl + '/api/pInvoice/'+id,pInvoiceRequest);
  }
  editSaleInv(id:number, sInvoiceRequest : sInvoice):Observable<sInvoice>{
    return this.http.put<sInvoice>(this.baseApiUrl + '/api/sInvoice/'+id,sInvoiceRequest);
  }






  deleteCompany(id: number):Observable<Company>{
    return this.http.delete<Company>(this.baseApiUrl + '/api/Companies/' + id);
  }

  deletBranch(id: number):Observable<Branch>{
    return this.http.delete<Branch>(this.baseApiUrl + '/api/Branches/' + id)
  }

  deleteBrand(id:number):Observable<Brand>{
    return this.http.delete<Brand>(this.baseApiUrl + '/api/Brand/' + id)
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.baseApiUrl + '/api/product/' + id);
  }

  deleteCustomer(id:number):Observable<Customer>{
    return this.http.delete<Customer>(this.baseApiUrl+'/api/Customer/' + id);
  }
  deleteSupplier(id:number):Observable<Supplier>{
    return this.http.delete<Supplier>(this.baseApiUrl+'/api/Supplier/' + id);
  }
  deleteCashAccount(id:number):Observable<cashAccount>{
    return this.http.delete<cashAccount>(this.baseApiUrl+'/api/CashAccount/' + id);
  }
  deleteInventory(id:number):Observable<Inventory>{
    return this.http.delete<Inventory>(this.baseApiUrl+'/api/Inventory/' + id);
  }
  deletePInv(id:number):Observable<pInvoice>{
    return this.http.delete<pInvoice>(this.baseApiUrl+'/api/pInvoice/' + id);
  }
  deleteCusRec(cusId:any,prodId:any):Observable<customerRates>{
    return this.http.delete<customerRates>(this.baseApiUrl+'/api/customerRate/'+ cusId +'/'+prodId);
  }


  
}
