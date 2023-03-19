import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CompanyComponent } from './company/company.component';
import { AdminComponent } from './admin.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { BranchesComponent } from './Branches/branches/branches.component';
import { AddBranchComponent } from './Branches/add-branch/add-branch.component';
import { EditBranchComponent } from './Branches/edit-branch/edit-branch.component';
import { CashAccountComponent } from './cash-account/cash-account.component';
import { ChartAccountComponent } from './chart-account/chart-account.component';
import { CoaFilterPipe } from './AdminPipes/coa-filter.pipe';
import { Coal3filterPipe } from './adminpipes/coal3filter.pipe';


@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    BranchesComponent,
    AddBranchComponent,
    EditBranchComponent,
    CashAccountComponent,
    AdminComponent,
    ChartAccountComponent,
    CoaFilterPipe,
    Coal3filterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
   
  ],
  exports: [
    CompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    BranchesComponent,
    AddBranchComponent,
    EditBranchComponent
  ]
})
export class AdminModule { }
