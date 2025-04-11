import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { graphqlProviderConfig } from './config/graphql-provider-private-api.config';
import { graphqlProviderConfig } from './config/graphql-provider-public-api.config';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    graphqlProviderConfig,
  ],
};
