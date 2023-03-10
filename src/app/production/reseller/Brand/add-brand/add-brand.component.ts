import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  brandRequest : Brand = {
    id : 0,
    brandName : '',
    contactNumber : ''
  }

  /**
   *
   */
  constructor(private services:CompanyService, private router: Router) {  }

  ngOnInit(): void {
  }


  addBrand():void{
    this.services.addBrand(this.brandRequest)
    .subscribe({
      next: (brands) => {
        this.router.navigate(['brands'])
      }
    })
  }



}
