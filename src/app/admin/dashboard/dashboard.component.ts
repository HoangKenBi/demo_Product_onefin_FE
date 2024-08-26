import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  OrderDetail : Array<any> = [];
  public statusODV: { [key: number]: string } = {
    1: 'Open',
    2: 'Approved',
    3: 'Declined',
    4: 'Cancelled'
  };
  //Page
    public currentPageOrderDetail : number = 1
    public totalPageOrderDetail : number = 10;
    public pageOrderDetail : number = 1;
  constructor(private proSrv: ProductService){}
  ngOnInit(): void {
    // this.proSrv.getListOrderDetail().subscribe(data => {
    //   return this.OrderDetail = data;
    // })
    this.goToPageOrderDetail(this.pageOrderDetail);
  }

  getStatus(status: number): string {
    return this.statusODV[status] || 'Unknown';
  }
  OnDeleteOrderDetail(idOrderDetail : number){
    if(confirm("Are you sure you want to delete it?")){
      this.proSrv.deleteOrderDetail(idOrderDetail).subscribe(data =>{
        this.proSrv.getListOrderDetail().subscribe(data =>{
          this.OrderDetail = data;
        })
      })
    }
  }
  goToPageOrderDetail(pageOrderDetail: number){
    this.proSrv.PageOrderDetail(pageOrderDetail).subscribe(data =>{
      if(pageOrderDetail >=1 && pageOrderDetail <= this.totalPageOrderDetail){
        this.currentPageOrderDetail = pageOrderDetail;
        this.OrderDetail = data;
      }
    });
  }
}
