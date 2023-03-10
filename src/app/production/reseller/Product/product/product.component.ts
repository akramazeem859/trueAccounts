import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/Models/brand.model';
import { Product } from 'src/app/Models/product.model';
import { CompanyService } from 'src/app/Services/company.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  @ViewChild('addProductForm',{static :  false}) addProductform: NgForm

  productList$ : Product[] = [];
  brandList : Brand[] = [];

  productRequest : Product = {
    id: 0,
    productName: '',
    unit: '',
    image: '',
    salePrice : 0,
    purchasePrice: 0,
    brandId: 0,
    brand: {
      id: 0,
      brandName: '',
      contactNumber: ''
    }
  };

  productImage: any;
  file : File  = null;
  productCode : any;

  isEditBtn : boolean = false;
  isDeletBtn: boolean = false;
  isAddBtn: boolean = true;

  constructor(private service:CompanyService, 
    private alert: ToastrService,
    private notifyService: NotificationService) {  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllProducts();
    this.service.RefreshRequired.subscribe(response => {
     this.getAllProducts();
     
    })

    
  }

  getAllProducts(){
    this.service.getAllProducts().subscribe({
      next: (prod) => {
        this.productList$ = prod;
        console.log(prod);
      }
    })
  }

  getAllBrands(){
    this.service.getAllBrands().subscribe({
      next: (brnd) => {
        this.brandList = brnd;
      }
    })

  }

  uploadImage(code:any , image:any){
    this.productImage = image;
    this.productCode = code;
  }

  onFileSelected(event : any) {
    
    let reader = new FileReader();
    this.file = event.target.files[0];
    this.productImage = event.target.files[0];
    this.productCode = event.target.files[0].name;
    this.productRequest.image = this.productCode
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.productImage = reader.result;
    };
  }

  addProduct(){
      const formdata : FormData = new FormData();
      formdata.append('file',this.file,this.productCode);
      this.service.uploadImage(formdata).subscribe(
        (image) => {
          console.log("file uploaded" + image);
        }
      )
      this.service.addProduct(this.productRequest).subscribe({
        next: (response) => {
          console.log("upload function called...")
          this.addProductform.resetForm();
        }
      });
      this.getAllProducts();
      this.alert.success("New Product Added Successfully.", "Successfull");
  }
  getProductById(id:any){
    this.service.getProduct(id).subscribe({
      next: (prod) => {
        this.productRequest = prod;
        this.isEditBtn = true;
        this.isDeletBtn = true;
      }
    })
  }
  editProduct(){
    if(confirm("Are you sure to edit this record?"))
    this.service.editProduct(this.productRequest.id, this.productRequest).subscribe({
      next: (prod) => {
        console.log("product edited");
        this.getAllProducts();
        this.alert.success("Product Edited Successfully");

      }
    })
  }

  deleteProduct(id:any){
    if(confirm("Are you sure to Delete this record?"))
    this.service.deleteProduct(id).subscribe({
      next: (prod) => {
          this.getAllProducts();
      }
    })
  }

  reset(){
    
  }


}
