import { Component } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true;
  authError:string=''
  constructor(private user:UserService,private product:ProductService){}

  ngOnInit():void{

  }

  signUp(data:signup){
   this.user.userSignUp(data)
  }

  login(data:login){
  this.user.userLogin(data)
  this.user.invalidUserAuth.subscribe((result)=>{
    console.log('apple',result)
    if(result){
      this.authError="user not found"
    }else{
      this.localCartToRemoteCart()
    }
  })

  }

  openSignUp(){
    this.showLogin=false;
  }

  openLogin(){
   this.showLogin=true;
  }

  localCartToRemoteCart(){
    let data =localStorage.getItem('localcart');
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      let user =localStorage.getItem('user')
      let userId = user && JSON.parse(user).id

      cartDataList.forEach((product:product,index)=>{
        let cartData :cart={
          ...product,
          productId:product.id,
          userId
        };

      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{

          if(result){
            console.warn('item stored in db');

          }
        })

        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      }, 500);

      });

    }

  }
}
