import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../dto/UserDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userDto!: UserDto;

  constructor(private readonly userService: UserService) {
  }

  public login() {
    this.userService.login(this.userDto).subscribe(value => localStorage.setItem('token', value.token));
  }
}
