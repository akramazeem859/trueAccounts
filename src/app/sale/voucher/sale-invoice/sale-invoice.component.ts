
import { Inventory } from 'src/app/Models/inventory.model';
import { Product } from 'src/app/Models/product.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Models/customer.model';
import { CompanyService } from 'src/app/Services/company.service';
import { ToastrService } from 'ngx-toastr';
import { sInvDetailDTO } from 'src/app/DTO/sInvDetailDTO.model';
import { customerRates } from 'src/app/Models/customerRate.model';
import {FormControl} from '@angular/forms';
import { Time, DatePipe } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { sInvDetail } from 'src/app/Models/sInvDetail.model';
import { sInvoice } from 'src/app/Models/sInvoice.model';
import { UserStoreService } from 'src/app/Services/user.store.service';
import { MatDialog } from '@angular/material/dialog';
import { SaleReciptComponent } from '../../Popups/sale-recipt/sale-recipt.component';
import { Branch } from 'src/app/Models/branch.model';

declare var $ :any;


@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.css']
})
export class SaleInvoiceComponent implements OnInit {


  myControl = new FormControl('');
  options !: Customer[];
  filteredOptions !: Observable<Customer[]>;

  myControl2 = new FormControl('');
  options2 !: Product[];
  filteredOptions2 : Observable<Product[]>[] = [];

  branchId: string='';
  tempbranch: Branch;
  tempuserName: string;
  tempInvoiceCode: string = '';
 
  
  // getName(Id: any) {
  //   return this.options.find((customer) => customer.id === Id).customerName;
  // }

