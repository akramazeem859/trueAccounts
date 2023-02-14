
import { SaleComponent } from './sale/sale.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/Home.component';
import { MainComponent } from './components/main/main.component';
import { CompanyComponent } from './components/company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { BranchesComponent } from './components/branches/branches/branches.component';
import { AddBranchComponent } from './components/branches/add-branch/add-branch.component';
import { EditBranchComponent } from './components/branches/edit-branch/edit-branch.component';
import { BrandComponent } from './components/Brand/brand/brand.component';
import { EditBrandComponent } from './components/Brand/edit-brand/edit-brand.component';
import { AddBrandComponent } from './components/Brand/add-brand/add-brand.component';
import { ProductComponent } from './components/product/product/product.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CashAccountComponent } from './components/cash-account/cash-account.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PurchaceInvoiceComponent } from './components/purchace-invoice/purchace-invoice.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: MainComponent },
  { path: 'Company', component: CompanyComponent },
  { path: 'Company/add', component: AddCompanyComponent },
  { path: 'Company/edit/:id', component: EditCompanyComponent },
  { path: 'branches', component: BranchesComponent },
  { path: 'branch/add', component: AddBranchComponent },
  { path: 'branch/edit/:id', component: EditBranchComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brand/add', component: AddBrandComponent },
  { path: 'brand/edit/:id', component: EditBrandComponent },
  { path: 'product', component: ProductComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'cashAccount', component: CashAccountComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'pInvoice', component: PurchaceInvoiceComponent },
  {
    path: 'sale',
    component: SaleComponent,
    loadChildren: () => import('./sale/sale.module').then((x) => x.SaleModule),
  }

];

@NgModule({

  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports:
    [RouterModule]

})
export class AppRoutingModule { }
