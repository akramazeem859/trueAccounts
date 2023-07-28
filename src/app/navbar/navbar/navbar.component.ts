import { Token } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  /**
   *
   */
  constructor(
    private navbarservice: NavbarService,
     private service:CompanyService,
     private tokenservice:UserStoreService) {
     this.subscription = this.navbarservice.showNavbar.subscribe((value) => {
     this.showNavbar = value;
     });
    
  }
  ngOnInit(): void {
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
}
