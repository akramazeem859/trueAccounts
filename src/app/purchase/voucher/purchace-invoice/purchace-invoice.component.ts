import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pInvoice } from 'src/app/Models/pInvoice.model';

import { Supplier } from 'src/app/Models/suppliet.model';
import { pInvoiceDTO } from 'src/app/DTO/pInvoiceDTO.model';
import { CompanyService } from 'src/app/Services/company.service';

import { NotificationService } from 'src/app/Services/notification.service';
import { PInvDetailDTO } from 'src/app/DTO/p-inv-detail-dto';
import { DatePipe } from '@angular/common';
import { pInvDetail } from 'src/app/Models/pInvDetail.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { count } from 'rxjs';


declare var $ :any;


@Component({
  selector: 'app-purchace-invoice',
  templateUrl: './purchace-invoice.component.html',
  styleUrls: ['./purchace-invoice.component.css']
})
export class PurchaceInvoiceComponent implements OnInit {

  /**
   *
   */


  constructor(private builder: FormBuilder,
    private service: CompanyService,
    private router: Router,
    private alert: ToastrService,
    private notifyService: NotificationService) { }


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
    detail: this.builder.array([])
  })

  isEditBtn: boolean = false;
  isDeletBtn: boolean = false;
  isAddBtn: boolean = true;

  ngOnInit(): void {
    var today = new Date();
    var date = today.getDate()+'/'+ (today.getMonth()+1)+'/'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(today);

    $('input[name="dates"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      timePicker: true,
      minYear: 2022,
      maxYear: today.getFullYear()
    });
    

    this.invoiceForm.get('date').setValue(dateTime);
    this.getSuppliers();
    this.getProducts();
    //this.getPurchInv();
    //this.getProductStock()
    this.getAccounts();
    
   
  }

  getAccounts() {
    this.service.getAllAccounts().subscribe(a => {
      this.cashAccountList = a;
      console.log(this.cashAccountList);
    })
  }

  findPurcInv() {

    //this.purcInvList.filter(item => item !== item);

    if (this.purcCode != '' || this.purcCode != undefined) {
      this.service.getPurchInvByCode(this.purcCode)
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

  getSuppliers() {
    this.service.getAllSupplier()
      .subscribe(sup => {
        this.supplierList = sup;
        console.log(sup);
      })
  }
  getProducts() {
    this.service.getAllProducts()
      .subscribe(pro => {
        this.productList = pro;
        console.log(pro);
      })
  }


  findSupplier() {
    let supId = this.invoiceForm.get("supplierId")?.value;

    this.service.getSupplier(supId)
      .subscribe(sup => {
        this.invoiceForm.get("address").setValue(sup.supplierAddress);
        this.invoiceForm.get("contact").setValue(sup.supplierNumber);
        this.invoiceForm.get("balance").setValue(sup.supplierCurrentbalance);
      })
    console.log("find supplier = " + supId);
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
    this.service.getProduct(prodId)
      .subscribe(prod => {
        this.invProduct.get("purchasePrice").setValue(prod.purchasePrice);
        this.totalCalculation(index);
      })
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


    for (let i = 0; i <= this.tempProdCount; i++) {
      this.isProdAdded = false;

      this.purcInvDetailList.forEach((element, index) => {
        this.tempinvProduct = this.invoiceDetail.at(i) as FormGroup;
        let tempprodId = this.tempinvProduct.get("productId").value;
  
        console.log("index count : " + i + " qunty :" + this.tempinvProduct.get("quantity").value);

        if (element.productId == tempprodId) {
          element.quantity = this.tempinvProduct.get("quantity").value;
          element.purchasePrice = this.tempinvProduct.get("purchasePrice").value;
          this.isProdAdded = true;
        }

      });

      if (this.isProdAdded == false) {
        console.log("isProdAdded == false called");
        this.detail.pInvoiceId = this.purcInvoice.id;
        this.detail.productId = this.tempinvProduct.get("productId").value;
        this.detail.purchasePrice = this.tempinvProduct.get("purchasePrice").value;
        this.detail.quantity = this.tempinvProduct.get("quantity").value;
        this.purcInvDetailList.push(this.detail);
        this.isProdAdded = false;
      }
    }
    this.purcInvoice.pInvDetails = this.purcInvDetailList;
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
    for (let i = 0; i <= this.tempProdCount; i++) {
      this.invoiceDetail.removeAt(i);
     }
     this.tempProdCount = 0;
     this.pInvoiceDTO = null;
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
    this.invoiceForm.get("paid").setValue(sumTotal);

    let freight = this.invoiceForm.get("freight").value;
    let gTotal = + freight + sumTotal;
    
    this.invoiceForm.get("payable").setValue(gTotal);
    this.invoiceForm.get("paid").setValue(gTotal);
  }


  addProduct() {

    this.invoiceDetail = this.invoiceForm.get('detail') as FormArray;
    let supId = this.invoiceForm.get("supplierId")?.value;

    if (supId != null) {
      this.invoiceDetail.push(this.generateRow());
    }
    else {
      this.alert.warning('Please select Supplier first.', 'Validation')
    }
  }

  invProducts() {
    return this.invoiceForm.get('detail') as FormArray;
  }

  generateRow() {
    return this.builder.group({
      productId: this.builder.control(''),
      quantity: this.builder.control(1),
      purchasePrice: this.builder.control(0),
      total: this.builder.control(0)
    })
  }

  saveInvoice() {
    console.log(this.invoiceForm.value);
    //this.invoiceForm.reset();
    let pId = 0;
    this.service.addPInvoice(this.invoiceForm.value).subscribe(inv => {
      pId = inv.id;
      console.log(pId);
      this.formCustomRest();
      this.alert.success("Record saved successfully...", "Successful")
      
    })

  }



  removeRow(index: number) {
    this.removeDetailId.push(this.purcInvDetailList[index]);
    console.log(this.removeDetailId)
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
