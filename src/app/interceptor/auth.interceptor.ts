import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                router.navigate(['/login']); // Redirect to login on 401
            }
            return throwError(() => new Error('An error occurred'));
        })
    );
};
