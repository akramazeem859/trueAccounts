import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PurchaseorderComponent } from './voucher/purchaseorder/purchaseorder.component';
import { GrnComponent } from './voucher/grn/grn.component';
import { PurchasereturnComponent } from './voucher/purchasereturn/purchasereturn.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaceInvoiceComponent } from './voucher/purchace-invoice/purchace-invoice.component';

import { SupplierlistingComponent } from './report/supplierReport/supplierlisting/supplierlisting.component';


@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseorderComponent,
    GrnComponent,
    PurchaceInvoiceComponent,
    PurchasereturnComponent,
    SupplierlistingComponent
  
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
 
    ReactiveFormsModule
  ],
  exports:[
    PurchaseComponent,
    PurchaseorderComponent,
    GrnComponent,
    PurchaceInvoiceComponent,
    PurchasereturnComponent,
    SupplierlistingComponent

  ]
})
export class PurchaseModule { }
