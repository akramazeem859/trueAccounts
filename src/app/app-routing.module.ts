
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AdminComponent } from './Admin/admin.component';
import { SaleComponent } from './sale/sale.component';
import { ProductionComponent } from './production/production.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { MainComponent } from './Components/main/main.component';
import { FinancialComponent } from './Financial/financial.component';
import { LoginComponent } from './User/login/login.component';
import { SignupComponent } from './User/signup/signup.component';
import { AuthGuard } from './Guards/auth.guard';




const routes: Routes = [
  
  { path: '', component: MainComponent , canActivate:[AuthGuard] },
  { path: 'login',component: LoginComponent},
  { path: 'signup',component:SignupComponent},
  {
    path: 'sale',
    component: SaleComponent,
    loadChildren: () => import('./sale/sale.module').then((x) => x.SaleModule),
  },
  
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./Admin/admin.module').then((x) => x.AdminModule),
  },
  {
    path: 'production',
    component: ProductionComponent,
    loadChildren: () => import('./production/production.module').then((x) => x.ProductionModule),
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    loadChildren: () => import('./inventory/inventory.module').then((x) => x.InventoryModule),
  },

  { path: 'purchase', 
    component:PurchaseComponent,
   loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule) 
  },

  { path: 'financial', 
    component:FinancialComponent,
   loadChildren: () => import('./Financial/financial.module').then(m => m.FinancialModule) 
  },


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
