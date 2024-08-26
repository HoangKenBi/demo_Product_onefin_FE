import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProductService } from 'src/app/product.service';

enum StatusProduct {
  Active = 1,
  Inactive = 2
}
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit{
  idProduct: number = 0;

  roles = ['Active', 'Inactive'];
  editProduct!: FormGroup;

  constructor(
    private proSrv: ProductService,
    private router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.editProduct = this.fb.group({
      idProduct: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      nameProduct: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      priceProduct: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      quantityProduct: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      imgProduct: ['', [Validators.required]],
      statusProduct: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.idProduct = this._route.snapshot.params['idProduct'];
    this.proSrv.getOneProduct(this.idProduct).subscribe(data => {
      this.editProduct.setValue({
        idProduct : data.idProduct,
        nameProduct: data.nameProduct,
        priceProduct: data.priceProduct,
        quantityProduct: data.quantityProduct,
        imgProduct: data.imgProduct,
        statusProduct: this.getRoleFromValue(data.statusProduct)
      });
    });
  }

  getRoleFromValue(value: number): string {
    switch (value) {
      case StatusProduct.Active:
        return 'Active';
      case StatusProduct.Inactive:
        return 'Inactive';
      default:
        return '';
    }
  }

  getStatusValue(status: string): number {
    switch (status) {
      case 'Active':
        return StatusProduct.Active;
      case 'Inactive':
        return StatusProduct.Inactive;
      default:
        return 0;
    }
  }

  onUpdateProduct(){
    if (this.editProduct.invalid) {
      return;
    }
    // Chuyển đổi giá trị statusProduct từ chữ sang số
    const formValue = this.editProduct.value;
    const updatedProductData = {
      ...formValue,
      statusProduct: this.getStatusValue(formValue.statusProduct)
    };
    this.proSrv.updateProduct(this.idProduct, updatedProductData)
    .pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        // Kiểm tra lỗi và thông báo lỗi cho người dùng
        if (error.status === 400 && error.error === 'ID mismatch') {
          alert('An error occurred while updating the product');
        } else {
          alert('ID inappropriate!');
        }
        return (error);
      })
    )
    .subscribe(data => {
      console.log(data);
      if (confirm("You have successfully updated!")) {
        this.router.navigate(['/listproduct']);
      }
    });
  } 
}


