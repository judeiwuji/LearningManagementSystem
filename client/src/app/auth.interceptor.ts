import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from './services/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        return event;
      }),
      catchError((err, event) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.clearSession();
            this.router.navigateByUrl('/login');
          }
        }

        return throwError(() => err);
      })
    );
  }
}
