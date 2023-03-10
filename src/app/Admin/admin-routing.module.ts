import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddBranchComponent } from './Branches/add-branch/add-branch.component';
import { BranchesComponent } from './Branches/branches/branches.component';
import { EditBranchComponent } from './Branches/edit-branch/edit-branch.component';
import { CashAccountComponent } from './cash-account/cash-account.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompanyComponent } from './company/company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';

const routes: Routes = [
  {path:'admin', component:AdminComponent, children:[
    { path:'company', component:CompanyComponent},
    { path:'company/add', component:AddCompanyComponent},
    { path:'company/edit/:id', component:EditCompanyComponent},
    { path:'branches', component:BranchesComponent},
    { path:'branches/add-branch', component:AddBranchComponent},
    { path:'branches/edit-branch/:id', component:EditBranchComponent},
    { path:'cashAccount', component:CashAccountComponent},



  ] }
];

@NgModule({
  declarations:[],

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
