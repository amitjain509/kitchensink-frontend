import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, throwError } from 'rxjs';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);

  let newRequest = req;

  const token = localStorage.getItem('token');
  if (req.url !== 'api/authenticate' && token) {
    newRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
  }
  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomDelay = generateRandomNumber(500, 1000);
  return next(newRequest).pipe(
    delay(randomDelay),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/account/login']).then(() => localStorage.removeItem('token'));
      }
      return throwError(() => error.error);
    })
  );
};
