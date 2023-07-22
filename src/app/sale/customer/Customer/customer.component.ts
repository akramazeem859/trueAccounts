import { Component, OnInit, ViewChild } from '@angular/core';
import { Branch } from 'src/app/Models/branch.model';
import { Customer } from 'src/app/Models/customer.model';
import { CompanyService } from 'src/app/Services/company.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  @ViewChild('addCustomerForm',{static :  false}) addCustomerForm: NgForm

  isAddBtn : boolean = true;
  isEditBtn:boolean;
  isDeletBtn:boolean;
  customerCount:number = 0 ;

  customers$:Customer[] = [];
  branches:Branch[] = [];

  customerRequest : Customer ;
  /**
   *
   */

  constructor(private service: CompanyService) { }

  ngOnInit():void{

  this.getAllCustomers();
  this.getAllBranches();
 
  }

  getAllCustomers(){
    this.service.getAllCustomers().subscribe({
      next: (cus) => {
        this.customers$ = cus;
        console.log(cus);
      }
    })
  }

  getAllBranches(){
    this.service.getAllBranches().subscribe({
      next: (branch) => {
        this.branches = branch;
      }
    })
  }

  addCustomer(){
    /*this.service.getCustomerCount().subscribe({
      next: (count) =>{
        this.customerCount = count + 1;
        console.log(this.customerCount);
      }
    });
    this.customerRequest.customerCode = "cus-" + this.customerCount.toString();*/
    console.log(this.customerRequest);
   this.service.addCustomer(this.customerRequest).subscribe({
      next: (cus) => {
        console.log("add funtion called");
        this.addCustomerForm.reset();
        this.getAllCustomers();
      }
    })
    
  }

  getCustomerById(id: any){
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isAddBtn = false;
    this.service.getCustomer(id).subscribe({
      next: (cus) => {
        this.customerRequest = cus;
      }
    })
  }

  editCustomer(){
    if(confirm("Are you sure to edit this record?"))
    this.service.editCustomer(this.customerRequest.id, this.customerRequest).subscribe({
      next: (cus) => {
        this.getAllCustomers();
        this.addCustomerForm.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }
  deleteCustomer(id:any){
    if(confirm("Are you sure to Delete this record?"))
    this.service.deleteCustomer(id).subscribe({
      next: (prod) => {
          this.getAllCustomers();
          this.addCustomerForm.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }
}
