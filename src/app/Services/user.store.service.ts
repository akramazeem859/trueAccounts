import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
 
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private branchId$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleFromStore(role:string){
    this.role$.next(role);
  }

  public getNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setNameFromStore(name:string){
    this.fullName$.next(name);
  }

  
  public getBrnchIdFromStore(){
    return this.branchId$.asObservable();
  }
  public setBrnchIdFromStore(brnchId:string){
    this.branchId$.next(brnchId);
  }

}
