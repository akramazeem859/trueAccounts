import { Token } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Branch } from 'src/app/Models/branch.model';
import { CompanyService } from 'src/app/Services/company.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { UserStoreService } from 'src/app/Services/user.store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy , OnInit  {
  title = 'TrueAccounts';
  subscription : Subscription;
  showNavbar : boolean = true; 

  public isClicked : boolean = false;
  userName :string = '';
  role : string = '';
  branchId: string='';
  tempBranch : Branch;
  branchName : string;

  branchList :Branch[];

  selectedbranch : FormGroup;
  /**
   *
   */
  constructor(
    private navbarservice: NavbarService,
     private service:CompanyService,
     private tokenservice:UserStoreService,
     private fb:FormBuilder,
     private alt:ToastrService,
     private router:Router
     
     ) {
     this.subscription = this.navbarservice.showNavbar.subscribe((value) => {
     this.showNavbar = value;
      

     this.selectedbranch = this.fb.group({
      bid:[]
     })

     });
    
  }
  ngOnInit(): void {

    this.service.getAllBranches().subscribe({
      next:(res)=>{
        this.branchList = res; 
      },
      error:(err)=>{
        console.log("Unable to fetch braches from navbar ts.");
      }
    })

    this.tokenservice.getNameFromStore().subscribe(value => {
      let fullName = this.service.getNamefromToken();
      this.userName = value || fullName;
    });

    this.tokenservice.getRoleFromStore().subscribe(value => {
      let myrole = this.service.getRolefromToken();
      this.role = value || myrole;
    });

    this.tokenservice.getBrnchIdFromStore().subscribe(value => {
      let tempbranchId = this.service.getBranchIdfromToken();
      this.branchId = value || tempbranchId;
      this.service.setbranchId(this.service.getBranchIdfromToken());
    })
    this.service.getBranch(this.branchId).subscribe(res => {
      this.branchName = res.branchName;
    })



    this.selectedbranch.get('bid').setValue(this.branchId);
  }

  setTitle(title:string){
    this.title = title;
   
  }

  toggleMenu(){
    this.isClicked = !this.isClicked;
  }

  logOut(){
    this.service.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changebranch(){
    console.log(this.selectedbranch.get('bid').value);
    let id = this.selectedbranch.get('bid').value;
    this.service.setbranchId(id);
    this.alt.success('Branch change successfuly', 'Done');
    this.branchId = id; 
    console.log(this.service.getbranchId());
    this.router.navigateByUrl('');
  }
}
