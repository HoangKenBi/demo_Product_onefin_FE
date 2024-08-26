import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

type DistrictData = {
  [province: string]: string[];
};
type WardData = {
  [district: string]: string[];
};

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  pro: any;
  totalQuantity : number = 1;
  totalPrice: any;
  constructor(private proSrv: ProductService, private router: Router, private fb: FormBuilder, private _route: ActivatedRoute){}

  addFormOrder!: FormGroup;

  provinces: string[] = ['Hà Nội', 'Hồ Chí Minh']; 
  districts: string[] = [];
  wards: string[] = [];
  fullAddress: string = '';
  districtData: DistrictData = {
    'Hà Nội': ['Bắc Từ Liêm', 'Hoàn Kiếm','Nam Từ Liêm'],
    'Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Thủ Đức'],
  };
  wardData: WardData = {
    'Bắc Từ Liêm': ['Đông Ngạc', 'Xuân Đỉnh','Cổ Nhuế 1'],
    'Hoàn Kiếm': ['Hàng Bạc', 'Hàng Đào', 'Hàng Mã'],
    'Nam Từ Liêm': ['Mỹ Đình', 'Mễ Trì','Tây Mỗ'],
    'Quận 1': ['Bến Nghé', 'Đa Kao', 'Hàm Nghi'],
    'Quận 2': ['An Phú', 'An Lợi Đông', 'An Bình'],
    'Thủ Đức': ['Linh Xuân', 'Linh Trung', 'Linh Chiểu'],
  };

  ngOnInit(): void {
    this.addFormOrder = this.fb.group({
      nameOrder: ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s]+$/),],],
      phoneOrder: ['',[Validators.required, Validators.pattern(/^0+[0-9]{9}$/)],],
      emailOrder: ['', [Validators.required, Validators.email]],
      addressOrder: ['', [Validators.required]],
      provinceOrder: ['', Validators.required],
      districtOrder: ['', Validators.required],
      wardOrder: ['', Validators.required],
      idProduct: [null], // Thêm idProduct để gửi cùng đơn hàng
      totalQuantity: [null], // Thêm tổng số lượng sản phẩm để gửi cùng đơn hàng
      totalPrice: [null] // Thêm tổng số tiền để gửi cùng đơn hàng
    }); 
    this._route.paramMap.subscribe(params => {
      const id = params.get('idProduct');
      if (id) {
        this.getProductDetails(+id);
      } else {
        console.error('Product ID is null');
      }
    }); 
    this.addFormOrder.get('totalQuantity')?.valueChanges.subscribe(value => {
      this.calculateTotalPrice();
    });
  }

  onProvinceChange(event: any): void {
    const selectedProvince = event.target.value as string;
    this.districts = this.districtData[selectedProvince] || [];
    this.wards = [];
    this.fullAddress = selectedProvince;
    this.addFormOrder.patchValue({ districtOrder: '', wardOrder: '', addressOrder: this.fullAddress });
  }
  onDistrictChange(event: any): void {
    const selectedDistrict = event.target.value as keyof WardData;
    this.wards = this.wardData[selectedDistrict] || [];
    this.fullAddress = `${this.addFormOrder.value.provinceOrder} - ${selectedDistrict}`;
    this.addFormOrder.patchValue({ wardOrder: '', addressOrder: this.fullAddress });
  }
  onWardChange(): void {
    this.fullAddress = `${this.addFormOrder.value.provinceOrder} - ${this.addFormOrder.value.districtOrder} - ${this.addFormOrder.value.wardOrder}`;
    this.addFormOrder.patchValue({ addressOrder: this.fullAddress });
  }

  getProductDetails(idProduct: number): void {
    this.proSrv.getOneProduct(idProduct).subscribe(
      data => {
        this.pro = data;
          // Cập nhật idProduct và quantity trong form với dữ liệu lấy được từ Product
          this.addFormOrder.patchValue({
            idProduct: this.pro.idProduct,
            totalQuantity: this.totalQuantity || 0  // Đặt giá trị mặc định cho số lượng nếu chưa có
          });        
          this.calculateTotalPrice();
      },
      error => {
        console.error('Error fetching product details', error);
      }
    );
  }
  validateQuantity(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const maxQuantity = this.pro.quantityProduct;
    let value = Number(inputElement.value);
  // Ngăn người dùng nhập giá trị nhỏ hơn 1
  if (value < 1) {
    value = 1;
  }
  // Giới hạn giá trị không vượt quá quantityProduct
  if (value > maxQuantity) {
    value = maxQuantity;
  }
  inputElement.value = String(value);
  }
  
  calculateTotalPrice(): void {
    this.totalQuantity = this.addFormOrder.get('totalQuantity')?.value || 1; // Lấy giá trị mới nhất của totalQuantity
    this.totalPrice = this.totalQuantity * this.pro.priceProduct; // Tính tổng số tiền
    this.addFormOrder.patchValue({ totalPrice: this.totalPrice }); // Cập nhật giá trị totalPrice trong form
  }
  onCreateOrder(){
    if (this.addFormOrder.invalid) {
      return;
    }
    const orderFormData = this.addFormOrder.value;
    
        const combinedData = {
          idOrderDetail: 0,  
          idProduct: this.pro.idProduct,
          totalQuantity: this.totalQuantity,
          totalPrice: this.totalPrice,  
          Order: {
            nameOrder: orderFormData.nameOrder,
            phoneOrder: orderFormData.phoneOrder,
            emailOrder: orderFormData.emailOrder,
            addressOrder: orderFormData.addressOrder
          },
          statusOrderDetail: 1,
        };
        this.proSrv.createOrderDetail(combinedData).subscribe(data =>{
          console.log(data);
          if (confirm('Order created successfully!')) {
            this.router.navigate(['/home']);
          }
        },
      );
    };
}
