import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ROUTES } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Models/branch.model';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branch : Branch[] = [];
  companyList : Company[] = [];
  btnTitle : String = 'Save'; 
  tempBranchId: any = 0;

  branchform : FormGroup;
  
  constructor(
    private companyservice: CompanyService ,
    private router: Router,
    private fb: FormBuilder,
    private myalert:ToastrService) {

   }

  ngOnInit(): void {

   
    this.getAllbranches();

    this.companyservice.getAllCompanies()
    .subscribe({
      next:(res) => {
        this.companyList = res;
      },
      error:(err)=> {
        this.myalert.warning('Something Wrong.','Error');
      }
    })

    this.branchform = this.fb.group({
      id: [],
      branchName : ['',Validators.required],
      supervisor :['',Validators.required],
      contactNumber :['',Validators.required],
      uan:['',Validators.required],
      address:['',Validators.required],
      status:[true],
      companyId :['',Validators.required],
      
    })

  }

  getAllbranches(){
    this.companyservice.getAllBranches()
    .subscribe(brc => {
      this.branch = brc;
    })
  }

  submit(){
    if(this.tempBranchId == 0){
      this.companyservice.addBranch(this.branchform.value).subscribe({
        next:(res)=>{
          this.myalert.success('New Record Enter Successfully.','Success');
          this.branchform.reset();
          this.getAllbranches();
        },
        error:(err)=>{
          this.myalert.warning('Something Wrong', 'Error')
        }
      })
        console.log(this.branchform.value);
    }
    else{
      this.branchform.get('id').setValue(this.tempBranchId);
      this.companyservice.addBranch(this.branchform.value).subscribe({
        next:(res)=>{
          this.myalert.success('Record updated Successfully.','Success');
          this.branchform.reset();
          this.getAllbranches();
          this.btnTitle = 'Save';
        },
        error:(err)=>{
          this.myalert.warning('Something Wrong', 'Error')
        }
      })
        console.log(this.branchform.value);
        this.tempBranchId = 0;
    }
  }
  

  LoadBranch(brch: Branch){
    this.branchform.patchValue(brch);
    this.btnTitle = 'Edit';
    this.tempBranchId = brch.id; 
  }

  

}
