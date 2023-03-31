import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

  faTrash = faTrash;

  myControl = new FormControl('');
  options !: level4[];
  filteredOptions : Observable<level4[]>[] = [];


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
   
  ngOnInit(): void {

    this.getAllLvl4();

    this.generateRow();

  }

  ManageNameControl(index: number) {
    var arrayControl = this.jvform.get('detail') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('newlevel').valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

   private _filter(value: string): level4[] {
    const filterValue = value.toLocaleLowerCase();

    return this.options.filter(option => option.name.toLocaleLowerCase().includes(filterValue));
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
    console.log(this.detailArray.length);
    this.ManageNameControl(this.detailArray.length - 1);
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
  removeItem(i: number) {
    const controls = <FormArray>this.jvform.controls['detail'];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);

  }

  findAccount(event){
    console.log("Level4 code : "+ this.jvform.get("detail").value);

    var  lvl4Id = this.jvform.get("detail")?.value;
    //var  cusId = event.option.value;
  }


}
