import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@nebular/auth/auth.service';
import { User } from '@nebular/auth/user.model';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      switchMap((user: User) => {
        console.log('intercept:user', user);
        if(user)
        {
          request = request.clone({
            setHeaders: {
              Authorization:  'Bearer ' + user.token
            }
          })
        }
        return next.handle(request);
      })
    )
  }

}
