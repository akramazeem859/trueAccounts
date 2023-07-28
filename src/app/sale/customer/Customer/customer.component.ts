import { Component, OnInit, ViewChild } from '@angular/core';
import { Branch } from 'src/app/Models/branch.model';
import { Customer } from 'src/app/Models/customer.model';
import { CompanyService } from 'src/app/Services/company.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('addCustomerForm', { static: false }) addCustomerForm: NgForm

  isAddBtn: boolean = true;
  isEditBtn: boolean;
  isDeletBtn: boolean;
  customerCount: number = 0;
  tempcustomer:Customer;

  customers$: Customer[] = [];
  branches: Branch[] = [];

  customerRequest: Customer;
  customerform: FormGroup;
  /**
   *
   */

  constructor(private service: CompanyService, private fb: FormBuilder) {

    this.customerform = this.fb.group({
      id:[],
      customerName: ['', Validators.required],
      customerNumber: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerBranchId: [],
      customerOpeningbalance: [],
      customerCurrentbalance: []

    })

  }

  ngOnInit(): void {

    this.getAllCustomers();
    this.getAllBranches();

  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe({
      next: (cus) => {
        this.customers$ = cus;
        console.log(cus);
      }
    })
  }

  getAllBranches() {
    this.service.getAllBranches().subscribe({
      next: (branch) => {
        this.branches = branch;
      }
    })
  }

  addCustomer() {
    /*this.service.getCustomerCount().subscribe({
      next: (count) =>{
        this.customerCount = count + 1;
        console.log(this.customerCount);
      }
    });
    this.customerRequest.customerCode = "cus-" + this.customerCount.toString();*/
    console.log(this.customerform.value);
    if (this.customerform.valid) {
      this.service.addCustomer(this.customerform.value).subscribe({
        next: (cus) => {
          console.log("add funtion called");
          this.customerform.reset();
          this.getAllCustomers();
        },
        error:(err)=>{
          console.log("fail to add customer");
        }
      })
    }
  }

  getCustomerById(cus:Customer) {
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isAddBtn = false;
    this.service.getCustomer(cus.id).subscribe({
      next: (cus) => {
        this.customerform.patchValue(cus);
        this.tempcustomer = cus;
      }
    })
    
  }

  editCustomer() {
    if (confirm("Are you sure to edit this record?"))
     this.customerform.get('id').setValue(this.tempcustomer.id);

     console.log()
      this.service.editCustomer(this.customerform.value).subscribe({
        next: (cus) => {
          this.getAllCustomers();
          this.customerform.reset();
        }
      })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }


  deleteCustomer(id: any) {
    if (confirm("Are you sure to Delete this record?"))
      this.service.deleteCustomer(id).subscribe({
        next: (prod) => {
          this.getAllCustomers();
          this.customerform.reset();
        }
      })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }
}
