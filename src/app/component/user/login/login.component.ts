import { Component } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { FormLoginService } from '../../../service/user/form-login.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    public formLoginService: FormLoginService
  ) {
  }

  login(): void {
    const loggedUser = this.userService.getLoggedUser();
    if (loggedUser && loggedUser !== this.formLoginService.formLogin.get('username')?.value) {
      localStorage.clear();
    }

    this.userService.login(this.formLoginService.formLogin.value).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
      },
      error: (err) => {
        this.onLoginError(err);
      },
      complete: () => {
        this.onLoginComplete();
      }
    });
  }

  private onLoginError(err: any) {
    if (err.status === 400) {
      const error: Map<string, string[]> = new Map<string, string[]>(Object.entries(err.error.errors));
      error.forEach((value, key) => {
        value.forEach(message => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${key} ${message}` })
        })
      });
    }

    if (err.status === 404) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
    }

    this.loading = false;
  }

  private onLoginComplete() {
    this.loading = false;
    const roles = this.userService.getLoggedUserRoles();
    if (roles) {
      if (roles === 'ROLE_USER') {
        this.router.navigate(['/products']).then();
      }
      if (roles === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']).then();
      }
      if (roles === 'ROLE_KITCHEN') {
        this.router.navigate(['/kitchen']).then();
      }
    }
  }

  load(): void {
    this.loading = true;
  }
}
