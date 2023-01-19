import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller:SellerService,private router:Router){}

  showLogin=false;
  authError:string='';
  signup(data:signup):void{

    this.seller.usersignUp(data)
  }

  login(data:login):void{
    this.authError='';
   // console.log(data)
    this.seller.Userlogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="emial or password is incoorect"
      }
    })
  }

  ngOnInit():void {
    this.seller.reloadeSeller();
  }

  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }
}
