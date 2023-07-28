import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';

import { JournalVoucherComponent } from './Voucher/JournalVoucher/journal-voucher.component';
import { FinancialComponent } from './financial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/Material-Module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTableModule} from '@angular/material/table';
import { CashReciptComponent } from './Voucher/CashRecipt/cash-recipt.component';
import { CashPaymentComponent } from './Voucher/CashPayment/cash-payment.component';
import { BankReciptComponent } from './Voucher/BankRecipt/bank-recipt.component';
import { BankPaymentComponent } from './Voucher/BankPayment/bank-payment.component';
import { AllLedgerComponent } from './Reports/Ledger/all-ledger/all-ledger.component';


@NgModule({
  declarations: [
    FinancialComponent,
    JournalVoucherComponent,
    CashReciptComponent,
    CashPaymentComponent,
    BankReciptComponent,
    BankPaymentComponent,
    AllLedgerComponent
  ],
  imports: [
    CommonModule,
    FinancialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatTableModule
  
  ],
  exports:[
    FinancialComponent,
    
  ]
})
export class FinancialModule { 
  
}
