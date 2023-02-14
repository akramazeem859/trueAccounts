import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CompanyComponent } from './components/company/company.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { FormsModule } from '@angular/forms';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { BranchesComponent } from './components/branches/branches/branches.component';
import { AddBranchComponent } from './components/branches/add-branch/add-branch.component';
import { EditBranchComponent } from './components/branches/edit-branch/edit-branch.component';

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
    EditBranchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
