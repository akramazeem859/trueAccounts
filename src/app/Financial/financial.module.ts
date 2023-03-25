import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';

import { JournalVoucherComponent } from './Voucher/JournalVoucher/journal-voucher.component';
import { FinancialComponent } from './financial.component';


@NgModule({
  declarations: [
    FinancialComponent,
    JournalVoucherComponent
  ],
  imports: [
    CommonModule,
    FinancialRoutingModule
  ],
  exports:[
    FinancialComponent,
  ]
})
export class FinancialModule { }
