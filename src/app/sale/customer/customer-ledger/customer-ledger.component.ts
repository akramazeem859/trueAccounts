import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { Branch } from 'src/app/Models/branch.model';
import { Customer } from 'src/app/Models/customer.model';
import { customerLedger } from 'src/app/Models/customerLedger.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserStoreService } from 'src/app/Services/user.store.service';

@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.css']
})
export class CustomerLedgerComponent implements OnInit {

  customerId = new FormControl('');
  options !: Customer[];
  filteredOptions !: Observable<Customer[]>;

  branchId = new FormControl('');
  optionsbranch !: Branch[];
  filteredbranchOptions !: Observable<Branch[]>;

  newform: FormGroup;
  customerLedgerForm:FormGroup; 
  tempuserName : string;
  tempbranchId : string;
  

  

  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private myalert: ToastrService,
    private datePipe : DatePipe,
    private tokenservice: UserStoreService,
    private fb: FormBuilder ) {

  }

  customerList !: Customer[];
  customerLedgerList !: customerLedger[];

  datasource : any;
  displayedColumns : string[] = ['Id','DateTime','Type','InvCode','Particular','Credit','Debit','Balance']
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

 
  
 
  ngOnInit(): void { 

    this.tokenservice.getBrnchIdFromStore().subscribe(value => {
      let tempb = this.service.getBranchIdfromToken();
      this.tempbranchId = value || tempb;
      console.log('temp branch id :'+ this.tempbranchId);
    })

    this.tokenservice.getNameFromStore().subscribe(value => {
      let tempuserName = this.service.getNamefromToken();
      this.tempuserName = value || tempuserName;
    })

    this.getAllCustomer();
    this.getCustomerLedger();

    

    this.customerLedgerForm = this.fb.group({
      customerId: [],
      branchId : [this.branchId, Validators.required],
      fromDate : [''],
      toDate : [''],
    })

    this.filteredOptions = this.customerLedgerForm.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
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

 

  getAllCustomer() {
    
    this.service.getAllCustomers().subscribe({
      next:(cus)=>{

        this.customerList = cus;
        this.options = cus;
        console.log("Customer List :" + this.customerList);
      },
      error:(err)=>{
        this.myalert.warning('Unable to fetch Customers' , 'Something Wrong');
      }
    })
  }

 

  getCustomerLedger(){
    this.service.getAllCustomerLedger().subscribe(cusL =>{
      this.customerLedgerList = cusL;
      this.datasource = new MatTableDataSource<customerLedger>(this.customerLedgerList);
      this.datasource.paginator = this.paginator;
      console.log("All customer Ledger :"+ this.customerLedgerList);
    })
  }

  

  findCustomer(event) {
    var  cusId ;
    this.service.getCustomer(cusId)
      .subscribe(cus => {
        cusId = cus;
      })
    console.log("find Customer = " + cusId);
  }

  public getCusName(cusId : any){
    
    //return this.customerList.find(c => c.customerCode === cusId).customerName;
    if (this.customerList && this.customerList.length > 0) {
      const customer = this.customerList.find((item) => item.id === cusId);
      if (customer) {
        return customer.customerName;
      }
    }
    return '';
  }


  public searchRecord(){
  debugger;
    let fromDate = this.datePipe.transform(this.customerLedgerForm.get('fromDate').value, 'yyyy/MM/dd');
    let toDate = this.datePipe.transform(this.customerLedgerForm.get('toDate').value, 'yyyy/MM/dd');
    this.customerLedgerForm.get('fromDate').setValue(''+fromDate);
    this.customerLedgerForm.get('toDate').setValue(''+toDate);

    console.log('temp branch Id............'+this.tempbranchId);
    this.customerLedgerForm.get('branchId').setValue(+this.tempbranchId);
    
    console.log(this.customerLedgerForm.value);

    this.service.searchCustomerLedger(this.customerLedgerForm.value).subscribe(res =>{
      console.log(res);
      this.customerLedgerList = res;
      this.datasource = new MatTableDataSource<customerLedger>(this.customerLedgerList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }
  
}
