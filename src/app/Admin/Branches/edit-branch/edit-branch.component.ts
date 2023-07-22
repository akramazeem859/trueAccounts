import { Component, OnInit } from '@angular/core';
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

  branchEditRequest: Branch = {
    id: 0,
    branchName: '',
    supervisor: '',
    contactNumber: '',
    companyId: 0,
    company: {
      id: 0,
      name: ''
    },
    uan: '',
    address: '',
    status: false
  }

  companies: Company[] = [];
  
  constructor(private router: Router, private route: ActivatedRoute, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        console.log("id is = "+ id);

        if(id){
          this.companyService.getBranch(id)
            .subscribe({
              next: (brch) =>  {
                  this.branchEditRequest = brch;
                  console.log(brch);
                }
                    })
              }
        }
    })

    this.companyService.getAllCompanies()
    .subscribe(comp => {
        this.companies = comp;
         console.log("company",this.companies);
      });

  }

  updateBranch(){
    this.companyService.editBranch(this.branchEditRequest.id,this.branchEditRequest)
    .subscribe({
      next: (Response) => {
        this.router.navigate(['branches'])
      }
    })
  }

  deleteBranch(id:number){
    if(confirm("Are you sure to delete this record?"))
    this.companyService.deletBranch(id).subscribe({
      next: (Response) => {
        this.router.navigate(['branches']);
      }
    })
  }


}
