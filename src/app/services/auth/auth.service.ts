import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: User) {
    return this.http.post<User>('/users', username);
  }

  login(username: User) {
    return this.http.post<User>('/users', username);
  }
}
