import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from 'src/app/Models/branch.model';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  branchRequest: Branch ={
    id: 0,
    branchName: '',
    supervisor: '',
    contactNumber: '',
    companyId: 0,
    company: {
      id: 0,
      name:''
    }
  }

  companies: Company[] = [];
  
  constructor(public comapanyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.comapanyService.getAllCompanies()
    .subscribe(comp => {
        this.companies = comp;
         console.log("company",this.companies);
      });


  }

  addBranch(): void{
   
   this.comapanyService.addBranch(this.branchRequest)
    .subscribe({
      next: (branch) => {
        this.router.navigate(['branches'])
      }
    })
    
  }

}
