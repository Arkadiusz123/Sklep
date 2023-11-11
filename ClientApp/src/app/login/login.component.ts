import { Component, OnInit } from '@angular/core';
import { ValidMessagesService } from '../services/valid-messages.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

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
  

  constructor(private httpClient: HttpClient, public validMessages: ValidMessagesService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.httpClient.post(this.baseUrl + `/${this.controllerName}/Login`, this.model as User).subscribe(
      success => {
        const token = JSON.stringify(success);
        console.log(token);
        localStorage.setItem("token", JSON.stringify(success));
      },
      () => {
        this.serverErrors = "Niepoprawny login lub hasło"
        setTimeout(()=>{
            this.serverErrors = '';
        }, 4000);
    }
      //success => localStorage.setItem('token', )
    );
  }

}

export interface User {
  username: number;
  password: string;
}
