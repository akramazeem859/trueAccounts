import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { level4 } from 'src/app/Models/COA/level4.model';
import { CompanyService } from 'src/app/Services/company.service';


@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css']
})
export class JournalVoucherComponent implements OnInit {

  

  myControl = new FormControl('');
  options !: level4[];
  filteredOptions !: Observable<level4[]>;


  lvl4List !: level4[];

  /**
   *
   */
  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private alert: ToastrService,
    private datePipe : DatePipe) {  }

  detailArray !: FormArray; 
  public jvform = new FormGroup({
    newDate : new FormControl(new Date()),
    detail: this.builder.array([]),
    
  })
   

  ManageNameControl(index: number) {
    var arrayControl = this.jvform.get("detail") as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get("name").valueChanges.pipe(
        startWith(""),
        map(value => {
          const name = value;
          return name ? this._filter(name as string, this.options) : this.options.slice()
        })
      );
  }

  ngOnInit(): void {

    this.getAllLvl4();

    this.generateRow();

    this.filteredOptions = this.detailArray.get('newlevel').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );
    
  }

  private _filter(value: string , lvl4:level4[]): level4[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
   else{
    return lvl4;
   }
    
  }

  getAllLvl4(){
    this.service.getAllLevel4().subscribe(lvl => {
      this.lvl4List = lvl;
      this.options = lvl;
      console.log("Account List :" + this.lvl4List);
    })
  }

  SaveJv(){

    console.log(this.jvform.value);
  }

  addDetail(){
    const controls = <FormArray>this.jvform.controls["detail"];
    this.detailArray = this.jvform.get("detail") as FormArray;
    this.detailArray.push(this.generateRow());
    this.ManageNameControl(controls.length);
  }

  generateRow(){
    return this.builder.group({
      newlevel: this.builder.control(''),
      description: this.builder.control(''),
      credit: this.builder.control(''),
      debit: this.builder.control(''),

    });
  }

  invProducts() {
    return this.jvform.get('detail') as FormArray;
  }

  findAccount(event){
    console.log("Level4 code : "+ this.jvform.get("newlevel").value);

    var  lvl4Id = this.jvform.get("newlevel")?.value;
    //var  cusId = event.option.value;
  }


}
