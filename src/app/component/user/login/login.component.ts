import { Component } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { UserDto } from '../../../dto/UserDto';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userDto: UserDto = {
    username: '',
    password: '',
    token: '',
  };

  loading: boolean = false;

  constructor(private readonly userService: UserService, private readonly messageService: MessageService, private readonly router: Router) {
  }

  public login(): void {
    this.userService.login(this.userDto).subscribe({
      next: (value) => {
        localStorage.setItem('token', value.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
      },
      error: (err) => {
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
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['/products']).then();
      }
    });
  }

  public load(): void {
    this.loading = true;
  }
}
