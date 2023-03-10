import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  companyEditRequest : Company = {
    id : 0 ,
    name : ''
  }
  constructor(private route: ActivatedRoute ,private router: Router, private companyService: CompanyService) {

   }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');

        if (id){
          this.companyService.getCompany(id).subscribe({
            next: (response) => {
              console.log(response);
              this.companyEditRequest = response;
            }
          });
        }
      }
    })
  }

  updateCompany(){
    this.companyService.editCompany(this.companyEditRequest.id, this.companyEditRequest)
    .subscribe({
      next: (response) => {
        this.router.navigate(['Company']);
      }
    })
  }

  deleteComp(id: number){
    if(confirm("Are you sure to delete this record?"))
    this.companyService.deleteCompany(id).subscribe({
      next: (Response) => {
        this.router.navigate(['Company']);
      }
    })
      }

}
