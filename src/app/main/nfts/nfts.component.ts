import { Component, OnInit } from '@angular/core';
import { MoralisService } from 'src/moralis.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss']
})


export class NftsComponent implements OnInit {
  nftData$:any = []
  v = 0

  constructor(private serve:MoralisService,) { }

  
  getImgUrl(metadata: any){

    if (!metadata) return null;
    let meta = JSON.parse(metadata)
    
    if (!meta.image.includes("ipfs://")) {
      return meta.image;
    } else {
      return "https://ipfs.io/ipfs/" + meta.image.substring(7);
    }
  }

  getNftname(metadata:any){
    let meta = JSON.parse(metadata)
    return meta.name 
  }

  getNftTokenId(metadata:any){
    let meta = JSON.parse(metadata)
    if(!meta.attributes[0].value){
      return this.v
    }
    else{
    return meta.attributes[0].value

    }
  }

   ngOnInit() {
     this.serve.getnftData().subscribe(res=>this.nftData$ = res.result);
    this.serve.getWalletAddress();
  
  }

}
