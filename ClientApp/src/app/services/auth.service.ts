import { Injectable } from '@angular/core';
import { User } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logIn(user: User){
    console.log(console.log(user));
  }
}
