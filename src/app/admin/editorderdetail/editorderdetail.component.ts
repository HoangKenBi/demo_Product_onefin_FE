import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProductService } from 'src/app/product.service';
enum StatusOrderDetail {
  Open = 1,
  Approved = 2,
  Declined = 3,
  Cancelled = 4
}
@Component({
  selector: 'app-editorderdetail',
  templateUrl: './editorderdetail.component.html',
  styleUrls: ['./editorderdetail.component.css']
})
export class EditorderdetailComponent implements OnInit{
  idOrderDetail: number = 0;  
  status = ['Open', 'Approved', 'Declined', 'Cancelled'];
  editOrderDetail! : FormGroup;
  constructor(private proSrv: ProductService, private router: Router, private _route: ActivatedRoute, private fb: FormBuilder)
  {
    this.editOrderDetail = this.fb.group({
      idOrderDetail : ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      nameProduct: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      priceProduct: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      imgProduct: ['', [Validators.required]],
      nameOrder: ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s]+$/),],],
      phoneOrder: ['',[Validators.required, Validators.pattern(/^0+[0-9]{9}$/)],],
      emailOrder: ['', [Validators.required, Validators.email]],
      addressOrder: ['', [Validators.required]],
      totalQuantity: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      totalPrice: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      statusOrderDetail: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.idOrderDetail = this._route.snapshot.params['idOrderDetail'];
    this.proSrv.getOneOrderDetail(this.idOrderDetail).subscribe(data =>{
      this.editOrderDetail.setValue({
        idOrderDetail: data.idOrderDetail,
        nameProduct: data.nameProduct,
        priceProduct: data.priceProduct,
        imgProduct: data.imgProduct,
        nameOrder: data.nameOrder,
        phoneOrder: data.phoneOrder,
        emailOrder: data.emailOrder,
        addressOrder: data.addressOrder,
        totalQuantity: data.totalQuantity,
        totalPrice: data.totalPrice,
        statusOrderDetail: this.getStatusFromValue(data.statusOrderDetail)
      });
    });
  }
  getStatusFromValue(value: number): string{
    switch (value) {
      case StatusOrderDetail.Open:
        return 'Open';
      case StatusOrderDetail.Approved:
        return 'Approved';
      case StatusOrderDetail.Declined:
        return 'Declined';
      case StatusOrderDetail.Cancelled:
        return 'Cancelled';
      default:
        return '';
    }
  }
  getStatusValue(status: string): number{
    switch (status) {
      case 'Open':
        return StatusOrderDetail.Open;
      case 'Approved':
        return StatusOrderDetail.Approved;
      case 'Declined':
        return StatusOrderDetail.Declined;
      case 'Cancelled':
        return StatusOrderDetail.Cancelled;
      default:
        return 0;
    }
  }

  onUpdateOrderDetail(){
    if (this.editOrderDetail.invalid) {
      return;
    }
    // Chuyển đổi giá trị statusProduct từ chữ sang số
    const formValue = this.editOrderDetail.value;
    const updateOrderDetailData = {
      ...formValue,
      statusOrderDetail: this.getStatusValue(formValue.statusOrderDetail)
    };
    this.proSrv.updateOrderDetail(this.idOrderDetail, updateOrderDetailData)
    .pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        // Kiểm tra lỗi và thông báo lỗi cho người dùng
        if (error.status === 400 && error.error === 'ID mismatch') {
          alert('An error occurred while updating the Orderdetail');
        } else {
          alert('ID inappropriate!');
        }
        return (error);
      })
    )
    .subscribe(data => {
      console.log(data);
      if (confirm("You have successfully updated!")) {
        this.router.navigate(['/dashboard']);
      }
    });
  } 
}

