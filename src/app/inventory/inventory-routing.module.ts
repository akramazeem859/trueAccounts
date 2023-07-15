import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventorylistComponent } from './report/listing/inventorylist.component';
import { BalanceComponent } from './report/balance/balance.component';
import { LedgerComponent } from './report/ledger/ledger.component';


const routes: Routes = [
  {path:'inventory',component:InventoryComponent, children:[
    {path:'listing', component:InventorylistComponent},
    {path:'balance',component:BalanceComponent},
    {path:'ledger', component:LedgerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
