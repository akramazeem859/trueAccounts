import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';
import { JournalVoucherComponent } from './Voucher/JournalVoucher/journal-voucher.component';
import { CashReciptComponent } from './Voucher/cashRecipt/cash-recipt.component';
import { CashPaymentComponent } from './Voucher/cashPayment/cash-payment.component';
import { BankReciptComponent } from './Voucher/bankRecipt/bank-recipt.component';

const routes: Routes = [
  {path: 'financial', component:FinancialComponent , children:[
    {path:'jv', component:JournalVoucherComponent},
    {path:'cashRecipt',component:CashReciptComponent},
    {path:'cashPayment',component:CashPaymentComponent},
    {path:'bankRecipt', component:BankReciptComponent},
    {path:'bankPayment', component:BankReciptComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
