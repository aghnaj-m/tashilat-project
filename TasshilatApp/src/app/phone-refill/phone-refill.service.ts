import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators'

import { Refill } from './refill.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient} from '@angular/common/http';
import { Client } from './client.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class RefillService {

    baseUrl = environment.apiBaseUrl;

    private _refills = new BehaviorSubject<Refill[]>([]);
    constructor(private authService: AuthService,
        private http: HttpClient) { }

    get refills() {
        return this._refills.asObservable();
    }

    fetchRefills() {

        return this.http.get<Refill[]>(`${this.baseUrl}:8081/refills/all`)
            .pipe(
                map(resData => {
                    console.log('api refills jat', resData);
                    const refills = [];
                    resData.forEach(refill => {
                        refills.push(refill);
                    });
                    //return [];
                    return refills;
                }),
                tap(refills => {
                    this._refills.next(refills);
                })
            );
    }

    addRefill(amount: number, offer: string, date: Date, client: Client) {
        let generatedId: number;
        let newRefill: Refill;
        return this.authService.user.pipe(take(1), switchMap(user => {
            if (!user) {
                throw new Error('No user found!');
            }
            console.log('rfServ[adding amount..]',amount);
            newRefill = new Refill(
                Math.random(),
                amount,
                offer,
                date,
                client,
                null
            )
            return this.http.post<Refill>(`${this.baseUrl}:8081/refills/save`
                , {
                    ...newRefill,
                    id: null,
                    server: { id: user.uid },
                    date: date.toISOString().replace('T', ' ')
                }
            )
        }), switchMap((respData: Refill) => {
            generatedId = respData.id;
            return this.refills;
        }),
            take(1),
            tap(refills => {
                newRefill.id = generatedId
                this._refills.next(refills.concat(newRefill));
            })
        );
    }


}
