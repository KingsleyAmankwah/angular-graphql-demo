import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'countries',
    loadComponent: () =>
      import('./countries/countries.component').then(
        (c) => c.CountriesComponent
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./authenticated/authenticated.component').then(
        (c) => c.AuthenticatedComponent
      ),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'countries',
  },
];
