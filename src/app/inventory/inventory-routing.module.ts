import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventorylistComponent } from './report/listing/inventorylist.component';


const routes: Routes = [
  {path:'inventory',component:InventoryComponent, children:[
    {path:'listing', component:InventorylistComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
