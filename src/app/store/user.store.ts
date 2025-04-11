import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AuthData } from '../interfaces';

const initialState = {
  authData: { app_token: '' } as AuthData,
  isAuthenticated: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, {
        authData: { app_token: token },
        isAuthenticated: !!token,
      });
      localStorage.setItem('github_token', token);
    },
    initialize() {
      const token = localStorage.getItem('github_token');
      if (token) {
        patchState(store, {
          authData: { app_token: token },
          isAuthenticated: true,
        });
      }
    },
    logout() {
      patchState(store, {
        authData: { app_token: '' },
        isAuthenticated: false,
      });
      localStorage.removeItem('github_token');
    },
  }))
);
