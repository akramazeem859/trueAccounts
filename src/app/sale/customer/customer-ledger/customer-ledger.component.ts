import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private alert: ToastrService,
    private datePipe : DatePipe) {

  }
  customerList !: Customer[];
  branchList !: Branch[];
  customerLedgerList !: customerLedger[];
  datasource : any;
  displayedColumns : string[] = ['Id','DateTime','Type','InvCode','Particular','Credit','Debit','Balance']
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public customerLedgerForm = new FormGroup({
    customerId: this.builder.control(null),
    branchId : this.builder.control(null),
    fromDate : new FormControl(),
    toDate : new FormControl(),
  })

  
 
  ngOnInit(): void { 

    this.getAllCustomer();
    this.getAllBranch(); 
    this.getCustomerLedger();

    this.filteredOptions = this.customerLedgerForm.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredbranchOptions = this.customerLedgerForm.get('branchId').valueChanges.pipe(
      startWith(''),
      map(valueb => {
        const nameb = valueb;
        return nameb ?this._filterBranch(nameb as string, this.optionsbranch):this.optionsbranch
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

  private _filterBranch(value: string , brch:Branch[]): Branch[] {
    if(typeof value === 'string'){
      const filterbValue = value.toLowerCase();
      return this.optionsbranch.filter(option => option.branchName.toLowerCase().includes(filterbValue));
    }
    else{
      return brch;
    }
    
  }

  

  getAllCustomer() {
    this.service.getAllCustomers().subscribe(cus => {
      this.customerList = cus;
      this.options = cus;
      console.log("Customer List :" + this.customerList);
    })
  }

  getAllBranch(){
    this.service.getAllBranches().subscribe(brch =>{
      this.branchList = brch;
      this.optionsbranch = brch; 
      console.log("Branch List :" + this.branchList[0].branchName);
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
    return this.customerList.find(c => c.customerCode === cusId).customerName;
  }

  public getBranchName(brchId : any){
    return this.branchList.find(c => c.id === brchId).branchName;
  }
  public searchRecord(){
  
    let fromDate = this.datePipe.transform(this.customerLedgerForm.get('fromDate').value, 'MM/dd/yyyy');
    let toDate = this.datePipe.transform(this.customerLedgerForm.get('toDate').value, 'MM/dd/yyyy');
    this.customerLedgerForm.get('fromDate').setValue(fromDate);
    this.customerLedgerForm.get('toDate').setValue(toDate);


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
