import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { cashPayment } from 'src/app/Models/cashPayment.model';
import { cashRecipt } from 'src/app/Models/cashRecipt.model';
import { Customer } from 'src/app/Models/customer.model';
import { Supplier } from 'src/app/Models/supplier.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css']
})
export class CashPaymentComponent {

  cashPaymentForm : FormGroup;
  SeachCashPaymentForm: FormGroup; 

  supplierList: Supplier[];
  supplierList2: Supplier[];
  tempSupplier: Supplier;
  tempBranchId: any;
  accountList : cashAccount[];
  cashPaymentList: cashPayment[];

  options !: Supplier[];
  filteredOptions !: Observable<Supplier[]>;

  options2 !: cashAccount[];
  filteredOptions2 !: Observable<cashAccount[]>;

  options3 !: Supplier[];
  filteredOptions3 !: Observable<Supplier[]>;

    
  tempdt : any;
  tempfdt : any;
  temptdt : any;
  tempSupId : number; 
  tempCashId: number = 0;
  btnTitle : string = 'Save Record';

/**
 *
 */
constructor(private service:CompanyService,
  private myalert:ToastrService,
  private fb:FormBuilder,
  private datePipe : DatePipe) {

    this.cashPaymentForm = this.fb.group({
      id:[],
      dt:[],
      amount:[,Validators.required],
      cashAccId:[,Validators.required],
      supplierId:[,Validators.required],
      particular:[],
      branchId:[this.tempBranchId]
    })

    this.SeachCashPaymentForm = this.fb.group({
      supplierId:[],
      fromDate:[],
      toDate:[]
    })

  }// end constructor...

  ngOnInit(): void {
    this.tempBranchId = this.service.getbranchId();
    console.log('tempbranchId...:'+ this.tempBranchId);


    
    this.service.getBranchSuppliers(this.tempBranchId).subscribe({
      next:(res)=>{
        this.supplierList = res;
        this.options = res; 
        this.supplierList2 = res; 
        this.options3 = res; 
        console.log('Supplier of branch'+this.options3);
      },
      error:(err)=>{
        this.myalert.warning('Unable to fetch supplier','Something wrong.')
      }
    })

    this.service.getbrnchCashAcc(this.tempBranchId).subscribe({
      next:(res)=>{
        this.accountList = res;
        this.options2 = res;
        console.log("Branch Cash Accounts :"+ this.options2);
      },
      error:(err)=>{
        this.myalert.warning('unable to fetch Accounts','Something Wrong.')
      }
    })

    this.filteredOptions = this.cashPaymentForm.get('supplierId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredOptions2 = this.cashPaymentForm.get('cashAccId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter2(name as string, this.options2):this.options2
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredOptions3 = this.SeachCashPaymentForm.get('supplierId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter3(name as string, this.options3):this.options3
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

  }

  private _filter(value: string , sup:Supplier[]): Supplier[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.supplierName.toLowerCase().includes(filterValue));
    }
    else{
      return sup;
    }
  }


  private _filter2(value: string , acc:cashAccount[]): cashAccount[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options2.filter(option => option.accountTitle.toLowerCase().includes(filterValue));
    }
    else{
      return acc;
    }
  }

  private _filter3(value: string , sup2:Supplier[]): Supplier[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options3.filter(option => option.supplierName.toLowerCase().includes(filterValue));
    }
    else{
      return sup2;
    }
  }

  submit(){
    
    let creatDate = this.datePipe.transform(this.cashPaymentForm.get('dt').value, 'yyyy/MM/dd');
    this.tempdt = this.cashPaymentForm.get('dt').value; 
    this.cashPaymentForm.get('id').setValue(this.tempCashId);
    this.cashPaymentForm.get('dt').setValue(creatDate);
    this.cashPaymentForm.get('branchId').setValue(this.tempBranchId);

    console.log(this.cashPaymentForm.value);

    
    this.service.addCashPayment(this.cashPaymentForm.value).subscribe({
      next:(res)=>{
        this.myalert.success('Record Saved Successfully', 'Done!');
        this.cashPaymentForm.reset(); 
        this.tempCashId = 0; 
        this.btnTitle = 'Save Record';
      },
      error:(err)=>{
        this.myalert.warning('Unable to save Record', 'Something Wrong.');
      }
    })
  }

  getsupplier(supId:any){
    if (this.supplierList && this.supplierList.length > 0) {
      const sup = this.supplierList.find((item) => item.id === supId);
      if (sup) {
        return sup.supplierName;
      }
    }
    return '';
  }

  getsupplier2(supId:any){
    if (this.supplierList && this.supplierList.length > 0) {
      const sup = this.supplierList.find((item) => item.id === supId);
      if (sup) {
        return sup.supplierName;
      }
    }
    return '';
  }

  getcashAcc(accId:any){
    if (this.accountList && this.accountList.length > 0) {
      const acc = this.accountList.find((item) => item.id === accId);
      if (acc) {
        return acc.accountTitle;
      }
    }
    return '';
  }

  seachCashPayment(){

    this.tempfdt = this.SeachCashPaymentForm.get('fromDate').value;
    this.temptdt = this.SeachCashPaymentForm.get('toDate').value;

    let fromDate = this.datePipe.transform(this.SeachCashPaymentForm.get('fromDate').value, 'yyyy/MM/dd');
    let toDate = this.datePipe.transform(this.SeachCashPaymentForm.get('toDate').value, 'yyyy/MM/dd');

    this.SeachCashPaymentForm.get('fromDate').setValue(fromDate);
    this.SeachCashPaymentForm.get('toDate').setValue(toDate);

    console.log('Search Cash Recipt form :'+this.SeachCashPaymentForm.value);

    this.service.searchCashPayment(this.SeachCashPaymentForm.value).subscribe({
      next:(res) => {
        this.cashPaymentList = res; 
        console.log('search cash recipt :'+ res);
        this.SeachCashPaymentForm.get('fromDate').setValue(this.tempfdt);
        this.SeachCashPaymentForm.get('toDate').setValue(this.temptdt);
      },
      error:(err) => {
        this.myalert.warning('Unable to fetch Cash Recipt Records.','Something Wrong.');
      }
    })
  }

  loadrecipt(data:cashPayment){

    let newcreatDate = this.datePipe.transform(this.cashPaymentForm.get('dt').value, 'yyyy/MM/dd');
    this.cashPaymentForm.get('id').setValue(data.id);
    this.cashPaymentForm.get('dt').setValue(newcreatDate);
    this.cashPaymentForm.get('branchId').setValue(this.tempBranchId);
    this.cashPaymentForm.get('supplierId').setValue(data.supplierId);
    this.cashPaymentForm.get('cashAccId').setValue(data.accountId);
    this.cashPaymentForm.get('amount').setValue(data.amount);
    this.cashPaymentForm.get('particular').setValue(data.particular);

    this.tempCashId = data.id; 
    this.btnTitle = 'Update';
  }



}
