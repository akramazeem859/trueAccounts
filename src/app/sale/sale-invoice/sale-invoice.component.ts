import { Inventory } from 'src/app/Models/inventory.model';
import { Product } from 'src/app/Models/product.model';
import { cashAccount } from 'src/app/Models/cashAccount.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Models/customer.model';
import { CompanyService } from 'src/app/Services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.css']
})
export class SaleInvoiceComponent implements OnInit {



  /**
   *
   */
  constructor(private builder: FormBuilder,
    private router: Router,
    private service: CompanyService,
    private alert: ToastrService) {

  }

  customerList: Customer[] = [];
  cashAccountList: cashAccount[] = [];
  invoiceDetail: FormArray<any>;
  productList: Product[] = [];
  invProduct: FormGroup<any>;
  tempinvProduct: FormGroup<any>;
  tempProdCount: number = 0;


  public saleInvoiceForm = new FormGroup({
    code: this.builder.control("PI202302"),
    customerId: this.builder.control(null),
    date: this.builder.control(null),
    address: this.builder.control({ value: "", disabled: true }),
    contact: this.builder.control({ value: "", disabled: true }),
    balance: this.builder.control({ value: 0, disabled: true }),

    detail: this.builder.array([]),

    accountId: this.builder.control(null),
    paid: this.builder.control(null),
    freight: this.builder.control(0),
    summary: this.builder.control({ value: 0, disabled: true }),
    payable: this.builder.control(0),

  })

  isEditBtn: boolean = false;
  isDeletBtn: boolean = false;
  isAddBtn: boolean = true;


  ngOnInit(): void {
    this.getAllCustomer();
    this.getAllAccounts();
    this.getAllProducts();
  }
  saveInvoice() {
      console.log(this.saleInvoiceForm.value);
      //this.invoiceForm.reset();
      let sId = 0;
      this.service.addSInvoice(this.saleInvoiceForm.value).subscribe(inv => {
        sId = inv.id;
        console.log("saleInvoice Id :"+sId);
        this.formCustomRest();
        this.alert.success("Record saved successfully...", "Successful")
        
      })
  }

  formCustomRest():void{
    this.saleInvoiceForm.reset(); 
    this.saleInvoiceForm.get('code').setValue('PI202302');
    this.saleInvoiceForm.get('freight').setValue(0);
    
    while (this.invoiceDetail.length !== 0) {
      this.invoiceDetail.removeAt(0)
    }
    this.tempProdCount = 0;
     
     //this.tempProdCount = 0;
     //this.pInvoiceDTO = null;
  }

  getAllCustomer() {
    this.service.getAllCustomers().subscribe(cus => {
      this.customerList = cus;
      console.log("Customer List :" + this.customerList);
    })
  }
  getAllAccounts() {
    this.service.getAllAccounts().subscribe(acc => {
      this.cashAccountList = acc;
      console.log("Account List :" + this.cashAccountList);
    })
  }
  findCustomer() {
    let cusId = this.saleInvoiceForm.get("customerId")?.value;

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
      console.log("Product List" + this.productList);
    })
  }
  
  
  addProduct() {

    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    let cusId = this.saleInvoiceForm.get('customerId')?.value;

    if (cusId != null) {
      this.invoiceDetail.push(this.generateRow());
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
      else{
        this.tempProdCount = index;
      }
    }
    this.service.getProduct(prodId)
      .subscribe(prod => {
        this.invProduct.get("salePrice").setValue(prod.salePrice);
        this.totalCalculation(index);
      })
    this.service.getProdInvt(prodId,1)
    .subscribe(avail =>{
      console.log(avail);
      this.invProduct.get("available").setValue(avail);
      if(avail == 0){
        this.alert.warning("Product not available at this time.",'Stock not Available',)
      }
    })
      
    
  }

  totalCalculation(index: any) {
    this.invoiceDetail = this.saleInvoiceForm.get('detail') as FormArray;
    this.invProduct = this.invoiceDetail.at(index) as FormGroup;
    let quantity = this.invProduct.get("quantity").value;
    let salePrice = this.invProduct.get("salePrice").value;
    let total = quantity * salePrice;

    this.invProduct.get("total").setValue(total);
    this.summaryCalculation();
  }


  summaryCalculation() {
    let priceArray = this.saleInvoiceForm.getRawValue().detail;
    let sumTotal = 0;

    priceArray.forEach((item: any) => {
      sumTotal = sumTotal + item.total;
    });

    this.saleInvoiceForm.get("summary").setValue(sumTotal);
    this.saleInvoiceForm.get("paid").setValue(sumTotal);

    let freight = this.saleInvoiceForm.get("freight").value;
    let gTotal = + freight + sumTotal;

    this.saleInvoiceForm.get("payable").setValue(gTotal);
    this.saleInvoiceForm.get("paid").setValue(gTotal);
  }

  removeRow(index: any) {

    this.invoiceDetail.removeAt(index);
    this.summaryCalculation();
    this.tempProdCount -= 1;
  }

  editInvoice() {

  }

  deleteInvoice(id: number) {

  }
}
