import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { ShoppingCard } from '../shopping-card/shopping-card.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  private baseUrl: string = window.location.origin;
  private controller: string = 'ShoppingCard';

  constructor(private httpClient: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  addProductToCard(id: string){
    return this.httpClient.post(this.baseUrl + `/${this.controller}/AddProduct/` + id, null, {headers: this.authService.getHeaders()}).subscribe(
      () => {},
      error => this.errorHandler.handleError(error)
    );
  }

  getShoppingCard(): Observable<ShoppingCard>{
    return this.httpClient.get<ShoppingCard>(this.baseUrl + `/${this.controller}/GetShoppingCard`, {headers: this.authService.getHeaders()});
  }
}
