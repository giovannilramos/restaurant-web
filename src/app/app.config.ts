import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export function tokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ToastModule,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor({ count: 2, delay: 2000 })]), withInterceptorsFromDi()),
    importProvidersFrom([
      BrowserAnimationsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      }),
    ]),
    provideAnimations()
  ]
};
