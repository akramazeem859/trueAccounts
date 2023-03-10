import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/Material-Module';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SaleInvoiceComponent } from './voucher/sale-invoice/sale-invoice.component';
import { CustomerComponent } from './customer/Customer/customer.component';
import { CustomerRatesComponent } from './customer/CustomerRates/customer-rates.component';

@NgModule({
  declarations: [
    SaleInvoiceComponent,
    SaleComponent,
    CustomerComponent,
    CustomerRatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaleRoutingModule,
    ToastrModule,
    MaterialModule,
    NgSelectModule,
    MatDatepickerModule,
   
 
  ],
  exports:[
    SaleInvoiceComponent,
    CustomerComponent,
    CustomerRatesComponent
 
  ]
})
export class SaleModule { }
