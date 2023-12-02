import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router, private authService: AuthService) { }

  handleError(error: HttpErrorResponse){
    if (error.status === 404) {
      this.router.navigate(['not-found']);
    }
    else if (error.status === 401) {
      const expiration = this.authService.expirationDate();

      if(expiration && expiration < new Date()) {
        localStorage.clear();
      }

      this.router.navigate(['access-denied']);
    }

    console.log(error);
  }
}
