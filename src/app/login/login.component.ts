import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../store/user.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected token = '';
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  login() {
    if (this.token) {
      this.userStore.setToken(this.token);
      this.router.navigate(['/profile']);
    }
  }
}
