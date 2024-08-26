import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'listproduct', component: ListproductComponent},
  {path:'editproduct/:idProduct', component: EditproductComponent},
  {path: "createproduct", component: CreateproductComponent},
  {path: 'listaccount', component: ListaccountComponent},
  {path: 'editaccount/:idAccount', component: EditaccountComponent},
  {path: 'createaccount', component: CreateaccountComponent},
  {path: 'order/:idProduct', component: OrderComponent},
  {path: 'editorderdetaiil/:idOrderDetail', component: EditorderdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
