import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface UserResponseData {
  id: number,
  login: string,
  lastName: string,
  firstName: string,
  telephone: string,
  cin: string,
}

export interface AuthResponseData {

  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiBaseUrl;

  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.uid;
        } else {
          return null;
        }
      })
    );
  }

  get user() {
    return this._user.asObservable().pipe(
      map(user => {
        if (!user) {
          return null;
        }
        return user;
      })
    )
  }

  private findUser(username: string, token: string) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<UserResponseData>(`${this.baseUrl}:8081/users/${username}`, { headers: reqHeader });
  }

  login(username: string, password: string) {
    let userResponse: UserResponseData;
    return this.http
      .post<AuthResponseData>(
        `${this.baseUrl}:8081/authenticate`,
        { username: username, password: password }
      )
      .pipe(
        switchMap(loginResonse => {
          return this.findUser(username, loginResonse.token)
            .pipe(
              map(user => {
                userResponse = user;
                this.setUserData(user,loginResonse);
              })
            );
        })
      );
  }


  autoLogin() {
    return from(Promise.resolve(localStorage.getItem('authData'))).pipe(
      map(storedData => {
        if (!storedData) {
          return null;
        }
        const parsedData = JSON.parse(storedData) as {
          token: string;
          tokenExpirationDate: string;
          userId: number;
          username: string;
          firstName: string;
          lastName: string;
          phoneNumber: string;
          cin: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.username,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.phoneNumber,
          parsedData.cin,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
          //this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }


  private setUserData(userData: UserResponseData, authData: AuthResponseData) {
    authData.expiresIn = "86400";
    const expirationTime = new Date(
      new Date().getTime() + +authData.expiresIn * 1000
    );
    const user = new User(
      userData.id,
      userData.login,
      userData.firstName,
      userData.lastName,
      userData.telephone,
      userData.cin,
      authData.token,
      expirationTime
    );
    this._user.next(user);
    console.log("login:next",this._user.getValue());
    //this.autoLogout(user.tokenDuration);
    this.storeAuthData(user);
  }


  private storeAuthData(user: User) {
    const data = JSON.stringify({
      userId: user.uid,
      token: user.token,
      tokenExpirationDate: user.tokenExpirationDate.toISOString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lasttName,
      phoneNumber: user.phoneNumber,
      cin: user.cin
    });
    localStorage.setItem('authData',data);
  }


}
