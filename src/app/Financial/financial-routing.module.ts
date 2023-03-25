import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';
import { JournalVoucherComponent } from './Voucher/JournalVoucher/journal-voucher.component';

const routes: Routes = [
  {path: 'financial', component:FinancialComponent , children:[
    {path:'jv', component:JournalVoucherComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
