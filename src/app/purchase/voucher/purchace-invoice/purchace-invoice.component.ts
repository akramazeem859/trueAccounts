import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pInvoice } from 'src/app/Models/pInvoice.model';

import { Supplier } from 'src/app/Models/supplier.model';
import { pInvoiceDTO } from 'src/app/DTO/pInvoiceDTO.model';
import { CompanyService } from 'src/app/Services/company.service';

import { NotificationService } from 'src/app/Services/notification.service';
import { PInvDetailDTO } from 'src/app/DTO/p-inv-detail-dto';
import { DatePipe } from '@angular/common';
import { pInvDetail } from 'src/app/Models/pInvDetail.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { Observable, count, map, startWith } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import * as moment from 'moment';



declare var $ :any;


@Component({
  selector: 'app-purchace-invoice',
  templateUrl: './purchace-invoice.component.html',
  styleUrls: ['./purchace-invoice.component.css']
})
export class PurchaceInvoiceComponent implements OnInit {

  myControl = new FormControl('');
  options !: Supplier[];
  filteredOptions !: Observable<Supplier[]>;

  myControl2 = new FormControl('');
  options2 !: Product[];
  filteredOptions2: Observable<Product[]>[] = [];


  constructor(private builder: FormBuilder,
    private service: CompanyService,
    private router: Router,
    private alert: ToastrService,
    private notifyService: NotificationService) {    }


  invoiceDetail !: FormArray<any>;
  invProduct: FormGroup<any>;
  tempinvProduct: FormGroup<any>;
  productList: any;
  supplierList: Supplier[] = [];
  purcInvList: pInvoice[] = [];
  purcInvoice: pInvoice;
  purcInvDetailList: pInvDetail[] = [];
  cashAccountList: cashAccount[] = [];
  removeDetailId?: pInvDetail[] = [];
  purcCode: string = '';
  tempProdCount: number = 0;
  isProdAdded: boolean = false;
  tempbranchId: number;
  tempSupplier:Supplier;
  

  pInvoiceDTO: pInvoiceDTO = {
    id: 0,
    code: "",
    payable: 0,
    paid: 0,
    supplierId: 0,
    branchId: 0,
    freight: 0,

  };

  detail: PInvDetailDTO = {

    productId: 0,
    purchasePrice: 0,
    quantity: 0,
    pInvoiceId: 0
  }

  currentDT: Date;

  invoiceForm = new FormGroup({
    code: this.builder.control("PI202302"),
    supplierId: this.builder.control(null),
    date: this.builder.control(null),
    address: this.builder.control({ value:"", disabled:true}),
    contact: this.builder.control({ value: "", disabled: true }),
    balance: this.builder.control({ value: 0, disabled: true }),

    accountId: this.builder.control(null),
    paid: this.builder.control(null),
    freight: this.builder.control(0),
    summary: this.builder.control({ value: 0, disabled: true }),
    payable: this.builder.control(0),
    branchId: this.builder.control(0),
    detail: this.builder.array([])
  })

  isEditBtn: boolean = false;
  isDeletBtn: boolean = false;
  isAddBtn: boolean = true;

