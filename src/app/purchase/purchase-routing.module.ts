import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { SupplierlistingComponent } from './report/supplierReport/supplierlisting/supplierlisting.component';
import { PurchaceInvoiceComponent } from './voucher/purchace-invoice/purchace-invoice.component';
import { SupplierledgerComponent } from './report/supplierReport/supplierledger/supplierledger.component';

const routes: Routes = [
  { path: 'purchase', component: PurchaseComponent , children:[
    { path:'pInvoice' , component:PurchaceInvoiceComponent},
    { path:'supplierlisting' , component:SupplierlistingComponent},
    { path: 'supLedger' , component:SupplierledgerComponent}
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
