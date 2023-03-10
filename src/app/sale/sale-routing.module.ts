import { SaleComponent } from './sale.component';
import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { CustomerComponent } from './customer/Customer/customer.component';

import { CustomerRatesComponent } from './customer/CustomerRates/customer-rates.component';
import { SaleInvoiceComponent } from './voucher/sale-invoice/sale-invoice.component';

const routes: Routes = [
  { path: 'sale', component:SaleComponent , children:[
    {path: 'sInvoice', component:SaleInvoiceComponent},
    {path: 'customer', component:CustomerComponent},
    {path: 'customerrate', component:CustomerRatesComponent}
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
