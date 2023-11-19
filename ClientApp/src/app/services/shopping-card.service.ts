import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  private baseUrl: string = window.location.origin;

  constructor(private httpClient: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  addProductToCard(id: string){
    return this.httpClient.get(this.baseUrl + `/ShoppingCard/AddProduct/` + id, {headers: this.authService.getHeaders()}).subscribe(
      () => {},
      error => this.errorHandler.handleError(error)
    );
  }
}
