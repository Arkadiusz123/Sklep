import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { ShoppingCard } from '../shopping-card/shopping-card.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  private baseUrl: string = window.location.origin;
  private controller: string = 'ShoppingCard';

  private objectsSubject = new BehaviorSubject<ShoppingCard>(null);
  objects$: Observable<ShoppingCard> = this.objectsSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  addProductToCard(id: string){
    return this.httpClient.post(this.baseUrl + `/${this.controller}/AddProduct/` + id, null, {headers: this.authService.getHeaders()})
    .pipe(
      tap(() => {
          const currentCard = this.objectsSubject.value;
          currentCard.rows.find(x => x.productId == id).quantity++;
          this.objectsSubject.next(currentCard);
      }))
    .subscribe(
      () => {},
      error => this.errorHandler.handleError(error)
    );
  }

  removeProductFromCard(id: string){
    return this.httpClient.delete(this.baseUrl + `/${this.controller}/RomoveProduct/` + id, {headers: this.authService.getHeaders()})
    .pipe(
      tap(() => {
          const currentCard = this.objectsSubject.value;
          
          const product = currentCard.rows.find(x => x.productId == id);
          product.quantity--;
          if (product.quantity < 1){
            currentCard.rows = currentCard.rows.filter(x => x.productId != id);
          }

          this.objectsSubject.next(currentCard);
      }))
    .subscribe(
      () => {},
      error => this.errorHandler.handleError(error)
    );
  }

  getShoppingCard(): void{
    this.httpClient.get<ShoppingCard>(this.baseUrl + `/${this.controller}/GetShoppingCard`, {headers: this.authService.getHeaders()})
    .subscribe(
      res => this.objectsSubject.next(res),
      error => this.errorHandler.handleError(error)
    );
  }
}
