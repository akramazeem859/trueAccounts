import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { Branch } from 'src/app/Models/branch.model';
import { Customer } from 'src/app/Models/customer.model';
import { customerRates } from 'src/app/Models/customerRate.model';
import { Inventory } from 'src/app/Models/inventory.model';
import { Product } from 'src/app/Models/product.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserStoreService } from 'src/app/Services/user.store.service';

@Component({
  selector: 'app-saleinvoice2',
  templateUrl: './saleinvoice2.component.html',
  styleUrls: ['./saleinvoice2.component.css']
})
export class Saleinvoice2Component implements OnInit {

  saleInvform:FormGroup; 
  detail:FormArray;

  customerList:Customer[] = [];
  customerRateList:customerRates[]=[];
  productList:Product[]=[];

  branchId:any; 
  tempBranch: Branch; 
  tempCustomer: Customer;
  stockList: Inventory[] = [];
  userName:string;



  myControl = new FormControl('');
  options !: Customer[];
  filteredOptions !: Observable<Customer[]>;

  myControl2 = new FormControl('');
  options2 !: Product[];
  filteredOptions2 !: Observable<Product[]>;

  constructor(
    private service: CompanyService,
    private myalert: ToastrService,
    private fb: FormBuilder,
    private tokenservice:UserStoreService
  ) {  }

  ngOnInit(): void {
   

    this.tokenservice.getBrnchIdFromStore().subscribe(value => {
      let tempbranchId = this.service.getBranchIdfromToken();
      this.branchId = value || tempbranchId;
    })

    this.tokenservice.getNameFromStore().subscribe(value => {
      let tempuserName = this.service.getNamefromToken();
      this.userName = value || tempuserName;
    })

    this.service.getBranch(this.branchId).subscribe({
      next: (res) => {
        this.tempBranch = res;
        this.getAllstock(res.id);
      },
      error: (err) => {
        this.myalert.warning('Branch Not Recognized.', 'Warning');
      }
    })

    this.saleInvform = this.fb.group({
      id:[],
      code: ["SI202302"],
      customerId:[,Validators.required],
      datetime: ['',Validators.required],

      productId:[],
      
      address: [],
      contact: [],
      balance: [],

      detail: [],

      accountId: [0,Validators.required],
      branchId:  [this.branchId,Validators.required],
      paid: [0],
      discount: [0],
      freight: [0],
      summary: [0,Validators.required],
      payable: [0,Validators.required],
    })


    this.getAllCustomer();
    this.getAllProducts();

    this.filteredOptions = this.saleInvform.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filter(name as string, this.options) : this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.filteredOptions2 = this.saleInvform.get('productId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filter2(name as string, this.options2) : this.options2
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

  
  
  }

  private _filter(value: string, cus: Customer[]): Customer[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.customerName.toLowerCase().includes(filterValue));
    }
    else {
      return cus;
    }

  }

  private _filter2(value: string, prod: Product[]): Product[] {
    if (typeof value === 'string') {
      const filterValue2 = value.toLowerCase();
      return this.options2.filter(option => option.productName.toLowerCase().includes(filterValue2));
    }
    else {
      return prod;
    }

  }

  getAllCustomer(){
    this.service.getAllCustomers().subscribe({
      next:(res)=> {
        this.customerList = res; 
        this.options = res.filter(x=> x.customerBranchId == +this.branchId);
        this.tempCustomer = res.find(x=> x.customerName== 'Anomynous' && x.customerBranchId == this.branchId)
        this.saleInvform.get('customerId').setValue(this.tempCustomer.id);
      },
      error:(err)=>{
         this.myalert.warning('Customers not found.', 'Error');
      }
    })
  }

  getAllstock(id:any){
    this.service.getBranchInv(id).subscribe({
      next:(res)=>{
        this.stockList = res;
       
      },
      error:(err)=>{
        this.myalert.warning('Stock not found for this bracnh', 'Error');
      }
      
    })
  }


  findCustomer(event) {
    var  cusId = this.saleInvform.get('customerId').value; 
    
    this.tempCustomer = this.options.find(x=>x.id == cusId);
   
    this.service.getCustomer(cusId)
      .subscribe(cus => {
        this.saleInvform.get("address").setValue(cus.customerAddress);
        this.saleInvform.get("contact").setValue(cus.customerNumber);
        this.saleInvform.get("balance").setValue(cus.customerCurrentbalance);
      })
   
    this.getCustomerRates(cusId);
  }

  findProduct(event){

  }

  getCustomerRates(id:any){
    this.customerRateList = [];
    this.service.getCustRatebyCus(id).subscribe(rate => {
      this.customerRateList = rate;
      if (rate != null) {
       

      }
      else {
        console.log('customer Rates : no record found!!!');
      }
    })
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe(item => {
      this.productList = item;
      this.options2 = item;
      console.log('option2 list :'+ this.options2);
    })
  }


  public getCusName(cusId: any) {
    let customer = this.customerList && this.customerList.find(c => c.id === cusId);
    return customer ? customer.customerName : null; 
  }
  public getProcductName(pId: any) {
    let product = this.productList && this.productList.find(c => c.id === pId);
    return product ? product.productName : null;
    // return this.productList.find(c => c.id === pId).productName;
  }


  submit(){

  }



}
