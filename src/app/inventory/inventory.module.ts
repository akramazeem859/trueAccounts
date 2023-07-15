import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { InventorylistComponent } from './report/listing/inventorylist.component';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './report/balance/balance.component';
import { LedgerComponent } from './report/ledger/ledger.component';



@NgModule({
  declarations: [
    InventoryComponent,
    InventorylistComponent,
    BalanceComponent,
    LedgerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
