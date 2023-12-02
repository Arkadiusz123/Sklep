import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidMessagesService } from '../services/valid-messages.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private baseUrl: string = window.location.origin;
  private controllerName: string = "Authenticate";
  private subscriptions: Subscription[] = [];

  model: Partial<User> = {};
  serverErrors: string = "";
  register: boolean = false;
  rolesList: Observable<Role[]>;

  constructor(private httpClient: HttpClient, private router: Router, public validMessages: ValidMessagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.model.role = "";
    const sub = this.route.data.subscribe(v => this.register = v.register);
    this.subscriptions.push(sub);
    this.rolesList = this.httpClient.get<Role[]>(this.baseUrl + `/${this.controllerName}/GetRolesList`);
  }

  logIn() {
    const subscription = this.httpClient.post(this.baseUrl + `/${this.controllerName}/Login`, this.model as User)
    .subscribe(
      success => {
        const token = JSON.stringify(success);
        localStorage.setItem("token", JSON.stringify(success));
        this.router.navigate(['']);
      },
      () => {
        this.serverErrors = "Niepoprawny login lub hasło"
        setTimeout(() => {
          this.serverErrors = '';
        }, 4000);
      }
    );
    this.subscriptions.push(subscription);
  }

  registerUser(){
    const subscription = this.httpClient.post(this.baseUrl + `/${this.controllerName}/Register`, this.model as User)
    .subscribe(
      () => { this.router.navigate(['log-in']) },
      () => {
        this.serverErrors = "Niepoprawne dane"
        setTimeout(() => {
          this.serverErrors = '';
        }, 4000);
      }
    );
    this.subscriptions.push(subscription);
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}

export interface User {
  username: number;
  password: string;
  email?: string;
  role: string;
}

export interface Role{
  name: string;
  value: string;
}
