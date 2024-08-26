import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-listaccount',
  templateUrl: './listaccount.component.html',
  styleUrls: ['./listaccount.component.css']
})
export class ListaccountComponent implements OnInit{
  listAccount : Array<any> = [];
  //Search
  public searchAccount : string = '';
  //Page
  public currentPageAccount : number = 1
  public totalPageAccount : number = 10;
  public pageAccount : number = 1;
  // Asc
  public clickCount = 0;

  public statusRole: { [key: number]: string } = {
    1: 'Manage',
    2: 'User'
  };
  constructor(private proSrv: ProductService){}

ngOnInit(): void {
  // this.loadAccounts();
  this.goToPageAccount(this.pageAccount);
}

handleClickAccount(){
  this.clickCount++;
  if(this.clickCount %2 === 1){
    this.proSrv.AscAccount('a_desc').subscribe(data =>{
      this.listAccount = data;
    })
  }else{
    this.proSrv.AscAccount('').subscribe(data =>{
      this.listAccount = data
    })
  }
}
OnDeleteAccount(idAccount : number){
  if(confirm("Are you sure you want to delete it?")){
    this.proSrv.deleteAccount(idAccount).subscribe(data =>{
      this.proSrv.getListAccount().subscribe(data =>{
        this.listAccount = data;
      })
    })
  }
}
onSearchAccount(){
  this.proSrv.SearchAccount(this.searchAccount).subscribe(data =>{
    this.listAccount = data;
  })
}
goToPageAccount(pageAccount: number){
  this.proSrv.PageAccount(pageAccount).subscribe(data =>{
    if(pageAccount >=1 && pageAccount <= this.totalPageAccount){
      this.currentPageAccount = pageAccount;
      this.listAccount = data;
    }
  });
}
getStatusRole(role: number): string {
  console.log('Data role:', role);
  return this.statusRole[role] || 'Unknown';
}
}
