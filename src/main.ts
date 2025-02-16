import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { materialProviders } from './material.provider';
import { headerInterceptor } from './app/interceptor/header.interceptor';
import { authInterceptor } from './app/interceptor/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([headerInterceptor, authInterceptor])),
    provideRouter(routes),
     provideAnimationsAsync(), 
    materialProviders
  ]
}).then(() => console.log('App Bootstrapped with HttpClient'))
  .catch(err => console.error(err));
