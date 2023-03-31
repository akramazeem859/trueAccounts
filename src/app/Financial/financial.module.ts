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


@NgModule({
  declarations: [
    FinancialComponent,
    JournalVoucherComponent
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
