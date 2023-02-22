import { SaleComponent } from './sale/sale.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CompanyComponent } from './components/company/company.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/Home.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { BranchesComponent } from './components/branches/branches/branches.component';
import { AddBranchComponent } from './components/branches/add-branch/add-branch.component';
import { EditBranchComponent } from './components/branches/edit-branch/edit-branch.component';
import { BrandComponent } from './components/Brand/brand/brand.component';
import { AddBrandComponent } from './components/Brand/add-brand/add-brand.component';
import { EditBrandComponent } from './components/Brand/edit-brand/edit-brand.component';
import { ProductComponent } from './components/product/product/product.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CashAccountComponent } from './components/cash-account/cash-account.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PurchaceInvoiceComponent } from './components/purchace-invoice/purchace-invoice.component';
import { SaleModule } from 'src/app/sale/sale.module';

import { ToastrModule } from 'ngx-toastr';
import { CustomerRatesComponent } from './components/CustomerRates/customer-rates/customer-rates.component';


const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CompanyComponent,
    HomeComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    BranchesComponent,
    AddBranchComponent,
    EditBranchComponent,
    BrandComponent,
    AddBrandComponent,
    EditBrandComponent,
    ProductComponent,
    CustomerComponent,
    SupplierComponent,
    CashAccountComponent,
    InventoryComponent,
    PurchaceInvoiceComponent,
    CustomerRatesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SaleModule
    
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
