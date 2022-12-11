import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MoralisService } from 'src/moralis.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  // Transaction:any = []

  displayedColumns: string[] = ['transaction_hash', 'from_address', 'to_address', 'value','Date'];
  dataSource : MatTableDataSource<unknown> |any
    constructor(private server:MoralisService) { }
 
    getTableData(){

    }

    getTokensTransactions(){
    }    

    getNftTransactions(){
    } 

  ngOnInit(): void {
    this.server.getTokenTransactions().subscribe(res=> this.dataSource = new MatTableDataSource(res.result)) 
    // this.server.getTokenTransactions().subscribe(res=>console.log(res.result)) 
  }

}
