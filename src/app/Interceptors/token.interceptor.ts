import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyService } from '../Services/company.service';
import { Token } from '@angular/compiler';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service : CompanyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mytoken = this.service.getToken(); 
    if(mytoken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${mytoken}`}
      })
    }
    return next.handle(request);
  }
}
