import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { SigninService, User } from './signin.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  users: User[];

  user: User = {
    email: '',
    password: '',
    userType: ''
  }

  constructor(
    private signinService: SigninService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public register(){
    this.signinService.registerService(this.user);
  }

  public userSub: any;
  public validUser = false;
  public login(){
    this.userSub = this.signinService.getTodos().subscribe(data => {
      for (var i = 0; i <= data.length - 1; i++) {
        if(this.user.email == data[i].email && this.user.password == data[i].password && 
          this.user.userType == "Seller"){
            this.validUser = true;
          this.signinService.loginSellerService(this.user.email, this.user.password, this.user.userType);
        } else if (this.user.email == data[i].email && this.user.password == data[i].password && 
          this.user.userType == "Buyer") {
            this.signinService.loginBuyerService(this.user.email, this.user.password, this.user.userType);
            this.validUser = true;
        } else {
          this.userSub.unsubscribe();
        }
      }
      if(this.validUser == false) this.userSub.unsubscribe();
    });
  }

  onDestroy(){
    if(this.user != null) this.userSub.unsubscribe();
  }
}
