import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt from "jsonwebtoken"

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  public getUserRoles(): string[]{
    const token = this.getToken();

    if(!token){
      return null;
    }

    const decodedToken = this.decodeToken(token);

    if(!decodedToken){
      return null;
    }
    return decodedToken.payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

  public getHeaders(): HttpHeaders{
    const token = this.getToken();
    if(!token){
      return null;
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public expirationDate(): Date {
    const token = localStorage.getItem('token'); 
    if(!token){
      return null;
    }
    return new Date(JSON.parse(token).expiration);
  }

  public logOut(){
    localStorage.clear();
    this.router.navigate(['log-in']);
  }

  private getToken(): string{
    const token = localStorage.getItem('token');
    if(!token){
      return null;
    }
    return JSON.parse(localStorage.getItem('token')).token;
  }

  

  private decodeToken(token: string): any {
    try {
      //return jwt.jwt_decode(token);
      return jwt.default.decode(token, { complete: true });
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