  ngOnInit(): void {

    this.tempbranchId = this.service.getbranchId(); 

    var today = new Date();
    var date = today.getDate()+'/'+ (today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(today);

    this.invoiceForm.get('date').setValue(today);

    this.getSuppliers();
    this.getProducts();
    //this.getPurchInv();
    //this.getProductStock()
    this.getAccounts();
    
    this.filteredOptions = this.invoiceForm.get('supplierId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filter(name as string, this.options) : this.options
      })
      //map(value => this.utils._filterItemSelector(value, this.suggestedSites))
    );

   
  }

  private _filter(value: string, sup: Supplier[]): Supplier[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.supplierName.toLowerCase().includes(filterValue));
    }
    else {
      return sup;
    }
  }


  ManageNameControl(index: number) {
    var arrayControl = this.invoiceForm.get('detail') as FormArray;
    this.filteredOptions2[index] = arrayControl.at(index).get('productId').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (typeof value === 'string') {
            return this._filter2(value.toLowerCase());
          } else {
            return this._filter2('');
          }
        })
      );
  }

  private _filter2(value: string): Product[] {
    const filterValue = value.toLocaleLowerCase();
    return this.options2.filter(option => option.productName.toLocaleLowerCase().includes(filterValue));
  }




  getSuppliers() {
    this.service.getBranchSuppliers(this.tempbranchId)
      .subscribe(sup => {
        this.supplierList = sup;
        this.options = sup;
        console.log('All suppliers' + sup);
      })
  }

  findSupplier(event) {
    let supId = this.invoiceForm.get("supplierId")?.value;
    console.log('event have :' + event);
    this.tempSupplier = this.supplierList.find(x=> x.id == supId);

        this.invoiceForm.get("address").setValue(this.tempSupplier.supplierAddress);
        this.invoiceForm.get("contact").setValue(this.tempSupplier.supplierNumber);
        this.invoiceForm.get("balance").setValue(this.tempSupplier.supplierCurrentbalance);
     
    console.log("find supplier = " + supId);
  }


  getProducts() {
    this.service.getAllProducts()
      .subscribe(pro => {
        this.productList = pro;
        this.options2 = pro;
        console.log('all products : '+this.options2);
      })
  }

  public getSupName(supId: any) {
    //return this.customerList.find(c => c.id === cusId).customerName;
    if (this.supplierList && this.supplierList.length > 0) {
      const supplier = this.supplierList.find((item) => item.id === supId);
      if (supplier) {
        return supplier.supplierName;
      }
    }
    return '';
  }

  public getProcductName(pId: any) {
    //return this.productList.find(c => c.id === pId).productName;
    if (this.productList && this.productList.length > 0) {
      const product = this.productList.find((item) => item.id === pId);
      if (product) {
        return product.productName;
      }
    }
    return '';
  }


  getAccounts() {
    this.service.getAllAccounts().subscribe(a => {
      this.cashAccountList = a.filter(x=> x.accountBranchId == this.tempbranchId );
      console.log(this.cashAccountList);
    })
  }

  findPurcInv() {

    //this.purcInvList.filter(item => item !== item);

    if (this.purcCode != '' || this.purcCode != undefined) {
      this.service.getPurchInvByCode(this.purcCode, this.tempbranchId)
        .subscribe(inv => {
          this.purcInvoice = inv;
          //this.purcInvDetailList = inv.detail;
          //this.purcInvList.push(inv);
          console.log("purchase invoice id = " + this.purcInvoice.id);

          this.service.getAllPurcInvDetail(this.purcInvoice.id)
            .subscribe(d => {
              this.purcInvDetailList = d;
              console.log("purchase detail : " + this.purcInvDetailList.length);
            })
        });
    }
    else {
      this.alert.error("Enter Valid Purchase Invoice Code", "Invalid Code");
    }

  }



  getPurchInv() {
    this.service.getAllPurcInv()
      .subscribe(pInv => {
        this.purcInvList = pInv;
      })
  }

 


  
  prodSelect(index: any) {
    
    this.invoiceDetail = this.invoiceForm.get('detail') as FormArray;
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
      else{
        this.tempProdCount = index;
      }
    }
      
    let purchasePrice = this.productList.find(x=> x.id == prodId).purchasePrice;

    this.invProduct.get("purchasePrice").setValue(purchasePrice);
    this.totalCalculation(index);
      
  }

  editInvoice() {
    let pID = this.purcInvoice.id;
    console.log("tempCount : " + this.tempProdCount)
    //this.invProduct = this.purcInvoice.at(0) as FormGroup;
    //this.purcInvoice.id = this.invoiceForm.get("id").value;
    this.purcInvoice.accountId = this.invoiceForm.get("accountId").value;
    this.purcInvoice.payable = this.invoiceForm.get("payable").value;
    this.purcInvoice.paid = this.invoiceForm.get("paid").value;
    this.purcInvoice.supplierId = this.invoiceForm.get("supplierId").value;
    this.purcInvoice.datetime = this.invoiceForm.get("date").value;
    this.purcInvoice.freight = this.invoiceForm.get("freight").value;
    this.purcInvoice.code = this.invoiceForm.get("code").value;


    let tempdetail = this.invoiceForm.get('detail') as FormArray;
    
    this.purcInvoice.pInvDetails = [];

    for(var i=0 ; i<tempdetail.controls.length; i++){
      this.tempinvProduct = this.invoiceDetail.at(i) as FormGroup;
      let detail = {
        pInvoiceId: this.purcInvoice.id,
        productId: this.tempinvProduct.get("productId").value,
        purchasePrice: this.tempinvProduct.get("purchasePrice").value,
        quantity: this.tempinvProduct.get("quantity").value
      };
      
      this.purcInvoice.pInvDetails.push(detail);
    }
    
    // for (let i = 0; i <= this.tempProdCount; i++) {
    //   this.isProdAdded = false;

    //   this.purcInvDetailList.forEach((element, index) => {
    //     this.tempinvProduct = this.invoiceDetail.at(i) as FormGroup;
    //     let tempprodId = this.tempinvProduct.get("productId").value;
  
    //     console.log("index count : " + i + " qunty :" + this.tempinvProduct.get("quantity").value);

    //     if (element.productId == tempprodId) {
    //       element.quantity = this.tempinvProduct.get("quantity").value;
    //       element.purchasePrice = this.tempinvProduct.get("purchasePrice").value;
    //       this.isProdAdded = true;
    //     }

    //   });

    //   if (this.isProdAdded == false) {
    //     console.log("isProdAdded == false called");
    //     this.detail.pInvoiceId = this.purcInvoice.id;
    //     this.detail.productId = this.tempinvProduct.get("productId").value;
    //     this.detail.purchasePrice = this.tempinvProduct.get("purchasePrice").value;
    //     this.detail.quantity = this.tempinvProduct.get("quantity").value;
    //     this.purcInvDetailList.push(this.detail);
    //     this.isProdAdded = false;
    //   }
    // }
    //this.purcInvoice.pInvDetails = this.purcInvDetailList;
    console.log(this.purcInvoice);
    this.service.editPurchInv(pID, this.purcInvoice)
    .subscribe(pi =>{
      console.log("purchase Invoice Edit called.")
    })
    this.formCustomRest();
    this.alert.success("Record updated successfully...", "Successful")
  }

  formCustomRest():void{
    this.invoiceForm.reset(); 
    this.invoiceForm.get('code').setValue('PI202302');
    this.invoiceForm.get('freight').setValue(0);

    if (this.invoiceDetail != undefined) {
       while (this.invoiceDetail.length !== 0) {
         this.invoiceDetail.removeAt(0)
       }
     }
 
     this.tempProdCount = 0;
 
  }

  totalCalculation(index: any) {
    this.invoiceDetail = this.invoiceForm.get('detail') as FormArray;
    this.invProduct = this.invoiceDetail.at(index) as FormGroup;
    let quantity = this.invProduct.get("quantity").value;
    let purPrice = this.invProduct.get("purchasePrice").value;
    let total = quantity * purPrice;

    this.invProduct.get("total").setValue(total);
    this.summaryCalculation();
  }

  summaryCalculation() {
    let priceArray = this.invoiceForm.getRawValue().detail;
    let sumTotal = 0;

    priceArray.forEach((item: any) => {
      sumTotal = sumTotal + item.total;
    });

    this.invoiceForm.get("summary").setValue(sumTotal);
    this.invoiceForm.get("paid").setValue(0);

    let freight = this.invoiceForm.get("freight").value;
    let gTotal = + freight + sumTotal;
    
    this.invoiceForm.get("payable").setValue(gTotal);
    this.invoiceForm.get("paid").setValue(0);
  }


  addProduct() {

    this.invoiceDetail = this.invoiceForm.get('detail') as FormArray;
    let supId = this.invoiceForm.get("supplierId")?.value;

    if (supId != null) {
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
      quantity: this.builder.control(1),
      purchasePrice: this.builder.control(0),
      total: this.builder.control(0)
    })
  }

  invProducts() {
    return this.invoiceForm.get('detail') as FormArray;
  }

  saveInvoice() {
    const formattedDate = moment(this.invoiceForm.get('date').value).utcOffset(5).format();
    this.invoiceForm.get('date').setValue(formattedDate);
    
    //this.invoiceForm.reset();
    let pId = 0;
    var today = new Date();

    this.invoiceForm.get('branchId').setValue(this.tempbranchId);

    console.log(this.invoiceForm.value);
    
    this.service.addPInvoice(this.invoiceForm.value).subscribe(inv => {
      pId = inv.id;
      console.log(pId);
      this.formCustomRest();
      this.invoiceForm.get('date').setValue(today);
      this.alert.success("Record saved successfully...", "Successful")
      
    })

  }



  removeRow(index: number) {
    // this.removeDetailId.push(this.purcInvDetailList[index]);
    // console.log(this.removeDetailId)
    // this.invoiceDetail.removeAt(index);
    // this.summaryCalculation();
    // this.tempProdCount -= 1;

    this.invoiceDetail.removeAt(index);
    this.summaryCalculation();
    this.tempProdCount -= 1;
  }

  deleteInvoice(id: any) {

  }

  loadPInv() {
    this.formCustomRest();
    this.invoiceForm.get("code").setValue(this.purcInvoice.code);
    this.invoiceForm.get("supplierId").setValue(this.purcInvoice.supplierId);
    this.invoiceForm.get("address").setValue(this.purcInvoice.supplier.supplierAddress);
    this.invoiceForm.get("balance").setValue(this.purcInvoice.supplier.supplierCurrentbalance);
    this.invoiceForm.get("contact").setValue(this.purcInvoice.supplier.supplierNumber);

    this.invoiceForm.get("paid").setValue(this.purcInvoice.paid);
    this.invoiceForm.get("freight").setValue(this.purcInvoice.freight);
    let summary = this.purcInvoice.payable - this.purcInvoice.freight;
    this.invoiceForm.get("summary").setValue(summary);
    this.invoiceForm.get("payable").setValue(this.purcInvoice.payable);
    this.invoiceForm.get("date").setValue(this.purcInvoice.datetime);
    this.invoiceForm.get("accountId").setValue(this.purcInvoice.accountId);

    this.invoiceDetail = this.invoiceForm.get('detail') as FormArray;
    this.invoiceDetail.clear();

    this.purcInvDetailList.forEach((Element, index) => {
      console.log("TempCount : " + this.tempProdCount)
      this.tempProdCount += 1;
      this.invoiceDetail.push(this.generateRow());
      this.invProduct = this.invoiceDetail.at(index) as FormGroup;
      this.invProduct.get("productId").setValue(Element.productId);
      this.invProduct.get("quantity").setValue(Element.quantity);
      this.invProduct.get("purchasePrice").setValue(Element.purchasePrice);
      this.invProduct.get("total").setValue(Element.purchasePrice * Element.quantity);
      //Element.pInvoiceId = this.purcInvoice.id;
      //console.log(Element.pInvoiceId)
    });

    this.tempProdCount -= 1;

    this.isAddBtn = false;
    this.isEditBtn = true;
    this.isDeletBtn = true;
  }

}
