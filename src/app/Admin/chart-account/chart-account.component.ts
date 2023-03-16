import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { level1 } from 'src/app/Models/COA/level1.model';
import { level2 } from 'src/app/Models/COA/level2.model';
import { level3 } from 'src/app/Models/COA/level3.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-chart-account',
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.css']
})
export class ChartAccountComponent implements OnInit {
  
level1txt:string = "";
level1Req : level1 = {};
level2Req : level2 = {};
level3Req : level3 = {};


level1list:level1[];
level2list:level2[];
/**
 *
 */
constructor(private service:CompanyService, private alert: ToastrService) {}

 ngOnInit(): void {
  this.service.getAllLevel1()
  .subscribe(item=>{
    this.level1list = item;
    console.log(this.level1list);
  })


 }

 addLevel1(l1){
  this.level1Req.name = l1.value.name;
    console.log(this.level1Req);
    if (confirm("Are you sure to Add Main Head?")){
      this.service.addLevel1(this.level1Req).subscribe(x=>{
        this.alert.success("Main head added successfully","Successfull!");
        
      })
     }
 }
 addLevel2(l2){
  this.level2Req.name = l2.value.name;
  this.level2Req.level1 = l2.value.level1;
  console.log(this.level2Req);
  if(confirm("Are you sure to Add level2 Head?")){
    this.service.addLevel2(this.level2Req).subscribe(x=>{
      this.alert.success("Level2 head added successfully","Successful!");
    })
  }
 }


 getlevel2(l1code){
  console.log(l1code.target.value);
  this.service.getlevel2bylevel1(l1code.target.value)
  .subscribe(item => {
   console.log(item);
  this.level2list = item; 
  //console.log(this.level2list);
  })
 }

 addLevel3(l3){
  this.level3Req.name = l3.value.name;
  this.level3Req.level2 = l3.value.level2;
  console.log(this.level3Req);
  this.service.addLevel3(this.level3Req).subscribe(item=>{
    this.alert.success("Level3 head added successfully","Successful!")
  })
 }

}
