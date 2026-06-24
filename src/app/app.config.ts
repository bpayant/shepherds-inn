import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { API_SETTINGS } from './shared/api-settings';
import {
  ClientLogger,
  ConsoleClientLogger,
  SilentClientLogger
} from './shared/logging/client-logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ClientLogger,
      useClass: API_SETTINGS.enableDebugLogging
        ? ConsoleClientLogger
        : SilentClientLogger
    }
  ]
};
