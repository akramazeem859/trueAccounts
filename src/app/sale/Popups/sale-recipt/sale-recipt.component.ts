import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalereturnComponent } from '../../voucher/salereturn/salereturn.component';
import { sInvoice } from 'src/app/Models/sInvoice.model';
import { CompanyService } from 'src/app/Services/company.service';
import { sInvDetail } from 'src/app/Models/sInvDetail.model';

@Component({
  selector: 'app-sale-recipt',
  templateUrl: './sale-recipt.component.html',
  styleUrls: ['./sale-recipt.component.css']
})
export class SaleReciptComponent implements OnInit {


inputdata:any;
invoicecode: string ='SI2023070003'; 
tempInvoice: sInvoice;
sInvDetail:sInvDetail[];
myUAN :string ='';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any , 
    private ref:MatDialogRef<SalereturnComponent>,
    private service : CompanyService) {  }

  ngOnInit(): void {
   this.inputdata = this.data;
   this.invoicecode = this.data.invoiceCode;
    alert(this.invoicecode);
   this.service.getSaleInvByCode(this.invoicecode).subscribe({
    next:(res)=>{
      this.tempInvoice = res;
      //this.sInvDetail = res.sInvDetail;
      console.log(res);

      this.myUAN = res.branch.uan; 
      
      this.service.getAllSaleInvDetail(this.tempInvoice.id).subscribe(x=>{
        this.sInvDetail = x; 
      
       })
    
    },
    error:(err)=>{
      //alert("Something went wrong.")
    }
   })

   
  }
}
