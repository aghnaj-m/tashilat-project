import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Transfer } from './money-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class MoneyTransferService {

  baseUrl = environment.apiBaseUrl;

  private _transfers = new BehaviorSubject<Transfer[]>([]);
  constructor(private authService: AuthService,
    private http: HttpClient) { }

  get transfers() {
    return this._transfers.asObservable();
  }

  fetchTransfers() {

    return this.http.get<Transfer[]>(`${this.baseUrl}:8082/transfers/all`)
      .pipe(
        map(resData => {
          console.log('api transfers jat', resData);
          const transfers = [];
          resData.forEach(transfer => {
            transfers.push(transfer);
          });
          //return [];
          return transfers;
        }),
        tap(transfers => {
          this._transfers.next(transfers);
        })
      );
  }

  addTransfer(amount: number, receiverFullName: string, receiverPhone: string, date: Date) {
    let generatedId: string;
    let newTransfer: Transfer;
    return this.authService.user.pipe(take(1), switchMap(user => {
      if (!user) {
        throw new Error('No user found!');
      }
      newTransfer = new Transfer(
        Math.random().toString(),
        amount,
        receiverFullName,
        receiverPhone,
        date,
        'IN HOLD',
        null
      )
      return this.http.post<Transfer>(`${this.baseUrl}:8082/transfers/save`
        , {
          ...newTransfer,
          id: null,
          server: { id: user.uid },
          date: date.toISOString().replace('T', ' ')
        }
      )
    }), tap((respData: Transfer) => {
      generatedId = respData.id;
      newTransfer.id = generatedId;
      this._transfers.next(this._transfers.value.concat(newTransfer));
    })
    );
  }



  updateBill(transferId: string) {
    let updatedTransfers: Transfer[];
    return this.transfers.pipe(
      take(1),
      switchMap(transfers => {
        if (!transfers || transfers.length <= 0) {
          return this.fetchTransfers();
        } else {
          return of(transfers);
        }
      }),
      switchMap((transfers) => {
        const updatedTransferIndex = transfers.findIndex(pl => pl.id === transferId);
        updatedTransfers = [...transfers];
        const oldTransfer = updatedTransfers[updatedTransferIndex];
        return this.authService.user
          .pipe(
            take(1),
            switchMap(user => {
              updatedTransfers[updatedTransferIndex] = new Transfer(
                oldTransfer.id,
                oldTransfer.amount,
                oldTransfer.receiverFullName,
                oldTransfer.receiverPhone,
                oldTransfer.date,
                'FINISHED',
                null
              );
              return this.http.put(`${this.baseUrl}:8082/transfers/update/${transferId}`,
                { ...updatedTransfers[updatedTransferIndex], id: null, server: { id: user.uid } }
              )
            }),
          );
      }),
      tap(() => {
        this._transfers.next(updatedTransfers);
      })
    );

  }


}
