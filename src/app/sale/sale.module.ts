import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/Material-Module';

import {MatDatepickerModule} from '@angular/material/datepicker';

import { SaleInvoiceComponent } from './voucher/sale-invoice/sale-invoice.component';
import { CustomerComponent } from './customer/Customer/customer.component';
import { CustomerRatesComponent } from './customer/CustomerRates/customer-rates.component';
import { SaleOrderComponent } from './voucher/sale-order/sale-order.component';
import { DispatchNoteComponent } from './voucher/dispatch-note/dispatch-note.component';
import { SalereturnComponent } from './voucher/salereturn/salereturn.component';
import { CustomerLedgerComponent } from './customer/customer-ledger/customer-ledger.component';
import { SaleReciptComponent } from './Popups/sale-recipt/sale-recipt.component';

@NgModule({
  declarations: [
    SaleInvoiceComponent,
    SaleComponent,
    CustomerComponent,
    CustomerRatesComponent,
    SaleOrderComponent,
    DispatchNoteComponent,
    SalereturnComponent,
    CustomerLedgerComponent,
    SaleReciptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaleRoutingModule,
    ToastrModule,
    MaterialModule

   
 
  ],
  exports:[
    SaleInvoiceComponent,
    CustomerComponent,
    CustomerRatesComponent
 
  ]
})
export class SaleModule { }