  /**
   *
   */
  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private alert: ToastrService,
    private datePipe : DatePipe,
    private tokenservice: UserStoreService,
    private dialog:MatDialog) {

  }
 

  customerList !: Customer[];
  cashAccountList: cashAccount[] = [];
  saleInvDetailList: sInvDetail[] = [];
  productList: Product[] = [];

  invoiceDetail: FormArray<any>;
  invProduct: FormGroup<any>;
  tempinvProduct: FormGroup<any>;

  tempProdCount: number = 0;
  saleCode: any;
  newTime : any;
  currentDate: any;
  isProdAdded: boolean = false;
  tempSalePrice: number = 0;
  
  selectedAccout:cashAccount;
  saleInvoice: sInvoice;
  tempCusRat: customerRates;

  detail: sInvDetailDTO = {
    productId: 0,
    salePrice: 0,
    quantity: 0,
    sInvoiceId: 0
  }


  public saleInvoiceForm = new FormGroup({
    code: this.builder.control("SI202302"),
    customerId: this.builder.control(null),
    datetime: new FormControl(new Date()),
    address: this.builder.control({ value: "", disabled: true }),
    contact: this.builder.control({ value: "", disabled: true }),
    balance: this.builder.control({ value: 0, disabled: true }),

    detail: this.builder.array([]),

    accountId: this.builder.control(null),
    branchId : this.builder.control(null),
    paid: this.builder.control(null),
    discount: this.builder.control(0),
    freight: this.builder.control(0),
    summary: this.builder.control({ value: 0, disabled: true }),
    payable: this.builder.control(0),

  })

  isEditBtn: boolean = false;
  isDeletBtn: boolean = false;
  isAddBtn: boolean = true;
  isPrint: boolean = false;

  ngOnInit(): void {

    //this.getName(0);
    var today = new Date();
    var date = today.getDate()+'-'+ (today.getMonth()+1)+'-'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    $(document).ready( function() {
      $('#dt').val(new Date());
    });

    this.newTime = time;
    
    this.currentDate = this.datePipe.transform((new Date), 'YYYY-MM-dd hh:mm');
    var currentDateTxt = this.currentDate+" ";

    //console.log("current Date :" + this.currentDate);
    this.saleInvoiceForm.get('datetime').setValue(this.currentDate);
   
    this.getAllCustomer();
    this.getAllAccounts();
    this.getAllProducts();

    //this.selectedAccout = this.cashAccountList[0].accountTitle;

    this.filteredOptions = this.saleInvoiceForm.get('customerId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name?this._filter(name as string, this.options):this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

    this.tokenservice.getBrnchIdFromStore().subscribe(value => {
      let tempbranchId = this.service.getBranchIdfromToken();
      this.branchId = value || tempbranchId;
    })

    this.tokenservice.getNameFromStore().subscribe(value => {
      let tempuserName = this.service.getNamefromToken();
      this.tempuserName = value || tempuserName;
    })
    
    this.service.getBranch(this.branchId).subscribe({
      next:(res) => {
        this.tempbranch = res;
      } ,
      error:(err) => {
         this.alert.warning('Branch Not Recognized.','Warning'); 
      }
    })
  }

  ManageNameControl(index: number) {
    var arrayControl = this.saleInvoiceForm.get('detail') as FormArray;
    this.filteredOptions2[index] = arrayControl.at(index).get('productId').valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter2(value || ''))
    );
  }

  private _filter2(value: string): Product[] {
    const filterValue = value.toLocaleLowerCase();

    return this.options2.filter(option => option.productName.toLocaleLowerCase().includes(filterValue));
  }


  private _filter(value: string , cus:Customer[]): Customer[] {
    if(typeof value === 'string'){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.customerName.toLowerCase().includes(filterValue));
    }
   else{
    return cus;
   }
    
  }

  displayFn(cus: Customer): string {
    return cus.customerName;
  }

  findSaleInv() {
    if (this.saleCode != '' || this.saleCode != undefined) {
      this.service.getSaleInvByCode(this.saleCode)
        .subscribe(inv => {
          this.saleInvoice = inv;
          //this.purcInvDetailList = inv.detail;
          //this.purcInvList.push(inv);
          console.log("Sale invoice id = " + this.saleInvoice.id);

          this.service.getAllSaleInvDetail(this.saleInvoice.id)
            .subscribe(d => {
              this.saleInvDetailList = d;
              console.log("Sale detail : " + this.saleInvDetailList.length);
            })
        });
    }
    else {
      this.alert.error("Enter Valid Sale Invoice Code", "Invalid Code");
    }

  }

  saveInvoice() {

    var mydate = this.saleInvoiceForm.get("datetime").value;
   
    this.currentDate = this.datePipe.transform((mydate), 'YYYY-MM-dd hh:mm');
    
    //mydate = mydate +" "+ this.newTime;
    //this.saleInvoiceForm.get("datetime").setValue(this.currentDate);
    console.log(this.saleInvoiceForm.value);
    //this.invoiceForm.reset();
    if(mydate != null){

      let sId = 0;
      this.saleInvoiceForm.get('branchId').setValue(this.branchId);
      this.service.addSInvoice(this.saleInvoiceForm.value).subscribe(inv => {
        this.tempInvoiceCode = inv.code; 
        this.saleCode = inv.code; 
        sId = inv.id;
        console.log("saleInvoice code :" + this.tempInvoiceCode);
        this.formCustomRest();
        this.alert.success("Record saved successfully...", "Successful")
        
        this.PrintInvoice(this.saleCode);
      })
    }
    else{
      this.alert.warning("Please select date first");
    }
  }

  formCustomRest(): void {
    this.saleInvoiceForm.reset();
    this.saleInvoiceForm.get('code').setValue('SI202302');
    this.saleInvoiceForm.get('freight').setValue(0);

    if (this.invoiceDetail != undefined) {
      while (this.invoiceDetail.length !== 0) {
        this.invoiceDetail.removeAt(0)
      }
    }

    this.tempProdCount = 0;

    //this.tempProdCount = 0;
    //this.pInvoiceDTO = null;
  }

  getAllCustomer() {
    this.service.getAllCustomers().subscribe(cus => {
      this.customerList = cus;
      this.options = cus;
      console.log("Customer List :" + this.customerList);
    })
  }
  getAllAccounts() {
    this.service.getAllAccounts().subscribe(acc => {
      this.cashAccountList = acc;
      
      this.saleInvoiceForm.get('accountId').setValue(this.cashAccountList[0].id);
      console.log('acc : '+ this.saleInvoiceForm.get('accountId').value)
    })
    
  }


  public getCusName(cusId : any){
    return this.customerList.find(c => c.id === cusId).customerName;
  }
  public getProcductName(pId : any){
    return this.productList.find(c => c.id === pId).productName;
  }


  findCustomer(event) {
    console.log("customer ID : "+ this.saleInvoiceForm.get("customerId")?.value)

   var  cusId = this.saleInvoiceForm.get("customerId")?.value;
   //var  cusId = event.option.value;

    this.service.getCustomer(cusId)
      .subscribe(cus => {
        this.saleInvoiceForm.get("address").setValue(cus.customerAddress);
        this.saleInvoiceForm.get("contact").setValue(cus.customerNumber);
        this.saleInvoiceForm.get("balance").setValue(cus.customerCurrentbalance);
      })
    console.log("find Customer = " + cusId);
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe(item => {
      this.productList = item;
      this.options2 = item;
      console.log("Product List" + this.productList);
    })
  }


  addProduct() {

    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    let cusId = this.saleInvoiceForm.get('customerId')?.value;
    
    if (cusId != null) {
      this.invoiceDetail.push(this.generateRow());
      this.ManageNameControl(this.invoiceDetail.length - 1);
    }
    else {
      this.alert.warning('Please select Supplier first.', 'Validation')
    }
  }

  generateRow() {
    return this.builder.group({
      productId: this.builder.control(''),
      available: this.builder.control({ value: 0, disabled: true }),
      quantity: this.builder.control(1),
      salePrice: this.builder.control(0),
      total: this.builder.control(0)
    })
  }

  invProducts() {
    return this.saleInvoiceForm.get('detail') as FormArray;
  }

  prodSelect(index: any) {
    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    this.invProduct = this.invoiceDetail.at(index) as FormGroup;
    let prodId = this.invProduct.get("productId").value;

    for (let i = 0; i < index; i++) {
      this.tempinvProduct = this.invoiceDetail.at(i) as FormGroup;
      let tempprodId = this.tempinvProduct.get("productId").value;
      if (prodId == tempprodId) {
        this.alert.warning("Product already in list. Select different product", "Duplicate Product");
        this.invoiceDetail.removeAt(index);
        break;
      }
      else {
        this.tempProdCount = index;
      }
    }
    let custId = this.saleInvoiceForm.get("customerId").value;

    this.service.getCustRatebyProd(custId, prodId)
      .subscribe((item) => {
        this.tempSalePrice = item.rate;
        console.log("custome sale price :" + this.tempSalePrice)

        this.invProduct.get("salePrice").setValue(this.tempSalePrice);
        this.totalCalculation(index);

      }, (err) => {
        console.log('error msg :' + err.message)
        this.service.getProduct(prodId)
          .subscribe(prod => {
            this.invProduct.get("salePrice").setValue(prod.salePrice);
            this.totalCalculation(index);
          })
      })



    this.service.getProdInvt(prodId, 1)
      .subscribe(avail => {
        console.log(avail);
        this.invProduct.get("available").setValue(avail);
        if (avail == 0) {
          this.alert.warning("Product not available at this time.", 'Stock not Available',)
        }
      })


  }

  totalCalculation(index: any) {
    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    this.invProduct = this.invoiceDetail.at(index) as FormGroup;
    let quantity = this.invProduct.get("quantity").value;
    let salePrice = this.invProduct.get("salePrice").value;
    
    let total = (quantity * salePrice);

    this.invProduct.get("total").setValue(total);
    this.summaryCalculation();
  }


  summaryCalculation() {
    let priceArray = this.saleInvoiceForm.getRawValue().detail;
    let sumTotal = 0;

    priceArray.forEach((item: any) => {
      sumTotal = sumTotal + item.total;
    });
    let discount = this.saleInvoiceForm.get('discount').value;
    this.saleInvoiceForm.get("summary").setValue(sumTotal);
    this.saleInvoiceForm.get("paid").setValue(sumTotal);

    let freight = this.saleInvoiceForm.get("freight").value;
    let gTotal = (+ freight + sumTotal)-discount;

    this.saleInvoiceForm.get("payable").setValue(gTotal);
    this.saleInvoiceForm.get("paid").setValue(gTotal);
  }

  removeRow(index: any) {

    this.invoiceDetail.removeAt(index);
    this.summaryCalculation();
    this.tempProdCount -= 1;
  }

  editInvoice() {
    let pID = this.saleInvoice.id;
    console.log("tempCount : " + this.tempProdCount)
    //this.invProduct = this.purcInvoice.at(0) as FormGroup;
    //this.purcInvoice.id = this.invoiceForm.get("id").value;
    this.saleInvoice.accountId = this.saleInvoiceForm.get("accountId").value;
    this.saleInvoice.payable = this.saleInvoiceForm.get("payable").value;
    this.saleInvoice.paid = this.saleInvoiceForm.get("paid").value;
    this.saleInvoice.customerId = this.saleInvoiceForm.get("customerId").value;
    this.saleInvoice.datetime = this.saleInvoiceForm.get("datetime").value;
    this.saleInvoice.freight = this.saleInvoiceForm.get("freight").value;
    this.saleInvoice.code = this.saleInvoiceForm.get("code").value;


    for (let i = 0; i <= this.tempProdCount; i++) {
      this.isProdAdded = false;

      this.saleInvDetailList.forEach((element, index) => {
        this.tempinvProduct = this.invoiceDetail.at(i) as FormGroup;
        let tempprodId = this.tempinvProduct.get("productId").value;

        console.log("index count : " + i + " qunty :" + this.tempinvProduct.get("quantity").value);

        if (element.productId == tempprodId) {
          element.quantity = this.tempinvProduct.get("quantity").value;
          element.salePrice = this.tempinvProduct.get("salePrice").value;
          this.isProdAdded = true;
        }

      });

      if (this.isProdAdded == false) {
        console.log("isProdAdded == false called");
        this.detail.sInvoiceId = this.saleInvoice.id;
        this.detail.productId = this.tempinvProduct.get("productId").value;
        this.detail.salePrice = this.tempinvProduct.get("salePrice").value;
        this.detail.quantity = this.tempinvProduct.get("quantity").value;
        this.saleInvDetailList.push(this.detail);
        this.isProdAdded = false;
      }
    }
    this.saleInvoice.sInvDetail = this.saleInvDetailList;
    console.log(this.saleInvoice);
    this.service.editSaleInv(pID, this.saleInvoice)
      .subscribe(pi => {
        console.log("purchase Invoice Edit called.")
      })
    this.formCustomRest();
    this.alert.success("Record updated successfully...", "Successful")

  }

  deleteInvoice(id: number) {

  }

  loadSInv() {
    this.formCustomRest();
    this.saleInvoiceForm.get("code").setValue(this.saleInvoice.code);
    this.saleInvoiceForm.get("customerId").setValue(this.saleInvoice.customerId);
    this.saleInvoiceForm.get("address").setValue(this.saleInvoice.customer.customerAddress);
    this.saleInvoiceForm.get("balance").setValue(this.saleInvoice.customer.customerCurrentbalance);
    this.saleInvoiceForm.get("contact").setValue(this.saleInvoice.customer.customerNumber);

    this.saleInvoiceForm.get("paid").setValue(this.saleInvoice.paid);
    this.saleInvoiceForm.get("discount").setValue(this.saleInvoice.discount);
    this.saleInvoiceForm.get("freight").setValue(this.saleInvoice.freight);
    let summary = this.saleInvoice.payable - this.saleInvoice.freight;
    this.saleInvoiceForm.get("summary").setValue(summary);
    this.saleInvoiceForm.get("payable").setValue(this.saleInvoice.payable);
    this.saleInvoiceForm.get("datetime").setValue(this.saleInvoice.datetime);
    this.saleInvoiceForm.get("accountId").setValue(this.saleInvoice.accountId);

    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    this.invoiceDetail.clear();

    this.saleInvDetailList.forEach((Element, index) => {
      console.log("TempCount : " + this.tempProdCount)
      this.tempProdCount += 1;
      this.invoiceDetail.push(this.generateRow());
      this.invProduct = this.invoiceDetail.at(index) as FormGroup;
      this.invProduct.get("productId").setValue(Element.productId);
      this.invProduct.get("quantity").setValue(Element.quantity);
      this.invProduct.get("salePrice").setValue(Element.salePrice);
      this.invProduct.get("total").setValue(Element.salePrice * Element.quantity);
      //Element.pInvoiceId = this.purcInvoice.id;
      //console.log(Element.pInvoiceId)
    });

    this.tempProdCount -= 1;

    this.isAddBtn = false;
    this.isEditBtn = true;
    this.isDeletBtn = true;
    this.isPrint = true;
  }

  PrintInvoice(invCode : string){
    this.dialog.open(SaleReciptComponent,{
      width:'30%',
      height:'600px',
      data:{
        title:'Print Invoice',
        branch: this.tempbranch.branchName,
        userName: this.tempuserName,
        invoiceCode: invCode
      }
    })
  }
}
