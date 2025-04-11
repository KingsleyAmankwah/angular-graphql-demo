export interface CountriesResponse {
  countries: Countries[];
}

export interface Countries {
  name: string;
  capital: string;
  currency: string;
}

export interface AuthData {
  app_token: string;
}

export interface GitHubUserResponse {
  viewer: GitHubUser;
}

export interface GitHubUser {
  login: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  repositories: GitHubRepositories;
}

export interface GitHubRepositories {
  nodes: GitHubRepository[];
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  isPrivate?: boolean;
}
