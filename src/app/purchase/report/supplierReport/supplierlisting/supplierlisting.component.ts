import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Models/branch.model';
import { Supplier } from 'src/app/Models/supplier.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplierlisting.component.html',
  styleUrls: ['./supplierlisting.component.css']
})
export class SupplierlistingComponent implements OnInit {

  
  supplierform : FormGroup;

  supplierList : Supplier[] = [];
  branches:Branch[] = [];

  tempSupplier: Supplier;
  btnTitle:string = 'Add Supplier';

  isAddBtn : boolean = true;
  isEditBtn:boolean;
  isDeletBtn:boolean;
  supplierCount:number;

/**
 *
 */
constructor(private service: CompanyService,
  private fb:FormBuilder,
  private myaler:ToastrService) {

  this.supplierform = this.fb.group({
    Id:[0],
    supplierName:['',Validators.required],
    supplierNumber: ['',Validators.required],
    supplierAddress:['',Validators.required],
    supplierBranchId:[,Validators.required],
    supplierOpeningbalance: [,Validators.required],
    supplierCurrentbalance: [,Validators.required],
    supplierStatus:[true,Validators.required],

  })
}

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getAllBranches(); 
  }

  getAllSuppliers(){
    
    this.service.getAllSupplier().subscribe({
      next: (sup) => {
        this.supplierList = sup;
        console.log('Supplier List'+sup);
      },
      error:(err)=>{
        console.log('unable to fetch suppliers list.');
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

  LoadSupplier(sup:Supplier){
    this.btnTitle = 'Update Supplier'
    this.tempSupplier = sup;
    this.supplierform.patchValue(sup);
    this.supplierform.get('Id').setValue(this.tempSupplier.id);
    this.isDeletBtn = true;
  }

  addSupplier(){
    console.log("supplier form : " + this.supplierform.value);

    if(this.tempSupplier == null){
      this.supplierform.get('Id').setValue(0);
      this.service.addSupplier(this.supplierform.value).subscribe({
        next: (cus) => {
          console.log("add funtion called");
          this.myaler.success('New supplier added successfully','Done')
          this.supplierform.reset();
          this.getAllSuppliers();
          this.tempSupplier = null; 
        },
        error:(err)=> {
          this.myaler.warning('Unable to add new supplier','Something Wrong.')
        }
      })
   }
   else{
     this.editSupplier(); 
   }

  }

  editSupplier(){
    if(confirm("Are you sure to edit this record?"))
    //this.supplierform.get('Id').setValue(this.tempSupplier.supplierCode);
    this.service.editSupplier(this.tempSupplier.id, this.supplierform.value).subscribe({
      next: (cus) => {
        this.getAllSuppliers();
        this.supplierform.reset();
        this.myaler.success('Supplier record updated successfully', 'Done');
        this.btnTitle = 'Add Supplier';
      }
    })
   
    this.isDeletBtn = false;
  }


  deleteSupplier(id:number){
    if(confirm("Are you sure to Delete this record?"))
    this.service.deleteSupplier(id).subscribe({
      next: (prod) => {
          this.getAllSuppliers();
          this.supplierform.reset();
      }
    })
    this.isEditBtn = false;
    this.isDeletBtn = false;
    this.isAddBtn = true;
  }


}
