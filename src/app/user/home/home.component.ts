import { Component, OnInit } from '@angular/core';
import { Product } from './product.model'; 
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  //Search
  public searchProduct : string = '';
  //Page
  public currentPageProduct : number = 1
  public totalPageProduct : number = 10;
  public pageProduct : number = 1;

  constructor(private proSrv: ProductService){}
  ngOnInit(): void {
    this.goToPageProduct(this.pageProduct);
  }
  goToPageProduct(pageProduct: number){
    this.proSrv.PageProduct(pageProduct).subscribe(data =>{
      if(pageProduct >=1 && pageProduct <= this.totalPageProduct){
        this.currentPageProduct = pageProduct;
        this.products = data;
      }
    });
  }
  onSearchProduct(){
    this.proSrv.SearchProduct(this.searchProduct).subscribe(data =>{
      this.products = data;
    })
  }
}
