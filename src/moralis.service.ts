import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environment';

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

  walletAddress:any;


   getWalletAddress(){
    this.walletAddress = sessionStorage.getItem('data');
    return this.walletAddress
  }

  async loginMetaMask(){
     //@ts-ignore
     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    sessionStorage.setItem('data',accounts[0])
     return accounts[0]
  }

  
 async getChainId(){
  //@ts-ignore
  const daa = await ethereum.request({method:'eth_chainId'})
  return daa
 }
 

  getnftData(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/nft?chain=mumbai`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal', normalizeMetadata: 'false'})})
  }
  
  getTokenTransactions(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20/transfers?chain=mumbai`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'})})
  }
  getNftTransactions(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20/transfers?chain=mumbai`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'})})
  }

  getTokens(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/erc20?chain=mumbai`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api,format: 'decimal'})})
  }

  getBalance(){
    return this.http.get<ResponseType>(`https://deep-index.moralis.io/api/v2/${this?.walletAddress}/balance?chain=mumbai`,{headers:new HttpHeaders({accept: 'application/json','X-API-Key':this.api})})
  }
 

 
}
