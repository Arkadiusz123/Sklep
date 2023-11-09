import { Component, OnInit } from '@angular/core';
import { ValidMessagesService } from '../services/valid-messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Partial<User> = {};
  serverErrors: string;

  constructor(private authService: AuthService, public validMessages: ValidMessagesService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.authService.logIn(this.model as User);
  }

}

export interface User {
  name: number;
  password: string;
}
