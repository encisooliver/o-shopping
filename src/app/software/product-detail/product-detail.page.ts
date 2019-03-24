import { Component, OnInit } from '@angular/core';
import { ProductItem, ProductService } from './product.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: ProductItem = {
    productcode: "",
    productname: "",
    description: "",
    quantity: 0,
    price: 0,
    discount: 0,
    category: "",
    sellerid: 0,
    displayinstore: false,
    createdat: new Date().getTime(),
    updatedat: new Date().getTime(),
  }

  public productId = null;

  public productSub: any;


  constructor( private productService: ProductService,
    private toast: ToastController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController
     ) {}

  ngOnInit() {
    setTimeout(() => {
      this.productId = this.route.snapshot.params['id'];
      if(this.productId) {
        this.loadProductDetail();
      }
    }, 100);
    
  } 

  async loadProductDetail(){
    const loading = await this.loadingController.create({
      message: 'Loading Product..'
    });
    await loading.present();

    this.productService.getProduct(this.productId).subscribe(data => {
      loading.dismiss();
      this.product = data;
    });
  }


  async btnSaveProduct() {
    if( this.product.productcode != ""){
      const loading = await this.loadingController.create({
        message: 'Loading Product..'
      });
      await loading.present();
      if(this.productId){
        this.productService.updateProduct(this.product, this.productId).then(() => {
          loading.dismiss();
          this.nav.navigateBack('o-shopping/Seller/software/inventory');
        });
      } else {
        console.log(this.product);
        this.productService.addProduct(this.product);
        this.productSub = this.productService.getProducts().subscribe(data => {
          for (var i = 0; i <= data.length - 1; i++) {
            if( this.product.productcode == data[i].productcode ){
              loading.dismiss();
              this.toastSuccessfullyAdded();
              // this.resetform();
              this.nav.navigateBack('o-shopping/Seller/software/inventory');
              }
            }
        }); 
      }
    } else {
      this.toastInvalid();
    }
  }

  async toastSuccessfullyAdded() {
      const toast = await this.toast.create({
        message: 'Product Save!',
        duration: 2000
      });
      toast.present();
  }

  async toastInvalid() {
    const toast = await this.toast.create({
      message: 'Product Invalid!',
      duration: 2000
    });
    toast.present();
}

  

  resetform() {
    this.product.productcode = "",
    this.product.productname = "",
    this.product.description= "",
    this.product.quantity = 0,
    this.product.price = 0,
    this.product.discount = 0,
    this.product.category = "",
    this.product.displayinstore = false,
    this.product.createdat = new Date().getTime(),
    this.product.updatedat = new Date().getTime()
  }

}

