import { DatePipe } from '@angular/common';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { MaterialModule } from 'src/Material-Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AdminModule } from 'src/app/Admin/admin.module'
import { SaleModule } from 'src/app/sale/sale.module';
import { ProductionModule } from './production/production.module';
import { PurchaseModule } from './purchase/purchase.module';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { FinancialModule } from './Financial/financial.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SaleModule,
    MaterialModule,
    AdminModule,
    ProductionModule,
    PurchaseModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    FinancialModule,
    FontAwesomeModule,



    
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
