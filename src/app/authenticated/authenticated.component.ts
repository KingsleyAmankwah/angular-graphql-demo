import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FETCH_USER } from '../graphql/queries';
import { CommonModule } from '@angular/common';
import { UserStore } from '../store/user.store';
import { Router } from '@angular/router';
import { GitHubUser, GitHubUserResponse } from '../interfaces';

@Component({
  selector: 'app-authenticated',
  imports: [CommonModule],
  templateUrl: './authenticated.component.html',
})
export class AuthenticatedComponent {
  private readonly apollo = inject(Apollo);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  userData: GitHubUser | null = null;
  error: string | null = null;
  loading = false;

  ngOnInit() {
    this.userStore.initialize();
    this.fetchUserData();
  }

  protected fetchUserData() {
    if (!this.userStore.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = null;

    this.apollo
      .query<GitHubUserResponse>({
        query: FETCH_USER,
      })
      .subscribe({
        next: ({ data }) => {
          this.userData = data.viewer;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
          this.userStore.logout();
        },
      });
  }

  protected logout() {
    this.userStore.logout();
    this.router.navigate(['/login']);
  }
}
