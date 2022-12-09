import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MoralisService } from '../../../moralis.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(private server:MoralisService) { }

  displayedColumns: string[] = ['token_address', 'name', 'symbol', 'balance'];
  dataSource : MatTableDataSource<unknown> |any

  ngOnInit(): void {
    this.server.getTokens().subscribe(res=>this.dataSource = res)
  }

}
