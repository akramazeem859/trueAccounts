import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { cashRecipt } from 'src/app/Models/cashRecipt.model';
import { Customer } from 'src/app/Models/customer.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'cash-recipt',
  templateUrl: './cash-recipt.component.html',
  styleUrls: ['./cash-recipt.component.css']
})
export class CashReciptComponent implements OnInit {

cashReciptForm : FormGroup;
SeachCashReciptForm: FormGroup; 

customerList: Customer[];
customerList2: Customer[];
tempCustomer: Customer;
tempBranchId: any;
accountList : cashAccount[];
cashReciptList: cashRecipt[];

options !: Customer[];
filteredOptions !: Observable<Customer[]>;

options2 !: cashAccount[];
filteredOptions2 !: Observable<cashAccount[]>;

options3 !: Customer[];
filteredOptions3 !: Observable<Customer[]>;

  
tempdt : any;
tempfdt : any;
temptdt : any;
tempCusId : number; 
tempCashId: number = 0;
btnTitle : string = 'Save Record';

  constructor(private service:CompanyService,
    private myalert:ToastrService,
    private fb:FormBuilder,
    private datePipe : DatePipe) { 
      
      this.cashReciptForm = this.fb.group({
        id:[],
        dt:[],
        amount:[,Validators.required],
        cashAccId:[,Validators.required],
        customerId:[,Validators.required],
        particular:[],
        branchId:[this.tempBranchId]
      })

      this.SeachCashReciptForm = this.fb.group({
        customerId:[],
        fromDate:[],
        toDate:[]
      })


  }

  ngOnInit(): void {
    this.tempBranchId = this.service.getbranchId();
    console.log('tempbranchId...:'+ this.tempBranchId);


    this.service.getBranchCustomers(this.tempBranchId).subscribe({
      next:(res)=>{
        this.customerList = res;
        this.options = res; 
        this.customerList2 = res; 
        this.options3 = res; 
        console.log('Customers of branch'+this.options3);
      },
      error:(err)=>{
        this.myalert.warning('Unable to fetch customers','Something wrong.')
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

    this.filteredOptions = this.cashReciptForm.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredOptions2 = this.cashReciptForm.get('cashAccId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter2(name as string, this.options2):this.options2
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredOptions3 = this.SeachCashReciptForm.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter3(name as string, this.options3):this.options3
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );



  }

  private _filter(value: string , cus:Customer[]): Customer[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.customerName.toLowerCase().includes(filterValue));
    }
    else{
      return cus;
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

  private _filter3(value: string , cus2:Customer[]): Customer[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options3.filter(option => option.customerName.toLowerCase().includes(filterValue));
    }
    else{
      return cus2;
    }
  }

  submit(){
    
    let creatDate = this.datePipe.transform(this.cashReciptForm.get('dt').value, 'yyyy/MM/dd');
    this.tempdt = this.cashReciptForm.get('dt').value; 
    this.cashReciptForm.get('id').setValue(this.tempCashId);
    this.cashReciptForm.get('dt').setValue(creatDate);
    this.cashReciptForm.get('branchId').setValue(this.tempBranchId);

    console.log(this.cashReciptForm.value);

    this.service.addCashRecipt(this.cashReciptForm.value).subscribe({
      next:(res)=>{
        this.myalert.success('Record Saved Successfully', 'Done!');
        this.cashReciptForm.reset(); 
        this.tempCashId = 0; 
        this.btnTitle = 'Save Record';
      },
      error:(err)=>{
        this.myalert.warning('Unable to save Record', 'Something Wrong.');
      }
    })
  }

  getcustomer(cusId:any){
    if (this.customerList && this.customerList.length > 0) {
      const cus = this.customerList.find((item) => item.id === cusId);
      if (cus) {
        return cus.customerName;
      }
    }
    return '';
  }

  getcustomer2(cusId:any){
    if (this.customerList && this.customerList.length > 0) {
      const cus = this.customerList.find((item) => item.id === cusId);
      if (cus) {
        return cus.customerName;
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

  seachCashRecipt(){

    this.tempfdt = this.SeachCashReciptForm.get('fromDate').value;
    this.temptdt = this.SeachCashReciptForm.get('toDate').value;

    let fromDate = this.datePipe.transform(this.SeachCashReciptForm.get('fromDate').value, 'yyyy/MM/dd');
    let toDate = this.datePipe.transform(this.SeachCashReciptForm.get('toDate').value, 'yyyy/MM/dd');

    this.SeachCashReciptForm.get('fromDate').setValue(fromDate);
    this.SeachCashReciptForm.get('toDate').setValue(toDate);

    console.log('Search Cash Recipt form :'+this.SeachCashReciptForm.value);

    this.service.searchCashRecipt(this.SeachCashReciptForm.value).subscribe({
      next:(res) => {
        this.cashReciptList = res; 
        console.log('search cash recipt :'+ res);
        this.SeachCashReciptForm.get('fromDate').setValue(this.tempfdt);
        this.SeachCashReciptForm.get('toDate').setValue(this.temptdt);
      },
      error:(err) => {
        this.myalert.warning('Unable to fetch Cash Recipt Records.','Something Wrong.');
      }
    })
  }

  loadrecipt(data:cashRecipt){

    let newcreatDate = this.datePipe.transform(this.cashReciptForm.get('dt').value, 'yyyy/MM/dd');
    this.cashReciptForm.get('id').setValue(data.id);
    this.cashReciptForm.get('dt').setValue(newcreatDate);
    this.cashReciptForm.get('branchId').setValue(this.tempBranchId);
    this.cashReciptForm.get('customerId').setValue(data.customerId);
    this.cashReciptForm.get('cashAccId').setValue(data.accountId);
    this.cashReciptForm.get('amount').setValue(data.amount);
    this.cashReciptForm.get('particular').setValue(data.particular);

    this.tempCashId = data.id; 
    this.btnTitle = 'Update';
  }

}
