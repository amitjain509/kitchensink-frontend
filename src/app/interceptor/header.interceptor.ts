import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json'
    }
  });
  return next(authRequest);
};