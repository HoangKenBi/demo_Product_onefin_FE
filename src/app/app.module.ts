import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { CreateproductComponent } from './product/createproduct/createproduct.component';
import { ListaccountComponent } from './account/listaccount/listaccount.component';
import { EditaccountComponent } from './account/editaccount/editaccount.component';
import { CreateaccountComponent } from './account/createaccount/createaccount.component';
import { OrderComponent } from './user/order/order.component';
import { EditorderdetailComponent } from './admin/editorderdetail/editorderdetail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ListproductComponent,
    EditproductComponent,
    CreateproductComponent,
    ListaccountComponent,
    EditaccountComponent,
    CreateaccountComponent,
    OrderComponent,
    EditorderdetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
