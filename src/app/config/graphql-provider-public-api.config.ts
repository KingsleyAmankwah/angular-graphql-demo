import { ApplicationConfig, inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment-dev';

/**
 * Apollo Client configuration setup without a token for authenticating requests.
 *
 * This function is used to configure the Apollo Client with the necessary settings such as the
 * GraphQL URI, the cache strategy (using InMemoryCache), and default options for queries and
 * watches. The configuration does not include any authentication token or headers.
 *
 * @returns {object} The Apollo Client configuration options.
 */

export const apolloOptionsFactory = () => {
  const graphqlURI = environment.GRAPHQL_URI_NO_TOKEN;
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({ uri: graphqlURI }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  };
};

/**
 * GraphQL provider configuration for Angular's dependency injection system.
 *
 * This configuration registers the Apollo Client with the necessary options so that it can
 * be injected into Angular components or services. It uses the factory function `apolloOptionsFactory`
 * to provide the Apollo options dynamically.
 *
 * @type {ApplicationConfig['providers']}
 */

export const graphqlProviderConfig: ApplicationConfig['providers'] =
  [
    Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
    },
  ];
