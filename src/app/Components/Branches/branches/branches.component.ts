import { Component, OnInit } from '@angular/core';
import { Router, ROUTES } from '@angular/router';
import { Branch } from 'src/app/Models/branch.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branch : Branch[] = [];
  
  constructor(private companyservice: CompanyService , private router: Router) {

   }

  ngOnInit(): void {
    this.companyservice.getAllBranches()
    .subscribe(brc => {
      this.branch = brc;
      console.log(this.branch);
    })
  }

}
