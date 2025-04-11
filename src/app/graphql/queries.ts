import { gql } from 'apollo-angular';

export const FETCH_COUNTRIES = gql`
  query {
    countries {
      name
      capital
      currency
    }
  }
`;

export const FETCH_USER = gql`
  query {
    viewer {
      login
      name
      email
      bio
      avatarUrl
      company
      location
      websiteUrl
      repositories(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          url
          createdAt
          updatedAt
          isPrivate
        }
      }
    }
  }
`;
