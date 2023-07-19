import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../Services/company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private service : CompanyService, private router:Router) {  }
  
  canActivate():boolean{
    if(this.service.isLoggedin()){
      return true;
      
    }
    else{
      this.router.navigate(['login']);
      return false;

    }
  }
  
}
