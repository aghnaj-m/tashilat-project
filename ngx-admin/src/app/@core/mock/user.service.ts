import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@nebular/auth/auth.service';
import { User } from '@nebular/auth/user.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Transfer } from './money-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiBaseUrl;

  private _users = new BehaviorSubject<User[]>([]);
  constructor(private authService: AuthService,
    private http: HttpClient) { }

  get users() {
    return this._users.asObservable();
  }

  fetchUsers() {

    return this.http.get<User[]>(`http://${this.baseUrl}:8082/users/all`)
      .pipe(
        map(resData => {
          console.log('api users jat', resData);
          const users = [];
          resData.forEach(user => {
            users.push(user);
          });
          //return [];
          return users;
        }),
        tap(users => {
          this._users.next(users);
        })
      );
  }


}
