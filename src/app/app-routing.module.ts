import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftsComponent } from './main/nfts/nfts.component';
import { TokenComponent } from './main/token/token.component';
import { TransactionsComponent } from './main/transactions/transactions.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './main/container/container.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'main',component:ContainerComponent},
  {path:'nfts',component:NftsComponent},
  {path:'tokens',component:TokenComponent},
  {path:'transactions',component:TransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
