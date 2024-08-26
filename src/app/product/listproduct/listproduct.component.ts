import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit{
  listProdcut : Array<any> = [];
    //Search
    public searchProduct : string = '';
    //Page
    public currentPageProduct : number = 1
    public totalPageProduct : number = 10;
    public pageProduct : number = 1;
    // Asc
    public clickCount = 0;

    public statusMap: { [key: number]: string } = {
      1: 'Active',
      2: 'Inactive'
    };
    constructor(private proSrv: ProductService){}

  ngOnInit(): void {
    this.goToPageProduct(this.pageProduct);
  }

  handleClickProduct(){
    this.clickCount++;
    if(this.clickCount %2 === 1){
      this.proSrv.AscProduct('w_desc').subscribe(data =>{
        this.listProdcut = data;
      })
    }else{
      this.proSrv.AscProduct('').subscribe(data =>{
        this.listProdcut = data
      })
    }
  }
  handleClickProductPrice(){
    this.clickCount++;
    if(this.clickCount %2 === 1){
      this.proSrv.AscProduct('asc').subscribe(data =>{
        this.listProdcut = data;
      })
    }else{
      this.proSrv.AscProduct('p_desc').subscribe(data =>{
        this.listProdcut = data
      })
    }
  }

  OnDeleteProduct(idProduct : number){
      if(confirm("Are you sure you want to delete it?")){
        this.proSrv.deleteProduct(idProduct).subscribe(data =>{
          this.proSrv.getListProdcut().subscribe(data =>{
            this.listProdcut = data;
          })
        })
      }
  }
  onSearchProduct(){
    this.proSrv.SearchProduct(this.searchProduct).subscribe(data =>{
      this.listProdcut = data;
    })
  }
  goToPageProduct(pageProduct: number){
    this.proSrv.PageProduct(pageProduct).subscribe(data =>{
      if(pageProduct >=1 && pageProduct <= this.totalPageProduct){
        this.currentPageProduct = pageProduct;
        this.listProdcut = data;
      }
    });
  }
  getStatusName(status: number): string {
    return this.statusMap[status] || 'Unknown';
  }
}
