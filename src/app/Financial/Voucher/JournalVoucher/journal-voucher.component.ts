import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { level4 } from 'src/app/Models/COA/level4.model';
import { jvInvDetail } from 'src/app/Models/jvInvDetail.model';
import { jvInvoice } from 'src/app/Models/jvInvoice.model';
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
  invoiceDetail : FormArray<any>;
  tCr : number = 0; 
  tDr : number = 0;
  totalCr : string = '';
  tempCount: number = 0;
  tempInvCode: string= "";
  tempJvInvoice: jvInvoice;
  tempJvDetail : jvInvDetail[];


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
    code: new FormControl(''),
    Particular: new FormControl(''),
    Remarks: new FormControl(''),
    DateTime : new FormControl(new Date()),
    Detail: this.builder.array([]),
    
  })
   
  ngOnInit(): void {

    this.getAllLvl4();

    this.generateRow();

  }

  ManageNameControl(index: number) {
    var arrayControl = this.jvform.get('Detail') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('CoaCode').valueChanges
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

    var detailArray = this.jvform.get('Detail')as FormArray; 

    if(detailArray.length > 0){
      console.log("detail length row :"+detailArray.length);
      console.log(this.jvform.value);

      if(this.tCr == this.tDr){
        this.service.addJVInvoice(this.jvform.value).subscribe({
          next: inv =>{
            this.alert.success("Record Entered Successfully.","Successful!");
            this.jvform.reset();

            if (this.detailArray != undefined) {
              while (this.detailArray.length !== 0) {
                this.detailArray.removeAt(0)
              }
            }
          },
          error: err =>{
            this.alert.warning("Something went goes wrong from server", "Something Wrong!" )
          }
        })
      }
      else{
        this.alert.warning("Total Credit and Debit doesn't match","Balance Mismatch!");
      }
    }
    else{
      this.alert.warning("No record found to be added.","Something Goes Wrong.")
    }
   
  }

  findJv(){
    if(this.tempInvCode != "" || this.tempInvCode != null)
    {
      console.log("tempInvCode :"+ this.tempInvCode);
      this.service.getJvInvByCode(this.tempInvCode).subscribe(item =>{
        this.tempJvInvoice = item;

      this.service.getAllJvInvDetail(item.id).subscribe(d =>{
        this.tempJvDetail = d;

        console.log("temp jv detail.." + this.tempJvDetail)
      })
        
        this.loadJv();
        
      })
    }
    else{
      this.alert.warning("Please enter correct JV code.","Something Wrong!")
    }
    
  }

  loadJv(){
    console.log("temp JV : "+ this.tempJvInvoice.particular);
    this.jvform.get("code").setValue(this.tempJvInvoice.code);
    this.jvform.get("Particular").setValue(this.tempJvInvoice.particular);
    this.jvform.get("DateTime").setValue(this.tempJvInvoice.dateTime);
    this.jvform.get("Remarks").setValue(this.tempJvInvoice.remarks);

    this.detailArray = this.jvform.get('Detail') as FormArray;
  }

  totalCredit(){
    this.detailArray = this.jvform.get('Detail')as FormArray;
    let totalCr = this.jvform.getRawValue().Detail; 
    this.tCr = 0;
    totalCr.forEach((item: any) => {
      this.tCr += item.Credit;
      //this.totalCr = this.tCr.toString();
    });
  }
  totalDebit(){
    
    this.detailArray = this.jvform.get('Detail')as FormArray;
    let totalDr = this.jvform.getRawValue().Detail; 
    this.tDr = 0;
    totalDr.forEach((item: any) => {
      this.tDr += item.Debit;
      //this.totalCr = this.tCr.toString();
    });
  }


  addDetail(){
    const controls = <FormArray>this.jvform.controls["Detail"];
    this.detailArray = this.jvform.get("Detail") as FormArray;
    this.detailArray.push(this.generateRow());
    console.log(this.detailArray.length);
    this.ManageNameControl(this.detailArray.length - 1);
  }

  generateRow(){
    return this.builder.group({
      CoaCode: this.builder.control(''),
      Description: this.builder.control(''),
      Credit: this.builder.control(0),
      Debit: this.builder.control(0),

    });
  }

  invProducts() {
    return this.jvform.get('Detail') as FormArray;
  }
  removeItem(i: number) {
    const controls = <FormArray>this.jvform.controls['Detail'];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);

    this.totalCredit();
    this.totalDebit();
  }

  findAccount(event){
    console.log("Level4 code : "+ this.jvform.get("Detail").value);

    var  lvl4Id = this.jvform.get("Detail")?.value;
    //var  cusId = event.option.value;
  }


}
