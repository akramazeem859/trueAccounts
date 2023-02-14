import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { CompanyComponent } from './components/company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { BranchesComponent } from './components/branches/branches/branches.component';
import { AddBranchComponent } from './components/branches/add-branch/add-branch.component';
import { EditBranchComponent } from './components/branches/edit-branch/edit-branch.component';


const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'', component: MainComponent},
  { path: 'Company', component: CompanyComponent},
  { path: 'Company/add', component: AddCompanyComponent},
  { path: 'Company/edit/:id', component: EditCompanyComponent},
  { path: 'branches', component: BranchesComponent},
  { path: 'branch/add', component: AddBranchComponent},
  { path: 'branch/edit/:id', component: EditBranchComponent},
 
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  

  exports: 
  [RouterModule]
})
export class AppRoutingModule { }
