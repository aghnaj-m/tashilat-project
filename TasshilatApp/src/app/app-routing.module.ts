import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { BillsComponent } from './bills/bills.component';
import { BoardComponent } from './board/board.component';
import { MoneyTransferListComponent } from './money-transfer/money-transfer-list/money-transfer-list.component';
import { MoneyTransferNewComponent } from './money-transfer/money-transfer-new/money-transfer-new.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { PhoneRefillListComponent } from './phone-refill/phone-refill-list/phone-refill-list.component';
import { PhoneRefillStartComponent } from './phone-refill/phone-refill-start/phone-refill-start.component';
import { PhoneRefillComponent } from './phone-refill/phone-refill.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'phone-refill',
    component: PhoneRefillComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PhoneRefillListComponent
      },
      {
        path: 'new',
        component: PhoneRefillStartComponent
      },
      {
        path: 'list',
        component: PhoneRefillListComponent
      }
    ]
  },
  {
    path: 'bills/:type',
    component: BillsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'money-transfer',
    component: MoneyTransferComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MoneyTransferListComponent
      },
      {
        path: 'list',
        component: MoneyTransferListComponent
      },
      {
        path: 'new',
        component: MoneyTransferNewComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
