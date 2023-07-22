import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/navbar.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/Services/company.service';
import { error } from 'jquery';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   *
   */

  type: string = "password";
  isText:boolean=false;
  eyeIcon: string = "fa-eye-slash";
  loginform : FormGroup;


  constructor(
    private navbarservice: NavbarService, 
    private fb :FormBuilder , 
    private service:CompanyService,
    private router:Router,
    private talert:ToastrService) {
     
  }

  ngOnInit(): void {
    this.navbarservice.hide();
    this.loginform = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.navbarservice.display(); 
  }

  showPass(){
    
    this.isText = !this.isText;
    this.isText? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text" : this.type="password";

  }
  onSubmit(){
    if(this.loginform.valid){
      console.log(this.loginform.value);
      this.service.login(this.loginform.value).subscribe({
        next:(res)=>{
          this.talert.success(res.message,'Success');
         
          this.loginform.reset();
          this.service.setToken(res.token);
          this.router.navigate(['']);
        },
        error:(err)=>{
          this.talert.error('Invalid Username or Passward.','Login Fail');
        }
      })
    }
    else{

    }
  }


  private validatAllFormfields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validatAllFormfields(control)
      }
    })
  }

}
