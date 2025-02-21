import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function apiPrefixInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const apiUrl = environment.apiUrl;
  if (!req.url.startsWith('http')) {
    req = req.clone({ url: `${apiUrl}${req.url.startsWith('/') ? req.url : `/${req.url}`}` });
  }

  return next(req);
}
