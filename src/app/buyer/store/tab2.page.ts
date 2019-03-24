import { Component, OnInit } from '@angular/core';
import { StoreService, Product } from './store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public isSeller = false;
  products: Product[];

  constructor( private storeService: StoreService,
    private route: Router
  ) {}

  ngOnInit(){
    this.storeService.getProducts().subscribe(data => {
      this.products = data;
    });
    
  }

  getProductId(id) {
    this.route.navigate(['/o-shopping-buyer/buyer/market/transaction', id]);
  }


}
