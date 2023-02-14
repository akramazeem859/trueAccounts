import { Component, ModuleWithProviders, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[] = [];
 
  constructor(private comapanyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.comapanyService.getAllCompanies()
    .subscribe(comp => {
        this.companies = comp;
         console.log("company",this.companies);
      });
  }

  deleteComp(id: number){
this.comapanyService.deleteCompany(id).subscribe({
  next: (Response) => {
    this.router.navigate(['Company']);
    }
  })
}

}
