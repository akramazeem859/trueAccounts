import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/Models/branch.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  branchEditRequest: Branch = {
    id: 0,
    branchName :'',
    supervisor :'',
    contactNumber : '',
    companyId :0,
    company: {
      id : 0 ,
      name : ''
    }
  
  }
  constructor(private route: ActivatedRoute, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');

        if(id){
          this.companyService.getBranch(id)
            .subscribe({
              next: (response) => 
                {
                  console.log(response);
                  //this.branchEditRequest = response;
                }
                    })
              }
        }
    })
  }

}
