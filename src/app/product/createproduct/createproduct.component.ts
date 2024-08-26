import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { StatusProduct } from './statust-product.enum';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit{
  roles = ['Active', 'Inactive'];
  constructor(
    private proSrv: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  addProduct!: FormGroup;

  ngOnInit(): void {
    this.addProduct = this.fb.group({
      nameProduct: ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/),],],
      priceProduct: ['',[Validators.required, Validators.pattern(/^\d*$/)]],
      quantityProduct: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      imgProduct: ['', [Validators.required]],
      statusProduct: ['', [Validators.required]],
    });
  }
  onCreateProductt(){
    if (this.addProduct.invalid) {
      return;
    }
    // Lấy giá trị từ form
  const formValue = this.addProduct.value;

  // Chuyển đổi giá trị statusProduct từ string sang number
  const statusProductNum = StatusProduct[formValue.statusProduct as keyof typeof StatusProduct];

  // Tạo đối tượng dữ liệu với giá trị statusProduct đã chuyển đổi
  const productData = {
    ...formValue,
    statusProduct: statusProductNum
  };

  this.proSrv.createProduct(productData).subscribe(data => {
    console.log(data);
    if (confirm("You have added success!")) {
      this.router.navigate(['/listproduct']);
    }
  });
  }
}
