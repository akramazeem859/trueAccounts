import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

brandEditRequest: Brand = {
  id : 0,
  brandName : '',
  contactNumber : ''
}
/**
 *
 */
constructor(private route: ActivatedRoute, private router: Router, private service: CompanyService) {

}
ngOnInit(): void {
  this.route.paramMap.subscribe({
    next: (param) => {
      const id = param.get('id');

      if(id)
      {
        this.service.getBrand(id).subscribe({
          next: (Response) => {
            this.brandEditRequest = Response;
            console.log(this.brandEditRequest);
          }
        })
      }
    }
  })
}


  updateBrand(){
    this.service.editBrand(this.brandEditRequest.id, this.brandEditRequest).subscribe({
      next: (response) => {
        this.router.navigate(['brands']);
      }
    })
  }


  deleteBrand(id:number){
    if(confirm("Are you sure to delete Record?"))
    this.service.deleteBrand(id).subscribe({
      next: (brnd) => {
        this.router.navigate(['brands'])
      }
    })
  }
}
