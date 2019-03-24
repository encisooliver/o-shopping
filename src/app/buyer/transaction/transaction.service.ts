import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface ProductItem {
	productcode: string;
	productname: string;
	description: string;
	quantity: number;
	price: number;
	discount: number
    category: string;
    sellerid: string;
    displayinstore: boolean;
    createdat: number;
	updatedat: number;
}

export interface TransactionModel {
	productcode: string;
	productname: string;
	description: string;
	quantity: number;
	price: number;
	discount: number
    category: string;
    sellerid: string;
    buyerid: string;
    buyername: string;
    amountpaid: number;
    createdat: number;
}


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private productsCollection: AngularFirestoreCollection<ProductItem>;

  private products: Observable<ProductItem[]>;

  private transactionCollection: AngularFirestoreCollection<TransactionModel>;

  private transaction: Observable<TransactionModel[]>;



  constructor(
    db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.productsCollection = db.collection<ProductItem>('products');

    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );

    this.transactionCollection = db.collection<TransactionModel>('products');

    this.transaction = this.transactionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );


  }

// public getProducts() {
//     return this.products;
// }
  
public getProduct(id){
    return this.productsCollection.doc<ProductItem>(id).valueChanges();
}

// public updateProduct(product: ProductItem, id: string){
//   return this.productsCollection.doc(id).update(product);
// }
  
public addTransation(transaction: TransactionModel){
    return this.transactionCollection.add(transaction);
}
  
// public removeProduct(id) {
//     return this.productsCollection.doc(id).delete();
// } 

}
