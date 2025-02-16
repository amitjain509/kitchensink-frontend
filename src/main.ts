import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';
import { HeaderInterceptor } from './app/interceptor/header.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { materialProviders } from './material.provider';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HeaderInterceptor, multi: true
    }, provideAnimationsAsync(), 
    materialProviders
  ]
}).then(() => console.log('App Bootstrapped with HttpClient'))
  .catch(err => console.error(err));
