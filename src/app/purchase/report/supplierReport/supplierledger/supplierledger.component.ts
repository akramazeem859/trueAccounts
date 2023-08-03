import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/Models/customer.model';
import { customerLedger } from 'src/app/Models/customerLedger.model';
import { Supplier } from 'src/app/Models/supplier.model';
import { supplierLedger } from 'src/app/Models/supplierLedger.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserStoreService } from 'src/app/Services/user.store.service';

@Component({
  selector: 'app-supplierledger',
  templateUrl: './supplierledger.component.html',
  styleUrls: ['./supplierledger.component.css']
})
export class SupplierledgerComponent implements OnInit {

  supplierId = new FormControl('');
  options !: Supplier[];
  filteredOptions !: Observable<Supplier[]>;

  newform: FormGroup;
  supplierLedgerForm:FormGroup; 
  tempuserName : string;
  tempbranchId : string;

  tempsupplierId : string; 
  tempfromDate:string; 
  temptoDate: string; 
  
  /**
   *
   */
  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private myalert: ToastrService,
    private datePipe : DatePipe,
    private tokenservice: UserStoreService,
    private fb: FormBuilder ) {
    

      this.supplierLedgerForm = this.fb.group({
        supplierId: [],
        branchId : [this.tempbranchId, Validators.required],
        fromDate : [this.tempfromDate],
        toDate : [this.temptoDate],
      })


  }


  supplierList !: Supplier[];
  supplierLedgerList !: supplierLedger[];

  datasource : any;
  displayedColumns : string[] = ['Id','DateTime','Type','InvCode','Particular','Debit','Credit','Balance']
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  ngOnInit(): void { 

    this.tempbranchId = this.service.getbranchId();

    // this.tokenservice.getBrnchIdFromStore().subscribe(value => {
    //   let tempb = this.service.getBranchIdfromToken();
    //   this.tempbranchId = value || tempb;
    //   console.log('temp branch id :'+ this.tempbranchId);
    // })

    this.tokenservice.getNameFromStore().subscribe(value => {
      let tempuserName = this.service.getNamefromToken();
      this.tempuserName = value || tempuserName;
    })

    this.getAllsupplier();
    this.getSupplierLedger();

    this.filteredOptions = this.supplierLedgerForm.get('supplierId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );


  }

  private _filter(value: string , cus:Supplier[]): Supplier[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.supplierName.toLowerCase().includes(filterValue));
    }
    else{
      return cus;
    }
  }


  getAllsupplier() {
    
    this.service.getBranchSuppliers(this.tempbranchId).subscribe({
      next:(sup)=>{

        this.supplierList = sup;
        this.options = sup;
        console.log("Supplier List :" + this.supplierList);
      },
      error:(err)=>{
        this.myalert.warning('Unable to fetch Supplier' , 'Something Wrong');
      }
    })
  }

 

  getSupplierLedger(){
    this.service.getAllSupplierLedger().subscribe(cusL =>{
      this.supplierLedgerList = cusL;
      this.datasource = new MatTableDataSource<supplierLedger>(this.supplierLedgerList);
      this.datasource.paginator = this.paginator;
      console.log("All supplier Ledger :"+ this.supplierLedgerList);
    })
  }

  

  findSupplier(event) {
    var  supId ;
    this.service.getSupplier(supId)
      .subscribe(sup => {
        supId = sup;
      })
    console.log("find Supplier = " + supId);
  }

  public getSupName(supId : any){
    
    //return this.customerList.find(c => c.customerCode === cusId).customerName;
    if (this.supplierList && this.supplierList.length > 0) {
      const supplier = this.supplierList.find((item) => item.id === supId);
      if (supplier) {
        return supplier.supplierName;
      }
    }
    return '';
  }


  public searchRecord(){
  
    let fromDate = this.datePipe.transform(this.supplierLedgerForm.get('fromDate').value, 'yyyy/MM/dd');
    let toDate = this.datePipe.transform(this.supplierLedgerForm.get('toDate').value, 'yyyy/MM/dd');

    this.tempsupplierId = this.supplierLedgerForm.get('supplierId').value;
    this.tempfromDate = this.supplierLedgerForm.get('fromDate').value;;
    this.temptoDate = this.supplierLedgerForm.get('toDate').value;

    this.supplierLedgerForm.get('fromDate').setValue(''+fromDate);
    this.supplierLedgerForm.get('toDate').setValue(''+toDate);
    this.supplierLedgerForm.get('branchId').setValue(+this.tempbranchId);
    
    console.log(this.supplierLedgerForm.value);

    this.service.searchSupplierLedger(this.supplierLedgerForm.value).subscribe(res =>{
      console.log(res);
      this.supplierLedgerList = res;
      this.datasource = new MatTableDataSource<customerLedger>(this.supplierLedgerList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })

    this.supplierLedgerForm.reset({
        supplierId:this.tempsupplierId,
        fromDate:this.tempfromDate,
        toDate:this.temptoDate
    })
  }
  

}
