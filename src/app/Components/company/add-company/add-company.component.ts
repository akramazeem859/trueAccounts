import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  companyRequest : Company = {
    id : 0 ,
    name : ''
  }
  constructor(private companyService : CompanyService , private router: Router) { }

  ngOnInit(): void {
  }
  addCompany(){
    this.companyService.addCompany(this.companyRequest)
    .subscribe({
      next: (company) => {
        this.router.navigate(['Company'])
      }
    })
   
  }
}
