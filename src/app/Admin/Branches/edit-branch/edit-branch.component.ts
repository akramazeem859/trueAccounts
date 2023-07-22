import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/Models/branch.model';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  companies: Company[] = [];
  branchform: FormGroup;
  tempbranchId:any;
  tempbranch: Branch; 
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private companyService: CompanyService,
    private fb:FormBuilder) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.tempbranchId = param.get('id');
      }
    })

    
    this.companyService.getBranch(this.tempbranchId)
      .subscribe( res =>{
        this.tempbranch = res;
        this.branchform.get('branchName').setValue(this.tempbranch.branchName); 
        this.branchform.get('supervisor').setValue(this.tempbranch.supervisor); 
        this.branchform.get('contactNumber').setValue(this.tempbranch.contactNumber); 
        this.branchform.get('companyId').setValue(this.tempbranch.companyId);
        this.branchform.get('status').setValue(this.tempbranch.status); 
        this.branchform.get('uan').setValue(this.tempbranch.uan); 
        this.branchform.get('address').setValue(this.tempbranch.address);  

        
    })
    
     
    this.companyService.getAllCompanies()
      .subscribe(comp => {
        this.companies = comp;
    });

    
    this.branchform = this.fb.group({
      id :[this.tempbranchId],
      branchName :['',Validators.required],
      supervisor:['',Validators.required],
      contactNumber:['',Validators.required],
      companyId:['',Validators.required],
      status:[true],
      uan:[''],
      address:['',Validators.required],
    })
     
  }

 
 

  updateBranch() {
    console.log(this.branchform.value);
   

    this.companyService.editBranch(this.tempbranchId, this.branchform.value)
      .subscribe({
        next: (Response) => {
          this.router.navigate(['admin/branches'])
        }
      })
  }

  deleteBranch(id: number) {
    if (confirm("Are you sure to delete this record?"))
      this.companyService.deletBranch(id).subscribe({
        next: (Response) => {
          this.router.navigate(['admin/branches']);
        }
      })
  }


}
