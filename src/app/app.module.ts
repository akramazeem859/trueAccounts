import { DatePipe } from '@angular/common';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/Material-Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';


import { AdminModule } from 'src/app/Admin/admin.module'
import { SaleModule } from 'src/app/sale/sale.module';
import { ProductionModule } from './production/production.module';
import { PurchaseModule } from './purchase/purchase.module';


const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SaleModule,
    MaterialModule,
    AdminModule,
    ProductionModule,
    PurchaseModule,
    NgSelectModule
    
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MainComponent
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
