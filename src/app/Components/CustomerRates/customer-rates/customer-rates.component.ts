
import { customerRates } from './../../../Models/customerRate.model';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Product } from './../../../Models/product.model';
import { CompanyService } from 'src/app/Services/company.service';
import { Customer } from './../../../Models/customer.model';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { cusRateDTO } from 'src/app/DTO/cusRateDTO.model';

@Component({
  selector: 'app-customer-rates',
  templateUrl: './customer-rates.component.html',
  styleUrls: ['./customer-rates.component.css']
})
export class CustomerRatesComponent implements OnInit {
  /**
   *
   */
  constructor(private builder: FormBuilder,
    private services: CompanyService,
    private alert: ToastrService) {
  }


  entryDetail: FormArray<any>;
  customerList: Customer[];
  productList: Product[];
  customerId: any;
  productId: any;
  record: FormGroup<any>;
  singleEntry: FormArray<any>;
  cusRateList: customerRates[] = [];
  public custRateDTOList: cusRateDTO[] = [];


  customerform = new FormGroup({
    customerId: this.builder.control(null),
    entry: this.builder.array([])
  })

  ngOnInit(): void {
    this.getAllCustomer();
    this.getAllProduct();
  }

  getAllCustomer() {
    this.services.getAllCustomers().subscribe(item => {
      this.customerList = item;
      
    })
  }
  getAllProduct() {
    this.services.getAllProducts().subscribe(item => {
      this.productList = item;
      
    })
  }

  setRateEntry() {
    return this.customerform.get('entry') as FormArray;
  }

  addRates() {
    this.entryDetail = this.customerform.get('entry') as FormArray;
    let cusId = this.customerform.get("customerId")?.value;
    
    if (cusId != null) {
      console.log('customer Id : '+ this.customerId);
      this.entryDetail.push(this.generateRow());
    }
    else {
      this.alert.warning('Please select customer first.', 'Select Customer')
    }

  }

  generateRow() {
    return this.builder.group({
      id:this.builder.control(null),
      productId: this.builder.control(null),
      rate: this.builder.control(null)
    });
  }

  selectCustomer() {
    this.emptyArray();
    this.customerId = this.customerform.get('customerId')?.value;
    this.entryDetail = this.customerform.get('entry') as FormArray;
    this.services.getCustRatebyCus(this.customerId).subscribe
    (item => {
      this.cusRateList = item;
      for(let i=0 ; i<item.length ; i++){
        this.entryDetail.push(this.generateRow());
        this.record = this.entryDetail.at(i) as FormGroup;
        this.record.get('productId').setValue(item[i].productId);
        this.record.get('rate').setValue(item[i].rate)
         }
      console.log(this.cusRateList);
    })
    
   
  }

  AddRecord() {
   /* console.log(this.customerform.value);
    */
   
   //temp.Id = 0;
  // temp.customerId = this.customerform.get('customerId')?.value;
   this.singleEntry = this.customerform.get('entry') as FormArray;
   this.cusRateList = null; 
   
  for(let i=0 ; i<this.singleEntry.length ; i++){
    this.record = this.singleEntry.at(i) as FormGroup;
    let temp : cusRateDTO = {
      
      customerId : this.customerform.get('customerId').value,
      productId: this.record.get('productId').value,
      rate:this.record.get('rate').value
     }
    this.custRateDTOList.push(temp);
  }
    //this.record = this.singleEntry.at(index) as FormGroup;
    this.services.addCustomerRate(this.custRateDTOList).subscribe
    (item => {
      this.customerform.reset(); 
     this.emptyArray();
      this.alert.success('Record Saved successfully.','Successfull')
    })
    
  }

  emptyArray(){
    this.singleEntry = this.customerform.get('entry') as FormArray;

    while (this.singleEntry.length !== 0) {
      this.singleEntry.removeAt(0)
    }
  }

  removeRate(index:number){
    this.singleEntry = this.customerform.get('entry') as FormArray;
    let tempRecord = this.singleEntry.at(index) as FormGroup
    let tempProdId = tempRecord.get('productId').value;
    let custId = this.customerform.get('customerId').value;
    
    if(tempProdId != null ){
      console.log("customer Id : "+ custId +'product Id :'+ tempProdId);
      this.services.deleteCusRec(custId,tempProdId).subscribe
      (item => {
        console.log("customer Id : "+ custId +'product Id :'+ tempProdId);
        this.singleEntry.removeAt(index);
        this.alert.success('Customer Record Remove Successfully', 'Record Removed');
      })
    }
    else{
      this.singleEntry.removeAt(index);
    }
  }

  selectProduct(index: number) {

    this.singleEntry = this.customerform.get('entry') as FormArray;
    this.record = this.singleEntry.at(index) as FormGroup;

    let prodId = this.record.get('productId').value;
    
    for(let i=0; i<index ; i++){
      let tempRecord = this.singleEntry.at(i) as FormGroup;
      let tempId = tempRecord.get('productId').value;
      console.log("tempID : "+ tempId +" prodID : "+ prodId);
      if(tempId == prodId){
        this.singleEntry.removeAt(index);
        this.alert.warning('Product is already in List.','Select other product');
      }
    }

  }

}
