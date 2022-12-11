import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoralisService } from '../../moralis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private rout:Router,private service:MoralisService) { }
  MetaMaskLogin = false

  async LoginMetaMask(){
   await this.service.loginMetaMask();
   this.MetaMaskLogin = true

   if(this.MetaMaskLogin!=true){
    this.rout.navigateByUrl('login')
   }
   else{
    this.rout.navigateByUrl('main')
   }
    // this.rout.navigateByUrl('main')
  }

  ngOnInit() {

  }

}
