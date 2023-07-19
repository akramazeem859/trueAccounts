import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/Services/company.service';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  signupform:FormGroup;
  
  constructor(private navbarservice: NavbarService,
     private service:CompanyService,
     private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
    this.navbarservice.hide();
    this.signupform = this.fb.group({
      FirstName :['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required],
      PhoneNumber:['',Validators.required],
      Address:['',Validators.required],
      password:['',Validators.required],
      Dob:['',Validators.required]

    })
  }

  onSubmit(){

  }
  
  ngOnDestroy(): void {
    this.navbarservice.display(); 
  }
}
