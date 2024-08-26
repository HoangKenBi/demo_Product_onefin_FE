import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProductService } from 'src/app/product.service';

enum RoleAccount {
  Manage = 1,
  User = 2
}
@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit{
  idAccount: number = 0;
  roless = ['Manage', 'User'];
  editAccount!: FormGroup;
  
  constructor(
    private proSrv: ProductService,
    private router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.editAccount = this.fb.group({
      idAccount: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      fullNameAccount: ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấiếầ\s]+$/),],],
      emailAccount: ['',[Validators.required, Validators.email]],
      userNameAccount: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      passwordAccount: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.idAccount = this._route.snapshot.params['idAccount'];
    this.proSrv.getOneAccount(this.idAccount).subscribe(data => {
      this.editAccount.setValue({
        idAccount : data.idAccount,
        fullNameAccount: data.fullNameAccount,
        emailAccount: data.emailAccount,
        userNameAccount: data.userNameAccount,
        passwordAccount: data.passwordAccount,
        role: this.getRoleFrom(data.role)
        
      });
    });
  }
  getRoleFrom(value: number): string {
    switch (value) {
      case RoleAccount.Manage:
        return 'Manage';
      case RoleAccount.User:
        return 'User';
      default:
        return '';
    }
  }

  getRoleValue(status: string): number {
    switch (status) {
      case 'Manage':
        return RoleAccount.Manage;
      case 'User':
        return RoleAccount.User;
      default:
        return 0;
    }
  }
  onUpdateAccount(){
    if (this.editAccount.invalid) {
      return;
    }
    // Chuyển đổi giá trị Role từ chữ sang số
    const formValue = this.editAccount.value;
    const updatedAccountData = {
      ...formValue,
      role: this.getRoleValue(formValue.role)
    };

    this.proSrv.updateAccount(this.idAccount, updatedAccountData)
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
        this.router.navigate(['/listaccount']);
      }
    });
  }
}
