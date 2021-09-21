import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean  {

    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        console.log('[loginGuard]isAuthenticated???',isAuthenticated)
        if (!isAuthenticated) {
            return this.authService.autoLogin();
          } else {
            return of(isAuthenticated);
          }
      }),switchMap(thereISuser => {
          if(thereISuser)
          {
              return of(false);
          }
          return of(true);
      }),tap(returnedResult => {  
        if (!returnedResult) {
          this.router.navigateByUrl('/board');
        }
      }));

  }

}
