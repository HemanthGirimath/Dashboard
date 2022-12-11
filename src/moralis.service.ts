import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './environments/environment';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export interface ResponseType {
  total: number, 
  page: number, 
  page_size: number, 
  cursor?: null, 
  result: Array<any>,
  balance:number
}


@Injectable({
  providedIn: 'root'
})
export class MoralisService {

  
  constructor(private http:HttpClient) { }

  api = environment.Moralis_api
  chain:any
  walletAddress:any;

  async loginMetaMask(){
    const ethereum = window.ethereum as MetaMaskInpageProvider;
     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    sessionStorage.setItem('data',accounts[0])
    this.getChainId();
     return accounts[0]
  }

  getWalletAddress(){
    this.walletAddress = sessionStorage.getItem('data');
    return this.walletAddress
  }

  
 async getChainId(){
  const ethereum = window.ethereum as MetaMaskInpageProvider;
  let daa:any = await ethereum.request({method:'eth_chainId'})
  let chain = parseInt(daa); // returns 1 or 8001 or any chain ID
  this.getCurrency(chain)
  return daa
 }
 
  getCurrency(chainID:any){
  let networks:any  = {  
    80001:"mumbai",
    1:"eth",
    56:"BNB",
    25:"CRO"
  }
  this.chain = networks[chainID]
  console.log("chain value inside getCurrency :-",this.chain)
 }

  getnftData(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/nft`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal', normalizeMetadata: 'false'}),params:new HttpParams().set('chain',`${this?.chain}`)})
  }
  
  getTokenTransactions(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20/transfers`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'}),params:new HttpParams().set('chain',`${this?.chain}`)})
  }
  getNftTransactions(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20/transfers`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'}),params:new HttpParams().set('chain',`${this?.chain}`)})
  }

  getTokens(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'}),params:new HttpParams().set('chain',`${this?.chain}`)})
  }

  getBalance(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/balance`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api}),params:new HttpParams().set('chain',`${this?.chain}`)})
  }
 

 
}
