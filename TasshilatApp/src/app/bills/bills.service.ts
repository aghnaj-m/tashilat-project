import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Bill } from './bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  baseUrl = environment.apiBaseUrl;

  private _bills = new BehaviorSubject<Bill[]>([]);
  constructor(private authService: AuthService,
    private http: HttpClient) { }

  get bills() {
    return this._bills.asObservable();
  }

  fetchBills() {

    return this.http.get<Bill[]>(`${this.baseUrl}:8080/bills/all`)
      .pipe(
        map(resData => {
          console.log('api bills jat', resData);
          const bills = [];
          resData.forEach(bill => {
            bills.push(bill);
          });
          //return [];
          return bills;
        }),
        tap(bills => {
          this._bills.next(bills);
        })
      );
  }

  updateBill(billId: number) {
    let updatedBills: Bill[];
    return this.bills.pipe(
      take(1),
      switchMap(bills => {
        if (!bills || bills.length <= 0) {
          return this.fetchBills();
        } else {
          return of(bills);
        }
      }),
      switchMap((bills) => {
        const updatedBillIndex = bills.findIndex(pl => pl.id === billId);
        updatedBills = [...bills];
        const oldBill = updatedBills[updatedBillIndex];
        return this.authService.user
          .pipe(
            take(1),
            switchMap(user => {
              updatedBills[updatedBillIndex] = new Bill(
                oldBill.id,
                oldBill.amount,
                oldBill.client_number,
                oldBill.contract_number,
                oldBill.date,
                oldBill.deadline,
                true,
                oldBill.type,
                null
              );
              return this.http.put(`${this.baseUrl}:8080/bills/update/${billId}`,
                { ...updatedBills[updatedBillIndex], id: null, server: { id: user.uid } }
              )
            }),
          );
      }),
      tap(() => {
        this._bills.next(updatedBills);
      })
    );

  }


}
