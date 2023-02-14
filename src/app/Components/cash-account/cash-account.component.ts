import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch } from 'src/app/Models/branch.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-cash-account',
  templateUrl: './cash-account.component.html',
  styleUrls: ['./cash-account.component.css']
})
export class CashAccountComponent implements OnInit {

  @ViewChild('cashAccountForm',{static :  false}) cashAccountForm: NgForm

  cashAccount$ : cashAccount [] = [];
  branches : Branch[] = [];

  isAddBtn : boolean = true;
  isEditBtn:boolean;
  isDeletBtn:boolean;
  

  cashAccountRequest : cashAccount = {
    id:0,
    accountCode: "",
    accountTitle: "",
    accountType: "",
    accountBalance: 0,
    accountBranchId : 0,
    accountBranch:{
      id: 0,
      branchName:"",
      supervisor:"",
      contactNumber:"",
      companyId:0,
      company:{
        id: 0,
        name:""
    }
  }

  }
  /**
   *
   */
  constructor(private services:CompanyService) {
    
  }

  ngOnInit(): void {
    this.getAllBranches();
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.services.getAllAccounts().subscribe({
      next: (account) => {
        this.cashAccount$ = account;
        console.log(this.cashAccount$);
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
    this.services.addAccount(this.cashAccountRequest).subscribe({
      next: (account)=>{
        console.log("Add function called");
      }
    })
  }

  selectAccount(id:any){
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isAddBtn = false;
    this.services.getAccount(id).subscribe({
      next: (acc) =>{
        this.cashAccountRequest = acc;
        console.log("account find....");
      }
    })
  }

  editAccount(){
    if(confirm("Are you sure to edit this record?"))
    this.services.editCashAccount(this.cashAccountRequest.id, this.cashAccountRequest).subscribe({
      next: (cus) => {
        this.getAllAccounts();
        this.cashAccountForm.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }

  deleteAccount(id:any){}
}
