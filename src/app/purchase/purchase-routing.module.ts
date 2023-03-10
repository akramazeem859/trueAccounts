import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { SupplierlistingComponent } from './report/supplierReport/supplierlisting/supplierlisting.component';
import { PurchaceInvoiceComponent } from './voucher/purchace-invoice/purchace-invoice.component';

const routes: Routes = [
  { path: 'purchase', component: PurchaseComponent , children:[
    { path:'pInvoice' , component:PurchaceInvoiceComponent},
    { path:'supplierlisting' , component:SupplierlistingComponent}
  ] }
];

@NgModule({
  declarations:[],
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PurchaseRoutingModule { }
