import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor({ count: 2, delay: 2000 })])
    ),
    importProvidersFrom([BrowserAnimationsModule, JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      })],
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
  ]
};
