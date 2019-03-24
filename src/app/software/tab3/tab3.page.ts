import { Component, OnInit } from '@angular/core';
import { ProductService, ProductItem } from '../product-detail/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  products: ProductItem[];


  public productListSub: any;

  constructor( private productService: ProductService,
    private toast: ToastController,
    private route: Router
     ) {}
     public productSub: any;

  ngOnInit() {
    this.productSub = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  public removeProduct(item) {
    this.productService.removeProduct(item.id);
  }
 
  getProductId(id) {
    this.route.navigate(['/o-shopping/software/inventory/product', id]);
  }
  newProduct() {
    this.route.navigate(['/o-shopping/software/inventory/product']);
  }
  
  ngOnDestroy(){

  }





 
}
