import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Models/branch.model';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  branchRequest: Branch ;
  branchform: FormGroup;

  companies: Company[] = [];
  
  constructor(
    public comapanyService: CompanyService, 
    private router: Router,
    private fb:FormBuilder,
    private alert:ToastrService) { }

  ngOnInit(): void {

    this.branchform = this.fb.group({
      branchName :['',Validators.required],
      supervisor:['',Validators.required],
      contactNumber:['',Validators.required],
      companyId:['',Validators.required],
      status:[''],
      uan:['',Validators.required],
      address:['',Validators.required],
    })

    this.comapanyService.getAllCompanies()
    .subscribe(comp => {
        this.companies = comp;
         console.log("company",this.companies);
      });


  }

  addBranch(): void{
   console.log(this.branchform.value);
   let statusValue = this.branchform.get
   this.branchform.get('status').setValue(true);
   this.comapanyService.addBranch(this.branchform.value)
    .subscribe({
      next: (branch) => {
        this.router.navigate(['branches']);
        this.alert.success('New Branch added successfully.','Successful');
        this.branchform.reset(); 
      },
      error:(err) =>{
        this.alert.warning("Something wrong",'Error')
      }
    })
    
  }

}
