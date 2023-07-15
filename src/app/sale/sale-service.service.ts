import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { customerLedger } from '../Models/customerLedger.model';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  baseApiUrl:string = environment.baseApiUrl;
  private _refreshRequired = new Subject<void>();

  get RefreshRequired(){
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getAllCustomerLedger(): Observable<customerLedger[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/customerLedger');
  }
}
