import { Injectable } from '@angular/core';
import { User } from '../login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = window.location.origin;
  private controllerName: string = "Authenticate";

  constructor(private jwtHelper: JwtHelperService, private httpClient: HttpClient) { }

  logInUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + `/${this.controllerName}/Login`, user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
