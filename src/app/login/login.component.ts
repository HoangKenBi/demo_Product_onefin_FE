import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private proSrv: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.proSrv.login(this.username, this.password).subscribe(response => {
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          // Kiểm tra vai trò và điều hướng tương ứng
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (user.role === 'Manage') {
            this.router.navigate(['/dashboard']);
          } else if (user.role === 'User') {
            this.router.navigate(['/home']);
          }
        }
      });
    }
  }

}
