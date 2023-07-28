import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { level4 } from 'src/app/Models/COA/level4.model';
import { Customer } from 'src/app/Models/customer.model';
import { customerLedger } from 'src/app/Models/customerLedger.model';
import { ledgerResult } from 'src/app/Models/ledgerResult.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserStoreService } from 'src/app/Services/user.store.service';

@Component({
  selector: 'app-all-ledger',
  templateUrl: './all-ledger.component.html',
  styleUrls: ['./all-ledger.component.css']
})
export class AllLedgerComponent implements OnInit {

  customerId = new FormControl('');
  options !: level4[];
  filteredOptions !: Observable<level4[]>;

  newform: FormGroup;
  LedgerForm:FormGroup; 
  tempuserName : string;
  tempbranchId : string;

  tempaccountCoa : string; 
  tempfromDate:string; 
  temptoDate: string; 

  
  constructor(
    private router: Router,
    private service: CompanyService,
    private myalert: ToastrService,
    private datePipe : DatePipe,
    private fb: FormBuilder 
  ) {

    this.LedgerForm = this.fb.group({
      accountCoa: [],
      branchId : [this.tempbranchId, Validators.required],
      fromDate : [this.tempfromDate],
      toDate : [this.temptoDate],
    })

  }

  level4List !: level4[];
  level4LedgerList !: ledgerResult[];

  datasource : any;
  displayedColumns : string[] = ['Id','DateTime','Type','InvCode','Particular','Debit','Credit','Balance']
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void { 

    this.tempbranchId = this.service.getbranchId();
    
    this.getAllLevl4();
   
    this.filteredOptions = this.LedgerForm.get('accountCoa').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );
  }


  private _filter(value: string , lvl4:level4[]): level4[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    else{
      return lvl4;
    }
  }

 

  getAllLevl4() {
    console.log("branchId :" + this.tempbranchId);
    
    this.service.geBranchLvl4(this.tempbranchId).subscribe({

      next:(lvl4)=>{
        console.log("level4 List :" + lvl4);
        this.level4List = lvl4;
        this.options = lvl4;
        
      },
      error:(err)=>{
        this.myalert.warning('Unable to fetch Level4 accounts' , 'Something Wrong');
      }
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

  public getlvl4account(lvl4Id : any){

    //return this.customerList.find(c => c.customerCode === cusId).customerName;
    if (this.level4List && this.level4List.length > 0) {
      const lvl4 = this.level4List.find((item) => item.code === lvl4Id);
      if (lvl4) {
        return lvl4.name;
      }
    }
    return '';
  }


  public searchRecord(){
    
    let fromDate = this.datePipe.transform(this.LedgerForm.get('fromDate').value, 'yyyy/MM/dd');
    let toDate = this.datePipe.transform(this.LedgerForm.get('toDate').value, 'yyyy/MM/dd');
    
   
    

    this.tempaccountCoa = this.LedgerForm.get('accountCoa').value;
    this.tempfromDate = this.LedgerForm.get('fromDate').value;;
    this.temptoDate = this.LedgerForm.get('toDate').value;

    console.log('coaaccount :'+ this.tempaccountCoa + 'fromdate : '+ this.tempfromDate);

    this.LedgerForm.get('branchId').setValue(+this.tempbranchId);
    this.LedgerForm.get('fromDate').setValue(''+fromDate);
    this.LedgerForm.get('toDate').setValue(''+toDate);

   
    

    console.log(this.LedgerForm.value);

    

    this.service.searchLvl4Ledger(this.LedgerForm.value).subscribe(res =>{
      console.log(res);
      this.level4LedgerList = res;
     
      this.datasource = new MatTableDataSource<customerLedger>(this.level4LedgerList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

      this.LedgerForm.reset({
        accountCoa:this.tempaccountCoa,
        fromDate:this.tempfromDate,
        toDate:this.temptoDate
      })

    })

    //this.LedgerForm.patchValue(tempformValue);
    //this.LedgerForm.get('fromDate').setValue(this.tempfromDate);
    //this.LedgerForm.get('toDate').setValue(this.temptoDate);
  
  }


}
