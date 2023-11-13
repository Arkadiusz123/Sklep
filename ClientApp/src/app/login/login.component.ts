import { Component, OnInit } from '@angular/core';
import { ValidMessagesService } from '../services/valid-messages.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private baseUrl: string = window.location.origin;
  private controllerName: string = "Authenticate";

  model: Partial<User> = {};
  serverErrors: string = "";
  

  constructor(private httpClient: HttpClient, private router: Router, public validMessages: ValidMessagesService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.httpClient.post(this.baseUrl + `/${this.controllerName}/Login`, this.model as User).subscribe(
      success => {
        const token = JSON.stringify(success);
        localStorage.setItem("token", JSON.stringify(success));
        this.router.navigate(['']);
      },
      () => {
        this.serverErrors = "Niepoprawny login lub hasło"
        setTimeout(()=>{
            this.serverErrors = '';
        }, 4000);
    }
    );
  }

}

export interface User {
  username: number;
  password: string;
}
