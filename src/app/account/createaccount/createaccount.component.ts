import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

enum RoleAccount {
  Manage = 1,
  User = 2
}
@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit{
  roless = ['Manage', 'User'];
  addAccount! : FormGroup;
  constructor(
    private proSrv: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addAccount = this.fb.group({
      fullNameAccount: ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấiếầ\s]+$/),],],
      emailAccount: ['',[Validators.required, Validators.email]],
      userNameAccount: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      passwordAccount: ['', [Validators.required,  Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒốÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲÝỴỶỸỳýỵỷỹƯăâêôơưừịấ\s \d]+$/)]],
      role: ['', [Validators.required]],
    });
  }
  onCreateAccount(){
    if (this.addAccount.invalid) {
      return;
    }
    // Lấy giá trị từ form
  const formValue = this.addAccount.value;

  // Chuyển đổi giá trị Role từ string sang number
  const statusRole = RoleAccount[formValue.role as keyof typeof RoleAccount];

  // Tạo đối tượng dữ liệu với giá trị Role đã chuyển đổi
  const accountData = {
    ...formValue,
    role: statusRole
  };

  this.proSrv.createAccount(accountData).subscribe(data => {
    console.log(data);
    if (confirm("You have added success!")) {
      this.router.navigate(['/listaccount']);
    }
  });
  }
}
