import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../dto/UserDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  public login(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${environment.apiUrl}/v1/user/login`, {
      username: userDto.username,
      password: userDto.password,
    });
  }
}
