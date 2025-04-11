import { ApplicationConfig, inject } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { UserStore } from '../store/user.store';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { environment } from '../../environments/environment-dev';
import { HttpHeaders } from '@angular/common/http';
import { onError } from '@apollo/client/link/error';

export const apolloOptionsFactory = () => {
  const graphqlURI = environment.GRAPHQL_URI_WITH_TOKEN;
  const httpLink = inject(HttpLink);
  const userStore = inject(UserStore);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.error(`[GraphQL error]: ${message}`);
        if (message.includes('Bad credentials')) {
          userStore.logout();
        }
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError.message}`);
    }
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = userStore.authData().app_token;

    if (!token) {
      console.warn('No token available');
      return forward(operation);
    }

    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });

    return forward(operation);
  });

  const httpLinkHandler = httpLink.create({ uri: graphqlURI });
  const link = ApolloLink.from([errorLink, authMiddleware, httpLinkHandler]);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  };
};

export const graphqlProviderConfig: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
