import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Models/branch.model';
import { users } from 'src/app/Models/users.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


  usersList : users[]; 
  branchList : Branch[];
  tempbranchId : any = 1;
  btntitle : string = "Save";
  userform : FormGroup; 
  tempuserId: any = 0;

  constructor(
    private service:CompanyService,
    private alert: ToastrService,
    private fb : FormBuilder) {  }

  ngOnInit(): void {
    
    this.service.getAllBranches().subscribe({
      next:(res)=>{
        this.branchList = res;
        
      },
      error:(err)=>{
        this.alert.error('Something went wrong.','Error')
      }
    })

    this.getAlluserlist();

    this.userform = this.fb.group({
      Id:[],
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required],
      PhoneNumber:['',Validators.required],
      Address:['',Validators.required],
      Password:['',Validators.required],
      UserCode:['',Validators.required],
      BranchId:[Validators.required],
      Designation:['',Validators.required],
      JoiningDate:['',Validators.required],
      Dob:['',Validators.required],
      Status:[true],
      UserName:['',Validators.required],
    })
  }

  getAlluserlist(){
    this.service.getallusers().subscribe({
      next:(res)=>{
        this.usersList = res; 
      },
      error:(err)=>{
        this.alert.error('Something went wrong.','Error')
      }
    
    })

  }
  submitUser(){
    //this.btntitle = "updated.";
    console.log(this.userform.value);

    if(this.tempuserId == 0){

      this.service.addUser(this.userform.value).subscribe({
        next:(res)=>{
          this.alert.success("New record saved successfully","Success");
          this.userform.reset(); 
        },
        error:(err)=>{
          this.alert.warning("Something wrong", "Error");
        }
      })
    }
    else{
      this.service.updateUser(this.userform.value).subscribe({
        next:(res)=>{
          this.alert.success("Record updated successfully","Success");
          this.userform.reset(); 
          this.getAlluserlist();
        },
        error:(err)=>{
          this.alert.warning("Something wrong", "Error");
        }
      })
    }
  }
  selectUser(user:users){
    console.log(user);
    user.password = '';
    this.userform.get('FirstName').setValue(user.firstName);
    this.userform.get('LastName').setValue(user.lastName);
    this.userform.get('Email').setValue(user.email);
    this.userform.get('PhoneNumber').setValue(user.phoneNumber);
    this.userform.get('Address').setValue(user.address);
    this.userform.get('BranchId').setValue(user.branchId);
    this.userform.get('Designation').setValue(user.designation);
    this.userform.get('JoiningDate').setValue(this.formatDate(new Date(user.joiningDate)));
    this.userform.get('Dob').setValue(this.formatDate(new Date(user.dob)));
    this.userform.get('UserName').setValue(user.userName);
    this.userform.get('Status').setValue(user.status);
    this.userform.get('Id').setValue(user.id);
    this.userform.get('Password').setValue(user.password);
    
    this.tempuserId = user.id;
    if(this.tempbranchId != 0){
      this.btntitle = "Edit";
    }

  }

  formatDate(date: Date):string{
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth()+1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  addUser(){}
}
