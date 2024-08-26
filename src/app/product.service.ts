import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:44367/';
  constructor(private http: HttpClient) { }
  private loginUrl = this.baseUrl+'api/Accounts/login';
    // Login
    login(username: string, password: string): Observable<any>{
      const body = { username, password }; // Đảm bảo cấu trúc dữ liệu đún
      return this.http.post<any>(this.loginUrl, body).pipe(
        map(response => {
          localStorage.setItem('user', JSON.stringify(response));
          return response;
        }),
        catchError(() =>{
          return of({error: 'Login false'});
        })
      );
    }
    
    //GetAll Account
    getListAccount(): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Accounts')
    }
    //Add Account
    createAccount(data: any): Observable<any>{
      return this.http.post<any>(this.baseUrl+'api/Accounts', data)
    }
    // GetOne Account
    getOneAccount(idAccount: number): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Accounts/' + idAccount)
    }
    //Edit Account
    updateAccount(idAccount: number, data: any): Observable<any>{
      return this.http.put<any>(this.baseUrl+'api/Accounts/' + idAccount, data).pipe(
        catchError(error => {
          return (error);
        })
      );
    }
    //Delete Account
    deleteAccount(idAccount: number): Observable<any>{
      return this.http.delete<any>(this.baseUrl+'api/Accounts/' + idAccount)
    }
    // Search Account
    SearchAccount(search: string): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Accounts/search' + "?search=" + search)
    }
    // SortBy Account
    AscAccount(sort: string): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Accounts/search' + "?sortBy=" + sort)
    }
    // Page Account
    PageAccount(pageAccount: number): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Accounts/search' + "?page=" + pageAccount)
    }     

    //GetAll Product
    getListProdcut(): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Products')
    }  
    //Add Product
    createProduct(data: any): Observable<any>{
      return this.http.post<any>(this.baseUrl+'api/Products', data)
    }
    // GetOne Product
    getOneProduct(idProduct: number): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Products/' + idProduct)
    }  
    //Edit Product
    updateProduct(idProduct: number, data: any): Observable<any>{
      return this.http.put<any>(this.baseUrl+'api/Products/' + idProduct, data).pipe(
        catchError(error => {
          return (error);
        })
      );
    }
    //Delete Product
    deleteProduct(idProduct: number): Observable<any>{
      return this.http.delete<any>(this.baseUrl+'api/Products/' + idProduct)
    }  
    // Search Product
    SearchProduct(search: string): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Products/search' + "?search=" + search)
    }
    // SortBy Product
    AscProduct(sort: string): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Products/search' + "?sortBy=" + sort)
    }
    // Page Product
    PageProduct(pageProduct: number): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/Products/search' + "?page=" + pageProduct)
    }  
    // get all order
    getListOrder(): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Orders')
    }  
    //Add order
    createOrder(data: any): Observable<any>{
      return this.http.post<any>(this.baseUrl+'api/Orders', data)
    }   
    getOneOrder(idOrder: number): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/Orders/' + idOrder)
    }  
    //Get All OrderDetail
    getListOrderDetail(): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/OrderDetails/view')
    } 
    // Edit OrderDetail
    updateOrderDetail(idOrderDetail: number, data: any): Observable<any>{
      return this.http.put<any>(this.baseUrl+'api/OrderDetails/' + idOrderDetail, data).pipe(
        catchError(error => {
          return (error);
        })
      );
    }
    // Delete OrderDetail
    deleteOrderDetail(idOrderDetail: number): Observable<any>{
      return this.http.delete<any>(this.baseUrl+'api/OrderDetails/' + idOrderDetail)
    } 
    //Get one OrderDetail
    getOneOrderDetail(idOrderDetail: number): Observable<any>{
      return this.http.get<any>(this.baseUrl+'api/OrderDetails/' + idOrderDetail)
    }
    //Add OrderDetail
    createOrderDetail(data: any): Observable<any>{
      return this.http.post<any>(this.baseUrl+'api/OrderDetails/send', data)
    }
    PageOrderDetail(pageOrderDetail : number): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl+'api/OrderDetails/search' + "?page=" + pageOrderDetail)
    }
}
