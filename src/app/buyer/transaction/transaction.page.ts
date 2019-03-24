import { Component, OnInit } from '@angular/core';
import { TransactionService, ProductItem, TransactionModel } from './transaction.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  product: ProductItem = {
    productcode: "",
    productname: "",
    description: "",
    quantity: 0,
    price: 0,
    discount: 0,
    category: "",
    sellerid: "",
    displayinstore: false,
    createdat: new Date().getTime(),
    updatedat: new Date().getTime(),
  }

  transactionModel: TransactionModel = {
    productcode: "",
    productname: "",
    description: "",
    quantity: 0,
    price: 0,
    discount: 0,
    category: "",
    sellerid: "",
    buyerid: "",
    buyername: "",
    amountpaid: 0,
    createdat: new Date().getTime()
  }; 

  public productId = null;

  constructor(
    private transactionService: TransactionService,
    private toast: ToastController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
  ) { }
  
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
      message: 'Loading Transaction..'
    });
    await loading.present();

    this.transactionService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      loading.dismiss();
    });
  }

  async btnTransaction() {
    const loading = await this.loadingController.create({
      message: 'Processing Transaction..'
    });
    await loading.present();
    this.transactionModel.productcode = this.product.productcode,
    this.transactionModel.productname = this.product.productname,
    this.transactionModel.description = this.product.description,
    this.transactionModel.quantity = this.product.quantity,
    this.transactionModel.price = this.product.price,
    this.transactionModel.discount = this.product.discount,
    this.transactionModel.category = this.product.category,
    this.transactionModel.sellerid = this.product.sellerid

    this.transactionService.addTransation(this.transactionModel);
  }




}
