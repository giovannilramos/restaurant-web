import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../dto/UserDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient, private readonly jwtHelper: JwtHelperService) {
  }

  getLoggedUser(): string | undefined {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token).sub;
    }
    return undefined;
  }

  getLoggedUserRoles() {
    const token = localStorage.getItem('token');
    if (token) {
      // @ts-ignore
      return jwtDecode(token).roles;
    }
    return undefined;
  }

  login(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${environment.apiUrl}/v1/user/login`, {
      username: userDto.username,
      password: userDto.password,
    });
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
