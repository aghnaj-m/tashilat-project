import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "@angular/material";

import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { PhoneRefillComponent } from './phone-refill/phone-refill.component';
import { HttpInterceptorService } from './shared/http/http-interceptor.service';
import { PhoneRefillListComponent } from './phone-refill/phone-refill-list/phone-refill-list.component';
import { PhoneRefillStartComponent } from './phone-refill/phone-refill-start/phone-refill-start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillsComponent } from './bills/bills.component';
import { BillDetailComponent } from './bills/bill-detail/bill-detail.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { MoneyTransferListComponent } from './money-transfer/money-transfer-list/money-transfer-list.component';
import { MoneyTransferNewComponent } from './money-transfer/money-transfer-new/money-transfer-new.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BoardComponent,
    PhoneRefillComponent,
    PhoneRefillListComponent,
    PhoneRefillStartComponent,
    BillsComponent,
    BillDetailComponent,
    MoneyTransferComponent,
    MoneyTransferListComponent,
    MoneyTransferNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
