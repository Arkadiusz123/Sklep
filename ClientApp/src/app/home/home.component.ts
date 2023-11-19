import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Product } from '../product-form/product-form.component';
import { AuthService } from '../services/auth.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ShoppingCardService } from '../services/shopping-card.service';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',  
})
export class HomeComponent implements OnInit {
    products: Observable<Product[]>;
    isAuthenticated: boolean;
    controllerName: string = "Product";

    constructor(private apiService: ApiService<Product>, private authService: AuthService, private errorHandler: ErrorHandlerService,
         public shopCardService: ShoppingCardService) { }

    ngOnInit() {
        this.products = this.apiService.getList(this.controllerName);
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    deleteItem(id: string){
        if(!confirm("Czy na pewno chcesz usunąć?")){
            return;
        }

        this.apiService.deleteItem(id, this.controllerName)
        .subscribe(
            () => this.products = this.apiService.getList(this.controllerName),
            error => {this.errorHandler.handleError(error)}
        );
    }
}
