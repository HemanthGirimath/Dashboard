import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MoralisService } from 'src/moralis.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavBarComponent implements OnInit {
  
  walletAddress:any
  Balance:any
  ChainConnectedto!: string;

  constructor(private server:MoralisService) { }

 async getWalletAddress (){
  const data = await this.server.loginMetaMask();
  sessionStorage.setItem('wallet',data);
  this.walletAddress = sessionStorage.getItem('wallet');
  this.server.getBalance().subscribe(res=>{
    if(res.balance!= 0){
      let value =  res.balance/1000000000000000000
      this.Balance = value.toFixed(3)
    }
    else{
      this.Balance = 0
    }
  })
 }

  getChainName(){
  this.server.getChainId().then(data=>{
    const chain = parseInt(data); // returns 1 or 8001 or any chain ID
    this.getCurrency(chain)
  })
}

 getCurrency(chainID:any){
  let networks:any  = {  
    80001:"MATIC",
    1:"ETH",
    56:"BNB",
    25:"CRO"
  }
  this.ChainConnectedto =  networks[chainID];
 }

  ngOnInit() {
    this.getWalletAddress();
    this.getChainName();

}

}
