import { SaleComponent } from './sale.component';
import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { CustomerComponent } from './customer/Customer/customer.component';

import { CustomerRatesComponent } from './customer/CustomerRates/customer-rates.component';
import { SaleInvoiceComponent } from './voucher/sale-invoice/sale-invoice.component';
import { SaleOrderComponent } from './voucher/sale-order/sale-order.component';
import { DispatchNoteComponent } from './voucher/dispatch-note/dispatch-note.component';
import { CustomerLedgerComponent } from './customer/customer-ledger/customer-ledger.component';
import { Saleinvoice2Component } from './voucher/saleinvoice2/saleinvoice2.component';

const routes: Routes = [
  { path: 'sale', component:SaleComponent , children:[
    {path: 'sInvoice', component:SaleInvoiceComponent},
    {path: 'customer', component:CustomerComponent},
    {path: 'customerrate', component:CustomerRatesComponent},
    {path: 'saleorder',component:SaleOrderComponent},
    {path: 'dispatch', component:DispatchNoteComponent},
    {path: 'cledger', component:CustomerLedgerComponent},
    {path: 'sInvoice2', component:Saleinvoice2Component},
  ]}
];

@NgModule({
  declarations: [],

  imports:[
    RouterModule.forChild(routes)
   
  ],
  exports: 
  [RouterModule]
})
export class SaleRoutingModule { }
