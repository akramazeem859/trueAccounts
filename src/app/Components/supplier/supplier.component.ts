import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch } from 'src/app/Models/branch.model';
import { Supplier } from 'src/app/Models/suppliet.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  @ViewChild('supplierForm',{static :  false}) supplierForm: NgForm

  
  suppliers$:Supplier[] = [];
  branches:Branch[] = [];

  isAddBtn : boolean = true;
  isEditBtn:boolean;
  isDeletBtn:boolean;
  supplierCount:number;

  supplierRequest: Supplier = {
    id:0,
    supplierCode: "",
    supplierName: "",
    supplierNumber: "",
    supplierAddress: "",
    supplierOpeningbalance: 0,
    supplierCurrentbalance: 0,
    supplierBranchId: 0,
    supplierBranch : {
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
constructor(private service: CompanyService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getAllBranches(); 
  }

  getAllSuppliers(){
    
    this.service.getAllSupplier().subscribe({
      next: (sup) => {
        this.suppliers$ = sup;
        console.log(sup);
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

  getSupplierById(id:any){
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isAddBtn = false;
    this.service.getSupplier(id).subscribe({
      next: (sup) => {
        this.supplierRequest = sup;
      }
    })
  }

  addSupplier(){
   /* this.service.getSupplierCount().subscribe({
      next: (count) =>{
        this.supplierCount = count + 1;
        console.log(this.supplierCount);
      }
    });
    this.supplierRequest.supplierCode = "sup-" + this.supplierCount.toString();
    */
    this.service.addSupplier(this.supplierRequest).subscribe({
      next: (cus) => {
        console.log("add funtion called");
        this.supplierForm.reset();
        this.getAllSuppliers();
      }
    })
  }

  getCustomerById(id: any){
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isAddBtn = false;
    this.service.getSupplier(id).subscribe({
      next: (sup) => {
        this.supplierRequest = sup;
      }
    })
  }

  editSupplier(){
    if(confirm("Are you sure to edit this record?"))
    this.service.editSupplier(this.supplierRequest.id, this.supplierRequest).subscribe({
      next: (cus) => {
        this.getAllSuppliers();
        this.supplierForm.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }


  deleteSupplier(id:number){
    if(confirm("Are you sure to Delete this record?"))
    this.service.deleteSupplier(id).subscribe({
      next: (prod) => {
          this.getAllSuppliers();
          this.supplierForm.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }


}
