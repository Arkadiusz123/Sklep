import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  
  public isAuthenticated(): boolean {
    var token = localStorage.getItem('token');
    console.log(token);
    if(token){
      return true;
    }
    else{
      return false;
    }

  }
}
