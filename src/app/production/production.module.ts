import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { BrandComponent } from './reseller/Brand/brand/brand.component';
import { AddBrandComponent } from './reseller/Brand/add-brand/add-brand.component';
import { EditBrandComponent } from './reseller/Brand/edit-brand/edit-brand.component';
import { ProductComponent } from './reseller/Product/product/product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductionComponent,
    BrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    ProductComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductionRoutingModule
  ],
  exports: [
    BrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    ProductComponent
  ]
})
export class ProductionModule { }
