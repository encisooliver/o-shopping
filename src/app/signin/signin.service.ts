import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
  userType: string;
}


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private usersCollection: AngularFirestoreCollection<User>;

  private users: Observable<User[]>;


  constructor(
    db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.usersCollection = db.collection<User>('users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

public getTodos() {
    return this.users;
  }
  
public getTodo(id){
    return this.usersCollection.doc<User>(id).valueChanges();
  }
  
public addTodo(user: User){
    return this.usersCollection.add(user);
  }
  
public removeTodo(id) {
    return this.usersCollection.doc(id).delete();
  } 

public registerService(user: User): void{  
  this.addTodo(user);
  this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
    this.router.navigate(['']);
  });
}

  public loginSellerService(email, password, usertype){
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
        console.log("Welcome Seller")
        this.router.navigate(['/o-shopping']);
      });
  }
  public loginBuyerService(email, password, usertype){
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log("Welcome Buyer")
      this.router.navigate(['o-shopping-buyer']);
    });
}
}
