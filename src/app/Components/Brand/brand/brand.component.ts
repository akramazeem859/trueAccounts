import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];

  constructor(private service:CompanyService, private router: Router) { }

  ngOnInit():void{
   this.service.getAllBrands().subscribe({ 
    next: (brand) => {
      this.brands = brand;
      console.log(this.brands);
    }
  })

  }


}
