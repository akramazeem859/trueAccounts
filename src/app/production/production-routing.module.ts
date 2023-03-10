import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { AddBrandComponent } from './reseller/Brand/add-brand/add-brand.component';
import { BrandComponent } from './reseller/Brand/brand/brand.component';
import { EditBrandComponent } from './reseller/Brand/edit-brand/edit-brand.component';
import { ProductComponent } from './reseller/Product/product/product.component';

const routes: Routes = [
  {path:'production', component:ProductionComponent , children:[
    {path:'brands', component:BrandComponent},
    {path:'brands/add-brand',component:AddBrandComponent},
    {path:'brands/edit-brand/:id',component:EditBrandComponent},
    {path:'product',component:ProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
