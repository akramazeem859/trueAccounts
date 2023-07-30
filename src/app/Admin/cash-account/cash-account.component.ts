import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Models/branch.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-cash-account',
  templateUrl: './cash-account.component.html',
  styleUrls: ['./cash-account.component.css']
})
export class CashAccountComponent implements OnInit {

  cashAccount: cashAccount [] = [];
  branches : Branch[] = [];
  tempAccount: cashAccount;

  btntitle : string = 'Add Record';
  isDeletBtn:boolean;
  
  cashAccountForm : FormGroup;

  constructor(private services:CompanyService,
    private fb:FormBuilder,
    private myalert:ToastrService) {
    
      this.cashAccountForm = this.fb.group({
        accountTitle:['',Validators.required],
        accountBranchId:[,Validators.required],
        accountType:['',Validators.required],
        accountStatus: [true]
      })
  }

  ngOnInit(): void {
    this.getAllBranches();
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.services.getAllAccounts().subscribe({
      next: (account) => {
        this.cashAccount = account;
        console.log(this.cashAccount);
      }
    })
  }
  getAllBranches(){
    this.services.getAllBranches().subscribe({
      next: (branch) => {
        this.branches = branch;
      }
    })
  }


  addCashAccount(){
    debugger;
    if(this.tempAccount == null){
      console.log('account form value :'+ this.cashAccountForm.value);
      this.services.addAccount(this.cashAccountForm.value).subscribe({
        next: (res)=>{
          console.log('result for success account add:'+ res);
          this.myalert.success('New Cash Account Added Successfully.','Successful');
          this.cashAccountForm.reset(); 
          this.btntitle = 'Add Record'
          this.getAllAccounts();
        },
        error:(err)=>{
          this.myalert.warning('Unable to add new record','Something Wrong')
        }
      })
   }
   else{
     this.editAccount();
   }
  }

  selectAccount(acc:cashAccount){
  
    this.isDeletBtn = true;
    
    this.cashAccountForm.patchValue(acc);
    this.tempAccount = acc; 
    this.btntitle = 'Update Record';

  }

  editAccount(){
    if(confirm("Are you sure to edit this record?"))
    this.services.editCashAccount(this.tempAccount.id, this.cashAccountForm.value).subscribe({
      next: (cus) => {
        this.getAllAccounts();
        this.cashAccountForm.reset();
      }
    })
   
    this.isDeletBtn = false;
   
  }

  deleteAccount(){
    this.services.deleteCashAccount(this.tempAccount.id).subscribe({
      next:(res)=>{
        console.log('delete account : '+ res);
        this.myalert.success('Account has been removed successfully','Successfull');
        this.cashAccountForm.reset();
        this.btntitle = 'Add Record';
        this.getAllAccounts(); 
      }
    })
  }
}
