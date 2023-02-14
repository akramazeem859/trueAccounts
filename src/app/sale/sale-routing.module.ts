import { SaleComponent } from './sale.component';
import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';

const routes: Routes = [
  { path: 'sale', component:SaleComponent , children:[
    {path: 'sInvoice', component:SaleInvoiceComponent}
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
